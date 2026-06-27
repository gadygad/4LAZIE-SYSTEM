package com.school.service;

import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

public interface FileStorageService {
    String uploadFile(MultipartFile file) throws IOException;
    void deleteFile(String publicId) throws IOException;
    
    // Utility methods
    String extractCloudinaryPublicId(String fileUrl);
    String getFormat(String filename);
    String getMimeType(String filename);
}
