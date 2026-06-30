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

    public void sendVerificationEmail(String to, String verificationLink) {
        if (mailSender == null) {
            System.err.println("MailSender is not configured. Cannot send email to: " + to);
            return;
        }
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject("Verify your email address - 4LAZIE");
            message.setText("Welcome to 4LAZIE!\n\n" +
                            "Please click the link below to verify your email address. This link will expire in 5 minutes.\n\n" +
                            verificationLink + "\n\n" +
                            "If you did not register for an account, please ignore this email.");
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Failed to send verification email: " + e.getMessage());
        }
    }
}
