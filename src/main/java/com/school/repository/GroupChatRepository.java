package com.school.repository;

import com.school.model.GroupChat;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface GroupChatRepository extends MongoRepository<GroupChat, String> {
    List<GroupChat> findByMemberIdsContaining(String userId);
}
