package com.school.config;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.ModelAndView;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;

@ControllerAdvice(value = "configGlobalExceptionHandler", annotations = Controller.class)
public class GlobalExceptionHandler {

    @ExceptionHandler({org.springframework.web.multipart.MaxUploadSizeExceededException.class, org.springframework.web.multipart.MultipartException.class})
    public String handleMaxSizeException(Exception exc, HttpServletRequest request, org.springframework.web.servlet.mvc.support.RedirectAttributes redirectAttributes) {
        String referer = request.getHeader("Referer");
        
        redirectAttributes.addFlashAttribute("error", "The file you are trying to upload is too large! Maximum allowed size is 50MB.");
        redirectAttributes.addFlashAttribute("errorTitle", "File Too Large");
        
        if (referer != null && !referer.isEmpty()) {
            return "redirect:" + referer;
        }
        return "redirect:/dashboard";
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
