package com.school.config;

import com.school.model.Note;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.index.TextIndexDefinition;
import jakarta.annotation.PostConstruct;

@Configuration
public class MongoIndexConfig {

    private final MongoTemplate mongoTemplate;

    public MongoIndexConfig(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @PostConstruct
    public void ensureIndexes() {
        // Create Text Index for Notes to speed up searching
        TextIndexDefinition textIndex = new TextIndexDefinition.TextIndexDefinitionBuilder()
                .onField("title", 2F)
                .onField("category", 1F)
                .build();
        mongoTemplate.indexOps(Note.class).ensureIndex(textIndex);
    }
}
