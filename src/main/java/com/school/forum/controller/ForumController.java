package com.school.forum.controller;

import com.school.auth.User;
import com.school.auth.AuthUtil;
import com.school.auth.UserRepository;
import com.school.forum.model.ForumComment;
import com.school.forum.model.ForumPost;
import com.school.forum.service.ForumService;
import com.school.forum.repository.ForumCommentRepository;
import com.school.forum.repository.ForumPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
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

    private boolean isAdmin(User user) {
        return user != null && user.getRole() != null &&
                (user.getRole().name().equals("ADMIN") || user.getRole().name().equals("SUPER_ADMIN"));
    }

    private String displayName(User user) {
        return isAdmin(user) ? "4LAZIE" : user.getName();
    }

    @GetMapping
    public String showCommunityForum(Model model) {
        User loggedInUser = authUtil.getLoggedInUser();
        model.addAttribute("user", loggedInUser);
        
        // Fetch real feed (admin posts pinned at top, then newest regular posts)
        List<ForumPost> feed = forumService.getRandomizedFeed();
        model.addAttribute("posts", feed);
        
        return "forum/index";
    }

    @PostMapping("/post")
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

        // Single targeted update per attempt (no full-document read+write): try
        // adding the like first, and only if the user had already liked it (so
        // the add matched nothing) do we try the remove — one round trip in the
        // common case instead of the previous find-then-save pair.
        Query addQuery = Query.query(Criteria.where("_id").is(id).and("likedBy").ne(userId));
        Update addUpdate = new Update().addToSet("likedBy", userId).inc("likesCount", 1);
        ForumPost updated = mongoTemplate.findAndModify(addQuery, addUpdate, returnNew, ForumPost.class);

        boolean nowLiked = true;
        if (updated == null) {
            Query removeQuery = Query.query(Criteria.where("_id").is(id).and("likedBy").is(userId));
            Update removeUpdate = new Update().pull("likedBy", userId).inc("likesCount", -1);
            updated = mongoTemplate.findAndModify(removeQuery, removeUpdate, returnNew, ForumPost.class);
            nowLiked = false;
        }

        if (updated == null) {
            return ResponseEntity.status(404).body(Map.of("error", "Post not found"));
        }
        return ResponseEntity.ok(Map.of("liked", nowLiked, "count", Math.max(0, updated.getLikesCount())));
    }

    @PostMapping(value = "/post/{id}/comment", produces = "application/json")
    @ResponseBody
    public ResponseEntity<?> addComment(@PathVariable String id, @RequestParam String content) {
        User user = authUtil.getLoggedInUser();
        if (user == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Login required"));
        }
        if (content == null || content.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Comment cannot be empty"));
        }
        ForumComment comment = new ForumComment(id, user.getId(), content.trim());
        forumCommentRepository.save(comment);

        // Atomic increment — no need to read the post first just to write it back.
        FindAndModifyOptions returnNew = FindAndModifyOptions.options().returnNew(true);
        ForumPost post = mongoTemplate.findAndModify(
                Query.query(Criteria.where("_id").is(id)),
                new Update().inc("commentsCount", 1),
                returnNew, ForumPost.class);
        if (post == null) {
            return ResponseEntity.status(404).body(Map.of("error", "Post not found"));
        }
        long count = post.getCommentsCount();

        Map<String, Object> body = new LinkedHashMap<>();
        body.put("id", comment.getId());
        body.put("authorName", displayName(user));
        body.put("content", comment.getContent());
        body.put("count", count);
        return ResponseEntity.ok(body);
    }

    @GetMapping(value = "/post/{id}/comments", produces = "application/json")
    @ResponseBody
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
            m.put("content", c.getContent());
            return m;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(result);
    }
}
