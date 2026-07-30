const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, 'src', 'main', 'resources', 'templates');
const cssFile = path.join(__dirname, 'src', 'main', 'resources', 'static', 'css', 'premium-theme.css');

// 1. Update CSS
const cssContent = `\n
/* Sidebar Push Effect */
body.sidebar-is-open .main-content,
body.sidebar-is-open .navbar-custom {
    margin-left: 280px;
}
@media (max-width: 991.98px) {
    body.sidebar-is-open .main-content,
    body.sidebar-is-open .navbar-custom {
        margin-left: 0;
    }
}
.main-content, .navbar-custom {
    transition: margin-left 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* Magical Hover Effect for Sidebar items */
.sidebar-hover-btn:hover, .sidebar-hover-item.open-mobile .sidebar-hover-btn {
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.02)) !important;
    color: #10b981 !important;
    transform: translateX(8px) scale(1.02) !important;
    box-shadow: 0 4px 15px rgba(16, 185, 129, 0.15), inset 3px 0 0 #10b981 !important;
    border-radius: 12px !important;
}
`;
fs.appendFileSync(cssFile, cssContent, 'utf8');

// 2. Update HTML
const jsSnippet = `
<!-- Sidebar Global Push Effect -->
<script>
document.addEventListener('DOMContentLoaded', function() {
    const sidebars = document.querySelectorAll('.offcanvas');
    sidebars.forEach(function(sidebar) {
        sidebar.addEventListener('show.bs.offcanvas', function () {
            document.body.classList.add('sidebar-is-open');
        });
        sidebar.addEventListener('hide.bs.offcanvas', function () {
            document.body.classList.remove('sidebar-is-open');
        });
    });
});
</script>
`;

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            results.push(file);
        }
    });
    return results;
}

const htmlFiles = walk(templatesDir).filter(f => f.endsWith('.html'));
const offcanvasPattern = /(<div[^>]*class="[^"]*\boffcanvas\b[^"]*"[^>]*>)/g;

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;

    // Add data-bs-scroll and data-bs-backdrop if not present
    content = content.replace(offcanvasPattern, (match, tag) => {
        if (!tag.includes('data-bs-scroll="true"') && !tag.includes('data-bs-backdrop="false"')) {
            modified = true;
            return tag.replace('<div ', '<div data-bs-scroll="true" data-bs-backdrop="false" ');
        }
        return tag;
    });

    // Add JS snippet if file has an offcanvas or includes a sidebar that might need it.
    // Wait, let's just add it to files that have '</body>' and actually use offcanvas
    if (content.includes('data-bs-scroll="true"') && !content.includes('Sidebar Global Push Effect')) {
        if (content.includes('</body>')) {
            content = content.replace('</body>', jsSnippet + '\n</body>');
            modified = true;
        } else {
            // It's a fragment, append
            content += jsSnippet;
            modified = true;
        }
    }

    if (modified) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Updated ' + file);
    }
});
