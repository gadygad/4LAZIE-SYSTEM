import sys

file_path = "src/main/resources/templates/fragments/sidebar_fragments.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

target = """        // Push Sidebar Logic
        document.addEventListener('DOMContentLoaded', function() {
            let mobileSidebarEl = document.getElementById('mobileSidebar');
            if(mobileSidebarEl) {
                mobileSidebarEl.addEventListener('show.bs.offcanvas', function () {
                    document.body.classList.add('sidebar-is-open');
                });
                mobileSidebarEl.addEventListener('hide.bs.offcanvas', function () {
                    document.body.classList.remove('sidebar-is-open');
                });
            }
        });"""

replacement = """        // Push Sidebar Logic & Apple Style Click-to-Close
        document.addEventListener('DOMContentLoaded', function() {
            let mobileSidebarEl = document.getElementById('mobileSidebar');
            if(mobileSidebarEl) {
                mobileSidebarEl.addEventListener('show.bs.offcanvas', function () {
                    document.body.classList.add('sidebar-is-open');
                });
                mobileSidebarEl.addEventListener('hide.bs.offcanvas', function () {
                    document.body.classList.remove('sidebar-is-open');
                });
                
                // Close offcanvas when clicking outside of it (since we don't use Bootstrap's backdrop)
                document.addEventListener('click', function(event) {
                    if (document.body.classList.contains('sidebar-is-open')) {
                        // Check if click was outside the sidebar and not on a toggle button
                        if (!mobileSidebarEl.contains(event.target) && !event.target.closest('[data-bs-toggle="offcanvas"]')) {
                            let bsOffcanvas = bootstrap.Offcanvas.getInstance(mobileSidebarEl);
                            if (bsOffcanvas) {
                                bsOffcanvas.hide();
                            }
                        }
                    }
                });
            }
        });"""

if target in content:
    new_content = content.replace(target, replacement)
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(new_content)
    print("Success")
else:
    print("Target not found. Doing fallback replacement...")
    # Try just inserting it before "function urlB64ToUint8Array"
    target2 = "function urlB64ToUint8Array(base64String)"
    if target2 in content:
        insert = """
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

        """
        new_content = content.replace(target2, insert + target2)
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(new_content)
        print("Success via fallback")
    else:
        print("Failed completely")
