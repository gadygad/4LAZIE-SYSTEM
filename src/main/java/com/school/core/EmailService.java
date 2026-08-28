package com.school.core;

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

    @org.springframework.beans.factory.annotation.Value("${spring.mail.username:kilingepazasauti@gmail.com}")
    private String senderEmail;

    @Async
    public void sendPasswordResetEmail(String to, String otp) {
        if (mailSender == null) {
            System.err.println("MailSender is not configured. Cannot send email to: " + to);
            return;
        }
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom("4LAZIE Student Community <support@4lazie.com>");
            helper.setTo(to);
            helper.setSubject("Password Reset OTP - 4LAZIE");
            
            String htmlBody = "<div style=\"font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;\">"
                    + "<div style=\"text-align: center; padding-bottom: 20px; border-bottom: 2px solid #10b981;\">"
                    + "<h1 style=\"color: #10b981; font-weight: 800; margin: 0; letter-spacing: -1px;\">4LAZIE</h1>"
                    + "<p style=\"color: #64748b; font-size: 14px; margin-top: 5px;\">Security Alert</p>"
                    + "</div>"
                    + "<div style=\"padding: 30px 0; text-align: center;\">"
                    + "<h2 style=\"color: #1e293b; font-size: 22px;\">Password Reset Request</h2>"
                    + "<p style=\"color: #475569; font-size: 16px; line-height: 1.6;\">We received a request to reset your password. Your secret OTP code is:</p>"
                    + "<div style=\"margin: 30px auto; padding: 15px 30px; background-color: #ecfdf5; border: 2px dashed #10b981; border-radius: 12px; display: inline-block;\">"
                    + "<h1 style=\"color: #059669; font-size: 36px; letter-spacing: 5px; margin: 0;\">" + otp + "</h1>"
                    + "</div>"
                    + "<p style=\"color: #ef4444; font-size: 14px; font-weight: bold;\">This code will expire in exactly 5 minutes.</p>"
                    + "</div>"
                    + "<div style=\"padding-top: 20px; border-top: 1px solid #e2e8f0;\">"
                    + "<p style=\"color: #64748b; font-size: 14px; line-height: 1.6;\"><strong>Didn't request this?</strong><br>You can safely ignore this email. Your account is 100% secure because nobody can change your password without this secret code.</p>"
                    + "</div>"
                    + "<div style=\"text-align: center; padding-top: 25px; color: #94a3b8; font-size: 12px;\">"
                    + "<p>&copy; " + java.time.Year.now().getValue() + " 4LAZIE Student Community. All rights reserved.</p>"
                    + "</div>"
                    + "</div>";
                    
            helper.setText(htmlBody, true);
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
            message.setFrom("4LAZIE Student Community <support@4lazie.com>");
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
            helper.setFrom("4LAZIE Student Community <support@4lazie.com>");
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
                    + "<div style=\"text-align: center; padding-top: 15px; color: #94a3b8; font-size: 12px;\">"
                    + "<p>&copy; 2024 4LAZIE Student Community. All rights reserved.</p>"
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
            helper.setFrom("4LAZIE Student Community <support@4lazie.com>");
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
            helper.setFrom("4LAZIE Student Community <support@4lazie.com>");
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
                    + "<p>&copy; " + java.time.Year.now().getValue() + " 4LAZIE Student Community. All rights reserved.</p>"
                    + "</div>"
                    + "</div>";
                    
            helper.setText(htmlBody, true);
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Failed to send login alert email: " + e.getMessage());
        }
    }

    @Async
    public void sendPasswordChangeAlert(String to, String userName, String deviceDetails, String securityToken, String appUrl) {
        if (mailSender == null) return;
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom("4LAZIE Student Community <support@4lazie.com>");
            helper.setTo(to);
            helper.setSubject("Security Alert: Your Password Was Changed - 4LAZIE");
            
            String secureLink = appUrl + "/secure-account?token=" + securityToken;
            
            String htmlBody = "<div style=\"font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;\">"
                    + "<div style=\"text-align: center; padding-bottom: 20px; border-bottom: 2px solid #10b981;\">"
                    + "<h1 style=\"color: #10b981; font-weight: 800; margin: 0;\">4LAZIE</h1>"
                    + "</div>"
                    + "<div style=\"padding: 30px 0; text-align: center;\">"
                    + "<h2 style=\"color: #1e293b; font-size: 22px;\">Password Changed Successfully</h2>"
                    + "<p style=\"color: #475569; font-size: 16px; line-height: 1.6;\">Hello " + userName + ", the password for your 4LAZIE account was recently changed.</p>"
                    + "<div style=\"background-color: #f1f5f9; padding: 15px; border-radius: 6px; margin: 15px 0; text-align: left;\">"
                    + "<p style=\"margin: 0; color: #334155;\"><strong>Device Details:</strong> " + deviceDetails + "</p>"
                    + "<p style=\"margin: 5px 0 0 0; color: #334155;\"><strong>Time:</strong> " + java.time.LocalDateTime.now().format(java.time.format.DateTimeFormatter.ofPattern("dd MMM yyyy, HH:mm")) + "</p>"
                    + "</div>"
                    + "<p style=\"color: #475569; font-size: 16px; line-height: 1.6;\">If you made this change, you can safely ignore this email.</p>"
                    + "<div style=\"margin-top: 30px; padding-top: 20px; border-top: 1px dashed #cbd5e1;\">"
                    + "<h3 style=\"color: #ef4444; margin-bottom: 10px;\">Didn't change your password?</h3>"
                    + "<p style=\"color: #64748b; font-size: 14px; margin-bottom: 20px;\">Click the button below immediately to secure your account and log out of all devices.</p>"
                    + "<a href=\"" + secureLink + "\" style=\"background-color: #ef4444; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 15px; display: inline-block;\">SECURE MY ACCOUNT</a>"
                    + "</div>"
                    + "</div>"
                    + "<div style=\"text-align: center; padding-top: 20px; color: #94a3b8; font-size: 12px;\">"
                    + "<p>&copy; " + java.time.Year.now().getValue() + " 4LAZIE Student Community. All rights reserved.</p>"
                    + "</div>"
                    + "</div>";
                    
            helper.setText(htmlBody, true);
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Failed to send password change alert email: " + e.getMessage());
        }
    }

    @Async
    public void sendWarningEmail(String to, String userName, String warningMessage) {
        if (mailSender == null) return;
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom("4LAZIE Student Community <support@4lazie.com>");
            helper.setTo(to);
            helper.setSubject("⚠️ Official Warning from 4LAZIE Administration");
            
            String htmlBody = "<div style=\"font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fffbeb; border: 1px solid #fcd34d; border-radius: 8px;\">"
                    + "<div style=\"text-align: center; margin-bottom: 20px;\">"
                    + "<h1 style=\"color: #d97706; font-size: 24px; margin-bottom: 5px;\">OFFICIAL WARNING</h1>"
                    + "</div>"
                    + "<h2 style=\"color: #1e293b; font-size: 18px;\">Hello " + userName + ",</h2>"
                    + "<p style=\"color: #475569; font-size: 15px; line-height: 1.6;\">This is an official warning regarding your account activity on 4LAZIE.</p>"
                    + "<div style=\"background-color: #fef3c7; padding: 15px; border-left: 4px solid #f59e0b; margin: 15px 0;\">"
                    + "<p style=\"margin: 0; color: #92400e; font-size: 15px;\"><strong>Admin Message:</strong><br><br>" + warningMessage.replace("\n", "<br>") + "</p>"
                    + "</div>"
                    + "<p style=\"color: #475569; font-size: 15px; line-height: 1.6;\">Please ensure you adhere to our community guidelines. Further violations may result in account suspension.</p>"
                    + "</div>";
                    
            helper.setText(htmlBody, true);
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Failed to send warning email: " + e.getMessage());
        }
    }

    @Async
    public void sendAccountSuspensionEmail(String to, String userName, boolean isSuspended) {
        if (mailSender == null) return;
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom("4LAZIE Student Community <support@4lazie.com>");
            helper.setTo(to);
            
            String subject = isSuspended ? "🚫 Account Suspended - 4LAZIE" : "✅ Account Reactivated - 4LAZIE";
            helper.setSubject(subject);
            
            String titleColor = isSuspended ? "#dc2626" : "#10b981";
            String titleText = isSuspended ? "ACCOUNT SUSPENDED" : "ACCOUNT REACTIVATED";
            String bodyText = isSuspended 
                ? "We regret to inform you that your 4LAZIE account has been suspended by the administration due to policy violations. You will no longer be able to log in or access materials." 
                : "Good news! Your 4LAZIE account has been reactivated. You can now log in and access all your study materials again.";
                
            String htmlBody = "<div style=\"font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;\">"
                    + "<div style=\"text-align: center; margin-bottom: 20px;\">"
                    + "<h1 style=\"color: " + titleColor + "; font-size: 24px; margin-bottom: 5px;\">" + titleText + "</h1>"
                    + "</div>"
                    + "<h2 style=\"color: #1e293b; font-size: 18px;\">Hello " + userName + ",</h2>"
                    + "<p style=\"color: #475569; font-size: 15px; line-height: 1.6;\">" + bodyText + "</p>"
                    + "<p style=\"color: #475569; font-size: 15px; line-height: 1.6;\">If you have any questions, please reply to this email.</p>"
                    + "</div>";
                    
            helper.setText(htmlBody, true);
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Failed to send suspension email: " + e.getMessage());
        }
    }

    @Async
    public void sendRecoveryMagicLink(String to, String userName, String magicLink) {
        if (mailSender == null) return;
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom("4LAZIE Student Community <support@4lazie.com>");
            helper.setTo(to);
            helper.setSubject("🔐 Account Recovery Link - 4LAZIE");
            
            String htmlBody = "<div style=\"font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;\">"
                    + "<div style=\"text-align: center; padding-bottom: 20px; border-bottom: 2px solid #10b981;\">"
                    + "<h1 style=\"color: #10b981; font-weight: 800; margin: 0;\">4LAZIE</h1>"
                    + "</div>"
                    + "<div style=\"padding: 30px 0; text-align: center;\">"
                    + "<h2 style=\"color: #1e293b; font-size: 22px;\">Account Recovery</h2>"
                    + "<p style=\"color: #475569; font-size: 16px; line-height: 1.6;\">Hello " + userName + ", your administrator has initiated an account recovery process for you.</p>"
                    + "<p style=\"color: #475569; font-size: 16px; line-height: 1.6;\">Click the secure button below to instantly reset your password and restore access to your account:</p>"
                    + "<div style=\"margin: 30px 0;\">"
                    + "<a href=\"" + magicLink + "\" style=\"background-color: #10b981; color: white; padding: 14px 28px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 16px; display: inline-block; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);\">Restore My Account</a>"
                    + "</div>"
                    + "<p style=\"color: #ef4444; font-size: 14px; font-weight: bold;\">This magic link will expire in exactly 30 minutes.</p>"
                    + "</div>"
                    + "<div style=\"padding-top: 20px; border-top: 1px solid #e2e8f0;\">"
                    + "<p style=\"color: #64748b; font-size: 14px; line-height: 1.6;\">If the button doesn't work, copy and paste this URL into your browser:<br>"
                    + "<a href=\"" + magicLink + "\" style=\"color: #10b981; word-break: break-all;\">" + magicLink + "</a></p>"
                    + "</div>"
                    + "</div>";
                    
            helper.setText(htmlBody, true);
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Failed to send recovery magic link: " + e.getMessage());
        }
    }
    @Async
    public void sendSupportReplyEmail(String toEmail, String studentName, String replyMessage, String originalQuestion) {
        if (mailSender == null) return;
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setFrom("4LAZIE Student Community <support@4lazie.com>");
            helper.setTo(toEmail);
            helper.setSubject("Re: Your Message to 4LAZIE Support");
            
            String htmlBody = "<div style=\"font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;\">"
                    + "<div style=\"text-align: center; padding-bottom: 20px; border-bottom: 2px solid #10b981;\">"
                    + "<h1 style=\"color: #10b981; font-weight: 800; margin: 0;\">4LAZIE Support</h1>"
                    + "</div>"
                    + "<div style=\"padding: 30px 0;\">"
                    + "<h2 style=\"color: #1e293b; font-size: 20px;\">Hello " + studentName + ",</h2>"
                    + "<p style=\"color: #475569; font-size: 16px; line-height: 1.6;\">Thank you for reaching out to us. Here is our response to your inquiry:</p>"
                    + "<div style=\"background-color: #ecfdf5; padding: 15px; border-left: 4px solid #10b981; margin: 20px 0; border-radius: 0 8px 8px 0;\">"
                    + "<p style=\"margin: 0; color: #065f46; font-size: 16px; line-height: 1.6;\">" + replyMessage.replace("\n", "<br>") + "</p>"
                    + "</div>"
                    + "<hr style=\"border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;\">"
                    + "<h3 style=\"color: #64748b; font-size: 14px;\">Your Original Message:</h3>"
                    + "<p style=\"color: #94a3b8; font-size: 14px; font-style: italic; line-height: 1.5;\">\"" + originalQuestion.replace("\n", "<br>") + "\"</p>"
                    + "</div>"
                    + "<div style=\"text-align: center; padding-top: 15px; color: #94a3b8; font-size: 12px; border-top: 1px solid #e2e8f0;\">"
                    + "<p>&copy; " + java.time.Year.now().getValue() + " 4LAZIE Student Community. All rights reserved.</p>"
                    + "</div>"
                    + "</div>";
                    
            helper.setText(htmlBody, true);
            mailSender.send(message);
        } catch (Exception e) {
            System.err.println("Failed to send support reply email: " + e.getMessage());
        }
    }
}
