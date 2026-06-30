package com.school.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.school.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@Service
public class CloudinaryStorageServiceImpl implements FileStorageService {

    @Autowired
    private Cloudinary cloudinary;

    @Override
    public String uploadFile(MultipartFile file) throws IOException {
        String originalFilename = file.getOriginalFilename();
        String extension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }

        // Generate a unique public_id that includes the file extension
        String publicId = UUID.randomUUID().toString() + extension;
        
        // Default to auto, but force 'raw' for PDFs and docs to prevent Cloudinary free-tier delivery restrictions
        String resourceType = "auto";
        String lowerExt = extension.toLowerCase();
        if (lowerExt.equals(".pdf") || lowerExt.equals(".doc") || lowerExt.equals(".docx") || lowerExt.equals(".ppt") || lowerExt.equals(".pptx")) {
            resourceType = "raw";
        }

        // Upload as raw type so PDFs are served without Cloudinary security blocks
        Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                "public_id", publicId,
                "resource_type", resourceType,
                "type", "upload"
        ));

        // Store the secure CDN URL - publicId is embedded in this URL for later extraction
        return uploadResult.get("secure_url").toString();
    }

    @Override
    public void deleteFile(String publicId) throws IOException {
        try {
            cloudinary.uploader().destroy(publicId, ObjectUtils.asMap("resource_type", "image"));
        } catch (Exception e) {
            // fallback
        }
        try {
            cloudinary.uploader().destroy(publicId, ObjectUtils.asMap("resource_type", "raw"));
        } catch (Exception e) {
            // fallback
        }
    }

    @Override
    public String extractCloudinaryPublicId(String fileUrl) {
        String clean = fileUrl.contains("?") ? fileUrl.substring(0, fileUrl.indexOf("?")) : fileUrl;
        int idx = clean.lastIndexOf("/");
        String publicId = idx >= 0 ? clean.substring(idx + 1) : clean;
        return publicId;
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
