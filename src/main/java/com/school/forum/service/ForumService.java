package com.school.forum.service;

import com.school.auth.Role;
import com.school.auth.User;
import com.school.auth.UserRepository;
import com.school.forum.model.ForumPost;
import com.school.forum.repository.ForumPostRepository;
import com.school.notes.Note;
import com.school.notes.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ForumService {

    @Autowired private ForumPostRepository forumPostRepository;
    @Autowired private NoteRepository noteRepository;
    @Autowired private UserRepository userRepository;

    // ── Helper: resolve role string from User ──
    private String resolveRole(User user) {
        if (user == null || user.getRole() == null) return "STUDENT";
        return user.getRole().name(); // e.g. "ADMIN", "SUPER_ADMIN", "LECTURE", "CLASS_REPRESENTATIVE", "STUDENT"
    }

    // ── Helper: is this an "authority" role (Admin/SuperAdmin) ──
    private boolean isAuthority(String role) {
        return "ADMIN".equals(role) || "SUPER_ADMIN".equals(role);
    }

    public List<ForumPost> getRandomizedFeed() {

        // ── 1. Find admin user to attribute uploaded notes to ──
        User adminUser = userRepository.findByEmail("admin@school.com").orElse(null);
        if (adminUser == null) {
            adminUser = userRepository.findAll().stream()
                    .filter(u -> u.getRole() == Role.ADMIN || u.getRole() == Role.SUPER_ADMIN)
                    .findFirst().orElse(null);
        }

        // ── 2. Convert all uploaded Notes/Mitihani into ForumPost objects ──
        List<ForumPost> notePosts = new ArrayList<>();
        if (adminUser != null) {
            final User admin = adminUser;
            List<Note> allNotes = noteRepository.findTop50ByOrderByIdDesc();
            for (Note note : allNotes) {
                ForumPost post = new ForumPost();
                post.setAuthor(admin);
                post.setCreatedAt(note.getUploadDate() != null ? note.getUploadDate() : java.time.LocalDateTime.now());
                post.setLikesCount(note.getDownloadCount() != null ? note.getDownloadCount() : 0);
                post.setCommentsCount(note.getViewCount() != null ? note.getViewCount() : 0);

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

        // ── 3. Fetch real forum posts and tag their roles ──
        List<ForumPost> realPosts = forumPostRepository.findTop50ByOrderByCreatedAtDesc();
        realPosts.forEach(post -> {
            String role = resolveRole(post.getAuthor());
            post.setAuthorRole(role);
            if (isAuthority(role)) post.setAdminPost(true);
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

        // Take the rest of the older posts and shuffle them randomly
        if (allPosts.size() > newestLimit) {
            List<ForumPost> olderPosts = new ArrayList<>(allPosts.subList(newestLimit, allPosts.size()));
            Collections.shuffle(olderPosts);
            
            // Optionally limit how many old posts to load at once (e.g., max 20 random old posts)
            int olderLimit = Math.min(20, olderPosts.size());
            feed.addAll(olderPosts.subList(0, olderLimit));
        }

        return feed;
    }
}
