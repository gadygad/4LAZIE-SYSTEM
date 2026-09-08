package com.school.chat;

import com.school.chat.DirectChat;
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

    // Same as above, capped at the query level — the navbar preview dropdown
    // (shown on every page) only ever displays the 5 most recent, so there's
    // no reason to pull a student's entire chat history (each with its full
    // embedded message array) just to render that.
    List<DirectChat> findTop5ByStudentIdOrderByLastMessageAtDesc(String studentId);

    // All chats for an admin
    List<DirectChat> findByAdminIdOrderByLastMessageAtDesc(String adminId);

    // Unread count for admin
    long countByAdminIdAndHasUnreadForAdminTrue(String adminId);

    // Unread count for student
    long countByStudentIdAndHasUnreadForStudentTrue(String studentId);

    // All chats system-wide sorted by last activity (admin inbox)
    List<DirectChat> findAllByOrderByLastMessageAtDesc();

    // Same, capped — for the navbar preview dropdown only (see
    // findTop5ByStudentIdOrderByLastMessageAtDesc above for why).
    List<DirectChat> findTop5ByOrderByLastMessageAtDesc();

    // Total unread chats for admin (any admin)
    long countByHasUnreadForAdminTrue();
}
