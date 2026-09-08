package com.school.chat;

import com.school.chat.PeerChat;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PeerChatRepository extends MongoRepository<PeerChat, String> {

    Optional<PeerChat> findByUser1IdAndUser2Id(String user1Id, String user2Id);

    @Query("{ '$or': [ { 'user1Id': ?0 }, { 'user2Id': ?0 } ] }")
    List<PeerChat> findAllForUser(String userId);

    // Same, but lets the caller cap it at the query level via Pageable (e.g.
    // PageRequest.of(0, 5, Sort.by(DESC, "lastMessageAt"))) — for the navbar
    // preview dropdown, shown on every page, which only needs the 5 most
    // recent instead of a user's entire peer-chat history.
    @Query("{ '$or': [ { 'user1Id': ?0 }, { 'user2Id': ?0 } ] }")
    List<PeerChat> findForUser(String userId, org.springframework.data.domain.Pageable pageable);

    @Query(value = "{ '$or': [ { 'user1Id': ?0, 'hasUnreadForUser1': true }, { 'user2Id': ?0, 'hasUnreadForUser2': true } ] }", count = true)
    long countUnreadForUser(String userId);
}
