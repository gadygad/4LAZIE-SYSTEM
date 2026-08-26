package com.school.service.impl;

import com.school.model.User;
import com.school.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Collections;

/**
 * Not used for the interactive login flow itself — CustomAuthenticationProvider
 * handles that directly against MongoDB. This bean exists purely so Spring
 * Security's remember-me filter can reload a user from just their email
 * (stored in the remember-me cookie) on a brand-new session, without the
 * user having to submit the login form again.
 */
@org.springframework.stereotype.Service
public class CustomUserDetailsService implements UserDetailsService {

        private UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public UserDetails loadUserByUsername(String identifier) throws UsernameNotFoundException {
        User user = userRepository.findFirstByEmailIgnoreCaseOrNameIgnoreCase(identifier, identifier)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email or name: " + identifier));

        String role = user.getRole() != null ? user.getRole().name() : com.school.model.Role.STUDENT.name();
        
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role.toUpperCase()))
        );
    }
}
