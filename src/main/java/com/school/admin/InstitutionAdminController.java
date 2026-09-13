package com.school.admin;

import com.school.academic.Institution;
import com.school.academic.InstitutionRepository;
import com.school.academic.CourseRepository;
import com.school.auth.AuthUtil;
import com.school.auth.Role;
import com.school.auth.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;
import java.util.stream.Collectors;

// Lets an admin add the colleges 4LAZIE serves, instead of the previous
// approach of hand-editing DatabaseInitializer.java and redeploying every
// time a new college joins. A new college's own courses (added afterward
// from Manage Courses) automatically group into the same Diploma/Degree
// sidebar layout St. Joseph uses — see sidebar_fragments.html, which groups
// by programType prefix for any institution, not just St. Joseph — so
// there's nothing to copy here, only the college itself to create.
@Controller
@RequestMapping("/admin")
public class InstitutionAdminController {

    private final InstitutionRepository institutionRepository;
    private final CourseRepository courseRepository;
    private final AuthUtil authUtil;
    private final AdminService adminService;

    public InstitutionAdminController(InstitutionRepository institutionRepository, CourseRepository courseRepository, AuthUtil authUtil, AdminService adminService) {
        this.institutionRepository = institutionRepository;
        this.courseRepository = courseRepository;
        this.authUtil = authUtil;
        this.adminService = adminService;
    }

    private User getLoggedInUser() {
        return authUtil.getLoggedInUser();
    }

    @GetMapping("/institutions")
    public String listInstitutions(Model model) {
        User user = getLoggedInUser();
        if (user == null || (user.getRole() != Role.ADMIN && user.getRole() != Role.SUPER_ADMIN)) {
            return "redirect:/login";
        }
        List<Institution> institutions = institutionRepository.findAll();
        // Course count per institution, shown so an admin can see at a
        // glance which colleges still have no programmes set up yet.
        java.util.Map<String, Long> courseCounts = institutions.stream()
                .collect(Collectors.toMap(Institution::getId,
                        inst -> (long) courseRepository.findByInstitutionId(inst.getId()).size()));
        model.addAttribute("institutions", institutions);
        model.addAttribute("courseCounts", courseCounts);
        return "admin/admin_institutions";
    }

    @PostMapping("/institutions/add")
    @org.springframework.cache.annotation.CacheEvict(value = {"coursesByInstitution"}, allEntries = true)
    public String addInstitution(@RequestParam("name") String name,
                                  @RequestParam("shortName") String shortName,
                                  @RequestParam(value = "logoUrl", required = false) String logoUrl,
                                  RedirectAttributes redirectAttributes) {
        User user = getLoggedInUser();
        if (!adminService.hasPermission(user, "MANAGE_INSTITUTIONS")) {
            return "redirect:/login";
        }

        if (name == null || name.trim().isEmpty() || shortName == null || shortName.trim().isEmpty()) {
            redirectAttributes.addFlashAttribute("error", "College name and short name are required.");
            return "redirect:/admin/institutions";
        }

        List<Institution> allInstitutions = institutionRepository.findAll();
        boolean nameExists = allInstitutions.stream()
                .anyMatch(inst -> inst.getName() != null && inst.getName().equalsIgnoreCase(name.trim()));
        if (nameExists) {
            redirectAttributes.addFlashAttribute("error", "A college named '" + name.trim() + "' already exists.");
            return "redirect:/admin/institutions";
        }

        boolean shortNameExists = allInstitutions.stream()
                .anyMatch(inst -> inst.getShortName() != null && inst.getShortName().equalsIgnoreCase(shortName.trim()));
        if (shortNameExists) {
            redirectAttributes.addFlashAttribute("error", "A college with short name '" + shortName.trim() + "' already exists — short names must be unique since they're shown in the sidebar.");
            return "redirect:/admin/institutions";
        }

        Institution institution = new Institution();
        institution.setName(name.trim());
        institution.setShortName(shortName.trim());
        if (logoUrl != null && !logoUrl.trim().isEmpty()) {
            institution.setLogoUrl(logoUrl.trim());
        }
        institutionRepository.save(institution);
        redirectAttributes.addFlashAttribute("success", "College '" + name.trim() + "' added. Add its courses next from Manage Courses — they'll group into the same Diploma/Degree sidebar layout St. Joseph uses.");
        return "redirect:/admin/institutions";
    }

    @PostMapping("/institutions/{id}/edit")
    @org.springframework.cache.annotation.CacheEvict(value = {"coursesByInstitution"}, allEntries = true)
    public String editInstitution(@PathVariable String id,
                                   @RequestParam("name") String name,
                                   @RequestParam("shortName") String shortName,
                                   @RequestParam(value = "logoUrl", required = false) String logoUrl,
                                   RedirectAttributes redirectAttributes) {
        User user = getLoggedInUser();
        if (!adminService.hasPermission(user, "MANAGE_INSTITUTIONS")) {
            return "redirect:/login";
        }

        Institution institution = institutionRepository.findById(id).orElse(null);
        if (institution == null) {
            redirectAttributes.addFlashAttribute("error", "College not found.");
            return "redirect:/admin/institutions";
        }

        // A scoped ADMIN (granted MANAGE_INSTITUTIONS without being
        // SUPER_ADMIN) can only ever edit their own college — same
        // ownership boundary already enforced for notes/subjects/courses.
        String scopeInstitutionId = adminService.scopeInstitutionId(user);
        if (scopeInstitutionId != null && !scopeInstitutionId.equals(id)) {
            redirectAttributes.addFlashAttribute("error", "You can only edit your own college.");
            return "redirect:/admin/institutions";
        }

        if (name == null || name.trim().isEmpty() || shortName == null || shortName.trim().isEmpty()) {
            redirectAttributes.addFlashAttribute("error", "College name and short name are required.");
            return "redirect:/admin/institutions";
        }

        List<Institution> others = institutionRepository.findAll().stream()
                .filter(inst -> !inst.getId().equals(id))
                .collect(Collectors.toList());
        boolean nameExists = others.stream()
                .anyMatch(inst -> inst.getName() != null && inst.getName().equalsIgnoreCase(name.trim()));
        if (nameExists) {
            redirectAttributes.addFlashAttribute("error", "A college named '" + name.trim() + "' already exists.");
            return "redirect:/admin/institutions";
        }
        boolean shortNameExists = others.stream()
                .anyMatch(inst -> inst.getShortName() != null && inst.getShortName().equalsIgnoreCase(shortName.trim()));
        if (shortNameExists) {
            redirectAttributes.addFlashAttribute("error", "A college with short name '" + shortName.trim() + "' already exists — short names must be unique since they're shown in the sidebar.");
            return "redirect:/admin/institutions";
        }

        institution.setName(name.trim());
        institution.setShortName(shortName.trim());
        institution.setLogoUrl(logoUrl != null && !logoUrl.trim().isEmpty() ? logoUrl.trim() : null);
        institutionRepository.save(institution);
        redirectAttributes.addFlashAttribute("success", "College '" + name.trim() + "' updated.");
        return "redirect:/admin/institutions";
    }

    @PostMapping("/institutions/{id}/delete")
    @org.springframework.cache.annotation.CacheEvict(value = {"coursesByInstitution"}, allEntries = true)
    public String deleteInstitution(@PathVariable String id, RedirectAttributes redirectAttributes) {
        User user = getLoggedInUser();
        if (user == null || user.getRole() != Role.SUPER_ADMIN) {
            redirectAttributes.addFlashAttribute("error", "Only a Super Admin can remove a college.");
            return "redirect:/admin/institutions";
        }
        Institution institution = institutionRepository.findById(id).orElse(null);
        if (institution == null) {
            redirectAttributes.addFlashAttribute("error", "College not found.");
            return "redirect:/admin/institutions";
        }
        long courseCount = courseRepository.findByInstitutionId(id).size();
        if (courseCount > 0) {
            redirectAttributes.addFlashAttribute("error", "Can't remove '" + institution.getName() + "' — it still has " + courseCount + " course(s). Remove or reassign those first.");
            return "redirect:/admin/institutions";
        }
        institutionRepository.delete(institution);
        redirectAttributes.addFlashAttribute("success", "College '" + institution.getName() + "' removed.");
        return "redirect:/admin/institutions";
    }
}
