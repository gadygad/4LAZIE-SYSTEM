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

    @Autowired
    private com.school.notification.NotificationService notificationService;

    @Autowired
    private com.school.forum.repository.ForumReportRepository forumReportRepository;

    // Every notify* helper is fire-and-forget and silently swallows its own
    // failures — a broken notification must never break the like/comment/reply
    // action that triggered it. Each also skips notifying someone about their
    // own activity (liking/commenting/replying to yourself is not "new").
    private void notify(String targetUserId, String actingUserId, String title, String message, String link) {
        if (targetUserId == null || actingUserId == null || targetUserId.equals(actingUserId)) return;
        try {
            notificationService.createNotification(targetUserId, title, message, link);
        } catch (Exception e) {
            // Never let a notification failure surface as a failed like/comment.
        }
    }

    // Called via CacheManager directly (not @CacheEvict) because these evictions
    // happen from other methods *within this same controller* — Spring's
    // caching proxy can't intercept that kind of self-invocation, only calls
    // that come in from outside the bean.
    private void evictPostCaches(String id) {
        Cache postDetail = cacheManager.getCache("postDetail");
        if (postDetail != null) postDetail.evict(id);
        // postComments is now keyed by postId + viewer (see listComments), so a
        // single postId key no longer matches any entry — clear the whole
        // cache instead. It's small and repopulates on the next comment view.
        Cache postComments = cacheManager.getCache("postComments");
        if (postComments != null) postComments.clear();
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
                map.put("year", levelStr + (sem > 0 ? " · Semester " + sem : ""));
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

        // Note-derived cards ("note-<id>") show as posted by the admin/4LAZIE
        // brand, not a real uploader — notifying "yourself" on every like a
        // note gets would just spam the admin account, so those are skipped.
        if (nowLiked && !isNotePost) {
            String postAuthorId = ((ForumPost) updated).getAuthorId();
            notify(postAuthorId, userId, "New Like ❤️",
                    displayName(user) + " liked your post.", "/community/post/" + id);
        }

        return ResponseEntity.ok(Map.of("liked", nowLiked, "count", Math.max(0, count)));
    }

    // Same atomic add/remove pattern as toggleLike above, but scoped to a
    // single ForumComment — comments are always real documents (unlike
    // posts, which can be note-derived), so there's no id-prefix branching.
    @PostMapping(value = "/comment/{id}/like", produces = "application/json")
    @ResponseBody
    public ResponseEntity<?> toggleCommentLike(@PathVariable String id) {
        User user = authUtil.getLoggedInUser();
        if (user == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Login required"));
        }
        String userId = user.getId();
        FindAndModifyOptions returnNew = FindAndModifyOptions.options().returnNew(true);

        Query addQuery = Query.query(Criteria.where("_id").is(id).and("likedBy").ne(userId));
        Update addUpdate = new Update().addToSet("likedBy", userId).inc("likesCount", 1);
        ForumComment updated = mongoTemplate.findAndModify(addQuery, addUpdate, returnNew, ForumComment.class);

        boolean nowLiked = true;
        if (updated == null) {
            Query removeQuery = Query.query(Criteria.where("_id").is(id).and("likedBy").is(userId));
            Update removeUpdate = new Update().pull("likedBy", userId).inc("likesCount", -1);
            updated = mongoTemplate.findAndModify(removeQuery, removeUpdate, returnNew, ForumComment.class);
            nowLiked = false;
        }

        if (updated == null) {
            return ResponseEntity.status(404).body(Map.of("error", "Comment not found"));
        }

        int count = Math.max(0, updated.getLikesCount());
        evictPostCaches(updated.getPostId());

        // Let everyone else currently viewing this post see the like count
        // update live, same as new comments do.
        Map<String, Object> payload = new LinkedHashMap<>();
        payload.put("type", "commentLike");
        payload.put("commentId", id);
        payload.put("count", count);
        broadcastComment(updated.getPostId(), payload);

        if (nowLiked) {
            notify(updated.getAuthorId(), userId, "New Like ❤️",
                    displayName(user) + " liked your comment.", "/community/post/" + updated.getPostId());
        }

        return ResponseEntity.ok(Map.of("liked", nowLiked, "count", count));
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
        String parentCommentAuthorId = null;
        if (replyToCommentId != null && !replyToCommentId.isEmpty()) {
            ForumComment target = forumCommentRepository.findById(replyToCommentId).orElse(null);
            if (target != null) {
                User targetAuthor = userRepository.findById(target.getAuthorId()).orElse(null);
                comment.setReplyToCommentId(target.getId());
                comment.setReplyToAuthorName(targetAuthor != null ? displayName(targetAuthor) : "Unknown");
                comment.setReplyToContent(target.getContent());
                parentCommentAuthorId = target.getAuthorId();
            }
        }
        forumCommentRepository.save(comment);

        // Note-derived feed cards ("note-<noteId>") aren't real ForumPost documents,
        // so their comment count is kept on the underlying Note instead, and there's
        // no real "author" to notify — those cards show as posted by 4LAZIE/admin.
        boolean isNotePost = id.startsWith("note-");
        FindAndModifyOptions returnNew = FindAndModifyOptions.options().returnNew(true);
        long count;
        String postAuthorId = null;
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
            postAuthorId = post.getAuthorId();
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
        body.put("likesCount", 0);
        body.put("likedByMe", false);
        body.put("count", count);

        // Push it live to everyone else currently viewing this post; the
        // sender already sees it via the optimistic bubble appended before
        // this request was even sent.
        broadcastComment(id, body);

        // A reply notifies the person being replied to directly — that's the
        // more relevant signal than the post author hearing about every reply
        // buried deep in a thread they started. A top-level comment notifies
        // the post author instead. Either way only one notification fires.
        if (parentCommentAuthorId != null) {
            notify(parentCommentAuthorId, user.getId(), "New Reply 💬",
                    displayName(user) + " replied to your comment.", "/community/post/" + id);
        } else if (postAuthorId != null) {
            notify(postAuthorId, user.getId(), "New Comment 💬",
                    displayName(user) + " commented on your post.", "/community/post/" + id);
        }

        return ResponseEntity.ok(body);
    }

    // Cached briefly and evicted the instant a comment is added to this post
    // (see evictPostCaches) — reopening a post you already viewed seconds
    // ago no longer re-runs the comment + author-batch queries at all.
    @GetMapping(value = "/post/{id}/comments", produces = "application/json")
    @ResponseBody
    // Keyed by postId + viewer, not just postId — likedByMe below is
    // per-user, so a shared cache entry would leak one user's like state
    // (or lack of it) to everyone else viewing the same post.
    @Cacheable(value = "postComments", key = "#id + '::' + (@authUtil.getLoggedInUser() != null ? @authUtil.getLoggedInUser().getId() : 'anon')")
    public ResponseEntity<?> listComments(@PathVariable String id) {
        List<ForumComment> comments = forumCommentRepository.findByPostIdOrderByCreatedAtAsc(id);
        List<String> authorIds = comments.stream().map(ForumComment::getAuthorId).distinct().collect(Collectors.toList());
        Map<String, User> authors = authorIds.isEmpty()
                ? Map.of()
                : userRepository.findAllById(authorIds).stream().collect(Collectors.toMap(User::getId, u -> u));
        User currentUser = authUtil.getLoggedInUser();

        List<Map<String, Object>> result = comments.stream().map(c -> {
            User author = authors.get(c.getAuthorId());
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("id", c.getId());
            m.put("authorId", c.getAuthorId());
            m.put("authorName", author != null ? displayName(author) : "Unknown");
            m.put("authorPicture", author != null ? displayPicture(author) : null);
            m.put("authorVerified", isVerifiedNonAdmin(author));
            m.put("content", c.getContent());
            m.put("createdAt", c.getCreatedAt().format(COMMENT_TIME_FORMAT));
            m.put("replyToCommentId", c.getReplyToCommentId());
            m.put("replyToAuthorName", c.getReplyToAuthorName());
            m.put("replyToContent", c.getReplyToContent());
            m.put("likesCount", Math.max(0, c.getLikesCount()));
            m.put("likedByMe", currentUser != null && c.getLikedBy() != null && c.getLikedBy().contains(currentUser.getId()));
            return m;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(result);
    }

    // ─────────────────────────────────────────────
    //  Post edit/delete — author-only edit, author-or-admin delete. Never
    //  applies to note-derived pseudo-posts ("note-<id>"): those aren't real
    //  documents, they're a live view of the underlying Note.
    // ─────────────────────────────────────────────
    @PostMapping(value = "/post/{id}/edit", produces = "application/json")
    @ResponseBody
    @CacheEvict(value = "forumFeed", allEntries = true)
    public ResponseEntity<?> editPost(@PathVariable String id, @RequestParam String title, @RequestParam String content) {
        User user = authUtil.getLoggedInUser();
        if (user == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Login required"));
        }
        if (id.startsWith("note-")) {
            return ResponseEntity.status(403).body(Map.of("error", "This post can't be edited"));
        }
        if (title == null || title.trim().isEmpty() || content == null || content.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Title and content are required"));
        }
        ForumPost post = forumPostRepository.findById(id).orElse(null);
        if (post == null) {
            return ResponseEntity.status(404).body(Map.of("error", "Post not found"));
        }
        if (!user.getId().equals(post.getAuthorId())) {
            return ResponseEntity.status(403).body(Map.of("error", "You can only edit your own post"));
        }
        post.setTitle(title.trim());
        post.setContent(content.trim());
        forumPostRepository.save(post);
        evictPostCaches(id);

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("title", post.getTitle());
        body.put("content", post.getContent());
        return ResponseEntity.ok(body);
    }

    @PostMapping(value = "/post/{id}/delete", produces = "application/json")
    @ResponseBody
    @CacheEvict(value = "forumFeed", allEntries = true)
    public ResponseEntity<?> deletePost(@PathVariable String id) {
        User user = authUtil.getLoggedInUser();
        if (user == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Login required"));
        }
        if (id.startsWith("note-")) {
            return ResponseEntity.status(403).body(Map.of("error", "This post can't be deleted"));
        }
        ForumPost post = forumPostRepository.findById(id).orElse(null);
        if (post == null) {
            return ResponseEntity.status(404).body(Map.of("error", "Post not found"));
        }
        if (!user.getId().equals(post.getAuthorId()) && !isAdmin(user)) {
            return ResponseEntity.status(403).body(Map.of("error", "You can only delete your own post"));
        }
        forumCommentRepository.deleteAll(forumCommentRepository.findByPostIdOrderByCreatedAtAsc(id));
        forumPostRepository.deleteById(id);
        evictPostCaches(id);
        return ResponseEntity.ok(Map.of("deleted", true));
    }

    // ─────────────────────────────────────────────
    //  Comment edit/delete — same author-only-edit / author-or-admin-delete
    //  rule as posts. A deleted comment's replies aren't cascade-deleted:
    //  they already carry a denormalized snapshot of what they replied to
    //  (see ForumComment.replyTo*), so they keep making sense standalone —
    //  removing them too would silently destroy other people's contributions.
    // ─────────────────────────────────────────────
    @PostMapping(value = "/comment/{id}/edit", produces = "application/json")
    @ResponseBody
    public ResponseEntity<?> editComment(@PathVariable String id, @RequestParam String content) {
        User user = authUtil.getLoggedInUser();
        if (user == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Login required"));
        }
        if (content == null || content.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Comment cannot be empty"));
        }
        ForumComment comment = forumCommentRepository.findById(id).orElse(null);
        if (comment == null) {
            return ResponseEntity.status(404).body(Map.of("error", "Comment not found"));
        }
        if (!user.getId().equals(comment.getAuthorId())) {
            return ResponseEntity.status(403).body(Map.of("error", "You can only edit your own comment"));
        }
        comment.setContent(content.trim());
        forumCommentRepository.save(comment);
        evictPostCaches(comment.getPostId());

        Map<String, Object> payload = new LinkedHashMap<>();
        payload.put("type", "commentEdited");
        payload.put("commentId", id);
        payload.put("content", comment.getContent());
        broadcastComment(comment.getPostId(), payload);

        return ResponseEntity.ok(Map.of("content", comment.getContent()));
    }

    @PostMapping(value = "/comment/{id}/delete", produces = "application/json")
    @ResponseBody
    public ResponseEntity<?> deleteComment(@PathVariable String id) {
        User user = authUtil.getLoggedInUser();
        if (user == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Login required"));
        }
        ForumComment comment = forumCommentRepository.findById(id).orElse(null);
        if (comment == null) {
            return ResponseEntity.status(404).body(Map.of("error", "Comment not found"));
        }
        if (!user.getId().equals(comment.getAuthorId()) && !isAdmin(user)) {
            return ResponseEntity.status(403).body(Map.of("error", "You can only delete your own comment"));
        }
        String postId = comment.getPostId();
        forumCommentRepository.deleteById(id);

        boolean isNotePost = postId.startsWith("note-");
        long count;
        if (isNotePost) {
            count = forumCommentRepository.countByPostId(postId);
        } else {
            FindAndModifyOptions returnNew = FindAndModifyOptions.options().returnNew(true);
            ForumPost post = mongoTemplate.findAndModify(
                    Query.query(Criteria.where("_id").is(postId)),
                    new Update().inc("commentsCount", -1),
                    returnNew, ForumPost.class);
            count = post != null ? Math.max(0, post.getCommentsCount()) : 0;
        }
        evictPostCaches(postId);

        Map<String, Object> payload = new LinkedHashMap<>();
        payload.put("type", "commentDeleted");
        payload.put("commentId", id);
        payload.put("count", count);
        broadcastComment(postId, payload);

        return ResponseEntity.ok(Map.of("deleted", true, "count", count));
    }

    // ─────────────────────────────────────────────
    //  Community search — the navbar search icon used to just toggle an
    //  input open with nowhere for it to go. Searches across four things a
    //  student might actually be looking for: other students by name (the
    //  whole point of a cross-college community — finding and connecting
    //  with people at other institutions, not just this one's own), real
    //  discussion posts (title + content), uploaded notes/past-papers
    //  (title, module, category), and comment content (surfaced with which
    //  post it belongs to, since a comment has no page of its own). Capped
    //  small per section — this backs a live dropdown, not a full results
    //  page.
    // ─────────────────────────────────────────────
    @GetMapping(value = "/search", produces = "application/json")
    @ResponseBody
    public ResponseEntity<?> search(@RequestParam("q") String q) {
        Map<String, Object> empty = new LinkedHashMap<>();
        empty.put("people", List.of());
        empty.put("posts", List.of());
        empty.put("notes", List.of());
        empty.put("comments", List.of());
        if (q == null || q.trim().length() < 2) {
            return ResponseEntity.ok(empty);
        }
        // Pattern.quote so a search for something like "C++" or "a.b" is
        // matched literally instead of being interpreted as regex syntax.
        String safe = java.util.regex.Pattern.quote(q.trim());
        int perSection = 5;

        User currentUser = authUtil.getLoggedInUser();

        // People — matched by name only (never email, to avoid turning this
        // into an email-harvesting lookup). Admin/system accounts are always
        // branded as "4LAZIE" elsewhere, not a real person to find, so
        // they're excluded here regardless of what their stored name is.
        List<User> matchedPeople = mongoTemplate.find(
                Query.query(Criteria.where("name").regex(safe, "i")
                        .and("role").nin(com.school.auth.Role.ADMIN, com.school.auth.Role.SUPER_ADMIN))
                        .limit(perSection),
                User.class);
        List<Map<String, Object>> people = matchedPeople.stream()
                .filter(u -> currentUser == null || !u.getId().equals(currentUser.getId()))
                .map(u -> {
                    Map<String, Object> m = new LinkedHashMap<>();
                    m.put("id", u.getId());
                    m.put("name", u.getName());
                    m.put("picture", u.getProfilePicture());
                    m.put("institution", u.getInstitution() != null ? u.getInstitution().getName() : null);
                    m.put("role", u.getRole() != null ? u.getRole().name() : "STUDENT");
                    m.put("verified", Boolean.TRUE.equals(u.getHasVerifiedBadge()));
                    m.put("link", "/students/" + u.getId() + "/profile");
                    return m;
                }).collect(Collectors.toList());

        List<ForumPost> matchedPosts = mongoTemplate.find(
                Query.query(new Criteria().orOperator(
                        Criteria.where("title").regex(safe, "i"),
                        Criteria.where("content").regex(safe, "i")
                )).limit(perSection),
                ForumPost.class);
        List<String> postAuthorIds = matchedPosts.stream().map(ForumPost::getAuthorId).filter(java.util.Objects::nonNull).distinct().collect(Collectors.toList());
        Map<String, User> postAuthors = postAuthorIds.isEmpty() ? Map.of()
                : userRepository.findAllById(postAuthorIds).stream().collect(Collectors.toMap(User::getId, u -> u));
        List<Map<String, Object>> posts = matchedPosts.stream().map(p -> {
            User author = postAuthors.get(p.getAuthorId());
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("id", p.getId());
            m.put("title", p.getTitle());
            m.put("snippet", snippet(p.getContent()));
            m.put("authorName", author != null ? displayName(author) : "Unknown");
            m.put("link", "/community/post/" + p.getId());
            return m;
        }).collect(Collectors.toList());

        List<Note> matchedNotes = mongoTemplate.find(
                Query.query(new Criteria().orOperator(
                        Criteria.where("title").regex(safe, "i"),
                        Criteria.where("moduleName").regex(safe, "i"),
                        Criteria.where("category").regex(safe, "i")
                )).limit(perSection),
                Note.class);
        List<Map<String, Object>> notes = matchedNotes.stream().map(n -> {
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("id", n.getId());
            m.put("title", n.getTitle());
            m.put("category", n.getCategory());
            m.put("level", n.getLevelNo() != null ? (n.getLevelNo() >= 4 ? "NTA Level " + n.getLevelNo() : "Year " + n.getLevelNo()) : "");
            m.put("link", "/view/" + n.getSlug());
            return m;
        }).collect(Collectors.toList());

        List<ForumComment> matchedComments = mongoTemplate.find(
                Query.query(Criteria.where("content").regex(safe, "i")).limit(perSection),
                ForumComment.class);
        List<String> commentPostIds = matchedComments.stream().map(ForumComment::getPostId).distinct().collect(Collectors.toList());
        List<String> realPostIds = commentPostIds.stream().filter(id -> !id.startsWith("note-")).collect(Collectors.toList());
        Map<String, ForumPost> commentParentPosts = realPostIds.isEmpty() ? Map.of()
                : forumPostRepository.findAllById(realPostIds).stream().collect(Collectors.toMap(ForumPost::getId, p -> p));
        List<Map<String, Object>> comments = matchedComments.stream().map(c -> {
            ForumPost parent = commentParentPosts.get(c.getPostId());
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("id", c.getId());
            m.put("snippet", snippet(c.getContent()));
            m.put("postTitle", parent != null ? parent.getTitle() : "a note discussion");
            m.put("link", "/community/post/" + c.getPostId());
            return m;
        }).collect(Collectors.toList());

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("people", people);
        result.put("posts", posts);
        result.put("notes", notes);
        result.put("comments", comments);
        return ResponseEntity.ok(result);
    }

    private static String snippet(String content) {
        if (content == null) return "";
        String flat = content.replaceAll("\\s+", " ").trim();
        return flat.length() > 90 ? flat.substring(0, 90) + "…" : flat;
    }

    // ─────────────────────────────────────────────
    //  Reporting — anyone logged in can flag a post or comment for review.
    //  Reported content is never auto-hidden; it stays exactly as visible as
    //  before until an admin or super-admin actually reviews the report (see
    //  AdminForumReportController). You can't report your own content, and
    //  re-reporting the same content while your earlier report is still
    //  pending is a no-op rather than a duplicate queue entry.
    // ─────────────────────────────────────────────
    @PostMapping(value = "/post/{id}/report", produces = "application/json")
    @ResponseBody
    public ResponseEntity<?> reportPost(@PathVariable String id, @RequestParam String reason,
                                         @RequestParam(required = false) String details) {
        User user = authUtil.getLoggedInUser();
        if (user == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Login required"));
        }
        if (!com.school.forum.model.ForumReport.REASONS.contains(reason)) {
            return ResponseEntity.badRequest().body(Map.of("error", "Please choose a valid reason"));
        }
        if (id.startsWith("note-")) {
            return ResponseEntity.status(403).body(Map.of("error", "This post can't be reported"));
        }
        ForumPost post = forumPostRepository.findById(id).orElse(null);
        if (post == null) {
            return ResponseEntity.status(404).body(Map.of("error", "Post not found"));
        }
        if (user.getId().equals(post.getAuthorId())) {
            return ResponseEntity.status(403).body(Map.of("error", "You can't report your own post"));
        }
        if (forumReportRepository.existsByContentIdAndReporterIdAndStatus(id, user.getId(), "PENDING")) {
            return ResponseEntity.ok(Map.of("reported", true, "message", "You've already reported this — it's awaiting review."));
        }
        forumReportRepository.save(new com.school.forum.model.ForumReport("POST", id, id, user.getId(), reason,
                details != null ? details.trim() : null));
        notificationService.notifyAdminsWithPermission("canModerateForum", "New forum report",
                user.getName() + " reported a post for: " + reason, "/admin/forum/reports");
        return ResponseEntity.ok(Map.of("reported", true, "message", "Thanks — this has been sent to the moderators."));
    }

    @PostMapping(value = "/comment/{id}/report", produces = "application/json")
    @ResponseBody
    public ResponseEntity<?> reportComment(@PathVariable String id, @RequestParam String reason,
                                            @RequestParam(required = false) String details) {
        User user = authUtil.getLoggedInUser();
        if (user == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Login required"));
        }
        if (!com.school.forum.model.ForumReport.REASONS.contains(reason)) {
            return ResponseEntity.badRequest().body(Map.of("error", "Please choose a valid reason"));
        }
        ForumComment comment = forumCommentRepository.findById(id).orElse(null);
        if (comment == null) {
            return ResponseEntity.status(404).body(Map.of("error", "Comment not found"));
        }
        if (user.getId().equals(comment.getAuthorId())) {
            return ResponseEntity.status(403).body(Map.of("error", "You can't report your own comment"));
        }
        if (forumReportRepository.existsByContentIdAndReporterIdAndStatus(id, user.getId(), "PENDING")) {
            return ResponseEntity.ok(Map.of("reported", true, "message", "You've already reported this — it's awaiting review."));
        }
        forumReportRepository.save(new com.school.forum.model.ForumReport("COMMENT", id, comment.getPostId(), user.getId(), reason,
                details != null ? details.trim() : null));
        notificationService.notifyAdminsWithPermission("canModerateForum", "New forum report",
                user.getName() + " reported a comment for: " + reason, "/admin/forum/reports");
        return ResponseEntity.ok(Map.of("reported", true, "message", "Thanks — this has been sent to the moderators."));
    }
}
