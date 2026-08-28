package com.school.auth;

import com.school.auth.PasswordResetToken;
import com.school.auth.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface PasswordResetTokenRepository extends MongoRepository<PasswordResetToken, String> {
    Optional<PasswordResetToken> findByToken(String token);
    void deleteByUser(User user);
}
