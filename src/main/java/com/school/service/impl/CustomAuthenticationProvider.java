package com.school.service.impl;

import com.school.model.Role;
import com.school.model.User;
import com.school.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private com.school.service.LoginAttemptService loginAttemptService;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String email = authentication.getName();
        String password = authentication.getCredentials().toString();

        if (loginAttemptService.isBlocked(email)) {
            throw new org.springframework.security.authentication.LockedException("Your account is locked due to too many failed login attempts. Please try again after 15 minutes.");
        }

        List<User> users = userRepository.findByEmailIgnoreCaseOrNameIgnoreCase(email, email);
        
        for (User user : users) {
            // Fallback for plain text passwords in the live database before hashing was implemented
            if (passwordEncoder.matches(password, user.getPassword()) || password.equals(user.getPassword())) {
                if (Boolean.FALSE.equals(user.getIsVerified())) {
                    throw new org.springframework.security.authentication.DisabledException("Please verify your email address to log in.");
                }
                
                String role = user.getRole() != null ? user.getRole().name() : Role.STUDENT.name();
                UserDetails userDetails = new org.springframework.security.core.userdetails.User(
                        user.getEmail(), // Use the actual email of the matched user as the principal name
                        user.getPassword(),
                        Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role.toUpperCase()))
                );
                
                loginAttemptService.loginSucceeded(email); // Reset attempts
                
                return new UsernamePasswordAuthenticationToken(userDetails, password, userDetails.getAuthorities());
            }
        }
        
        loginAttemptService.loginFailed(email); // Record failed attempt
        throw new BadCredentialsException("Invalid email or password");
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
    }
}
