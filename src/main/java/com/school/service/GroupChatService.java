package com.school.service;

import com.school.model.ChatMessage;
import com.school.model.GroupChat;
import com.school.repository.GroupChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Service
public class GroupChatService {

    @Autowired
    private GroupChatRepository groupChatRepository;

    public GroupChat createGroup(String name, String creatorId, Set<String> memberIds) {
        Set<String> members = new LinkedHashSet<>(memberIds);
        members.add(creatorId);

        GroupChat group = new GroupChat();
        group.setName(name);
        group.setCreatedBy(creatorId);
        group.setMemberIds(members);
        group.setCreatedAt(LocalDateTime.now());

        return groupChatRepository.save(group);
    }

    public GroupChat sendMessage(String groupId, String senderId, String senderName, String senderProfilePicture, String messageText) {
        GroupChat group = groupChatRepository.findById(groupId).orElse(null);
        if (group == null) return null;

        ChatMessage msg = new ChatMessage(senderId, senderName, senderProfilePicture, messageText, null);
        group.getMessages().add(msg);
        group.setLastMessageAt(LocalDateTime.now());

        return groupChatRepository.save(group);
    }

    public GroupChat getGroupById(String groupId) {
        return groupChatRepository.findById(groupId).orElse(null);
    }

    /** All groups this user belongs to, most recently active first. */
    public List<GroupChat> getGroupsForUser(String userId) {
        List<GroupChat> groups = groupChatRepository.findByMemberIdsContaining(userId);
        groups.sort(Comparator.comparing(GroupChat::getLastMessageAt,
                Comparator.nullsLast(Comparator.reverseOrder())));
        return groups;
    }
}
