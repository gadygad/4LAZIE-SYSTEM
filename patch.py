import re

file_path = r'c:\Users\minde\OneDrive\Desktop\4LAZIE\src\main\resources\static\css\premium-theme.css'
with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

# Replace overflow
content = content.replace('overflow-y: auto !important;\n    overflow-x: visible !important;', 'overflow: visible !important;')
content = content.replace('overflow-y: auto !important;\r\n    overflow-x: visible !important;', 'overflow: visible !important;')

# Replace program-levels CSS
old_css = '''/* Hide sidebar level dropdowns by default */
.program-levels {
    display: none;
    margin: 2px 8px 4px 16px;
    border-left: 2px solid rgba(255,255,255,0.08);
    padding-left: 12px;
    overflow: hidden;
}
.program-levels.open {
    display: block;
    animation: sidebarSlideDown 0.25s ease forwards;
}
@keyframes sidebarSlideDown {
    from { opacity: 0; transform: translateY(-6px); }
    to { opacity: 1; transform: translateY(0); }
}'''

new_css = '''/* Hide sidebar level dropdowns by default for mobile */
.program-levels {
    display: none;
    margin: 2px 8px 4px 16px;
    border-left: 2px solid rgba(255,255,255,0.08);
    padding-left: 12px;
    overflow: hidden;
}
.program-levels.open {
    display: block;
    animation: sidebarSlideDown 0.25s ease forwards;
}
@keyframes sidebarSlideDown {
    from { opacity: 0; transform: translateY(-6px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Premium Desktop Flyout Menu */
@media (min-width: 992px) {
    .program-item {
        position: relative;
    }
    
    .program-levels {
        position: absolute !important;
        top: -10px;
        left: calc(100% + 15px);
        width: 220px;
        background: rgba(15, 23, 42, 0.95) !important;
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border: 1px solid rgba(255,255,255,0.08) !important;
        border-radius: 12px !important;
        padding: 12px !important;
        box-shadow: 15px 15px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1) !important;
        z-index: 1050;
        
        display: block !important;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transform: translateX(10px) scale(0.98);
        transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        
        margin: 0 !important;
        overflow: visible !important;
        animation: none !important;
    }

    /* Invisible bridge for hover continuity */
    .program-levels::before {
        content: '';
        position: absolute;
        top: 0;
        left: -20px;
        width: 20px;
        height: 100%;
    }

    /* Force the arrow to point right initially on desktop */
    .program-btn .prog-chevron {
        transform: rotate(-90deg) !important;
    }

    /* On Hover */
    .program-item:hover .program-levels {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
        transform: translateX(0) scale(1);
    }
    
    .program-item:hover .program-btn {
        background: rgba(255,255,255,0.07);
    }
    
    .program-item:hover .prog-chevron {
        transform: rotate(0) !important;
        color: #fff !important;
    }
}'''

# Replace normalising newlines for safe matching
content_normalized = content.replace('\r\n', '\n')
old_css_normalized = old_css.replace('\r\n', '\n')

content = content_normalized.replace(old_css_normalized, new_css)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Replacement done.")
