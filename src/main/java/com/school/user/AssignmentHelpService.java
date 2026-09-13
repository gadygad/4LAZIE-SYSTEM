package com.school.user;

import com.school.user.AssignmentRequest;
import com.school.chat.ChatMessage;
import com.school.auth.User;
import com.school.user.AssignmentRequestRepository;
import com.school.auth.UserRepository;
import com.school.core.FileStorageService;
import com.school.notification.NotificationService;
import com.school.notification.PushNotificationService;
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
    private com.school.auth.UserRepository userRepository;

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

        AssignmentRequest saved = assignmentRequestRepository.save(request);
        String studentName = userRepository.findById(userId).map(User::getName).orElse("A student");
        notificationService.notifyAdminsWithPermission(null, "New student question",
                studentName + " asked a question about " + subjectName + ".", "/admin/assignments");
        return saved;
    }

    public AssignmentRequest createPublicContactRequest(String fullName, String email, String phoneNumber, String subject, String message) {
        AssignmentRequest request = new AssignmentRequest();
        request.setPublicContact(true);
        request.setFullName(fullName);
        request.setEmail(email);
        request.setPhoneNumber(phoneNumber);
        request.setSubjectName("CONTACT: " + subject);
        request.setQuestionText(message);
        AssignmentRequest saved = assignmentRequestRepository.save(request);
        notificationService.notifyAdminsWithPermission(null, "New contact message",
                fullName + " sent a message via the public contact form.", "/admin/assignments");
        return saved;
    }

    public List<AssignmentRequest> getUserRequests(String userId) {
        return assignmentRequestRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public List<AssignmentRequest> getAllRequests() {
        return assignmentRequestRepository.findAllByOrderByCreatedAtDesc();
    }

    public org.springframework.data.domain.Page<AssignmentRequest> getAdminRequestsPaginated(String status, int page, int size) {
        return getAdminRequestsPaginated(status, page, size, null);
    }

    // scopeInstitutionId == null keeps the original DB-level pagination
    // (SUPER_ADMIN, seeing every college). Scoped to one college, a request
    // is only attributable via the requesting student's own institution —
    // AssignmentRequest has no institution field of its own — so filtering
    // has to happen in memory after fetching the (unpaginated) status match,
    // then the filtered list is paginated by hand. A public/anonymous
    // contact-form request has no student behind it at all, so it always
    // passes the filter: it isn't any one college's to claim, but someone
    // still has to see it and reply.
    public org.springframework.data.domain.Page<AssignmentRequest> getAdminRequestsPaginated(String status, int page, int size, String scopeInstitutionId) {
        org.springframework.data.domain.Pageable pageable = org.springframework.data.domain.PageRequest.of(page, size);
        if (scopeInstitutionId == null) {
            if (status == null || status.isEmpty() || status.equalsIgnoreCase("ALL")) {
                return assignmentRequestRepository.findAllByOrderByCreatedAtDesc(pageable);
            } else {
                return assignmentRequestRepository.findByStatusOrderByCreatedAtDesc(status.toUpperCase(), pageable);
            }
        }

        List<AssignmentRequest> all = (status == null || status.isEmpty() || status.equalsIgnoreCase("ALL"))
                ? assignmentRequestRepository.findAllByOrderByCreatedAtDesc()
                : assignmentRequestRepository.findByStatusOrderByCreatedAtDesc(status.toUpperCase());

        List<AssignmentRequest> scoped = new java.util.ArrayList<>();
        for (AssignmentRequest r : all) {
            if (r.isPublicContact() || r.getUserId() == null) {
                scoped.add(r);
                continue;
            }
            User requester = userRepository.findById(r.getUserId()).orElse(null);
            if (requester != null && requester.getInstitution() != null
                    && scopeInstitutionId.equals(requester.getInstitution().getId())) {
                scoped.add(r);
            }
        }

        int start = Math.min((int) pageable.getOffset(), scoped.size());
        int end = Math.min(start + pageable.getPageSize(), scoped.size());
        return new org.springframework.data.domain.PageImpl<>(scoped.subList(start, end), pageable, scoped.size());
    }

    public Optional<AssignmentRequest> getRequestById(String id) {
        return assignmentRequestRepository.findById(id);
    }

    public void markAsRead(String id, String viewerIdentifier) {
        Optional<AssignmentRequest> requestOpt = assignmentRequestRepository.findById(id);
        if (requestOpt.isPresent()) {
            AssignmentRequest req = requestOpt.get();
            boolean changed = false;
            if (!req.isRead()) {
                req.setRead(true);
                req.setReadAt(LocalDateTime.now());
                changed = true;
            }
            if (req.getMessages() != null) {
                for (ChatMessage msg : req.getMessages()) {
                    if (viewerIdentifier != null && !viewerIdentifier.equals(msg.getSenderId()) && !msg.isRead()) {
                        msg.setRead(true);
                        changed = true;
                    }
                }
            }
            if (changed) {
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
            String automatedReply = "Hello " + studentName + "! 👋\n\n" +
                    "Thank you for trusting us with your " + req.getSubjectName() + " question. We highly appreciate your dedication to your studies.\n\n" +
                    "Our team of experts has carefully worked on this question to ensure you get 100% accurate answers.\n\n" +
                    "We have attached a PDF file below containing step-by-step analyzed answers to make it easier for you to understand. Please download and review it at your convenience.\n\n" +
                    "We are here for you anytime you need further assistance. We wish you great success in your studies! 🎓\n\n" +
                    "— Best regards, The 4LAZIE Team";
            
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
    
    public AssignmentRequest addChatMessage(String id, String senderId, String senderName, String messageText, MultipartFile file, String replyToMessageId, String replyToSenderName, String replyToMessageText) throws IOException {
        Optional<AssignmentRequest> requestOpt = assignmentRequestRepository.findById(id);
        if (requestOpt.isPresent()) {
            AssignmentRequest req = requestOpt.get();
            
            String fileUrl = null;
            if (file != null && !file.isEmpty()) {
                fileUrl = fileStorageService.uploadFile(file);
            }
            
            ChatMessage chatMessage = new ChatMessage(senderId, senderName, messageText, fileUrl);
            chatMessage.setReplyToMessageId(replyToMessageId);
            chatMessage.setReplyToSenderName(replyToSenderName);
            chatMessage.setReplyToMessageText(replyToMessageText);
            
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
