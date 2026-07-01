package com.school.controller;

import com.school.model.User;
import com.school.service.UserService;
import jakarta.servlet.http.HttpSession;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import com.school.repository.UserRepository;
import com.school.repository.InstitutionRepository;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import jakarta.validation.Valid;
import org.springframework.validation.BindingResult;
import com.school.model.Role;

@Controller
public class RegistrationController {
    private static final Logger log = LoggerFactory.getLogger(RegistrationController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private InstitutionRepository institutionRepository;

    @Autowired
    private com.school.service.GoogleAuthService googleAuthService;

    @Autowired
    private com.school.service.EmailService emailService;

    @GetMapping("/register")
    public String showRegisterForm(Model model) {
        model.addAttribute("user", new User());
        try {
            model.addAttribute("institutions", institutionRepository.findAll());
        } catch (Exception e) {
            model.addAttribute("institutions", java.util.Collections.emptyList());
        }
        return "register";
    }

    @PostMapping("/register")
    public String registerUser(@Valid @ModelAttribute("user") User user,
                               BindingResult result,
                               @RequestParam(value = "profilePic", required = false) MultipartFile profilePic,
                               HttpServletRequest request,
                               HttpServletResponse response,
                               Model model) {
        if (result.hasErrors()) {
            model.addAttribute("institutions", institutionRepository.findAll());
            return "register";
        }
        
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            model.addAttribute("error", "Samahani, Email hii (" + user.getEmail() + ") tayari imesajiliwa. Tafadhali Log in au tumia email nyingine.");
            model.addAttribute("institutions", institutionRepository.findAll());
            return "register";
        }
        
        HttpSession session = request.getSession(true);
        try {
            // Force safe defaults to prevent mass assignment (Privilege Escalation)
            user.setRole(Role.STUDENT);
            
            // Set verification logic
            user.setIsVerified(false);
            user.setVerificationToken(UUID.randomUUID().toString());
            user.setTokenExpiryDate(java.time.LocalDateTime.now().plusMinutes(5));

            // Persist the new user (profile picture handled by service)
            userService.registerUser(user, profilePic);
            
            // Send verification email
            String appUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
            String verifyLink = appUrl + "/verify-email?token=" + user.getVerificationToken();
            emailService.sendVerificationEmail(user.getEmail(), verifyLink);
            
            // Redirect to login asking them to verify
            return "redirect:/login?verify_notice=true";
            
        } catch (Exception e) {
            log.error("Registration failed", e);
            model.addAttribute("error", "Registration failed: " + e.getMessage());
            return "register";
        }
    }

    @PostMapping("/register/google")
    public String registerWithGoogle(@RequestParam("credential") String credential, HttpServletRequest request, HttpServletResponse response, Model model) {
        HttpSession session = request.getSession(true);
        try {
            GoogleIdToken.Payload payload = googleAuthService.verifyToken(credential);
            String email = payload.getEmail();
            String name = (String) payload.get("name");

                Optional<User> existingUser = userRepository.findByEmail(email);
                User user;
                if (existingUser.isPresent()) {
                    user = existingUser.get();
                } else {
                    user = new User();
                    user.setEmail(email);
                    user.setName(name);
                    user.setPassword(UUID.randomUUID().toString());
                    user.setRole(Role.STUDENT);
                    user.setLevel(4); // Default
                    user.setSemester(1); // Default
                    user.setYear(1); // Default
                    user.setCourseProgram("General Studies"); // Default
                    institutionRepository.findById("1").ifPresent(user::setInstitution); // Default to SJCET
                    user.setIsVerified(true); // Google accounts are auto-verified
                    userService.registerUser(user, null);
                }
                session.setAttribute("user", user);
                
                // Set Spring Security Context for Google User
                List<SimpleGrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getRole().name()));
                UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(user.getEmail(), null, authorities);
                SecurityContextHolder.getContext().setAuthentication(auth);
                
                // Save to session explicitly
                HttpSessionSecurityContextRepository securityContextRepository = new HttpSessionSecurityContextRepository();
                securityContextRepository.saveContext(SecurityContextHolder.getContext(), request, response);
                
                
                return "redirect:/dashboard";
            
        } catch (Exception e) {
            log.error("Google Sign-In failed", e);
            model.addAttribute("error", "Google Sign-In failed: " + e.getMessage());
            return "register";
        }
    }

    @GetMapping("/verify-email")
    public String verifyEmail(@RequestParam("token") String token, Model model) {
        Optional<User> userOpt = userRepository.findByVerificationToken(token);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (user.getTokenExpiryDate() != null && user.getTokenExpiryDate().isBefore(java.time.LocalDateTime.now())) {
                model.addAttribute("error", "Verification link has expired. Please register again or request a new link.");
                return "login";
            }
            user.setIsVerified(true);
            user.setVerificationToken(null);
            user.setTokenExpiryDate(null);
            userRepository.save(user);
            return "redirect:/login?verified=true";
        }
        model.addAttribute("error", "Invalid verification token.");
        return "login";
    }
}
