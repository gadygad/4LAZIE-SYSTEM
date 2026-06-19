import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.charset.StandardCharsets;

public class AddFilters {
    public static void main(String[] args) throws Exception {
        String[] files = {
            "c:/Users/minde/OneDrive/Desktop/4LAZIE/src/main/resources/templates/home.html",
            "c:/Users/minde/OneDrive/Desktop/4LAZIE/src/main/resources/templates/index.html"
        };

        String oldCode = "<a href=\"#\" class=\"text-secondary\" title=\"see more\" data-bs-toggle=\"tooltip\" data-bs-placement=\"bottom\" style=\"font-size: 1.5rem; display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 50%; transition: all 0.3s ease; text-decoration: none;\" onmouseover=\"this.style.background='rgba(0,0,0,0.05)'; this.style.color='var(--primary);'\" onmouseout=\"this.style.background='transparent'; this.style.color='var(--text-muted);'\">\n" +
                         "                    <i class=\"bi bi-three-dots-vertical\"></i>\n" +
                         "                </a>";
                         
        // Wait, the actual HTML has single quotes differently inside onmouseover.
        // Let's use string manipulation to find it reliably.
        
        for (String filePath : files) {
            Path path = Paths.get(filePath);
            if (!Files.exists(path)) continue;
            
            String content = new String(Files.readAllBytes(path), StandardCharsets.UTF_8);
            
            // Find <a href="#" class="text-secondary" title="see more"
            int startIndex = content.indexOf("<a href=\"#\" class=\"text-secondary\" title=\"see more\"");
            if (startIndex != -1) {
                int endIndex = content.indexOf("</a>", startIndex) + 4;
                String replacement = "<div class=\"dropdown\">\n" +
                                     "                    <a href=\"#\" class=\"text-secondary dropdown-toggle-hide-arrow\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\" title=\"Filter Options\" style=\"font-size: 1.5rem; display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 50%; transition: all 0.3s ease; text-decoration: none;\" onmouseover=\"this.style.background='rgba(0,0,0,0.05)'; this.style.color='var(--primary)';\" onmouseout=\"this.style.background='transparent'; this.style.color='#6c757d';\">\n" +
                                     "                        <i class=\"bi bi-three-dots-vertical\"></i>\n" +
                                     "                    </a>\n" +
                                     "                    <ul class=\"dropdown-menu dropdown-menu-end shadow-lg border-0\" style=\"border-radius: 16px; font-family: 'Outfit', sans-serif; padding: 12px 8px; min-width: 220px;\">\n" +
                                     "                        <li><h6 class=\"dropdown-header fw-bold text-uppercase\" style=\"letter-spacing: 1.5px; font-size: 0.7rem; color: #94a3b8;\">Search Filters</h6></li>\n" +
                                     "                        <li><a class=\"dropdown-item d-flex align-items-center gap-3 py-2 rounded-3\" href=\"#\" style=\"font-size: 0.9rem; font-weight: 500;\"><div style=\"width:30px; height:30px; border-radius:8px; background:rgba(59,130,246,0.1); display:flex; align-items:center; justify-content:center;\"><i class=\"bi bi-journal-text text-primary\"></i></div> Lecture Notes</a></li>\n" +
                                     "                        <li><a class=\"dropdown-item d-flex align-items-center gap-3 py-2 rounded-3\" href=\"#\" style=\"font-size: 0.9rem; font-weight: 500;\"><div style=\"width:30px; height:30px; border-radius:8px; background:rgba(16,185,129,0.1); display:flex; align-items:center; justify-content:center;\"><i class=\"bi bi-file-earmark-check text-success\"></i></div> Past Papers</a></li>\n" +
                                     "                        <li><a class=\"dropdown-item d-flex align-items-center gap-3 py-2 rounded-3\" href=\"#\" style=\"font-size: 0.9rem; font-weight: 500;\"><div style=\"width:30px; height:30px; border-radius:8px; background:rgba(245,158,11,0.1); display:flex; align-items:center; justify-content:center;\"><i class=\"bi bi-pen text-warning\"></i></div> Assignments</a></li>\n" +
                                     "                        <li><hr class=\"dropdown-divider my-2\" style=\"opacity: 0.05;\"></li>\n" +
                                     "                        <li><a class=\"dropdown-item d-flex align-items-center gap-3 py-2 rounded-3\" href=\"#\" style=\"font-size: 0.9rem; font-weight: 500;\"><div style=\"width:30px; height:30px; border-radius:8px; background:rgba(148,163,184,0.1); display:flex; align-items:center; justify-content:center;\"><i class=\"bi bi-sort-down text-secondary\"></i></div> Sort by Newest</a></li>\n" +
                                     "                        <li><hr class=\"dropdown-divider my-2\" style=\"opacity: 0.05;\"></li>\n" +
                                     "                        <li><a class=\"dropdown-item d-flex align-items-center gap-3 py-2 rounded-3 text-danger\" href=\"#\" style=\"font-size: 0.9rem; font-weight: 500;\"><div style=\"width:30px; height:30px; border-radius:8px; background:rgba(239,68,68,0.1); display:flex; align-items:center; justify-content:center;\"><i class=\"bi bi-chat-left-text\"></i></div> Request a Note</a></li>\n" +
                                     "                    </ul>\n" +
                                     "                </div>\n" +
                                     "                <style>.dropdown-toggle-hide-arrow::after { display: none; } .dropdown-item:hover { background-color: #f8fafc; color: #0f172a; }</style>";
                
                content = content.substring(0, startIndex) + replacement + content.substring(endIndex);
                Files.write(path, content.getBytes(StandardCharsets.UTF_8));
            }
        }
        System.out.println("Filters added.");
    }
}
