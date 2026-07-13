const fs = require('fs');
let file = 'src/main/resources/templates/fragments/sidebar_fragments.html';
let c = fs.readFileSync(file, 'utf8');

c = c.replace(
    'let bsOffcanvas = bootstrap.Offcanvas.getInstance(mobileSidebarEl);\n                    if (bsOffcanvas) { bsOffcanvas.hide(); }',
    'try { let bsOffcanvas = bootstrap.Offcanvas.getInstance(mobileSidebarEl) || new bootstrap.Offcanvas(mobileSidebarEl); bsOffcanvas.hide(); } catch (e) { console.error("Offcanvas close error:", e); }'
);
fs.writeFileSync(file, c);
console.log('done');
