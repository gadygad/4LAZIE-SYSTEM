package com.school.auth;

import com.school.auth.PasswordResetToken;
import com.school.auth.User;
import com.school.auth.PasswordResetTokenRepository;
import com.school.auth.UserRepository;
import com.school.core.EmailService;
import com.school.core.SmsService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.Optional;

@Controller
public class PasswordResetController {

        private UserRepository userRepository;

        private PasswordResetTokenRepository tokenRepository;

        private EmailService emailService;

        private SmsService smsService;

        private PasswordEncoder passwordEncoder;

    public PasswordResetController(UserRepository userRepository, PasswordResetTokenRepository tokenRepository, EmailService emailService, SmsService smsService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.emailService = emailService;
        this.smsService = smsService;
        this.passwordEncoder = passwordEncoder;
    }


    @GetMapping("/forgot-password")
    public String showForgotPasswordForm() {
        return "auth/forgot_password";
    }

    @PostMapping("/forgot-password")
    public String processForgotPassword(@RequestParam("email") String email,
                                        HttpServletRequest request,
                                        RedirectAttributes redirectAttributes) {
        
        String cleanEmail = email != null ? email.trim() : "";
        Optional<User> userOpt = userRepository.findByEmail(cleanEmail);

        if (userOpt.isEmpty()) {
            redirectAttributes.addFlashAttribute("error", "No account found with that email address.");
            return "redirect:/forgot-password";
        }

        User user = userOpt.get();
        
        // Delete old tokens
        tokenRepository.deleteByUser(user);

        // Generate new token (expire in 5 minutes)
        String otp = String.format("%06d", new java.security.SecureRandom().nextInt(1000000));
        PasswordResetToken resetToken = new PasswordResetToken(otp, user, 5);
        tokenRepository.save(resetToken);

        emailService.sendPasswordResetEmail(user.getEmail(), otp);
        redirectAttributes.addFlashAttribute("success", "A 6-digit OTP has been sent to your email. It will expire in 5 minutes.");

        // cleanEmail (trimmed) and URL-encoded — an unencoded email containing
        // "+", "&", or "%" would otherwise corrupt this redirect's query string.
        String encodedEmail = java.net.URLEncoder.encode(cleanEmail, java.nio.charset.StandardCharsets.UTF_8);
        return "redirect:/verify-otp?email=" + encodedEmail;
    }

    @GetMapping("/verify-otp")
    public String showVerifyOtpForm(@RequestParam("email") String email, Model model) {
        model.addAttribute("email", email);
        return "auth/verify_otp";
    }
    
    @PostMapping("/verify-otp")
    public String processVerifyOtp(@RequestParam("email") String email,
                                   @RequestParam("otp") String otp,
                                   RedirectAttributes redirectAttributes) {
        String cleanOtp = otp != null ? otp.trim() : "";
        String cleanEmail = email != null ? email.trim() : "";
        
        Optional<PasswordResetToken> tokenOpt = tokenRepository.findByToken(cleanOtp);
        
        if (tokenOpt.isEmpty()) {
            System.out.println("OTP Verification Failed: Token not found -> " + cleanOtp);
            redirectAttributes.addFlashAttribute("error", "The OTP is invalid or has expired. Please request a new one.");
            return "redirect:/verify-otp?email=" + cleanEmail;
        }
        
        PasswordResetToken token = tokenOpt.get();
        if (token.isExpired()) {
            System.out.println("OTP Verification Failed: Token expired -> " + cleanOtp);
            redirectAttributes.addFlashAttribute("error", "The OTP has expired. Please request a new one.");
            return "redirect:/verify-otp?email=" + cleanEmail;
        }
        
        if (!token.getUser().getEmail().equalsIgnoreCase(cleanEmail)) {
            System.out.println("OTP Verification Failed: Email mismatch -> Expected: " + token.getUser().getEmail() + ", Got: " + cleanEmail);
            redirectAttributes.addFlashAttribute("error", "The OTP is invalid for this email.");
            return "redirect:/verify-otp?email=" + cleanEmail;
        }
        
        return "redirect:/reset-password?token=" + cleanOtp;
    }

    @GetMapping("/reset-password")
    public String showResetPasswordForm(@RequestParam("token") String token, Model model) {
        Optional<PasswordResetToken> tokenOpt = tokenRepository.findByToken(token);
        
        if (tokenOpt.isEmpty() || tokenOpt.get().isExpired()) {
            model.addAttribute("error", "The OTP session is invalid or has expired. Please request a new one.");
            return "auth/forgot_password";
        }
        
        model.addAttribute("token", token);
        return "auth/reset_password";
    }

    @PostMapping("/reset-password")
    public String processResetPassword(@RequestParam("token") String token,
                                       @RequestParam("password") String password,
                                       RedirectAttributes redirectAttributes) {
        
        Optional<PasswordResetToken> tokenOpt = tokenRepository.findByToken(token);
        
        if (tokenOpt.isEmpty() || tokenOpt.get().isExpired()) {
            redirectAttributes.addFlashAttribute("error", "The OTP time has expired (5 minutes). Please request again.");
            return "redirect:/forgot-password";
        }

        User user = tokenOpt.get().getUser();
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);

        // Delete token after use
        tokenRepository.delete(tokenOpt.get());

        redirectAttributes.addFlashAttribute("success", "Your password has been changed successfully! You can now log in.");
        return "redirect:/login";
    }
}
