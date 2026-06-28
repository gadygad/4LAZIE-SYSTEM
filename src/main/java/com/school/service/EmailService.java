package com.school.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired(required = false)
    private JavaMailSender mailSender;

    public void sendPasswordResetEmail(String to, String resetLink) {
        if (mailSender == null) {
            System.err.println("MailSender is not configured. Cannot send email to: " + to);
            return;
        }
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject("Password Reset Request - 4LAZIE");
            message.setText("You requested a password reset.\n\nClick the link below to set a new password. This link will expire in 2 minutes.\n\n" + resetLink + "\n\nIf you did not request this, please ignore this email.");
            mailSender.send(message);
        } catch (Exception e) {
            // Log the error but don't crash, especially if credentials aren't set
            System.err.println("Failed to send email: " + e.getMessage());
            System.out.println("Please complete 'spring.mail.*' properties in application.properties");
        }
    }
}
