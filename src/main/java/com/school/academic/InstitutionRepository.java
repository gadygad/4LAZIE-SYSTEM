package com.school.academic;

import com.school.academic.Institution;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface InstitutionRepository extends MongoRepository<Institution, String> {
}
