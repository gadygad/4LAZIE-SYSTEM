import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.charset.StandardCharsets;

public class PatchCss {
    public static void main(String[] args) throws Exception {
        Path path = Paths.get("c:/Users/minde/OneDrive/Desktop/4LAZIE/src/main/resources/static/css/premium-theme.css");
        String content = new String(Files.readAllBytes(path), StandardCharsets.UTF_8);
        
        content = content.replace("overflow-y: auto !important;\r\n    overflow-x: visible !important;", "overflow: visible !important;");
        content = content.replace("overflow-y: auto !important;\n    overflow-x: visible !important;", "overflow: visible !important;");
        
        String oldCss = "/* Hide sidebar level dropdowns by default */\r\n.program-levels {\r\n    display: none;\r\n    margin: 2px 8px 4px 16px;\r\n    border-left: 2px solid rgba(255,255,255,0.08);\r\n    padding-left: 12px;\r\n    overflow: hidden;\r\n}\r\n.program-levels.open {\r\n    display: block;\r\n    animation: sidebarSlideDown 0.25s ease forwards;\r\n}\r\n@keyframes sidebarSlideDown {\r\n    from { opacity: 0; transform: translateY(-6px); }\r\n    to { opacity: 1; transform: translateY(0); }\r\n}";
        String oldCssLF = oldCss.replace("\r\n", "\n");
        
        String newCss = "/* Hide sidebar level dropdowns by default for mobile */\n.program-levels {\n    display: none;\n    margin: 2px 8px 4px 16px;\n    border-left: 2px solid rgba(255,255,255,0.08);\n    padding-left: 12px;\n    overflow: hidden;\n}\n.program-levels.open {\n    display: block;\n    animation: sidebarSlideDown 0.25s ease forwards;\n}\n@keyframes sidebarSlideDown {\n    from { opacity: 0; transform: translateY(-6px); }\n    to { opacity: 1; transform: translateY(0); }\n}\n\n/* Premium Desktop Flyout Menu */\n@media (min-width: 992px) {\n    .program-item {\n        position: relative;\n    }\n    \n    .program-levels {\n        position: absolute !important;\n        top: -10px;\n        left: calc(100% + 15px);\n        width: 220px;\n        background: rgba(15, 23, 42, 0.95) !important;\n        backdrop-filter: blur(16px);\n        -webkit-backdrop-filter: blur(16px);\n        border: 1px solid rgba(255,255,255,0.08) !important;\n        border-radius: 12px !important;\n        padding: 12px !important;\n        box-shadow: 15px 15px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1) !important;\n        z-index: 1050;\n        \n        display: block !important;\n        opacity: 0;\n        visibility: hidden;\n        pointer-events: none;\n        transform: translateX(10px) scale(0.98);\n        transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);\n        \n        margin: 0 !important;\n        overflow: visible !important;\n        animation: none !important;\n    }\n\n    .program-levels::before {\n        content: '';\n        position: absolute;\n        top: 0;\n        left: -20px;\n        width: 20px;\n        height: 100%;\n    }\n\n    .program-btn .prog-chevron {\n        transform: rotate(-90deg) !important;\n    }\n\n    .program-item:hover .program-levels {\n        opacity: 1;\n        visibility: visible;\n        pointer-events: auto;\n        transform: translateX(0) scale(1);\n    }\n    \n    .program-item:hover .program-btn {\n        background: rgba(255,255,255,0.07);\n    }\n    \n    .program-item:hover .prog-chevron {\n        transform: rotate(0) !important;\n        color: #fff !important;\n    }\n}";
        
        content = content.replace(oldCss, newCss);
        content = content.replace(oldCssLF, newCss);
        
        Files.write(path, content.getBytes(StandardCharsets.UTF_8));
        System.out.println("CSS Patched successfully.");
    }
}
