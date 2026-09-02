package com.school.core;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.scheduling.annotation.Async;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.util.Base64;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

// Sends every app email through Brevo's HTTPS API instead of raw SMTP.
// Render's free tier blocks outbound SMTP connections (port 587/465/25) —
// confirmed live via a MailConnectException timeout to smtp.gmail.com — so
// JavaMailSender could never work there no matter how correct the Gmail
// credentials were. Brevo's API is a plain HTTPS POST (port 443), which
// isn't blocked, and needs no SMTP setup at all.
@Service
public class EmailService {

    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(EmailService.class);
    private static final String BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";

    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(15))
            .build();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${BREVO_API_KEY:}")
    private String brevoApiKey;

    // The branded "From" address every email uses. Brevo requires this exact
    // address to be added and verified as a sender in the Brevo dashboard
    // (Senders, Domains & Dedicated IPs > Senders) before it will accept mail
    // claiming to be from it — otherwise Brevo's API itself rejects the send
    // with a 401/400, which will show up clearly in the logs below.
    private static final String FROM_ADDRESS = "support@4lazie.com";
    private static final String FROM_NAME = "4LAZIE Student Community";

    private void sendEmail(String to, String subject, String htmlBody) {
        sendEmail(to, subject, htmlBody, null, null);
    }

    private void sendEmail(String to, String subject, String htmlBody, String attachmentName, byte[] attachmentBytes) {
        if (brevoApiKey == null || brevoApiKey.isBlank()) {
            log.error("BREVO_API_KEY is not configured — cannot send email to: {}", to);
            return;
        }
        try {
            Map<String, Object> sender = new LinkedHashMap<>();
            sender.put("name", FROM_NAME);
            sender.put("email", FROM_ADDRESS);

            Map<String, Object> recipient = new LinkedHashMap<>();
            recipient.put("email", to);

            Map<String, Object> body = new LinkedHashMap<>();
            body.put("sender", sender);
            body.put("to", List.of(recipient));
            body.put("subject", subject);
            body.put("htmlContent", htmlBody);

            if (attachmentBytes != null && attachmentName != null) {
                Map<String, Object> attachment = new LinkedHashMap<>();
                attachment.put("name", attachmentName);
                attachment.put("content", Base64.getEncoder().encodeToString(attachmentBytes));
                body.put("attachment", List.of(attachment));
            }

            String json = objectMapper.writeValueAsString(body);

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(BREVO_ENDPOINT))
                    .header("api-key", brevoApiKey)
                    .header("Content-Type", "application/json")
                    .header("Accept", "application/json")
                    .timeout(Duration.ofSeconds(20))
                    .POST(HttpRequest.BodyPublishers.ofString(json))
                    .build();

            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() >= 200 && response.statusCode() < 300) {
                log.info("Email sent via Brevo to {} (subject: {})", to, subject);
            } else {
                // Logged in full — a non-2xx here is almost always Brevo
                // rejecting something specific (unverified sender, invalid
                // API key, bad recipient), and the response body says exactly
                // which, which a bare "it failed" never would.
                log.error("Brevo rejected email to {} — status {}: {}", to, response.statusCode(), response.body());
            }
        } catch (Exception e) {
            log.error("Failed to send email to {} via Brevo: {}", to, e.getMessage(), e);
        }
    }

    @Async
    public void sendPasswordResetEmail(String to, String otp) {
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
        sendEmail(to, "Password Reset OTP - 4LAZIE", htmlBody);
    }

    @Async
    public void sendVerificationEmail(String to, String verificationLink) {
        String htmlBody = "<p>Welcome to 4LAZIE!</p>"
                + "<p>Please click the link below to verify your email address. This link will expire in 5 minutes.</p>"
                + "<p><a href=\"" + verificationLink + "\">" + verificationLink + "</a></p>"
                + "<p>If you did not register for an account, please ignore this email.</p>";
        sendEmail(to, "Verify your email address - 4LAZIE", htmlBody);
    }

    @Async
    public void sendNewNoteNotification(String to, String noteTitle, String category, String url) {
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
                + "<p>&copy; " + java.time.Year.now().getValue() + " 4LAZIE Student Community. All rights reserved.</p>"
                + "</div>"
                + "</div>";
        sendEmail(to, "New Material Added: " + noteTitle, htmlBody);
    }

    @Async
    public void sendSecureActivityReport(String to, byte[] pdfData) {
        String htmlBody = "<div style=\"font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;\">"
                + "<h2 style=\"color: #10b981;\">Hello Admin,</h2>"
                + "<p style=\"color: #475569; font-size: 16px;\">Please find attached the latest security activity logs for the 4LAZIE system.</p>"
                + "<p style=\"color: #ef4444; font-size: 15px; font-weight: bold;\">This document is password protected for your security.</p>"
                + "<p style=\"color: #475569; font-size: 15px;\">Please use your secret password to open it. Keep this information safe.</p>"
                + "<br/><p style=\"color: #94a3b8; font-size: 12px;\">&copy; 4LAZIE Security System</p>"
                + "</div>";
        sendEmail(to, "🔒 Your Secure 4LAZIE Activity Report", htmlBody, "4LAZIE_Security_Report.pdf", pdfData);
    }

    @Async
    public void sendNewLoginAlertEmail(String to, String ipAddress, String deviceDetails) {
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
        sendEmail(to, "Security Alert: New Login Detected - 4LAZIE", htmlBody);
    }

    @Async
    public void sendPasswordChangeAlert(String to, String userName, String deviceDetails, String securityToken, String appUrl) {
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
        sendEmail(to, "Security Alert: Your Password Was Changed - 4LAZIE", htmlBody);
    }

    @Async
    public void sendWarningEmail(String to, String userName, String warningMessage) {
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
        sendEmail(to, "⚠️ Official Warning from 4LAZIE Administration", htmlBody);
    }

    @Async
    public void sendAccountSuspensionEmail(String to, String userName, boolean isSuspended) {
        String subject = isSuspended ? "🚫 Account Suspended - 4LAZIE" : "✅ Account Reactivated - 4LAZIE";
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
        sendEmail(to, subject, htmlBody);
    }

    @Async
    public void sendRecoveryMagicLink(String to, String userName, String magicLink) {
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
        sendEmail(to, "🔐 Account Recovery Link - 4LAZIE", htmlBody);
    }

    @Async
    public void sendSupportReplyEmail(String toEmail, String studentName, String replyMessage, String originalQuestion) {
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
        sendEmail(toEmail, "Re: Your Message to 4LAZIE Support", htmlBody);
    }
}
