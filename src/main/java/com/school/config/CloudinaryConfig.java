package com.school.config;

import com.cloudinary.Cloudinary;
import com.school.core.FileStorageService;
import com.school.core.impl.CloudinaryStorageServiceImpl;
import com.school.core.impl.LocalStorageServiceImpl;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class CloudinaryConfig {

    @Value("${cloudinary.cloud_name:}")
    private String cloudName;

    @Value("${cloudinary.api_key:}")
    private String apiKey;

    @Value("${cloudinary.api_secret:}")
    private String apiSecret;

    /**
     * Registers the Cloudinary SDK bean (always created, but may have empty creds locally).
     */
    @Bean
    public Cloudinary cloudinary() {
        Map<String, String> config = new HashMap<>();
        config.put("cloud_name", cloudName);
        config.put("api_key", apiKey);
        config.put("api_secret", apiSecret);
        return new Cloudinary(config);
    }

    /**
     * Returns the appropriate FileStorageService:
     *  - CloudinaryStorageServiceImpl when credentials are available (production/live)
     *  - LocalStorageServiceImpl when credentials are missing (local development)
     */
    @Bean
    @Primary
    public FileStorageService fileStorageService(Cloudinary cloudinary) {
        boolean hasCloudinary = cloudName != null && !cloudName.isBlank()
                && apiKey != null && !apiKey.isBlank()
                && apiSecret != null && !apiSecret.isBlank();

        if (hasCloudinary) {
            System.out.println("[FileStorage] Using Cloudinary storage.");
            CloudinaryStorageServiceImpl impl = new CloudinaryStorageServiceImpl();
            // Inject cloudinary manually since we are constructing outside Spring scan
            impl.setCloudinary(cloudinary);
            return impl;
        } else {
            System.out.println("[FileStorage] Cloudinary credentials not set — using LOCAL storage (uploads/ folder).");
            return new LocalStorageServiceImpl("uploads");
        }
    }
}
