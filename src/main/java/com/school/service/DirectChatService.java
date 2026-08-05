package com.school.service;

import com.school.model.ChatMessage;
import com.school.model.DirectChat;
import com.school.model.User;
import com.school.repository.DirectChatRepository;
import com.school.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class DirectChatService {

    @Autowired
    private DirectChatRepository directChatRepository;

    @Autowired
    private UserRepository userRepository;

    /**
     * Admin anaanzisha chat na mwanafunzi.
     * Kama chat tayari ipo, inairejesha ile ile (no duplicate).
     */
    public DirectChat startOrGetChat(String adminId, String studentId) {
        // Check if a chat already exists between this admin and student
        Optional<DirectChat> existing = directChatRepository.findByAdminIdAndStudentId(adminId, studentId);
        if (existing.isPresent()) {
            return existing.get();
        }

        // Check if ANY admin has already chatted with this student - reuse that thread
        Optional<DirectChat> anyExisting = directChatRepository.findByStudentId(studentId);
        if (anyExisting.isPresent()) {
            return anyExisting.get();
        }

        // Create new chat
        User admin   = userRepository.findById(adminId).orElse(null);
        User student = userRepository.findById(studentId).orElse(null);

        DirectChat chat = new DirectChat();
        chat.setAdminId(adminId);
        chat.setStudentId(studentId);
        chat.setStudentName(student != null ? student.getName() : "Student");
        chat.setAdminName(admin != null ? admin.getName() : "4LAZIE Admin");

        return directChatRepository.save(chat);
    }

    /**
     * Tuma message — inaweza kuwa admin au student.
     * senderId: "ADMIN" au user's ID
     */
    public DirectChat sendMessage(String chatId, String senderId, String senderName, String messageText) {
        DirectChat chat = directChatRepository.findById(chatId).orElse(null);
        if (chat == null) return null;

        ChatMessage msg = new ChatMessage(senderId, senderName, messageText, null);
        chat.getMessages().add(msg);
        chat.setLastMessageAt(LocalDateTime.now());

        boolean senderIsAdmin = "ADMIN".equals(senderId) ||
                (userRepository.findById(senderId)
                        .map(u -> u.getRole() != null &&
                                (u.getRole().name().equals("ADMIN") || u.getRole().name().equals("SUPER_ADMIN")))
                        .orElse(false));

        if (senderIsAdmin) {
            // Admin ametuma — student ana unread
            chat.setHasUnreadForStudent(true);
        } else {
            // Student ametuma — admin ana unread
            chat.setHasUnreadForAdmin(true);
        }

        return directChatRepository.save(chat);
    }

    /**
     * Admin anafungua chat — mark as read for admin
     */
    public void markReadForAdmin(String chatId) {
        directChatRepository.findById(chatId).ifPresent(chat -> {
            chat.setHasUnreadForAdmin(false);
            directChatRepository.save(chat);
        });
    }

    /**
     * Student anafungua chat — mark as read for student
     */
    public void markReadForStudent(String chatId) {
        directChatRepository.findById(chatId).ifPresent(chat -> {
            chat.setHasUnreadForStudent(false);
            directChatRepository.save(chat);
        });
    }

    public DirectChat getChatById(String chatId) {
        return directChatRepository.findById(chatId).orElse(null);
    }

    public List<DirectChat> getStudentInbox(String studentId) {
        return directChatRepository.findByStudentIdOrderByLastMessageAtDesc(studentId);
    }

    public List<DirectChat> getAdminChats(String adminId) {
        return directChatRepository.findByAdminIdOrderByLastMessageAtDesc(adminId);
    }

    public long getUnreadCountForAdmin(String adminId) {
        return directChatRepository.countByAdminIdAndHasUnreadForAdminTrue(adminId);
    }

    public long getUnreadCountForStudent(String studentId) {
        return directChatRepository.countByStudentIdAndHasUnreadForStudentTrue(studentId);
    }
}
