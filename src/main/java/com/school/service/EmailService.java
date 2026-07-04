package com.school.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.MimeMessageHelper;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.scheduling.annotation.Async;

@Service
public class EmailService {

    @Autowired(required = false)
    private JavaMailSender mailSender;

    @Async
    public void sendPasswordResetEmail(String to, String otp) {
        if (mailSender == null) {
            System.err.println("MailSender is not configured. Cannot send email to: " + to);
            return;
        }
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("support@4lazie.com");
            message.setTo(to);
            message.setSubject("Password Reset OTP - 4LAZIE");
            message.setText("You requested a password reset.\n\nYour secret OTP is: " + otp + "\n\nIt will expire in 5 minutes.\n\nIf you did not request this, please ignore this email.");
            mailSender.send(message);
        } catch (Exception e) {
            // Log the error but don't crash, especially if credentials aren't set
            System.err.println("Failed to send email: " + e.getMessage());
            System.out.println("Please complete 'spring.mail.*' properties in application.properties");
        }
    }

    @Async
    public void sendVerificationEmail(String to, String verificationLink) {
        if (mailSender == null) {
            System.err.println("MailSender is not configured. Cannot send email to: " + to);
            return;
        }
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("support@4lazie.com");
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
    
    @Async
    public void sendNewNoteNotification(String to, String noteTitle, String category, String url) {
        if (mailSender == null) return;
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(to);
            helper.setSubject("New Material Added: " + noteTitle);
            
            String htmlBody = "<div style=\"font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;\">"
                    + "<div style=\"text-align: center; padding-bottom: 20px; border-bottom: 2px solid #10b981;\">"
                    + "<h1 style=\"color: #10b981; font-weight: 800; margin: 0;\">4LAZIE</h1>"
                    + "<p style=\"color: #64748b; font-size: 14px; margin-top: 5px;\">smart in brain</p>"
                    + "</div>"
                    + "<div style=\"padding: 30px 0;\">"
                    + "<h2 style=\"color: #1e293b; font-size: 20px;\">Hello Student,</h2>"
                    + "<p style=\"color: #475569; font-size: 16px; line-height: 1.6;\">A new <strong>" + category + "</strong> titled <strong>\"" + noteTitle + "\"</strong> has just been uploaded for your class.</p>"
                    + "<div style=\"text-align: center; margin: 35px 0;\">"
                    + "<a href=\"" + url + "\" style=\"background-color: #10b981; color: white; padding: 14px 28px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 16px; display: inline-block; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);\">Read Now</a>"
                    + "</div>"
                    + "<p style=\"color: #475569; font-size: 16px; line-height: 1.6;\">Stay ahead of your studies with 4LAZIE.</p>"
                    + "</div>"
                    + "<div style=\"text-align: center; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #94a3b8; font-size: 12px;\">"
                    + "<p>&copy; 2024 4LAZIE Student Portal. All rights reserved.</p>"
                    + "</div>"
                    + "</div>";
                    
            helper.setText(htmlBody, true);
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Failed to send notification email: " + e.getMessage());
        }
    }

    @Async
    public void sendSecureActivityReport(String to, byte[] pdfData) {
        if (mailSender == null) {
            System.err.println("MailSender is not configured. Cannot send email to: " + to);
            return;
        }
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom("support@4lazie.com");
            helper.setTo(to);
            helper.setSubject("🔒 Your Secure 4LAZIE Activity Report");
            
            String htmlBody = "<div style=\"font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;\">"
                    + "<h2 style=\"color: #10b981;\">Hello Admin,</h2>"
                    + "<p style=\"color: #475569; font-size: 16px;\">Please find attached the latest security activity logs for the 4LAZIE system.</p>"
                    + "<p style=\"color: #ef4444; font-size: 15px; font-weight: bold;\">This document is password protected for your security.</p>"
                    + "<p style=\"color: #475569; font-size: 15px;\">Please use your secret password to open it. Keep this information safe.</p>"
                    + "<br/><p style=\"color: #94a3b8; font-size: 12px;\">&copy; 4LAZIE Security System</p>"
                    + "</div>";
                    
            helper.setText(htmlBody, true);
            
            // Add Attachment
            org.springframework.core.io.ByteArrayResource resource = new org.springframework.core.io.ByteArrayResource(pdfData);
            helper.addAttachment("4LAZIE_Security_Report.pdf", resource);
            
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Failed to send secure report email: " + e.getMessage());
        }
    }
    @Async
    public void sendNewLoginAlertEmail(String to, String ipAddress, String deviceDetails) {
        if (mailSender == null) {
            System.err.println("MailSender is not configured. Cannot send email to: " + to);
            return;
        }
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom("support@4lazie.com");
            helper.setTo(to);
            helper.setSubject("Security Alert: New Login Detected - 4LAZIE");
            
            String htmlBody = "<div style=\"font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;\">"
                    + "<div style=\"text-align: center; margin-bottom: 20px;\">"
                    + "<h1 style=\"color: #f59e0b; font-size: 24px; margin-bottom: 5px;\">4LAZIE SECURITY ALERT</h1>"
                    + "</div>"
                    + "<div style=\"padding: 20px 0; border-top: 2px solid #e2e8f0; border-bottom: 2px solid #e2e8f0;\">"
                    + "<h2 style=\"color: #1e293b; font-size: 18px;\">Hello,</h2>"
                    + "<p style=\"color: #475569; font-size: 15px; line-height: 1.6;\">We detected a new login to your 4LAZIE account from a new device or location.</p>"
                    + "<div style=\"background-color: #f1f5f9; padding: 15px; border-radius: 6px; margin: 15px 0;\">"
                    + "<p style=\"margin: 0 0 10px 0; color: #334155;\"><strong>IP Address:</strong> " + ipAddress + "</p>"
                    + "<p style=\"margin: 0; color: #334155;\"><strong>Device Details:</strong> " + deviceDetails + "</p>"
                    + "</div>"
                    + "<p style=\"color: #475569; font-size: 15px; line-height: 1.6;\">If this was you, you can safely ignore this email.</p>"
                    + "<p style=\"color: #ef4444; font-size: 15px; line-height: 1.6; font-weight: bold;\">If you did not authorize this login, please change your password immediately!</p>"
                    + "</div>"
                    + "<div style=\"text-align: center; padding-top: 15px; color: #94a3b8; font-size: 12px;\">"
                    + "<p>&copy; " + java.time.Year.now().getValue() + " 4LAZIE Student Portal. All rights reserved.</p>"
                    + "</div>"
                    + "</div>";
                    
            helper.setText(htmlBody, true);
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Failed to send login alert email: " + e.getMessage());
        }
    }
}
