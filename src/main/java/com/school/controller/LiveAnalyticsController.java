package com.school.controller;

import com.school.model.SiteVisit;
import com.school.repository.SiteVisitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/admin/api/live")
public class LiveAnalyticsController {

    @Autowired
    private SiteVisitRepository siteVisitRepository;

    @GetMapping("/users")
    public List<SiteVisit> getLiveUsers(@org.springframework.web.bind.annotation.RequestParam(required = false) String search) {
        // Last 15 minutes
        LocalDateTime time = LocalDateTime.now().minusMinutes(15);
        if (search != null && !search.trim().isEmpty()) {
            return siteVisitRepository.findTop20ByUserNameContainingIgnoreCaseAndTimestampAfterOrderByTimestampDesc(search.trim(), time);
        }
        return siteVisitRepository.findTop20ByTimestampAfterOrderByTimestampDesc(time);
    }

    @GetMapping("/notes")
    public List<SiteVisit> getLiveNotesViews() {
        LocalDateTime time = LocalDateTime.now().minusMinutes(15);
        return siteVisitRepository.findTop20ByVisitedUrlContainingIgnoreCaseAndTimestampAfterOrderByTimestampDesc("/view/", time);
    }

    @GetMapping("/downloads")
    public List<SiteVisit> getLiveDownloads() {
        LocalDateTime time = LocalDateTime.now().minusMinutes(15);
        return siteVisitRepository.findTop20ByVisitedUrlContainingIgnoreCaseAndTimestampAfterOrderByTimestampDesc("/download/", time);
    }

    @GetMapping("/visitors")
    public List<SiteVisit> getLiveVisitors() {
        LocalDateTime time = LocalDateTime.now().minusMinutes(15);
        // Using the same query as users for unique visitors stream
        return siteVisitRepository.findTop20ByTimestampAfterOrderByTimestampDesc(time);
    }
}
