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

        // Generate a unique public_id that includes the file extension
        String publicId = UUID.randomUUID().toString() + extension;

        // Upload as raw type - store public URL; signed URL is generated on-the-fly at read time
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                "public_id", publicId,
                "resource_type", "raw",
                "type", "authenticated"
        ));

        // Store the secure CDN URL - publicId is embedded in this URL for later extraction
        return uploadResult.get("secure_url").toString();
    }

    @Override
    public void deleteFile(String publicId) throws IOException {
        cloudinary.uploader().destroy(publicId, ObjectUtils.asMap("resource_type", "raw"));
    }
}
