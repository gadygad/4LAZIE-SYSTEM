package com.school.config;

import com.school.model.Role;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.convert.ReadingConverter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Custom MongoDB reading converter for Role enum.
 * Handles unknown/corrupted role values in the database gracefully
 * by defaulting to STUDENT instead of throwing IllegalArgumentException.
 */
@ReadingConverter
public class RoleReadConverter implements Converter<String, Role> {
    private static final Logger log = LoggerFactory.getLogger(RoleReadConverter.class);

    @Override
    public Role convert(String source) {
        if (source == null || source.trim().isEmpty()) {
            return Role.STUDENT;
        }
        try {
            return Role.valueOf(source.trim());
        } catch (IllegalArgumentException e) {
            log.warn("Unknown role value '{}' found in database, defaulting to STUDENT", source);
            return Role.STUDENT;
        }
    }
}
