package com.school.service;

import com.school.model.AssignmentRequest;
import com.school.model.ChatMessage;
import com.school.model.User;
import com.school.repository.AssignmentRequestRepository;
import com.school.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AssignmentHelpService {

    @Autowired
    private AssignmentRequestRepository assignmentRequestRepository;

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private PushNotificationService pushNotificationService;
    
    @Autowired
    private NotificationService notificationService;

    @Autowired
    private UserRepository userRepository;

    public AssignmentRequest createRequest(String userId, String subjectName, String questionText, String deadline, MultipartFile file) throws IOException {
        AssignmentRequest request = new AssignmentRequest();
        request.setUserId(userId);
        request.setSubjectName(subjectName);
        request.setQuestionText(questionText);
        request.setDeadline(deadline);

        if (file != null && !file.isEmpty()) {
            String attachmentUrl = fileStorageService.uploadFile(file);
            request.setAttachmentUrl(attachmentUrl);
        }

        return assignmentRequestRepository.save(request);
    }

    public List<AssignmentRequest> getUserRequests(String userId) {
        return assignmentRequestRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public List<AssignmentRequest> getAllRequests() {
        return assignmentRequestRepository.findAllByOrderByCreatedAtDesc();
    }

    public Optional<AssignmentRequest> getRequestById(String id) {
        return assignmentRequestRepository.findById(id);
    }

    public void markAsRead(String id) {
        Optional<AssignmentRequest> requestOpt = assignmentRequestRepository.findById(id);
        if (requestOpt.isPresent()) {
            AssignmentRequest req = requestOpt.get();
            if (!req.isRead()) {
                req.setRead(true);
                req.setReadAt(LocalDateTime.now());
                assignmentRequestRepository.save(req);
            }
        }
    }

    public AssignmentRequest replyToRequest(String id, MultipartFile file, String studentName) throws IOException {
        Optional<AssignmentRequest> requestOpt = assignmentRequestRepository.findById(id);
        if (requestOpt.isPresent()) {
            AssignmentRequest req = requestOpt.get();
            
            String fileUrl = null;
            if (file != null && !file.isEmpty()) {
                fileUrl = fileStorageService.uploadFile(file);
            }
            
            // Generate automated 4LAZIE identity reply
            String automatedReply = "Hey " + studentName + "! 👋\n\n" +
                    "Tumepokea swali lako la " + req.getSubjectName() + " na tumelifanyia Magic! 🪄\n" +
                    "Wataalamu wetu wamelisolve kwa usahihi wa asilimia 100%.\n\n" +
                    "Tumeambatisha PDF hapo chini yenye majibu yote yaliyochambuliwa step-by-step ili iwe rahisi kwako kuelewa. Ipakue (Download) na uipitie.\n\n" +
                    "Study Smart, Not Hard! 🚀\n— The 4LAZIE Team";
            
            ChatMessage initialMessage = new ChatMessage("ADMIN", "4LAZIE", automatedReply, fileUrl);
            
            if (req.getMessages() == null) {
                req.setMessages(new java.util.ArrayList<>());
            }
            req.getMessages().add(initialMessage);
            
            // Keep legacy fields updated just in case
            req.setAdminReply(automatedReply);
            req.setReplyPdfUrl(fileUrl);
            
            req.setStatus("SOLVED");
            req.setSolvedAt(LocalDateTime.now());

            AssignmentRequest savedRequest = assignmentRequestRepository.save(req);

            // Send push notification to the student
            String pushTitle = "Magic Reply Received! 🪄";
            String pushBody = "Your assignment on " + req.getSubjectName() + " has been solved.";
            pushNotificationService.sendToUser(req.getUserId(), pushTitle, pushBody, "/messages");
            notificationService.createNotification(req.getUserId(), pushTitle, pushBody, "/messages");

            return savedRequest;
        }
        return null;
    }
    
    public AssignmentRequest addChatMessage(String id, String senderId, String senderName, String messageText, MultipartFile file) throws IOException {
        Optional<AssignmentRequest> requestOpt = assignmentRequestRepository.findById(id);
        if (requestOpt.isPresent()) {
            AssignmentRequest req = requestOpt.get();
            
            String fileUrl = null;
            if (file != null && !file.isEmpty()) {
                fileUrl = fileStorageService.uploadFile(file);
            }
            
            ChatMessage chatMessage = new ChatMessage(senderId, senderName, messageText, fileUrl);
            
            if (req.getMessages() == null) {
                req.setMessages(new java.util.ArrayList<>());
            }
            req.getMessages().add(chatMessage);
            
            // If admin replies, change status to solved
            if (senderId.equals("ADMIN")) {
                req.setStatus("SOLVED");
            }
            
            req.setRead(false); // Mark as unread for the receiver
            
            AssignmentRequest savedRequest = assignmentRequestRepository.save(req);
            
            // Notify receiver
            String receiverId = senderId.equals("ADMIN") ? req.getUserId() : "ADMIN";
            String pushTitle = senderId.equals("ADMIN") ? "New Message from 4LAZIE" : "New Message from Student";
            String pushBody = senderName + ": " + (messageText.length() > 30 ? messageText.substring(0, 30) + "..." : messageText);
            
            if (!senderId.equals("ADMIN")) {
                // In a real app we might notify admins. Here we just notify the student if admin replies.
            } else {
                pushNotificationService.sendToUser(req.getUserId(), pushTitle, pushBody, "/messages");
                notificationService.createNotification(req.getUserId(), pushTitle, pushBody, "/messages");
            }
            
            return savedRequest;
        }
        return null;
    }
}
