package com.school.auth;

import com.school.auth.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
    Optional<User> findFirstByEmailIgnoreCaseOrNameIgnoreCase(String email, String name);
    java.util.List<User> findByEmailIgnoreCaseOrNameIgnoreCase(String email, String name);
    Optional<User> findByPhoneNumber(String phoneNumber);
    Optional<User> findByVerificationToken(String verificationToken);
    Optional<User> findBySecurityToken(String securityToken);
    
    java.util.List<User> findTop5ByOrderByDateJoinedDesc();
    
    java.util.List<User> findByNameContainingIgnoreCase(String name);
    java.util.List<User> findByRole(com.school.auth.Role role);
    
    long countByRole(com.school.auth.Role role);
    long countByLastActiveTimeAfter(java.time.LocalDateTime time);
    java.util.List<User> findByLastActiveTimeAfterOrderByLastActiveTimeDesc(java.time.LocalDateTime time);
    java.util.List<User> findByCourseProgramAndLevelAndSemester(String courseProgram, Integer level, Integer semester);
    java.util.List<User> findByWarningCountGreaterThanEqual(Integer warningCount);
}
