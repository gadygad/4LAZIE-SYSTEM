package com.school.controller;

import com.school.model.PasswordResetToken;
import com.school.model.User;
import com.school.repository.PasswordResetTokenRepository;
import com.school.repository.UserRepository;
import com.school.service.EmailService;
import com.school.service.SmsService;
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
import java.util.UUID;

@Controller
public class PasswordResetController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private SmsService smsService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/forgot-password")
    public String showForgotPasswordForm() {
        return "auth/forgot_password";
    }

    @PostMapping("/forgot-password")
    public String processForgotPassword(@RequestParam("email") String email,
                                        HttpServletRequest request,
                                        RedirectAttributes redirectAttributes) {
        
        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isEmpty()) {
            redirectAttributes.addFlashAttribute("error", "No account found with that email address.");
            return "redirect:/forgot-password";
        }

        User user = userOpt.get();
        
        // Delete old tokens
        tokenRepository.deleteByUser(user);

        // Generate new token (expire in 5 minutes)
        String otp = String.format("%06d", new java.util.Random().nextInt(999999));
        PasswordResetToken resetToken = new PasswordResetToken(otp, user, 5);
        tokenRepository.save(resetToken);

        emailService.sendPasswordResetEmail(user.getEmail(), otp);
        redirectAttributes.addFlashAttribute("success", "A 6-digit OTP has been sent to your email. It will expire in 5 minutes.");

        return "redirect:/verify-otp?email=" + email;
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
        Optional<PasswordResetToken> tokenOpt = tokenRepository.findByToken(otp);
        if (tokenOpt.isEmpty() || tokenOpt.get().isExpired() || !tokenOpt.get().getUser().getEmail().equals(email)) {
            redirectAttributes.addFlashAttribute("error", "The OTP is invalid or has expired. Please request a new one.");
            return "redirect:/verify-otp?email=" + email;
        }
        return "redirect:/reset-password?token=" + otp;
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
