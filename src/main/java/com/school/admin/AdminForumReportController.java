package com.school.admin;

import com.school.auth.AuthUtil;
import com.school.auth.User;
import com.school.auth.UserRepository;
import com.school.forum.model.ForumComment;
import com.school.forum.model.ForumPost;
import com.school.forum.model.ForumReport;
import com.school.forum.repository.ForumCommentRepository;
import com.school.forum.repository.ForumPostRepository;
import com.school.forum.repository.ForumReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

// This is deliberately its own controller rather than more methods bolted
// onto the already-huge AdminController: forum moderation is a distinct
// permission ("canModerateForum") that a SUPER_ADMIN can grant to specific
// ADMIN accounts without those admins getting the rest of AdminController's
// blanket admin access — same pattern the codebase already uses for
// "canVerifyUsers".
@Controller
@RequestMapping("/admin/forum")
public class AdminForumReportController {

    @Autowired private AuthUtil authUtil;
    @Autowired private ForumReportRepository forumReportRepository;
    @Autowired private ForumPostRepository forumPostRepository;
    @Autowired private ForumCommentRepository forumCommentRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private CacheManager cacheManager;
    @Autowired private AdminService adminService;
    @Autowired private com.school.core.ActivityLogRepository activityLogRepository;

    private boolean canModerate(User user) {
        return adminService.hasPermission(user, "canModerateForum");
    }

    private void logAdminAction(User admin, String action, String details) {
        try {
            activityLogRepository.save(new com.school.core.ActivityLog(
                admin.getId(), admin.getName(), admin.getRole().name(), action, details, null, "Admin Portal"
            ));
        } catch (Exception ignored) {
        }
    }

    private void evictPostCaches(String id) {
        Cache postDetail = cacheManager.getCache("postDetail");
        if (postDetail != null) postDetail.evict(id);
        Cache postComments = cacheManager.getCache("postComments");
        if (postComments != null) postComments.clear();
    }

    @GetMapping("/reports")
    public String reports(Model model) {
        User user = authUtil.getLoggedInUser();
        if (!canModerate(user)) {
            return "redirect:/admin/dashboard";
        }
        model.addAttribute("user", user);

        List<ForumReport> pending = forumReportRepository.findByStatusOrderByCreatedAtDesc("PENDING");
        List<ForumReport> resolved = forumReportRepository.findAllByOrderByCreatedAtDesc().stream()
                .filter(r -> !"PENDING".equals(r.getStatus()))
                .limit(30)
                .collect(Collectors.toList());

        model.addAttribute("pendingReports", enrich(pending));
        model.addAttribute("resolvedReports", enrich(resolved));
        return "admin/admin_forum_reports";
    }

    // Bundles each report with the actual content (if it still exists — it
    // may have already been removed by a direct post/comment delete outside
    // this queue) and who reported/reviewed it, so the template stays dumb.
    private List<Map<String, Object>> enrich(List<ForumReport> reportList) {
        List<String> postIds = reportList.stream()
                .filter(r -> "POST".equals(r.getContentType()))
                .map(ForumReport::getContentId)
                .distinct().collect(Collectors.toList());
        List<String> commentIds = reportList.stream()
                .filter(r -> "COMMENT".equals(r.getContentType()))
                .map(ForumReport::getContentId)
                .distinct().collect(Collectors.toList());
        Map<String, ForumPost> posts = postIds.isEmpty() ? Map.of()
                : forumPostRepository.findAllById(postIds).stream().collect(Collectors.toMap(ForumPost::getId, p -> p));
        Map<String, ForumComment> comments = commentIds.isEmpty() ? Map.of()
                : forumCommentRepository.findAllById(commentIds).stream().collect(Collectors.toMap(ForumComment::getId, c -> c));

        List<String> userIds = reportList.stream()
                .flatMap(r -> java.util.stream.Stream.of(r.getReporterId(), r.getReviewedByUserId()))
                .filter(java.util.Objects::nonNull).distinct().collect(Collectors.toList());
        Map<String, User> users = userIds.isEmpty() ? Map.of()
                : userRepository.findAllById(userIds).stream().collect(Collectors.toMap(User::getId, u -> u));

        return reportList.stream().map(r -> {
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("report", r);
            boolean isPost = "POST".equals(r.getContentType());
            m.put("isPost", isPost);
            String contentText = isPost
                    ? (posts.containsKey(r.getContentId()) ? posts.get(r.getContentId()).getContent() : null)
                    : (comments.containsKey(r.getContentId()) ? comments.get(r.getContentId()).getContent() : null);
            m.put("contentExists", contentText != null);
            m.put("contentText", contentText);
            User reporter = users.get(r.getReporterId());
            m.put("reporterName", reporter != null ? reporter.getName() : "Unknown");
            User reviewer = users.get(r.getReviewedByUserId());
            m.put("reviewerName", reviewer != null ? reviewer.getName() : null);
            return m;
        }).collect(Collectors.toList());
    }

    @PostMapping("/reports/{id}/dismiss")
    public String dismiss(@PathVariable String id, RedirectAttributes redirectAttributes) {
        User user = authUtil.getLoggedInUser();
        if (!canModerate(user)) {
            return "redirect:/admin/dashboard";
        }
        ForumReport report = forumReportRepository.findById(id).orElse(null);
        if (report != null && "PENDING".equals(report.getStatus())) {
            report.setStatus("DISMISSED");
            report.setReviewedByUserId(user.getId());
            report.setReviewedAt(LocalDateTime.now());
            forumReportRepository.save(report);
            logAdminAction(user, "DISMISS_REPORT", "Dismissed a " + report.getContentType().toLowerCase() + " report (reason: " + report.getReason() + ")");
            redirectAttributes.addFlashAttribute("success", "Report dismissed.");
        }
        return "redirect:/admin/forum/reports";
    }

    @PostMapping("/reports/{id}/remove")
    public String remove(@PathVariable String id, RedirectAttributes redirectAttributes) {
        User user = authUtil.getLoggedInUser();
        if (!canModerate(user)) {
            return "redirect:/admin/dashboard";
        }
        ForumReport report = forumReportRepository.findById(id).orElse(null);
        if (report != null && "PENDING".equals(report.getStatus())) {
            if ("POST".equals(report.getContentType())) {
                forumCommentRepository.deleteAll(forumCommentRepository.findByPostIdOrderByCreatedAtAsc(report.getContentId()));
                forumPostRepository.deleteById(report.getContentId());
            } else {
                forumCommentRepository.deleteById(report.getContentId());
            }
            evictPostCaches(report.getPostId());

            // Anyone else who separately reported this exact same content
            // gets auto-resolved too — it's already gone, so leaving their
            // report sitting in the pending queue would just be noise.
            List<ForumReport> siblings = forumReportRepository.findByStatusOrderByCreatedAtDesc("PENDING").stream()
                    .filter(r -> r.getContentId().equals(report.getContentId()))
                    .collect(Collectors.toList());
            for (ForumReport sibling : siblings) {
                sibling.setStatus("REMOVED");
                sibling.setReviewedByUserId(user.getId());
                sibling.setReviewedAt(LocalDateTime.now());
            }
            forumReportRepository.saveAll(siblings);
            logAdminAction(user, "REMOVE_CONTENT", "Removed a reported " + report.getContentType().toLowerCase() + " (reason: " + report.getReason() + ")");
            redirectAttributes.addFlashAttribute("success", "Content removed.");
        }
        return "redirect:/admin/forum/reports";
    }
}
