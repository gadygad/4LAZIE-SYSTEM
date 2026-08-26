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

    /** Sender id used for the auto-generated "X created the group / added Y"
     * notices, so the frontend can tell them apart from a real member's
     * message and render them as centered system text instead of a bubble. */
    public static final String SYSTEM_SENDER_ID = "SYSTEM";

    public GroupChat createGroup(String name, String creatorId, String creatorName, Set<String> memberIds, List<String> addedMemberNames) {
        Set<String> members = new LinkedHashSet<>(memberIds);
        members.add(creatorId);

        GroupChat group = new GroupChat();
        group.setName(name);
        group.setCreatedBy(creatorId);
        group.setMemberIds(members);
        group.setCreatedAt(LocalDateTime.now());

        String noticeText = creatorName + " created the group";
        if (addedMemberNames != null && !addedMemberNames.isEmpty()) {
            noticeText += " and added " + String.join(", ", addedMemberNames);
        }
        ChatMessage notice = new ChatMessage(SYSTEM_SENDER_ID, "System", null, noticeText, null);
        group.getMessages().add(notice);
        group.setLastMessageAt(LocalDateTime.now());

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

    /** Any member can set the group photo — no "leader only" restriction, per product decision. */
    public GroupChat updateGroupPicture(String groupId, String pictureUrl, String updaterName) {
        GroupChat group = groupChatRepository.findById(groupId).orElse(null);
        if (group == null) return null;

        group.setGroupPicture(pictureUrl);
        ChatMessage notice = new ChatMessage(SYSTEM_SENDER_ID, "System", null, updaterName + " changed the group photo", null);
        group.getMessages().add(notice);
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
