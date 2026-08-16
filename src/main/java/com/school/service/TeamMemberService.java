package com.school.service;

import com.school.model.TeamMember;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

public interface TeamMemberService {
    List<TeamMember> getAllTeamMembers();
    List<TeamMember> getActiveTeamMembers();
    TeamMember getTeamMemberById(String id);
    TeamMember saveTeamMember(TeamMember teamMember, MultipartFile image) throws IOException;
    void deleteTeamMember(String id);
    void toggleStatus(String id);
}
