/**
 * 4LAZIE - Main Interactive Controls JS
 * Handles: Hamburger/Sidebar, Notification Dropdown, Profile Dropdown, Mobile Search
 * Version: 2.0 - Full Bootstrap-independent fallback + Bootstrap integration
 */

(function() {
  'use strict';

  function initControls() {

    // ================================================================
    // 1. HAMBURGER MENU (Removed to use native Bootstrap handling)
    // ================================================================

    // ================================================================
    // 2. MOBILE SEARCH TOGGLE (Removed - handled inline in top_actions.html)
    // ================================================================
    const mobileSearchBtn = document.getElementById('mobileSearchToggleBtn');
    const mobileSearchCollapse = document.getElementById('mobileSearchCollapseGlobal');

    // ================================================================
    // 3. CLOSE MOBILE SEARCH ON OUTSIDE CLICK
    // ================================================================
    document.addEventListener('click', function(e) {
      // Close mobile search if clicking outside
      if (mobileSearchCollapse && !e.target.closest('#mobileSearchCollapseGlobal') && !e.target.closest('#mobileSearchToggleBtn')) {
        mobileSearchCollapse.classList.remove('show');
        if (mobileSearchBtn) {
          mobileSearchBtn.innerHTML = '<i class="bi bi-search" style="font-size:1rem;color:#10b981;"></i>';
        }
      }
    });

    // ================================================================
    // HELPERS
    // ================================================================
    function closeAllDropdowns() {
      document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
        menu.classList.remove('show');
      });
      document.querySelectorAll('[aria-expanded="true"]').forEach(el => {
        el.setAttribute('aria-expanded', 'false');
      });
    }

    function addBackdrop(onClose) {
      removeBackdrop();
      const backdrop = document.createElement('div');
      backdrop.id = 'offcanvasManualBackdrop';
      backdrop.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:1040;';
      backdrop.addEventListener('click', function() {
        if (onClose) onClose();
      });
      document.body.appendChild(backdrop);
    }

    function removeBackdrop() {
      const existing = document.getElementById('offcanvasManualBackdrop');
      if (existing) existing.remove();
    }
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initControls);
  } else {
    initControls();
  }

})();

// ==========================================
// 🚀 4LAZIE MAGIC SPEED (INSTANT PAGE LOAD)
// ==========================================
(function() {
    const prefetchedUrls = new Set();
    
    function prefetchUrl(url) {
        if (!url || url.startsWith('#') || url.startsWith('javascript') || prefetchedUrls.has(url)) return;
        
        // Only prefetch internal links
        if (url.startsWith(window.location.origin) || url.startsWith('/')) {
            prefetchedUrls.add(url);
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = url;
            link.as = 'document';
            document.head.appendChild(link);
        }
    }

    // Prefetch when hovering over links (Mouse)
    document.addEventListener('mouseover', function(e) {
        const link = e.target.closest('a');
        if (link && link.href) {
            prefetchUrl(link.href);
        }
    }, { passive: true });

    // Prefetch when touch starts (Mobile/Touch devices)
    document.addEventListener('touchstart', function(e) {
        const link = e.target.closest('a');
        if (link && link.href) {
            prefetchUrl(link.href);
        }
    }, { passive: true });
})();
