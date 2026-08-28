package com.school.auth;

import com.school.auth.User;
import com.school.auth.UserService;
import com.school.auth.AuthUtil;
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
import com.school.auth.Role;
import com.school.auth.UserRepository;
import com.school.academic.InstitutionRepository;
import com.school.academic.CourseRepository;
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
import com.school.auth.Role;

@Controller
public class RegistrationController {
    private static final Logger log = LoggerFactory.getLogger(RegistrationController.class);

        private UserService userService;

        private UserRepository userRepository;

        private InstitutionRepository institutionRepository;

        private CourseRepository courseRepository;

        private com.school.core.GoogleAuthService googleAuthService;

        private com.school.core.EmailService emailService;

    public RegistrationController(UserService userService, UserRepository userRepository, InstitutionRepository institutionRepository, CourseRepository courseRepository, com.school.core.GoogleAuthService googleAuthService, com.school.core.EmailService emailService) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.institutionRepository = institutionRepository;
        this.courseRepository = courseRepository;
        this.googleAuthService = googleAuthService;
        this.emailService = emailService;
    }


    @GetMapping("/register")
    public String showRegisterForm(@RequestParam(value = "redirect", required = false) String redirectUrl,
                                   jakarta.servlet.http.HttpSession session, Model model) {
        if (redirectUrl != null && !redirectUrl.isEmpty() && redirectUrl.startsWith("/")) {
            session.setAttribute("redirectUrl", redirectUrl);
        }
        model.addAttribute("user", new User());
        try {
            model.addAttribute("institutions", institutionRepository.findAll());
            model.addAttribute("courses", courseRepository.findAll());
        } catch (Exception e) {
            model.addAttribute("institutions", java.util.Collections.emptyList());
            model.addAttribute("courses", java.util.Collections.emptyList());
        }
        return "auth/register";
    }

    @PostMapping("/register")
    public String registerUser(@Valid @ModelAttribute("user") User user,
                               BindingResult result,
                               @RequestParam(value = "profilePic", required = false) MultipartFile profilePic,
                               HttpServletRequest request,
                               HttpServletResponse response,
                               Model model) {
        if (result.hasErrors() || user.getInstitution() == null || user.getInstitution().getId() == null || user.getCourseProgram() == null || user.getCourseProgram().isEmpty()) {
            if (!result.hasErrors()) {
                model.addAttribute("error", "Please select both your Institution and Course.");
            }
            model.addAttribute("institutions", institutionRepository.findAll());
            model.addAttribute("courses", courseRepository.findAll());
            return "auth/register";
        }
        
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            model.addAttribute("error", "Sorry, this email (" + user.getEmail() + ") is already registered. Please log in or use another email.");
            model.addAttribute("institutions", institutionRepository.findAll());
            model.addAttribute("courses", courseRepository.findAll());
            return "auth/register";
        }
        
        HttpSession session = request.getSession(true);
        try {
            // Force safe defaults to prevent mass assignment (Privilege Escalation)
            user.setRole(Role.STUDENT);
            
            // Set verification logic
            user.setIsVerified(false);
            user.setVerificationToken(UUID.randomUUID().toString());
            user.setTokenExpiryDate(java.time.LocalDateTime.now().plusHours(24));

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
            return "auth/register";
        }
    }

    @PostMapping("/register/google")
    public String registerWithGoogle(@RequestParam("credential") String credential, 
                                     @RequestParam(value = "courseProgram", required = false) String courseProgram,
                                     @RequestParam(value = "institutionId", required = false) String institutionId,
                                     HttpServletRequest request, HttpServletResponse response, Model model) {
        HttpSession session = request.getSession(true);
        try {
            GoogleIdToken.Payload payload = googleAuthService.verifyToken(credential);
            String email = payload.getEmail();
            String name = (String) payload.get("name");

                Optional<User> existingUser = userRepository.findFirstByEmailIgnoreCaseOrNameIgnoreCase(email, email);
                User user;
                if (existingUser.isPresent()) {
                    user = existingUser.get();
                } else {
                    if (courseProgram == null || courseProgram.trim().isEmpty() || institutionId == null || institutionId.trim().isEmpty()) {
                        model.addAttribute("error", "Please select both your Institution and Course before signing in with Google.");
                        model.addAttribute("user", new User());
                        try {
                            model.addAttribute("institutions", institutionRepository.findAll());
                            model.addAttribute("courses", courseRepository.findAll());
                        } catch (Exception e) {}
                        return "auth/register";
                    }
                    user = new User();
                    user.setEmail(email);
                    user.setName(name);
                    user.setPassword(UUID.randomUUID().toString());
                    user.setRole(Role.STUDENT);
                    user.setLevel(4); // Default
                    user.setSemester(1); // Default
                    user.setYear(1); // Default
                    user.setCourseProgram(courseProgram); // Default
                    institutionRepository.findById(institutionId).ifPresent(user::setInstitution); // Set chosen institution
                    user.setIsVerified(true); // Google accounts are auto-verified
                    userService.registerUser(user, null);
                }
                session.setAttribute("user", user);
                
                // Set Spring Security Context for Google User
                String roleName = user.getRole() != null ? user.getRole().name() : Role.STUDENT.name();
                List<SimpleGrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + roleName));
                UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(user.getEmail(), null, authorities);
                SecurityContextHolder.getContext().setAuthentication(auth);
                
                // Save to session explicitly
                HttpSessionSecurityContextRepository securityContextRepository = new HttpSessionSecurityContextRepository();
                securityContextRepository.saveContext(SecurityContextHolder.getContext(), request, response);
                
                if (user.getRole() == Role.ADMIN || user.getRole() == Role.SUPER_ADMIN) {
                    return "redirect:/admin/dashboard";
                }
                return "redirect:/dashboard";
            
        } catch (Exception e) {
            log.error("Google Sign-In failed", e);
            model.addAttribute("error", "Google Sign-In failed: " + e.getMessage());
            model.addAttribute("user", new User());
            try {
                model.addAttribute("institutions", institutionRepository.findAll());
                model.addAttribute("courses", courseRepository.findAll());
            } catch (Exception ex) {
                model.addAttribute("institutions", java.util.Collections.emptyList());
                model.addAttribute("courses", java.util.Collections.emptyList());
            }
            return "auth/register";
        }
    }

    @GetMapping("/verify-email")
    public String verifyEmail(@RequestParam("token") String token, Model model) {
        Optional<User> userOpt = userRepository.findByVerificationToken(token);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (user.getTokenExpiryDate() != null && user.getTokenExpiryDate().isBefore(java.time.LocalDateTime.now())) {
                userRepository.delete(user);
                model.addAttribute("error", "Verification link has expired (over 24 hours). Please register again.");
                return "auth/login";
            }
            user.setIsVerified(true);
            user.setVerificationToken(null);
            user.setTokenExpiryDate(null);
            userRepository.save(user);
            return "redirect:/login?verified=true";
        }
        model.addAttribute("error", "Invalid verification token.");
        return "auth/login";
    }
}
