package com.school.config;

import com.school.model.User;
import com.school.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AdminDataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;

    public AdminDataInitializer(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        String adminEmail = "admin@example.com";
        if (userRepository.findByEmail(adminEmail).isEmpty()) {
            User admin = new User();
            admin.setName("Admin");
            admin.setEmail(adminEmail);
            admin.setPassword("1234"); // default password
            admin.setRole("ADMIN");
            userRepository.save(admin);
            System.out.println("Default admin user created with email: " + adminEmail + " and password: 1234");
        }
    }
}
