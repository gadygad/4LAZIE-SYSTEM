package com.school.exception;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import jakarta.servlet.http.HttpServletRequest;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public String handleMaxSizeException(MaxUploadSizeExceededException exc, HttpServletRequest request, RedirectAttributes redirectAttributes) {
        String referer = request.getHeader("Referer");
        
        redirectAttributes.addFlashAttribute("error", "The file you are trying to upload is too large! Maximum allowed size is 50MB.");
        redirectAttributes.addFlashAttribute("errorTitle", "File Too Large");
        
        // Redirect back to the page the user came from
        if (referer != null && !referer.isEmpty()) {
            return "redirect:" + referer;
        }
        
        // Fallback redirect if referer is null
        return "redirect:/dashboard";
    }
}
