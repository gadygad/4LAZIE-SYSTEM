package com.school.service;

import com.school.model.Role;
import com.school.model.User;
import com.school.model.PendingAction;
import com.school.repository.PendingActionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private PendingActionRepository pendingActionRepository;

    public boolean hasPermission(User user, String requiredPermission) {
        if (user == null) return false;
        if (user.getRole() == Role.SUPER_ADMIN) return true;
        if ((user.getRole() != Role.ADMIN && user.getRole() != Role.SUPER_ADMIN)) return false;
        if (requiredPermission == null || requiredPermission.isEmpty()) return true; // Just basic admin check
        return user.getPermissions() != null && user.getPermissions().contains(requiredPermission);
    }

    public String processDeletionRequest(User admin, String entityType, String entityId, String entityDesc) {
        if (admin.getRole() == Role.SUPER_ADMIN) {
            return "PROCEED";
        } else {
            PendingAction pa = new PendingAction(admin.getId(), admin.getName(), entityType, entityId, entityDesc, "DELETE");
            pendingActionRepository.save(pa);
            return "PENDING";
        }
    }
}
