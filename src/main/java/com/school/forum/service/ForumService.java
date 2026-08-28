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
            List<Note> allNotes = noteRepository.findAllByOrderByIdDesc();
            for (Note note : allNotes) {
                ForumPost post = new ForumPost();
                post.setAuthor(admin);
                post.setCreatedAt(note.getUploadDate() != null ? note.getUploadDate() : java.time.LocalDateTime.now());
                post.setLikesCount(note.getDownloadCount() != null ? note.getDownloadCount() : 0);
                post.setCommentsCount(note.getViewCount() != null ? note.getViewCount() : 0);

                String category = note.getCategory() != null ? note.getCategory() : "Document";
                String title    = note.getTitle() != null ? note.getTitle() : "Untitled";
                String module   = note.getModuleName() != null ? " — " + note.getModuleName() : "";
                String program  = note.getProgramType() != null ? note.getProgramType() : "";
                String level    = note.getLevelNo() != null ? "Level " + note.getLevelNo() : "";
                String sem      = note.getSemesterNo() != null ? "Sem " + note.getSemesterNo() : "";
                String year     = note.getAcademicYear() != null ? " (" + note.getAcademicYear() + ")" : "";

                String content  = "📚 " + category + " Mpya Imepakiwa!\n\n"
                        + title + module + "\n"
                        + program + " · " + level + " · " + sem + year + "\n\n"
                        + "⬇️ Pakua kutoka kwenye sehemu ya Notes.";

                post.setContent(content);
                post.setId("note-" + note.getId());
                post.setAdminPost(true);
                post.setAuthorRole("ADMIN"); // notes always attributed to admin brand
                notePosts.add(post);
            }
        }

        // ── 3. Fetch real forum posts and tag their roles ──
        List<ForumPost> realPosts = forumPostRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
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

        // ── 5. Tier separation ──
        // Tier 1: ADMIN + SUPER_ADMIN (pinned at top, newest first)
        List<ForumPost> tier1 = allPosts.stream()
                .filter(p -> isAuthority(p.getAuthorRole()))
                .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
                .collect(Collectors.toList());

        // Tier 2: LECTURE (after admins)
        List<ForumPost> tier2 = allPosts.stream()
                .filter(p -> "LECTURE".equals(p.getAuthorRole()))
                .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
                .collect(Collectors.toList());

        // Tier 3: CLASS_REPRESENTATIVE (after lecturers)
        List<ForumPost> tier3 = allPosts.stream()
                .filter(p -> "CLASS_REPRESENTATIVE".equals(p.getAuthorRole()))
                .sorted((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()))
                .collect(Collectors.toList());

        // Tier 4: Students — randomize newest 5, then shuffle older
        List<ForumPost> studentPosts = allPosts.stream()
                .filter(p -> "STUDENT".equals(p.getAuthorRole()))
                .collect(Collectors.toList());

        int newestLimit = Math.min(5, studentPosts.size());
        List<ForumPost> newestStudents = new ArrayList<>(studentPosts.subList(0, newestLimit));
        Collections.shuffle(newestStudents);

        List<ForumPost> olderStudents = new ArrayList<>();
        if (studentPosts.size() > newestLimit) {
            olderStudents = new ArrayList<>(studentPosts.subList(newestLimit, studentPosts.size()));
            Collections.shuffle(olderStudents);
        }

        // ── 6. Assemble final feed ──
        List<ForumPost> feed = new ArrayList<>();
        feed.addAll(tier1);
        feed.addAll(tier2);
        feed.addAll(tier3);
        feed.addAll(newestStudents);
        int olderLimit = Math.min(10, olderStudents.size());
        feed.addAll(olderStudents.subList(0, olderLimit));

        return feed;
    }
}
