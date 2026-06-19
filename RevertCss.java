import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.charset.StandardCharsets;

public class RevertCss {
    public static void main(String[] args) throws Exception {
        Path path = Paths.get("c:/Users/minde/OneDrive/Desktop/4LAZIE/src/main/resources/static/css/premium-theme.css");
        String content = new String(Files.readAllBytes(path), StandardCharsets.UTF_8);

        // Remove the bad overflow
        content = content.replace("overflow: visible !important;", "overflow-y: auto !important; overflow-x: hidden !important;");

        // Find the start of the program-levels block
        int startIndex = content.indexOf("/* Hide sidebar level dropdowns by default for mobile */");
        if (startIndex != -1) {
            String newBlock = "/* Inline Premium Sidebar Dropdowns */\n" +
                              ".program-levels {\n" +
                              "    display: none;\n" +
                              "    margin: 2px 8px 4px 16px;\n" +
                              "    border-left: 2px solid rgba(255,255,255,0.08);\n" +
                              "    padding-left: 12px;\n" +
                              "    overflow: hidden;\n" +
                              "}\n" +
                              ".program-levels.open {\n" +
                              "    display: block;\n" +
                              "    animation: sidebarSlideDown 0.25s ease forwards;\n" +
                              "}\n" +
                              "@keyframes sidebarSlideDown {\n" +
                              "    from { opacity: 0; transform: translateY(-6px); }\n" +
                              "    to { opacity: 1; transform: translateY(0); }\n" +
                              "}\n";
            // We just truncate everything from startIndex to the end of the file since it's the last block!
            // Wait, is it the last block? Let's assume yes. Or find where it ends if not.
            content = content.substring(0, startIndex) + newBlock;
        }

        Files.write(path, content.getBytes(StandardCharsets.UTF_8));
        System.out.println("CSS Reverted.");
    }
}
