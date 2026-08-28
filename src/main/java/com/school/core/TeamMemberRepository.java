package com.school.core;

import com.school.core.TeamMember;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeamMemberRepository extends MongoRepository<TeamMember, String> {
    List<TeamMember> findByIsActiveOrderByDisplayOrderAsc(boolean isActive);
    List<TeamMember> findAllByOrderByDisplayOrderAsc();
}
