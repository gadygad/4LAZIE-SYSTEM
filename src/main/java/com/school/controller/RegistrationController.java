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

    @GetMapping("/register")
    public String showRegisterForm(Model model) {
        model.addAttribute("user", new User());
        model.addAttribute("institutions", institutionRepository.findAll());
        return "register";
    }

    @PostMapping("/register")
    public String registerUser(@ModelAttribute("user") User user,
                               @RequestParam(value = "profilePic", required = false) MultipartFile profilePic,
                               HttpServletRequest request,
                               HttpServletResponse response,
                               Model model) {
        HttpSession session = request.getSession(true);
        try {
            // Persist the new user (profile picture handled by service)
            userService.registerUser(user, profilePic);
            
            // Link user directly to session (auto-login)
            session.setAttribute("user", user);
            
            // Set Spring Security Context
            List<SimpleGrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + (user.getRole() != null ? user.getRole().name() : Role.STUDENT.name())));
            UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(user.getEmail(), null, authorities);
            SecurityContextHolder.getContext().setAuthentication(auth);
            
            // Save to session explicitly
            HttpSessionSecurityContextRepository securityContextRepository = new HttpSessionSecurityContextRepository();
            securityContextRepository.saveContext(SecurityContextHolder.getContext(), request, response);
            
        } catch (Exception e) {
            log.error("Registration failed", e);
            model.addAttribute("error", "Registration failed: " + e.getMessage());
            return "register";
        }
        // After successful registration, redirect to dashboard
        return "redirect:/dashboard";
    }

    @PostMapping("/register/google")
    public String registerWithGoogle(@RequestParam("credential") String credential, HttpServletRequest request, HttpServletResponse response, Model model) {
        HttpSession session = request.getSession(true);
        try {
            String clientId = System.getenv("GOOGLE_CLIENT_ID");
            if (clientId == null || clientId.isEmpty()) {
                throw new Exception("Google Sign-In is not properly configured on the server (Missing GOOGLE_CLIENT_ID). Please contact the administrator.");
            }
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                .setAudience(Collections.singletonList(clientId))
                .build();

            GoogleIdToken idToken = verifier.verify(credential);
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();
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
            } else {
                throw new Exception("Invalid Google ID token.");
            }
        } catch (Exception e) {
            log.error("Google Sign-In failed", e);
            model.addAttribute("error", "Google Sign-In failed: " + e.getMessage());
            return "register";
        }
    }
}
