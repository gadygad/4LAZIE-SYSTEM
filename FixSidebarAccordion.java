import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.charset.StandardCharsets;

public class FixSidebarAccordion {
    public static void main(String[] args) throws Exception {
        Path path = Paths.get("c:/Users/minde/OneDrive/Desktop/4LAZIE/src/main/resources/templates/fragments/sjuit_components.html");
        String content = new String(Files.readAllBytes(path), StandardCharsets.UTF_8);

        // Fix DIPLOMA Accordion IDs to Classes
        content = content.replace("data-bs-target=\"#collapseDiploma\"", "data-bs-target=\".collapseDiploma\"");
        content = content.replace("id=\"collapseDiploma\" class=\"accordion-collapse collapse\"", "class=\"accordion-collapse collapse collapseDiploma\"");
        content = content.replace("aria-controls=\"collapseDiploma\"", "aria-controls=\"collapseDiploma\""); // fine to keep

        // Fix DEGREE Accordion IDs to Classes
        content = content.replace("data-bs-target=\"#collapseDegree\"", "data-bs-target=\".collapseDegree\"");
        content = content.replace("id=\"collapseDegree\" class=\"accordion-collapse collapse\"", "class=\"accordion-collapse collapse collapseDegree\"");
        content = content.replace("aria-controls=\"collapseDegree\"", "aria-controls=\"collapseDegree\""); // fine to keep

        // Fix Parent ID to Class
        content = content.replace("id=\"sidebarAccordion\"", "");
        content = content.replace("data-bs-parent=\"#sidebarAccordion\"", "data-bs-parent=\".sidebar-accordion\"");

        // Also fix toggleProgram function to NOT use IDs because of mobile/desktop duplication!
        String oldToggle = "function toggleProgram(btn, id) {\n" +
                           "        const allBtns = document.querySelectorAll('.program-btn');\n" +
                           "        const allPanels = document.querySelectorAll('.program-levels');\n" +
                           "        const panel = document.getElementById(id);\n" +
                           "        const isOpen = panel.classList.contains('open');";
                           
        String newToggle = "function toggleProgram(btn, id) {\n" +
                           "        const sidebar = btn.closest('.hero-sidebar');\n" +
                           "        const allBtns = sidebar.querySelectorAll('.program-btn');\n" +
                           "        const allPanels = sidebar.querySelectorAll('.program-levels');\n" +
                           "        const panel = btn.nextElementSibling;\n" +
                           "        const isOpen = panel.classList.contains('open');";

        String oldToggleWin = oldToggle.replace("\n", "\r\n");
        String newToggleWin = newToggle.replace("\n", "\r\n");

        if (content.contains(oldToggleWin)) {
            content = content.replace(oldToggleWin, newToggleWin);
        } else {
            content = content.replace(oldToggle, newToggle);
        }

        Files.write(path, content.getBytes(StandardCharsets.UTF_8));
        System.out.println("Sidebar Accordion and JS fixed for duplicate IDs.");
    }
}
