package com.school.forum.repository;

import com.school.forum.model.ForumComment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ForumCommentRepository extends MongoRepository<ForumComment, String> {
    List<ForumComment> findByPostIdOrderByCreatedAtAsc(String postId);
    List<ForumComment> findTop3ByPostIdOrderByCreatedAtDesc(String postId);
    long countByPostId(String postId);
    // One query for a whole feed page's worth of posts instead of one
    // findTop3... per post — see ForumService.populateRecentComments.
    // Globally sorted by createdAt desc, which means each post's own
    // comments stay in that same relative (desc) order once grouped by
    // postId in Java, so grabbing the first 3 seen per post is still
    // correct.
    List<ForumComment> findByPostIdInOrderByCreatedAtDesc(List<String> postIds);
}
