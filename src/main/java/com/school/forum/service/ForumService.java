package com.school.forum.service;

import com.school.auth.Role;
import com.school.auth.User;
import com.school.auth.UserRepository;
import com.school.forum.model.ForumPost;
import com.school.forum.repository.ForumCommentRepository;
import com.school.forum.repository.ForumPostRepository;
import com.school.notes.Note;
import com.school.notes.NoteRepository;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ForumService {

    @Autowired private ForumPostRepository forumPostRepository;
    @Autowired private ForumCommentRepository forumCommentRepository;
    @Autowired private NoteRepository noteRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private MongoTemplate mongoTemplate;

    // ── Helper: resolve role string from User ──
    private String resolveRole(User user) {
        if (user == null || user.getRole() == null) return "STUDENT";
        return user.getRole().name(); // e.g. "ADMIN", "SUPER_ADMIN", "LECTURE", "CLASS_REPRESENTATIVE", "STUDENT"
    }

    // ── Helper: is this an "authority" role (Admin/SuperAdmin) ──
    private boolean isAuthority(String role) {
        return "ADMIN".equals(role) || "SUPER_ADMIN".equals(role);
    }

    // Short-lived cache (see CacheConfig — 8s TTL) so Back/repeat navigation
    // to /community within a few seconds is instant instead of re-running
    // ~9 sequential MongoDB round trips every single time.
    
    private User getSystemAdminUser() {
        User adminUser = userRepository.findByEmail("kilingepazasauti@gmail.com").orElse(null);
        if (adminUser == null) {
            adminUser = userRepository.findByEmail("admin@school.com").orElse(null);
        }
        if (adminUser == null) {
            adminUser = userRepository.findByRole(Role.SUPER_ADMIN).stream().findFirst().orElse(null);
        }
        if (adminUser == null) {
            adminUser = userRepository.findByRole(Role.ADMIN).stream().findFirst().orElse(null);
        }
        return adminUser;
    }

    @Cacheable("forumFeed")
    public List<ForumPost> getRandomizedFeed() {

        // ── 1. Find admin user to attribute uploaded notes to ──
        User adminUser = getSystemAdminUser();

        // ── 2. Convert all uploaded Notes/Mitihani into ForumPost objects ──
        List<ForumPost> notePosts = new ArrayList<>();
        if (adminUser != null) {
            final User admin = adminUser;
            List<Note> allNotes = noteRepository.findTop10ByOrderByIdDesc();

            // One aggregation for all notes' comment counts instead of a
            // countByPostId query per note (was a 10-query N+1 on every
            // /community page load).
            List<String> notePostIds = allNotes.stream().map(n -> "note-" + n.getId()).collect(Collectors.toList());
            Map<String, Long> commentCountsByPostId = new HashMap<>();
            if (!notePostIds.isEmpty()) {
                Aggregation agg = Aggregation.newAggregation(
                        Aggregation.match(Criteria.where("postId").in(notePostIds)),
                        Aggregation.group("postId").count().as("count")
                );
                for (Document doc : mongoTemplate.aggregate(agg, "forum_comments", Document.class).getMappedResults()) {
                    commentCountsByPostId.put(doc.getString("_id"), ((Number) doc.get("count")).longValue());
                }
            }

            for (Note note : allNotes) {
                ForumPost post = new ForumPost();
                post.setAuthor(admin);
                post.setCreatedAt(note.getUploadDate() != null ? note.getUploadDate() : java.time.LocalDateTime.now());
                post.setLikesCount(note.getLikesCount() != null ? note.getLikesCount() : 0);
                post.setLikedBy(note.getLikedBy());
                post.setCommentsCount(commentCountsByPostId.getOrDefault("note-" + note.getId(), 0L).intValue());

                String category = note.getCategory() != null ? note.getCategory() : "Document";
                String noteTitle = note.getTitle() != null ? note.getTitle() : "Untitled";
                String module   = note.getModuleName() != null ? " — " + note.getModuleName() : "";
                String instStr  = (note.getInstitution() != null && note.getInstitution().getShortName() != null) 
                                  ? note.getInstitution().getShortName() + " Institute" : "SJUIT INSTITUTE";
                String program  = note.getProgramType() != null ? note.getProgramType() : "";
                String level    = note.getLevelNo() != null ? "Level " + note.getLevelNo() : "";
                String sem      = note.getSemesterNo() != null ? "Sem " + note.getSemesterNo() : "";
                String year     = note.getAcademicYear() != null ? " (" + note.getAcademicYear() + ")" : "";

                post.setTitle("📖 New " + category + " Uploaded!");
                post.setInstitutionPlaceholder(instStr);
                
                String content  = noteTitle + module + "\n"
                        + program + " · " + level + " · " + sem + year + "\n"
                        + "⬇️ Download it from the Notes section.";

                post.setContent(content);
                post.setId("note-" + note.getId());
                post.setNoteId(note.getId()); // for forum Read/Download buttons
                post.setAdminPost(true);
                post.setAuthorRole("ADMIN"); // notes always attributed to admin brand
                notePosts.add(post);
            }
        }

        // ── 3. Fetch real forum posts, then resolve all authors in a single batch query
        //      instead of one lookup per post (avoids an N+1 query on the feed) ──
        List<ForumPost> realPosts = forumPostRepository.findTop50ByOrderByCreatedAtDesc();
        List<String> authorIds = realPosts.stream()
                .map(ForumPost::getAuthorId)
                .filter(id -> id != null)
                .distinct()
                .collect(Collectors.toList());
        Map<String, User> authorsById = authorIds.isEmpty()
                ? Collections.emptyMap()
                : userRepository.findAllById(authorIds).stream()
                        .collect(Collectors.toMap(User::getId, u -> u));
        realPosts.forEach(post -> {
            User author = authorsById.get(post.getAuthorId());
            post.setAuthor(author);
            String role = resolveRole(author);
            post.setAuthorRole(role);
            if (isAuthority(role)) {
                post.setAdminPost(true);
                if (adminUser != null) post.setAuthor(adminUser);
            }
        });

        // ── 4. Combine all posts ──
        List<ForumPost> allPosts = new ArrayList<>();
        allPosts.addAll(realPosts);
        allPosts.addAll(notePosts);

        if (allPosts.isEmpty()) return new ArrayList<>();

        // ── 5. New Feed Algorithm: Newest at top, rest randomized ──
        // Sort all posts by date (newest first)
        allPosts.sort((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()));

        List<ForumPost> feed = new ArrayList<>();
        
        // Take the top 10 newest posts (or less if not enough)
        int newestLimit = Math.min(10, allPosts.size());
        List<ForumPost> newestPosts = new ArrayList<>(allPosts.subList(0, newestLimit));
        feed.addAll(newestPosts);

        // Take the rest of the older posts and shuffle them randomly (capped, so the
        // feed doesn't keep growing/reshuffling every request as the forum accumulates posts)
        if (allPosts.size() > newestLimit) {
            int olderLimit = Math.min(40, allPosts.size() - newestLimit);
            List<ForumPost> olderPosts = new ArrayList<>(allPosts.subList(newestLimit, newestLimit + olderLimit));
            Collections.shuffle(olderPosts);
            feed.addAll(olderPosts);
        }

        return feed;
    }

    /** Single-post lookup for the permalink page — mirrors how each post is
     * assembled inside getRandomizedFeed(), just for one id instead of the
     * whole feed. Returns null if the post/note doesn't exist.
     * Cached briefly (see CacheConfig) — reopening the same post repeatedly
     * is otherwise a full re-fetch every time; evicted the moment that post's
     * like/comment state actually changes. */
    @Cacheable(value = "postDetail", key = "#id")
    public ForumPost getPostById(String id) {
        if (id != null && id.startsWith("note-")) {
            String noteId = id.substring("note-".length());
            Note note = noteRepository.findById(noteId).orElse(null);
            if (note == null) return null;

            User adminUser = userRepository.findByEmail("admin@school.com").orElse(null);
            if (adminUser == null) {
                adminUser = userRepository.findByRole(Role.SUPER_ADMIN).stream().findFirst().orElse(null);
            }
            if (adminUser == null) {
                adminUser = userRepository.findByRole(Role.ADMIN).stream().findFirst().orElse(null);
            }

            ForumPost post = new ForumPost();
            post.setAuthor(adminUser);
            post.setCreatedAt(note.getUploadDate() != null ? note.getUploadDate() : java.time.LocalDateTime.now());
            post.setLikesCount(note.getLikesCount() != null ? note.getLikesCount() : 0);
            post.setLikedBy(note.getLikedBy());
            post.setCommentsCount((int) forumCommentRepository.countByPostId(id));

            String category = note.getCategory() != null ? note.getCategory() : "Document";
            String noteTitle = note.getTitle() != null ? note.getTitle() : "Untitled";
            String module   = note.getModuleName() != null ? " — " + note.getModuleName() : "";
            String instStr  = (note.getInstitution() != null && note.getInstitution().getShortName() != null)
                              ? note.getInstitution().getShortName() + " Institute" : "SJUIT INSTITUTE";
            String program  = note.getProgramType() != null ? note.getProgramType() : "";
            String level    = note.getLevelNo() != null ? "Level " + note.getLevelNo() : "";
            String sem      = note.getSemesterNo() != null ? "Sem " + note.getSemesterNo() : "";
            String year     = note.getAcademicYear() != null ? " (" + note.getAcademicYear() + ")" : "";

            post.setTitle("📖 New " + category + " Uploaded!");
            post.setInstitutionPlaceholder(instStr);
            post.setContent(noteTitle + module + "\n" + program + " · " + level + " · " + sem + year
                    + "\n⬇️ Download it from the Notes section.");
            post.setId(id);
            post.setNoteId(note.getId());
            post.setAdminPost(true);
            post.setAuthorRole("ADMIN");
            return post;
        }

        ForumPost post = forumPostRepository.findById(id).orElse(null);
        if (post == null) return null;
        User author = userRepository.findById(post.getAuthorId()).orElse(null);
        post.setAuthor(author);
        String role = resolveRole(author);
        post.setAuthorRole(role);
        if (isAuthority(role)) {
            post.setAdminPost(true);
            User sysAdmin = getSystemAdminUser();
            if (sysAdmin != null) post.setAuthor(sysAdmin);
        }
        return post;
    }

    /** Called right after a like/comment changes a specific post, so the
     * person who caused the change (and anyone else) never sees stale data
     * from the postDetail cache while it's still within its TTL. */
    @CacheEvict(value = "postDetail", key = "#id")
    public void evictPostDetail(String id) {}

    public List<ForumPost> getTrendingPosts() {
        List<ForumPost> recentPosts = forumPostRepository.findTop50ByOrderByCreatedAtDesc();
        if (recentPosts.isEmpty()) return new ArrayList<>();

        List<ForumPost> trending = new ArrayList<>();
        List<ForumPost> available = new ArrayList<>(recentPosts);

        // 1. Highest Likes
        ForumPost topLikes = available.stream()
            .max((a, b) -> Integer.compare(a.getLikesCount(), b.getLikesCount()))
            .orElse(null);
        if (topLikes != null && topLikes.getLikesCount() > 0) {
            trending.add(topLikes);
            available.remove(topLikes);
        }

        // 2. Highest Comments
        ForumPost topComments = available.stream()
            .max((a, b) -> Integer.compare(a.getCommentsCount(), b.getCommentsCount()))
            .orElse(null);
        if (topComments != null && topComments.getCommentsCount() > 0) {
            trending.add(topComments);
            available.remove(topComments);
        }

        // 3. Highest Views
        ForumPost topViews = available.stream()
            .max((a, b) -> Integer.compare(a.getViewsCount(), b.getViewsCount()))
            .orElse(null);
        if (topViews != null && topViews.getViewsCount() > 0) {
            trending.add(topViews);
            available.remove(topViews);
        }

        // 4. Remaining with engagement
        List<ForumPost> remaining = available.stream()
            .filter(p -> p.getLikesCount() > 0 || p.getCommentsCount() > 0 || p.getViewsCount() > 0)
            .sorted((a, b) -> {
                int scoreA = a.getLikesCount() + a.getCommentsCount() + a.getViewsCount();
                int scoreB = b.getLikesCount() + b.getCommentsCount() + b.getViewsCount();
                return Integer.compare(scoreB, scoreA);
            })
            .collect(Collectors.toList());
        
        trending.addAll(remaining);

        // Limit to top 10 max
        if (trending.size() > 10) {
            trending = trending.subList(0, 10);
        }

        if (trending.isEmpty()) return trending;

        // Populate authors
        List<String> authorIds = trending.stream()
                .map(ForumPost::getAuthorId)
                .filter(id -> id != null)
                .distinct()
                .collect(Collectors.toList());
        Map<String, User> authorsById = authorIds.isEmpty()
                ? Collections.emptyMap()
                : userRepository.findAllById(authorIds).stream()
                        .collect(Collectors.toMap(User::getId, u -> u));
        trending.forEach(post -> {
            User author = authorsById.get(post.getAuthorId());
            post.setAuthor(author);
            String role = resolveRole(author);
            post.setAuthorRole(role);
            if (isAuthority(role)) {
                post.setAdminPost(true);
                User sysAdmin = getSystemAdminUser();
                if (sysAdmin != null) post.setAuthor(sysAdmin);
            }
        });
        return trending;
    }
}
