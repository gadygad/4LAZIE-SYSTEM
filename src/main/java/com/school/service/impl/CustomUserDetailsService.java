package com.school.service.impl;

import com.school.model.User;
import com.school.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Collections;

// @Service (Disabled in favor of CustomAuthenticationProvider)
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

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
