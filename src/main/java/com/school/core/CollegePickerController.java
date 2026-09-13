package com.school.core;

import com.school.academic.Institution;
import com.school.academic.InstitutionRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

// Lets a guest pick which college's notes/courses they want to see, and
// remembers that choice in a cookie so they aren't asked again on every
// visit. GlobalSidebarAdvice reads the same cookie to scope the sidebar and
// course lists to that college. Nothing forces a visitor through this page
// yet — that's the next step, once there's more than one college with real
// content worth choosing between.
@Controller
public class CollegePickerController {

    public static final String COOKIE_NAME = "selected_institution_id";
    private static final int COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 180; // ~6 months

    private final InstitutionRepository institutionRepository;

    public CollegePickerController(InstitutionRepository institutionRepository) {
        this.institutionRepository = institutionRepository;
    }

    @GetMapping("/choose-college")
    public String showPicker(@RequestParam(value = "redirect", required = false) String redirectTo, Model model) {
        List<Institution> institutions = institutionRepository.findAll();
        model.addAttribute("institutions", institutions);
        model.addAttribute("redirectTo", (redirectTo != null && redirectTo.startsWith("/")) ? redirectTo : "/");
        return "public/choose_college";
    }

    @PostMapping("/choose-college/select")
    public String selectCollege(@RequestParam("institutionId") String institutionId,
                                 @RequestParam(value = "redirect", required = false) String redirectTo,
                                 HttpServletResponse response) {
        // Only accept ids that actually exist, so a stale/garbage cookie can
        // never point the sidebar at a college that isn't there anymore.
        if (institutionRepository.existsById(institutionId)) {
            Cookie cookie = new Cookie(COOKIE_NAME, institutionId);
            cookie.setMaxAge(COOKIE_MAX_AGE_SECONDS);
            cookie.setPath("/");
            cookie.setHttpOnly(true);
            response.addCookie(cookie);
        }
        String target = (redirectTo != null && redirectTo.startsWith("/")) ? redirectTo : "/";
        return "redirect:" + target;
    }

    // Small helper so any controller/interceptor can read the guest's choice
    // the same way, without duplicating the cookie-scanning loop everywhere.
    public static String readSelectedInstitutionId(HttpServletRequest request) {
        if (request.getCookies() == null) return null;
        for (Cookie cookie : request.getCookies()) {
            if (COOKIE_NAME.equals(cookie.getName())) {
                return cookie.getValue();
            }
        }
        return null;
    }
}
