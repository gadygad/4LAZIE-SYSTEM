package com.school.auth;

import com.school.auth.User;
import com.school.auth.UserRepository;
import com.school.auth.PasswordResetToken;
import com.school.auth.PasswordResetTokenRepository;
import com.school.auth.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class UserServiceImpl implements UserService {

        private UserRepository userRepository;

        private PasswordEncoder passwordEncoder;

        private com.school.core.FileStorageService fileStorageService;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, com.school.core.FileStorageService fileStorageService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.fileStorageService = fileStorageService;
    }


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
