package com.school.service.impl;

import com.school.model.User;
import com.school.repository.UserRepository;
import com.school.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User registerUser(User user, MultipartFile profilePic) throws Exception {
        // Handle profile picture upload if provided
        if (profilePic != null && !profilePic.isEmpty()) {
            String filename = System.currentTimeMillis() + "_" + profilePic.getOriginalFilename();
            try {
                Path uploadDir = Path.of("uploads");
                if (!Files.exists(uploadDir)) {
                    Files.createDirectories(uploadDir);
                }
                Path filePath = uploadDir.resolve(filename);
                Files.copy(profilePic.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                user.setProfilePicture(filename);
            } catch (IOException e) {
                throw new Exception("Failed to upload profile picture: " + e.getMessage());
            }
        }
        
        // Hash the password if it's not already hashed (dummy check)
        if (user.getPassword() != null && !user.getPassword().startsWith("$2a$")) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }

        // Save the new user
        return userRepository.save(user);
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }
}
