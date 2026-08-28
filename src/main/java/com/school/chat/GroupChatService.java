package com.school.chat;

import com.school.chat.ChatMessage;
import com.school.chat.GroupChat;
import com.school.chat.GroupChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
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

    @Autowired
    private CacheManager cacheManager;

    /** Same Caffeine-backed CacheManager already used elsewhere in the app
     * (see CacheConfig) — a group is re-read constantly (every open, every
     * SSE connect, every send) but only changes on a write, so caching the
     * whole document by id turns most of those reads into an in-memory hit
     * instead of a MongoDB round trip. Every write path below updates the
     * cache immediately after saving, so readers never see stale data. */
    private static final String CACHE_NAME = "groupChats";

    private Cache cache() {
        return cacheManager.getCache(CACHE_NAME);
    }

    private GroupChat save(GroupChat group) {
        GroupChat saved = groupChatRepository.save(group);
        Cache cache = cache();
        if (cache != null) cache.put(saved.getId(), saved);
        return saved;
    }

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

        return save(group);
    }

    public GroupChat sendMessage(String groupId, String senderId, String senderName, String senderProfilePicture, String messageText) {
        GroupChat group = getGroupById(groupId);
        if (group == null) return null;

        ChatMessage msg = new ChatMessage(senderId, senderName, senderProfilePicture, messageText, null);
        group.getMessages().add(msg);
        group.setLastMessageAt(LocalDateTime.now());

        return save(group);
    }

    /** Any member can set the group photo — no "leader only" restriction, per product decision. */
    public GroupChat updateGroupPicture(String groupId, String pictureUrl, String updaterName) {
        GroupChat group = getGroupById(groupId);
        if (group == null) return null;

        group.setGroupPicture(pictureUrl);
        ChatMessage notice = new ChatMessage(SYSTEM_SENDER_ID, "System", null, updaterName + " changed the group photo", null);
        group.getMessages().add(notice);
        group.setLastMessageAt(LocalDateTime.now());

        return save(group);
    }

    public GroupChat getGroupById(String groupId) {
        Cache cache = cache();
        if (cache != null) {
            GroupChat cached = cache.get(groupId, GroupChat.class);
            if (cached != null) return cached;
        }
        GroupChat group = groupChatRepository.findById(groupId).orElse(null);
        if (group != null && cache != null) cache.put(groupId, group);
        return group;
    }

    /** All groups this user belongs to, most recently active first. */
    public List<GroupChat> getGroupsForUser(String userId) {
        List<GroupChat> groups = groupChatRepository.findByMemberIdsContaining(userId);
        groups.sort(Comparator.comparing(GroupChat::getLastMessageAt,
                Comparator.nullsLast(Comparator.reverseOrder())));
        return groups;
    }
}
