import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Restructure {
    public static void main(String[] args) throws IOException {
        String baseDir = "D:/4LAZIE";
        Path templatesDir = Paths.get(baseDir, "src/main/resources/templates");
        Path staticUploadsDir = Paths.get(baseDir, "src/main/resources/static/uploads");
        Path controllersDir = Paths.get(baseDir, "src/main/java/com/school/controller");

        Map<String, String> mapping = new HashMap<>();
        // Auth
        mapping.put("login", "auth");
        mapping.put("register", "auth");
        mapping.put("forgot_password", "auth");
        mapping.put("reset_password", "auth");
        mapping.put("verify_otp", "auth");

        // Admin
        mapping.put("admin_dashboard", "admin");
        mapping.put("admin_users", "admin");
        mapping.put("admin_notes", "admin");
        mapping.put("admin_courses", "admin");
        mapping.put("admin_subjects", "admin");
        mapping.put("admin_timetables", "admin");
        mapping.put("admin_approvals", "admin");

        // User
        mapping.put("dashboard", "user");
        mapping.put("profile", "user");
        mapping.put("my_notes", "user");
        mapping.put("notifications", "user");
        mapping.put("premium", "user");
        mapping.put("upgrade", "user");

        // Notes
        mapping.put("notes", "notes");
        mapping.put("guest_notes", "notes");
        mapping.put("explore", "notes");
        mapping.put("upload", "notes");
        mapping.put("view_note", "notes");
        mapping.put("assignments_past_papers", "notes");
        mapping.put("cat1_past_papers", "notes");
        mapping.put("cat2_past_papers", "notes");
        mapping.put("ue_past_papers", "notes");
        mapping.put("projects_past_papers", "notes");

        // Public
        mapping.put("index", "public");
        mapping.put("home", "public");
        mapping.put("about", "public");
        mapping.put("policy", "public");

        // Timetable
        mapping.put("view_timetable", "timetable");
        mapping.put("timetable_archive", "timetable");
        mapping.put("semesters", "timetable");
        mapping.put("ue_exams", "timetable");

        System.out.println("Moving HTML templates...");
        for (Map.Entry<String, String> entry : mapping.entrySet()) {
            String filename = entry.getKey();
            String folder = entry.getValue();

            Path src = templatesDir.resolve(filename + ".html");
            Path dstFolder = templatesDir.resolve(folder);
            Path dst = dstFolder.resolve(filename + ".html");

            if (Files.exists(src)) {
                Files.createDirectories(dstFolder);
                Files.move(src, dst, StandardCopyOption.REPLACE_EXISTING);
                System.out.println("  Moved " + filename + ".html -> " + folder + "/");
            }
        }

        System.out.println("Moving CSE.pdf...");
        Path pdfSrc = templatesDir.resolve("CSE.pdf");
        if (Files.exists(pdfSrc)) {
            Files.createDirectories(staticUploadsDir);
            Files.move(pdfSrc, staticUploadsDir.resolve("CSE.pdf"), StandardCopyOption.REPLACE_EXISTING);
            System.out.println("  Moved CSE.pdf");
        }

        System.out.println("Updating Java Controllers...");
        Pattern pattern = Pattern.compile("return\\s+\"([^\"]+)\";?");

        Files.walk(controllersDir)
            .filter(Files::isRegularFile)
            .filter(p -> p.toString().endsWith(".java"))
            .forEach(p -> {
                try {
                    String content = new String(Files.readAllBytes(p), StandardCharsets.UTF_8);
                    Matcher matcher = pattern.matcher(content);
                    StringBuffer sb = new StringBuffer();
                    int changes = 0;

                    while (matcher.find()) {
                        String viewName = matcher.group(1);
                        if (mapping.containsKey(viewName)) {
                            String newViewName = mapping.get(viewName) + "/" + viewName;
                            matcher.appendReplacement(sb, "return \"" + newViewName + "\";");
                            changes++;
                        } else {
                            matcher.appendReplacement(sb, matcher.group(0));
                        }
                    }
                    matcher.appendTail(sb);

                    if (changes > 0) {
                        Files.write(p, sb.toString().getBytes(StandardCharsets.UTF_8));
                        System.out.println("  Updated " + p.getFileName() + " (" + changes + " changes)");
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }
            });

        System.out.println("Done!");
    }
}
