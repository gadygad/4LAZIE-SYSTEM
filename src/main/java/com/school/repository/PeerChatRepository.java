package com.school.repository;

import com.school.model.PeerChat;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PeerChatRepository extends MongoRepository<PeerChat, String> {

    Optional<PeerChat> findByUser1IdAndUser2Id(String user1Id, String user2Id);

    @Query("{ '$or': [ { 'user1Id': ?0 }, { 'user2Id': ?0 } ] }")
    List<PeerChat> findAllForUser(String userId);
}
