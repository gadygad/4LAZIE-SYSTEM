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
    @SuppressWarnings("unchecked")
    public String uploadFile(MultipartFile file) throws IOException {
        String originalFilename = file.getOriginalFilename();
        String extension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }

        // Generate a unique public_id with the proper extension
        String publicId = UUID.randomUUID().toString() + extension;

        // Upload as raw type with public access
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                "public_id", publicId,
                "resource_type", "raw",
                "type", "upload"
        ));

        // Generate a signed private download URL (never expires) so access is always possible
        // regardless of Cloudinary account access control settings
        try {
            String signedUrl = cloudinary.privateDownload(
                    publicId,
                    extension.isEmpty() ? "pdf" : extension.substring(1), // format without dot
                    ObjectUtils.asMap("resource_type", "raw")
            );
            return signedUrl;
        } catch (Exception e) {
            // Fallback to the secure_url from upload result
            return uploadResult.get("secure_url").toString();
        }
    }

    @Override
    public void deleteFile(String publicId) throws IOException {
        cloudinary.uploader().destroy(publicId, ObjectUtils.asMap("resource_type", "raw"));
    }
}
