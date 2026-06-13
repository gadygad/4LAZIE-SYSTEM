package com.school.service;

import com.school.model.User;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {
    /**
     * Register a new user, handling profile picture upload.
     * Returns the saved {@link User} instance.
     */
    User registerUser(User user, MultipartFile profilePic) throws Exception;

    User findByEmail(String email);
}
