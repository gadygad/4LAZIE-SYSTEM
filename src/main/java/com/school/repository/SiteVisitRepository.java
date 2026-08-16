package com.school.repository;

import com.school.model.SiteVisit;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SiteVisitRepository extends MongoRepository<SiteVisit, String> {

    @Aggregation(pipeline = {
            "{ '$group': { '_id': '$sessionId' } }",
            "{ '$count': 'totalUniqueVisitors' }"
    })
    Long countTotalUniqueVisitors();

    @Aggregation(pipeline = {
            "{ '$match': { 'registeredUser': false } }",
            "{ '$group': { '_id': '$sessionId' } }",
            "{ '$count': 'guestVisitors' }"
    })
    Long countGuestVisitors();

    @Aggregation(pipeline = {
            "{ '$match': { 'registeredUser': true } }",
            "{ '$group': { '_id': '$sessionId' } }",
            "{ '$count': 'registeredVisitors' }"
    })
    Long countRegisteredVisitors();

    @Aggregation(pipeline = {
            "{ '$match': { 'deviceType': 'Mobile' } }",
            "{ '$group': { '_id': '$sessionId' } }",
            "{ '$count': 'mobileVisitors' }"
    })
    Long countMobileVisitors();

    @Aggregation(pipeline = {
            "{ '$match': { 'deviceType': 'Desktop' } }",
            "{ '$group': { '_id': '$sessionId' } }",
            "{ '$count': 'desktopVisitors' }"
    })
    Long countDesktopVisitors();

    @Aggregation(pipeline = {
            "{ '$match': { 'registeredUser': false, 'visitedUrl': { '$regex': '^/view/', '$options': 'i' } } }",
            "{ '$count': 'guestViews' }"
    })
    Long countGuestViews();

    @Aggregation(pipeline = {
            "{ '$match': { 'registeredUser': false, 'visitedUrl': { '$regex': '^/download/', '$options': 'i' } } }",
            "{ '$count': 'guestDownloads' }"
    })
    Long countGuestDownloads();

    List<SiteVisit> findTop20ByTimestampAfterOrderByTimestampDesc(java.time.LocalDateTime timestamp);

    List<SiteVisit> findTop20ByVisitedUrlContainingIgnoreCaseAndTimestampAfterOrderByTimestampDesc(String urlPart, java.time.LocalDateTime timestamp);

    List<SiteVisit> findTop20ByUserNameContainingIgnoreCaseAndTimestampAfterOrderByTimestampDesc(String userName, java.time.LocalDateTime timestamp);
}
