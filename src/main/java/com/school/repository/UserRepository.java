package com.school.repository;

import com.school.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
    Optional<User> findFirstByEmailIgnoreCaseOrNameIgnoreCase(String email, String name);
    java.util.List<User> findByEmailIgnoreCaseOrNameIgnoreCase(String email, String name);
    Optional<User> findByPhoneNumber(String phoneNumber);
    Optional<User> findByVerificationToken(String verificationToken);
    
    java.util.List<User> findTop5ByOrderByDateJoinedDesc();
    
    long countByRole(com.school.model.Role role);
    long countByLastActiveTimeAfter(java.time.LocalDateTime time);
    java.util.List<User> findByLastActiveTimeAfterOrderByLastActiveTimeDesc(java.time.LocalDateTime time);
}
