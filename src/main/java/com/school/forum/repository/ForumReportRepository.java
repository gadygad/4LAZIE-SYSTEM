package com.school.forum.repository;

import com.school.forum.model.ForumReport;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ForumReportRepository extends MongoRepository<ForumReport, String> {

    List<ForumReport> findByStatusOrderByCreatedAtDesc(String status);

    List<ForumReport> findAllByOrderByCreatedAtDesc();

    // One open report per person per piece of content — resubmitting the
    // same content again while a report is still pending is a no-op, not a
    // second row in the queue.
    boolean existsByContentIdAndReporterIdAndStatus(String contentId, String reporterId, String status);

    long countByStatus(String status);

    List<ForumReport> findByStatusNot(String status);
}
