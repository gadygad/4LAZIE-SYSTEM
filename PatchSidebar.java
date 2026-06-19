import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.charset.StandardCharsets;

public class PatchSidebar {
    public static void main(String[] args) throws Exception {
        Path path = Paths.get("c:/Users/minde/OneDrive/Desktop/4LAZIE/src/main/resources/templates/fragments/sjuit_components.html");
        String content = new String(Files.readAllBytes(path), StandardCharsets.UTF_8);

        // Replace "LEVEL [[${lvl}]]" with "YEAR [[${lvl - 6}]]" only for degree blocks
        // Since we know the Degree loop uses `lvl : ${#numbers.sequence(7, 10)}`, we can't easily globally replace without affecting DIPLOMA.
        // Wait, DIPLOMA uses 4 to 6. So if we just replace it inside the degrees section:
        int degIndex = content.indexOf("<!-- DEGREE SEPARATOR -->");
        if (degIndex != -1) {
            String beforeDeg = content.substring(0, degIndex);
            String afterDeg = content.substring(degIndex);
            
            afterDeg = afterDeg.replace("LEVEL [[${lvl}]]", "YEAR [[${lvl - 6}]]");
            
            content = beforeDeg + afterDeg;
        }

        // Now wrap DIPLOMA in accordion
        String diplomaLabel = "<div class=\"sidebar-section-label\">PROGRAMMES</div>";
        String diplomaStart = "<div class=\"accordion sidebar-accordion\" id=\"sidebarAccordion\">\n" +
                              "    <style>\n" +
                              "    .sidebar-cat-btn {\n" +
                              "        background: rgba(255,255,255,0.05);\n" +
                              "        color: #fff;\n" +
                              "        border-radius: 12px;\n" +
                              "        font-family: 'Outfit', sans-serif;\n" +
                              "        font-weight: 700;\n" +
                              "        font-size: 0.85rem;\n" +
                              "        letter-spacing: 1px;\n" +
                              "        padding: 12px 16px;\n" +
                              "        border: 1px solid rgba(255,255,255,0.05);\n" +
                              "        box-shadow: none;\n" +
                              "    }\n" +
                              "    .sidebar-cat-btn:focus { box-shadow: none; border-color: rgba(255,255,255,0.2); }\n" +
                              "    .sidebar-cat-btn:not(.collapsed) {\n" +
                              "        background: linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.2));\n" +
                              "        color: #fff;\n" +
                              "        box-shadow: none;\n" +
                              "    }\n" +
                              "    .sidebar-cat-btn::after {\n" +
                              "        filter: brightness(0) invert(1);\n" +
                              "    }\n" +
                              "    </style>\n" +
                              "    <!-- DIPLOMA ACCORDION -->\n" +
                              "    <div class=\"accordion-item\" style=\"background: transparent; border: none;\">\n" +
                              "        <h2 class=\"accordion-header\" id=\"headingDiploma\">\n" +
                              "            <button class=\"accordion-button collapsed sidebar-cat-btn\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#collapseDiploma\" aria-expanded=\"false\" aria-controls=\"collapseDiploma\">\n" +
                              "                <i class=\"bi bi-mortarboard-fill me-2\" style=\"color:#60a5fa;\"></i> DIPLOMA PROGRAMMES\n" +
                              "            </button>\n" +
                              "        </h2>\n" +
                              "        <div id=\"collapseDiploma\" class=\"accordion-collapse collapse\" aria-labelledby=\"headingDiploma\" data-bs-parent=\"#sidebarAccordion\">\n" +
                              "            <div class=\"accordion-body p-0 pt-3 pb-2\">\n";
        
        content = content.replace(diplomaLabel, diplomaStart);
        
        // Now find the DEGREE SEPARATOR
        String degreeLabel = "<!-- DEGREE SEPARATOR -->\n    <div class=\"sidebar-section-label\" style=\"margin-top:12px;\">DEGREES</div>";
        String degreeLabelWin = "<!-- DEGREE SEPARATOR -->\r\n    <div class=\"sidebar-section-label\" style=\"margin-top:12px;\">DEGREES</div>";
        
        String degreeStart = "            </div>\n" +
                             "        </div>\n" +
                             "    </div>\n\n" +
                             "    <!-- DEGREE ACCORDION -->\n" +
                             "    <div class=\"accordion-item mt-2\" style=\"background: transparent; border: none;\">\n" +
                             "        <h2 class=\"accordion-header\" id=\"headingDegree\">\n" +
                             "            <button class=\"accordion-button collapsed sidebar-cat-btn\" type=\"button\" data-bs-toggle=\"collapse\" data-bs-target=\"#collapseDegree\" aria-expanded=\"false\" aria-controls=\"collapseDegree\">\n" +
                             "                <i class=\"bi bi-award-fill me-2\" style=\"color:#f472b6;\"></i> DEGREE PROGRAMMES\n" +
                             "            </button>\n" +
                             "        </h2>\n" +
                             "        <div id=\"collapseDegree\" class=\"accordion-collapse collapse\" aria-labelledby=\"headingDegree\" data-bs-parent=\"#sidebarAccordion\">\n" +
                             "            <div class=\"accordion-body p-0 pt-3 pb-2\">\n";
                             
        if (content.contains(degreeLabelWin)) {
            content = content.replace(degreeLabelWin, degreeStart);
        } else {
            content = content.replace(degreeLabel, degreeStart);
        }
        
        // Now close the entire sidebar accordion before the SIDEBAR FOOTER
        String footerLabel = "<!-- SIDEBAR FOOTER -->";
        String accordionEnd = "            </div>\n" +
                              "        </div>\n" +
                              "    </div>\n" +
                              "</div>\n\n    " + footerLabel;
                              
        content = content.replace(footerLabel, accordionEnd);

        // Save
        Files.write(path, content.getBytes(StandardCharsets.UTF_8));
        System.out.println("Sidebar Patched successfully.");
    }
}
