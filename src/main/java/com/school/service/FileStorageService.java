package com.school.service;

import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

public interface FileStorageService {
    String uploadFile(MultipartFile file) throws IOException;
    void deleteFile(String publicId) throws IOException;
}
