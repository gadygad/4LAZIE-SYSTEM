package com.school.service.impl;

import com.school.model.TeamMember;
import com.school.repository.TeamMemberRepository;
import com.school.service.FileStorageService;
import com.school.service.TeamMemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class TeamMemberServiceImpl implements TeamMemberService {

    @Autowired
    private TeamMemberRepository teamMemberRepository;

    @Autowired
    private FileStorageService fileStorageService;

    @Override
    public List<TeamMember> getAllTeamMembers() {
        return teamMemberRepository.findAllByOrderByDisplayOrderAsc();
    }

    @Override
    public List<TeamMember> getActiveTeamMembers() {
        return teamMemberRepository.findByIsActiveOrderByDisplayOrderAsc(true);
    }

    @Override
    public TeamMember getTeamMemberById(String id) {
        return teamMemberRepository.findById(id).orElse(null);
    }

    @Override
    public TeamMember saveTeamMember(TeamMember teamMember, MultipartFile image) throws IOException {
        if (image != null && !image.isEmpty()) {
            String imageUrl = fileStorageService.uploadFile(image);
            teamMember.setImagePath(imageUrl);
        }
        return teamMemberRepository.save(teamMember);
    }

    @Override
    public void deleteTeamMember(String id) {
        teamMemberRepository.deleteById(id);
    }

    @Override
    public void toggleStatus(String id) {
        TeamMember member = getTeamMemberById(id);
        if (member != null) {
            member.setActive(!member.isActive());
            teamMemberRepository.save(member);
        }
    }
}
