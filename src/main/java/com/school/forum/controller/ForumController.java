package com.school.forum.controller;

import com.school.auth.User;
import com.school.auth.AuthUtil;
import com.school.auth.UserRepository;
import com.school.forum.model.ForumComment;
import com.school.forum.model.ForumPost;
import com.school.forum.service.ForumService;
import com.school.forum.repository.ForumCommentRepository;
import com.school.forum.repository.ForumPostRepository;
import com.school.notes.Note;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/community")
public class ForumController {

    @Autowired
    private AuthUtil authUtil;
    
    @Autowired
    private ForumService forumService;

    @Autowired
    private ForumPostRepository forumPostRepository;

    @Autowired
    private ForumCommentRepository forumCommentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private CacheManager cacheManager;

    @Autowired
    private com.school.notes.NoteRepository noteRepository;

    // Called via CacheManager directly (not @CacheEvict) because these evictions
    // happen from other methods *within this same controller* — Spring's
    // caching proxy can't intercept that kind of self-invocation, only calls
    // that come in from outside the bean.
    private void evictPostCaches(String id) {
        Cache postDetail = cacheManager.getCache("postDetail");
        if (postDetail != null) postDetail.evict(id);
        Cache postComments = cacheManager.getCache("postComments");
        if (postComments != null) postComments.evict(id);
    }

    private boolean isAdmin(User user) {
        return user != null && user.getRole() != null &&
                (user.getRole().name().equals("ADMIN") || user.getRole().name().equals("SUPER_ADMIN"));
    }

    private String displayName(User user) {
        return isAdmin(user) ? "4LAZIE" : user.getName();
    }

    private String displayPicture(User user) {
        return isAdmin(user) ? "/images/logo.png" : user.getProfilePicture();
    }

    // A non-admin's badge is a separate, community-granted trust marker (green
    // name + checkmark) — admins are always "verified" via the 4LAZIE brand
    // itself, not this flag.
    private boolean isVerifiedNonAdmin(User user) {
        return !isAdmin(user) && user != null && Boolean.TRUE.equals(user.getHasVerifiedBadge());
    }

    private static final DateTimeFormatter COMMENT_TIME_FORMAT = DateTimeFormatter.ofPattern("dd MMM yyyy, HH:mm:ss");

    @GetMapping
    public String showCommunityForum(Model model) {
        User loggedInUser = authUtil.getLoggedInUser();
        model.addAttribute("user", loggedInUser);

        // Fetch real feed (admin posts pinned at top, then newest regular posts)
        List<ForumPost> feed = forumService.getRandomizedFeed();
        model.addAttribute("posts", feed);

        model.addAttribute("trending", forumService.getTrendingPosts());

        // Fetch real data for latest notes/folders, grouped by Level + Semester
        // so a folder never mixes a level's Semester 1 and Semester 2 materials.
        // Pool is wide (500, not just the 50 most recent) and the picker takes
        // a balanced, shuffled mix of Degree (level 1-3) and Diploma/NTA
        // (level 4+) folders — otherwise whichever program type got uploaded
        // most recently could crowd the other out of the picker entirely,
        // and the same static top-N would show on every single page load.
        List<com.school.notes.Note> recentNotes = noteRepository.findTop500ByOrderByIdDesc();
        java.util.Map<java.util.List<Integer>, List<com.school.notes.Note>> notesByLevelSemester = recentNotes.stream()
            .filter(n -> n.getLevelNo() != null)
            .collect(java.util.stream.Collectors.groupingBy(
                n -> java.util.Arrays.asList(n.getLevelNo(), n.getSemesterNo() != null ? n.getSemesterNo() : 0)));

        List<java.util.List<Integer>> degreeKeys = new java.util.ArrayList<>();
        List<java.util.List<Integer>> diplomaKeys = new java.util.ArrayList<>();
        for (java.util.List<Integer> key : notesByLevelSemester.keySet()) {
            (key.get(0) >= 4 ? diplomaKeys : degreeKeys).add(key);
        }
        java.util.Collections.shuffle(degreeKeys);
        java.util.Collections.shuffle(diplomaKeys);

        List<java.util.List<Integer>> pickedKeys = new java.util.ArrayList<>();
        int perSide = 4; // up to 4 folders from each side, 8 total
        pickedKeys.addAll(degreeKeys.subList(0, Math.min(perSide, degreeKeys.size())));
        pickedKeys.addAll(diplomaKeys.subList(0, Math.min(perSide, diplomaKeys.size())));
        java.util.Collections.shuffle(pickedKeys);

        List<java.util.Map<String, Object>> latestFolders = pickedKeys.stream()
            .map(key -> {
                List<com.school.notes.Note> notes = notesByLevelSemester.get(key);
                java.util.Map<String, Object> map = new java.util.HashMap<>();
                Integer lvl = key.get(0);
                Integer sem = key.get(1);
                String levelStr = (lvl >= 4) ? "NTA Level " + lvl : "Year " + lvl;
                map.put("year", levelStr + (sem > 0 ? " · Sem " + sem : ""));
                map.put("levelNo", lvl);
                map.put("semesterNo", sem > 0 ? sem : 1);
                map.put("count", (long) notes.size());
                map.put("notes", notes.stream().limit(5).collect(java.util.stream.Collectors.toList()));
                return map;
            })
            .collect(java.util.stream.Collectors.toList());

        model.addAttribute("latestFolders", latestFolders);

        return "forum/index";
    }

    /** Infinite-scroll "load more" for the feed — returns just the postCard
     * fragment's rendered HTML for the next batch, given how many posts the
     * client has already shown (offset). Empty response means genuinely
     * nothing left, which is when the client finally shows "No more posts"
     * instead of that appearing after every single page load regardless of
     * how many posts actually exist. */
    @GetMapping("/feed/more")
    public String feedMore(@org.springframework.web.bind.annotation.RequestParam("offset") int offset, Model model) {
        User loggedInUser = authUtil.getLoggedInUser();
        model.addAttribute("user", loggedInUser);
        List<ForumPost> page = forumService.getFeedPage(offset, 20);
        model.addAttribute("posts", page);
        return "forum/index :: postCard(posts=${posts})";
    }

    // Permalink page — the post plus all its comments open here instead of
    // in a modal, so Share has a real page to point at and a single post's
    // comment thread doesn't drag the whole feed's page length down with it.
    @GetMapping("/post/{id}")
    public String showPost(@PathVariable String id, Model model) {
        User loggedInUser = authUtil.getLoggedInUser();
        model.addAttribute("user", loggedInUser);

        ForumPost post = forumService.getPostById(id);
        if (post == null) {
            return "redirect:/community";
        }
        model.addAttribute("post", post);
        return "forum/post-detail";
    }

    @PostMapping("/post")
    @CacheEvict(value = "forumFeed", allEntries = true)
    public String createPost(@RequestParam("title") String title, @RequestParam("content") String content) {
        User loggedInUser = authUtil.getLoggedInUser();
        if (loggedInUser != null && content != null && !content.trim().isEmpty() && title != null && !title.trim().isEmpty()) {
            ForumPost post = new ForumPost(loggedInUser, title, content);
            if (loggedInUser.getInstitution() != null && loggedInUser.getInstitution().getShortName() != null) {
                post.setInstitutionPlaceholder(loggedInUser.getInstitution().getShortName() + " INSTITUTE");
            } else {
                post.setInstitutionPlaceholder("SJUIT INSTITUTE");
            }
            forumPostRepository.save(post);
        }
        return "redirect:/community";
    }

    @PostMapping(value = "/post/{id}/like", produces = "application/json")
    @ResponseBody
    public ResponseEntity<?> toggleLike(@PathVariable String id) {
        User user = authUtil.getLoggedInUser();
        if (user == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Login required"));
        }
        String userId = user.getId();
        FindAndModifyOptions returnNew = FindAndModifyOptions.options().returnNew(true);

        // Note-derived feed cards ("note-<noteId>") aren't real ForumPost documents,
        // so their like state is tracked on the underlying Note instead.
        boolean isNotePost = id.startsWith("note-");
        Class<?> targetClass = isNotePost ? Note.class : ForumPost.class;
        String targetId = isNotePost ? id.substring("note-".length()) : id;

        // Single targeted update per attempt (no full-document read+write): try
        // adding the like first, and only if the user had already liked it (so
        // the add matched nothing) do we try the remove — one round trip in the
        // common case instead of the previous find-then-save pair.
        Query addQuery = Query.query(Criteria.where("_id").is(targetId).and("likedBy").ne(userId));
        Update addUpdate = new Update().addToSet("likedBy", userId).inc("likesCount", 1);
        Object updated = mongoTemplate.findAndModify(addQuery, addUpdate, returnNew, targetClass);

        boolean nowLiked = true;
        if (updated == null) {
            Query removeQuery = Query.query(Criteria.where("_id").is(targetId).and("likedBy").is(userId));
            Update removeUpdate = new Update().pull("likedBy", userId).inc("likesCount", -1);
            updated = mongoTemplate.findAndModify(removeQuery, removeUpdate, returnNew, targetClass);
            nowLiked = false;
        }

        if (updated == null) {
            return ResponseEntity.status(404).body(Map.of("error", "Post not found"));
        }
        int count = isNotePost ? ((Note) updated).getLikesCount() : ((ForumPost) updated).getLikesCount();
        evictPostCaches(id);
        return ResponseEntity.ok(Map.of("liked", nowLiked, "count", Math.max(0, count)));
    }

    // ─────────────────────────────────────────────
    //  Real-time comments — postId → list of open SSE connections. Any
    //  logged-in user can comment/reply on any post with no depth limit
    //  (ForumComment.replyToCommentId just points at whatever comment was
    //  replied to); this registry is purely for pushing new comments live
    //  to everyone currently viewing that post instead of them needing to
    //  refresh the page to see it.
    // ─────────────────────────────────────────────
    private static final Map<String, List<SseEmitter>> commentEmitters = new ConcurrentHashMap<>();

    @GetMapping(value = "/post/{id}/comments/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    @ResponseBody
    public SseEmitter commentStream(@PathVariable String id, jakarta.servlet.http.HttpServletResponse response) {
        // See DirectChatController for why this header matters on Render —
        // without it the proxy buffers the stream and nothing arrives live.
        response.setHeader("X-Accel-Buffering", "no");
        SseEmitter emitter = new SseEmitter(180_000L);
        List<SseEmitter> emitters = commentEmitters.computeIfAbsent(id, k -> new CopyOnWriteArrayList<>());
        emitters.add(emitter);
        Runnable cleanup = () -> emitters.remove(emitter);
        emitter.onCompletion(cleanup);
        emitter.onTimeout(cleanup);
        emitter.onError(e -> cleanup.run());
        return emitter;
    }

    private static void broadcastComment(String postId, Map<String, Object> commentPayload) {
        List<SseEmitter> emitters = commentEmitters.get(postId);
        if (emitters == null || emitters.isEmpty()) return;
        java.util.concurrent.CompletableFuture.runAsync(() -> {
            List<SseEmitter> dead = new ArrayList<>();
            for (SseEmitter emitter : emitters) {
                try {
                    emitter.send(SseEmitter.event().name("comment").data(commentPayload, MediaType.APPLICATION_JSON));
                } catch (Exception e) {
                    dead.add(emitter);
                }
            }
            emitters.removeAll(dead);
        });
    }

    @PostMapping(value = "/post/{id}/comment", produces = "application/json")
    @ResponseBody
    public ResponseEntity<?> addComment(@PathVariable String id, @RequestParam String content,
                                         @RequestParam(required = false) String replyToCommentId) {
        User user = authUtil.getLoggedInUser();
        if (user == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Login required"));
        }
        if (content == null || content.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Comment cannot be empty"));
        }
        ForumComment comment = new ForumComment(id, user.getId(), content.trim());

        // Snapshot the quoted comment server-side (rather than trusting whatever
        // the client sends) so the reply preview can't be spoofed.
        if (replyToCommentId != null && !replyToCommentId.isEmpty()) {
            ForumComment target = forumCommentRepository.findById(replyToCommentId).orElse(null);
            if (target != null) {
                User targetAuthor = userRepository.findById(target.getAuthorId()).orElse(null);
                comment.setReplyToCommentId(target.getId());
                comment.setReplyToAuthorName(targetAuthor != null ? displayName(targetAuthor) : "Unknown");
                comment.setReplyToContent(target.getContent());
            }
        }
        forumCommentRepository.save(comment);

        // Note-derived feed cards ("note-<noteId>") aren't real ForumPost documents,
        // so their comment count is kept on the underlying Note instead.
        boolean isNotePost = id.startsWith("note-");
        FindAndModifyOptions returnNew = FindAndModifyOptions.options().returnNew(true);
        long count;
        if (isNotePost) {
            String noteId = id.substring("note-".length());
            Note note = mongoTemplate.findById(noteId, Note.class);
            if (note == null) {
                return ResponseEntity.status(404).body(Map.of("error", "Note not found"));
            }
            count = forumCommentRepository.countByPostId(id);
        } else {
            ForumPost post = mongoTemplate.findAndModify(
                    Query.query(Criteria.where("_id").is(id)),
                    new Update().inc("commentsCount", 1),
                    returnNew, ForumPost.class);
            if (post == null) {
                return ResponseEntity.status(404).body(Map.of("error", "Post not found"));
            }
            count = post.getCommentsCount();
        }

        evictPostCaches(id);

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("id", comment.getId());
        body.put("authorId", user.getId());
        body.put("authorName", displayName(user));
        body.put("authorPicture", displayPicture(user));
        body.put("authorVerified", isVerifiedNonAdmin(user));
        body.put("content", comment.getContent());
        body.put("createdAt", comment.getCreatedAt().format(COMMENT_TIME_FORMAT));
        body.put("replyToCommentId", comment.getReplyToCommentId());
        body.put("replyToAuthorName", comment.getReplyToAuthorName());
        body.put("replyToContent", comment.getReplyToContent());
        body.put("count", count);

        // Push it live to everyone else currently viewing this post; the
        // sender already sees it via the optimistic bubble appended before
        // this request was even sent.
        broadcastComment(id, body);

        return ResponseEntity.ok(body);
    }

    // Cached briefly and evicted the instant a comment is added to this post
    // (see evictPostCaches) — reopening a post you already viewed seconds
    // ago no longer re-runs the comment + author-batch queries at all.
    @GetMapping(value = "/post/{id}/comments", produces = "application/json")
    @ResponseBody
    @Cacheable(value = "postComments", key = "#id")
    public ResponseEntity<?> listComments(@PathVariable String id) {
        List<ForumComment> comments = forumCommentRepository.findByPostIdOrderByCreatedAtAsc(id);
        List<String> authorIds = comments.stream().map(ForumComment::getAuthorId).distinct().collect(Collectors.toList());
        Map<String, User> authors = authorIds.isEmpty()
                ? Map.of()
                : userRepository.findAllById(authorIds).stream().collect(Collectors.toMap(User::getId, u -> u));

        List<Map<String, Object>> result = comments.stream().map(c -> {
            User author = authors.get(c.getAuthorId());
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("id", c.getId());
            m.put("authorName", author != null ? displayName(author) : "Unknown");
            m.put("authorPicture", author != null ? displayPicture(author) : null);
            m.put("authorVerified", isVerifiedNonAdmin(author));
            m.put("content", c.getContent());
            m.put("createdAt", c.getCreatedAt().format(COMMENT_TIME_FORMAT));
            m.put("replyToCommentId", c.getReplyToCommentId());
            m.put("replyToAuthorName", c.getReplyToAuthorName());
            m.put("replyToContent", c.getReplyToContent());
            return m;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(result);
    }
}
