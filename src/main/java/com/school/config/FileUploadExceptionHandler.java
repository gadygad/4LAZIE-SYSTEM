package com.school.config;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.ModelAndView;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;

@ControllerAdvice(annotations = Controller.class)
public class FileUploadExceptionHandler {

    @ExceptionHandler({org.springframework.web.multipart.MaxUploadSizeExceededException.class, org.springframework.web.multipart.MultipartException.class})
    public String handleMaxSizeException(Exception exc, HttpServletRequest request, org.springframework.web.servlet.mvc.support.RedirectAttributes redirectAttributes) {
        redirectAttributes.addFlashAttribute("error", "The file you are trying to upload is too large! Maximum allowed size is 50MB.");
        redirectAttributes.addFlashAttribute("errorTitle", "File Too Large");

        return "redirect:" + safeRedirectTarget(request);
    }

    // Referer is attacker-controlled — redirecting straight to it is an open
    // redirect. Only its path+query are reused, and only when its host
    // matches this request's own host; anything else (missing, malformed,
    // or a foreign host) falls back to /dashboard.
    private String safeRedirectTarget(HttpServletRequest request) {
        String referer = request.getHeader("Referer");
        if (referer != null && !referer.isEmpty()) {
            try {
                java.net.URI refererUri = java.net.URI.create(referer);
                if (request.getServerName().equalsIgnoreCase(refererUri.getHost())) {
                    String path = refererUri.getRawPath();
                    if (path != null && path.startsWith("/")) {
                        String query = refererUri.getRawQuery();
                        return query != null ? path + "?" + query : path;
                    }
                }
            } catch (IllegalArgumentException ignored) {
                // Malformed Referer header — fall through to the default below.
            }
        }
        return "/dashboard";
    }

    @ExceptionHandler(Exception.class)
    public ModelAndView handleAllExceptions(HttpServletRequest request, Exception ex) {
        ModelAndView mav = new ModelAndView();
        mav.addObject("exception", ex);
        mav.addObject("url", request.getRequestURL());
        mav.addObject("message", ex.getMessage());
        mav.setViewName("error");
        return mav;
    }
}
