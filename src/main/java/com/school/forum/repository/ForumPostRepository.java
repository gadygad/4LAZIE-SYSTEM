package com.school.forum.repository;

import com.school.forum.model.ForumPost;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ForumPostRepository extends MongoRepository<ForumPost, String> {
    // Standard CRUD is provided by MongoRepository
    // Add any specific queries if needed in the future
    List<ForumPost> findTop50ByOrderByCreatedAtDesc();
    // Wider pool backing infinite-scroll pagination — findTop50 was only
    // ever enough for the first page, so "load more" had nothing beyond
    // it to actually page through.
    List<ForumPost> findTop300ByOrderByCreatedAtDesc();
    List<ForumPost> findTop3ByOrderByLikesCountDesc();
}
