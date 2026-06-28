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

    @Autowired
    private com.school.service.FileStorageService fileStorageService;

    @Override
    public User registerUser(User user, MultipartFile profilePic) throws Exception {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new Exception("This email is already in use. Please use another one.");
        }

        // Handle profile picture upload if provided
        if (profilePic != null && !profilePic.isEmpty()) {
            try {
                String fileUrl = fileStorageService.uploadFile(profilePic);
                user.setProfilePicture(fileUrl);
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
