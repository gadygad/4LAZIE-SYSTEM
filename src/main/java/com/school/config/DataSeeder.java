package com.school.config;

import com.school.model.TeamMember;
import com.school.repository.TeamMemberRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
public class DataSeeder {

    @Bean
    public CommandLineRunner initDatabase(TeamMemberRepository teamMemberRepository) {
        return args -> {
            if (teamMemberRepository.count() == 0) {
                System.out.println("Seeding Team Members...");
                
                TeamMember member1 = new TeamMember(
                    "Careen John", 
                    "Founder & Visionary", 
                    "Technology should simplify life. We built 4LAZIE to ensure no SJUIT student stresses over finding study materials.", 
                    "/images/team1.jpg", 
                    1, 
                    true
                );
                
                TeamMember member2 = new TeamMember(
                    "David M.", 
                    "Chief Technology Officer", 
                    "Every feature in this platform is carefully crafted to guarantee speed, security, and efficiency for every student.", 
                    "/images/team5.jpg", 
                    2, 
                    true
                );
                
                TeamMember member3 = new TeamMember(
                    "Sarah K.", 
                    "Head of Product", 
                    "Our goal is to build a strong bridge between academic difficulty and the ease of accessing resources. 4LAZIE is that bridge.", 
                    "/images/team2.jpg", 
                    3, 
                    true
                );
                
                TeamMember member4 = new TeamMember(
                    "Brian T.", 
                    "Lead Developer", 
                    "We've transformed lines of code into a real solution. Learning is now a highly enjoyable experience!", 
                    "/images/team3.jpg", 
                    4, 
                    true
                );
                
                TeamMember member5 = new TeamMember(
                    "Grace W.", 
                    "Student Success Manager", 
                    "Your success is our joy. This platform exists to empower you to succeed easier and with much less effort.", 
                    "/images/team4.jpg", 
                    5, 
                    true
                );
                
                teamMemberRepository.saveAll(Arrays.asList(member1, member2, member3, member4, member5));
                System.out.println("Team Members seeded successfully!");
            }
        };
    }
}
