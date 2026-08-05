package com.school.repository;

import com.school.model.Institution;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface InstitutionRepository extends MongoRepository<Institution, String> {
}
