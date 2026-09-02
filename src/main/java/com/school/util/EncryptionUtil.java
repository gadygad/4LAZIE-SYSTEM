package com.school.util;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.security.MessageDigest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class EncryptionUtil {

    private static final Logger log = LoggerFactory.getLogger(EncryptionUtil.class);

    @Value("${app.encryption.secret-key:4lazieSecretKeyForEncryption2024}")
    private String injectedSecretKey;

    private static String SECRET_KEY; 
    private static final String ALGORITHM = "AES";

    @PostConstruct
    public void init() {
        SECRET_KEY = this.injectedSecretKey;
    }

    private static byte[] getHashKey() throws Exception {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        return digest.digest(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
    }

    public static String encrypt(String value) {
        try {
            SecretKeySpec secretKey = new SecretKeySpec(getHashKey(), ALGORITHM);
            Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.ENCRYPT_MODE, secretKey);
            byte[] encryptedBytes = cipher.doFinal(value.getBytes(StandardCharsets.UTF_8));
            return Base64.getUrlEncoder().withoutPadding().encodeToString(encryptedBytes);
        } catch (Exception e) {
            log.error("Encryption failed", e);
            return value; // Fallback to raw value
        }
    }

    public static String decrypt(String encryptedValue) {
        try {
            SecretKeySpec secretKey = new SecretKeySpec(getHashKey(), ALGORITHM);
            Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.DECRYPT_MODE, secretKey);
            byte[] decodedBytes = Base64.getUrlDecoder().decode(encryptedValue);
            return new String(cipher.doFinal(decodedBytes), StandardCharsets.UTF_8);
        } catch (Exception e) {
            log.debug("Decryption failed, falling back to raw value (likely a pre-encryption legacy URL): {}", e.getMessage());
            return encryptedValue; // Fallback to raw if decryption fails (e.g., old URLs)
        }
    }
}
