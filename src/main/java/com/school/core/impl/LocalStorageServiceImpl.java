package com.school.core.impl;

import com.school.core.FileStorageService;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

/**
 * Local storage implementation used when Cloudinary credentials are not configured.
 * Files are saved to the 'uploads/' directory relative to the working directory.
 */
public class LocalStorageServiceImpl implements FileStorageService {

    private final Path uploadDir;

    public LocalStorageServiceImpl(String uploadDirPath) {
        this.uploadDir = Paths.get(uploadDirPath);
        try {
            Files.createDirectories(this.uploadDir);
        } catch (IOException e) {
            throw new RuntimeException("Could not create upload directory: " + uploadDirPath, e);
        }
    }

    @Override
    public String uploadFile(MultipartFile file) throws IOException {
        String originalFilename = file.getOriginalFilename();
        String extension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }
        String filename = UUID.randomUUID().toString() + extension;
        Path targetPath = uploadDir.resolve(filename);
        Files.write(targetPath, file.getBytes());
        // Return just the filename — controller will prefix with /uploads/
        return filename;
    }

    @Override
    public void deleteFile(String publicId) throws IOException {
        // publicId here is just the filename
        Path file = uploadDir.resolve(publicId);
        if (Files.exists(file)) {
            Files.delete(file);
        }
    }

    @Override
    public String extractCloudinaryPublicId(String fileUrl) {
        // For local storage, the "publicId" is just the filename
        int idx = fileUrl.lastIndexOf("/");
        return idx >= 0 ? fileUrl.substring(idx + 1) : fileUrl;
    }

    @Override
    public String getFormat(String filename) {
        if (filename != null && filename.contains(".")) {
            return filename.substring(filename.lastIndexOf(".") + 1).toLowerCase();
        }
        return "pdf";
    }

    @Override
    public String getMimeType(String filename) {
        if (filename == null) return "application/pdf";
        String lower = filename.toLowerCase();
        if (lower.endsWith(".pdf"))  return "application/pdf";
        if (lower.endsWith(".docx")) return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        if (lower.endsWith(".doc"))  return "application/msword";
        if (lower.endsWith(".pptx")) return "application/vnd.openxmlformats-officedocument.presentationml.presentation";
        if (lower.endsWith(".ppt"))  return "application/vnd.ms-powerpoint";
        if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
        if (lower.endsWith(".png"))  return "image/png";
        return "application/octet-stream";
    }
}
