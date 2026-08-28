const fs = require('fs');
let file = 'src/main/resources/templates/fragments/sidebar_fragments.html';
let content = fs.readFileSync(file, 'utf8');

let target = 'function urlB64ToUint8Array(base64String)';
let insert = `
        // Close offcanvas when clicking outside
        document.addEventListener('click', function(event) {
            let mobileSidebarEl = document.getElementById('mobileSidebar');
            if (mobileSidebarEl && document.body.classList.contains('sidebar-is-open')) {
                if (!mobileSidebarEl.contains(event.target) && !event.target.closest('[data-bs-toggle="offcanvas"]')) {
                    let bsOffcanvas = bootstrap.Offcanvas.getInstance(mobileSidebarEl);
                    if (bsOffcanvas) { bsOffcanvas.hide(); }
                }
            }
        });

`;

if (content.includes(target) && !content.includes('Close offcanvas when clicking outside')) {
    fs.writeFileSync(file, content.replace(target, insert + target));
    console.log('Success');
} else {
    console.log('Already inserted or target not found');
}
