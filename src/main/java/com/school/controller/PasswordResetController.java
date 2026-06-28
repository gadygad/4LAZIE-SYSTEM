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
        return "forgot_password";
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
        
        // Futa token za zamani
        tokenRepository.deleteByUser(user);

        // Tengeneza token mpya (expire in 2 minutes)
        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = new PasswordResetToken(token, user, 2);
        tokenRepository.save(resetToken);

        String appUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
        String resetLink = appUrl + "/reset-password?token=" + token;

        emailService.sendPasswordResetEmail(user.getEmail(), resetLink);
        redirectAttributes.addFlashAttribute("success", "A password reset link has been sent to your email. It will expire in 2 minutes.");

        return "redirect:/login";
    }

    @GetMapping("/reset-password")
    public String showResetPasswordForm(@RequestParam("token") String token, Model model) {
        Optional<PasswordResetToken> tokenOpt = tokenRepository.findByToken(token);
        
        if (tokenOpt.isEmpty() || tokenOpt.get().isExpired()) {
            model.addAttribute("error", "The password reset link is invalid or has expired (lasts for 2 minutes). Please request a new one.");
            return "forgot_password";
        }
        
        model.addAttribute("token", token);
        return "reset_password";
    }

    @PostMapping("/reset-password")
    public String processResetPassword(@RequestParam("token") String token,
                                       @RequestParam("password") String password,
                                       RedirectAttributes redirectAttributes) {
        
        Optional<PasswordResetToken> tokenOpt = tokenRepository.findByToken(token);
        
        if (tokenOpt.isEmpty() || tokenOpt.get().isExpired()) {
            redirectAttributes.addFlashAttribute("error", "The password reset time has expired (2 minutes). Please request again.");
            return "redirect:/forgot-password";
        }

        User user = tokenOpt.get().getUser();
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);

        // Futa token baada ya kutumika
        tokenRepository.delete(tokenOpt.get());

        redirectAttributes.addFlashAttribute("success", "Your password has been changed successfully! You can now log in.");
        return "redirect:/login";
    }
}
