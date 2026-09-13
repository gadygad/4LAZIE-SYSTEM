package com.school.admin;

import com.school.auth.Role;
import com.school.auth.User;
import com.school.core.PendingAction;
import com.school.core.PendingActionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

        private PendingActionRepository pendingActionRepository;
        private com.school.notification.NotificationService notificationService;

    public AdminService(PendingActionRepository pendingActionRepository, com.school.notification.NotificationService notificationService) {
        this.pendingActionRepository = pendingActionRepository;
        this.notificationService = notificationService;
    }


    public boolean hasPermission(User user, String requiredPermission) {
        if (user == null) return false;
        if (user.getRole() == Role.SUPER_ADMIN) return true;
        if ((user.getRole() != Role.ADMIN && user.getRole() != Role.SUPER_ADMIN)) return false;
        if (requiredPermission == null || requiredPermission.isEmpty()) return true; // Just basic admin check
        return user.getPermissions() != null && user.getPermissions().contains(requiredPermission);
    }

    // Which college's data this admin should see. SUPER_ADMIN is a
    // platform-wide role and always gets null (no filter — every college at
    // once), matching the precedent that only SUPER_ADMIN can delete a whole
    // institution. A plain ADMIN is scoped to their own account's college;
    // one predating this scoping with no institution set falls back to "1"
    // (St. Joseph), the same default DatabaseInitializer backfilled onto
    // every pre-existing account.
    public String scopeInstitutionId(User user) {
        if (user == null || user.getRole() == Role.SUPER_ADMIN) return null;
        com.school.academic.Institution institution = user.getInstitution();
        return institution != null ? institution.getId() : "1";
    }

    public String processDeletionRequest(User admin, String entityType, String entityId, String entityDesc) {
        if (admin.getRole() == Role.SUPER_ADMIN) {
            return "PROCEED";
        } else {
            PendingAction pa = new PendingAction(admin.getId(), admin.getName(), entityType, entityId, entityDesc, "DELETE");
            pendingActionRepository.save(pa);
            notificationService.notifySuperAdmins("Approval needed",
                    admin.getName() + " requested to delete " + entityDesc, "/admin/approvals");
            return "PENDING";
        }
    }
}
