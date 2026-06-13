package com.school.controller;

import com.school.model.User;
import com.school.service.UserService;
import jakarta.servlet.http.HttpSession;
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
import java.util.Collections;
import java.util.Optional;

@Controller
@SuppressWarnings("null")
public class RegistrationController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/register")
    public String showRegisterForm(Model model) {
        model.addAttribute("user", new User());
        return "register";
    }

    @PostMapping("/register")
    public String registerUser(@ModelAttribute("user") User user,
                               @RequestParam(value = "confirmPassword", required = false) String confirmPassword,
                               @RequestParam(value = "profilePic", required = false) MultipartFile profilePic,
                               HttpSession session,
                               Model model) {
        try {
            if (confirmPassword == null || !confirmPassword.equals(user.getPassword())) {
                throw new Exception("Passwords do not match!");
            }
            // Persist the new user (profile picture handled by service)
            userService.registerUser(user, profilePic);
            
            // Link user directly to session (auto-login)
            session.setAttribute("user", user);
            
        } catch (Exception e) {
            model.addAttribute("error", "Registration failed: " + e.getMessage());
            return "register";
        }
        // After successful registration, redirect to dashboard
        return "redirect:/dashboard";
    }

    @PostMapping("/register/google")
    public String registerWithGoogle(@RequestParam("credential") String credential, HttpSession session, Model model) {
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                .setAudience(Collections.singletonList("PLACEHOLDER_GOOGLE_CLIENT_ID.apps.googleusercontent.com"))
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
                    user.setPassword("GOOGLE_OAUTH_DUMMY");
                    user.setRole("STUDENT");
                    user.setLevel(4); // Default
                    user.setSemester(1); // Default
                    user.setYear(1); // Default
                    user.setCourseProgram("General Studies"); // Default
                    userService.registerUser(user, null);
                }
                session.setAttribute("user", user);
                return "redirect:/dashboard";
            } else {
                throw new Exception("Invalid Google ID token.");
            }
        } catch (Exception e) {
            model.addAttribute("error", "Google Sign-In failed: " + e.getMessage());
            return "register";
        }
    }
}
