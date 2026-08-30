package com.school;

import com.school.auth.UserRepository;
import com.school.auth.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.context.annotation.Profile;

@Component
@Profile("checkusers")
public class CheckUsersRunner implements CommandLineRunner {
    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        User user = userRepository.findByEmail("kilingepazasauti@gmail.com").orElse(null);
        if (user != null) {
            System.out.println("USER_DETAILS_START");
            System.out.println("Name: " + user.getName());
            System.out.println("Email: " + user.getEmail());
            System.out.println("ProfilePic: " + user.getProfilePicture());
            System.out.println("CoverPic: " + user.getCoverPhoto());
            System.out.println("USER_DETAILS_END");
            
            // Force update it right now!
            user.setName("4LAZIE");
            user.setProfilePicture("/images/icon-512.png");
            user.setCoverPhoto("/images/logo.png");
            user.setHasVerifiedBadge(true);
            userRepository.save(user);
            System.out.println("USER_FORCED_UPDATE_SUCCESS");
        } else {
            System.out.println("USER_NOT_FOUND");
        }
        System.exit(0);
    }
}
