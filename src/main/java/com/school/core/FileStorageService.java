package com.school.core;

import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Set;

public interface FileStorageService {
    String uploadFile(MultipartFile file) throws IOException;
    void deleteFile(String publicId) throws IOException;

    // Utility methods
    String extractCloudinaryPublicId(String fileUrl);
    String getFormat(String filename);
    String getMimeType(String filename);

    // NotesController validates its own uploads against an extension
    // whitelist, but every other upload path (profile/cover photo, group
    // picture, assignment-help attachments) called straight through to
    // Cloudinary/local disk with no check at all — any extension, any
    // content. Both FileStorageService implementations call this first, so
    // the whitelist lives in one place instead of being re-copied (and
    // eventually drifting) at each call site. It also closes a path-
    // traversal angle in LocalStorageServiceImpl, which builds its saved
    // filename from this same extension string — an unvalidated extension
    // containing "../" could otherwise escape the uploads directory.
    Set<String> ALLOWED_UPLOAD_EXTENSIONS = Set.of(
            "jpg", "jpeg", "png", "gif", "webp",
            "pdf", "doc", "docx", "ppt", "pptx", "xls", "xlsx", "txt"
    );

    static void validateUploadOrThrow(MultipartFile file) throws IOException {
        String originalFilename = file.getOriginalFilename();
        String ext = "";
        if (originalFilename != null) {
            int dot = originalFilename.lastIndexOf('.');
            if (dot >= 0 && dot < originalFilename.length() - 1) {
                ext = originalFilename.substring(dot + 1).toLowerCase();
            }
        }
        if (!ALLOWED_UPLOAD_EXTENSIONS.contains(ext)) {
            throw new IOException("Unsupported file type" + (ext.isEmpty() ? "" : " (." + ext + ")")
                    + ". Allowed: images (jpg, png, gif, webp) and documents (pdf, doc, docx, ppt, pptx, xls, xlsx, txt).");
        }
    }
}
