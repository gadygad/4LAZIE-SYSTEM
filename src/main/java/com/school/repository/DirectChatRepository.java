package com.school.repository;

import com.school.model.DirectChat;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface DirectChatRepository extends MongoRepository<DirectChat, String> {

    // Find existing chat between admin and student (any admin)
    Optional<DirectChat> findByStudentId(String studentId);

    // Find chat by admin+student pair
    Optional<DirectChat> findByAdminIdAndStudentId(String adminId, String studentId);

    // All chats for a student (their inbox)
    List<DirectChat> findByStudentIdOrderByLastMessageAtDesc(String studentId);

    // All chats for an admin
    List<DirectChat> findByAdminIdOrderByLastMessageAtDesc(String adminId);

    // Unread count for admin
    long countByAdminIdAndHasUnreadForAdminTrue(String adminId);

    // Unread count for student
    long countByStudentIdAndHasUnreadForStudentTrue(String studentId);

    // All chats system-wide sorted by last activity (admin inbox)
    List<DirectChat> findAllByOrderByLastMessageAtDesc();

    // Total unread chats for admin (any admin)
    long countByHasUnreadForAdminTrue();
}
