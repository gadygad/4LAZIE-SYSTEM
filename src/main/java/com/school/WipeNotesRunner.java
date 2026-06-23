package com.school;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;
import com.school.repository.NoteRepository;

@Component
public class WipeNotesRunner implements CommandLineRunner {
    @Autowired private NoteRepository noteRepository;
    @Override public void run(String... args) throws Exception {
        noteRepository.deleteAll();
        System.out.println("====== Wiped all notes from DB ======");
        System.exit(0);
    }
}
