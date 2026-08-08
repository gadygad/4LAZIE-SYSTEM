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
    // 2. MOBILE SEARCH TOGGLE
    // ================================================================
    const mobileSearchBtn = document.getElementById('mobileSearchToggleBtn');
    const mobileSearchCollapse = document.getElementById('mobileSearchCollapseGlobal');
    const globalMobileSearchInput = document.getElementById('globalMobileSearch');

    if (mobileSearchBtn && mobileSearchCollapse) {
      // Remove any existing onclick from our old fix
      mobileSearchBtn.removeAttribute('onclick');

      mobileSearchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const isOpen = mobileSearchCollapse.classList.contains('show');
        if (isOpen) {
          mobileSearchCollapse.classList.remove('show');
          mobileSearchBtn.innerHTML = '<i class="bi bi-search" style="font-size:1rem;color:#10b981;"></i>';
        } else {
          mobileSearchCollapse.classList.add('show');
          mobileSearchBtn.innerHTML = '<i class="bi bi-x-lg" style="font-size:1.1rem;color:#10b981;"></i>';
          setTimeout(() => { if (globalMobileSearchInput) globalMobileSearchInput.focus(); }, 150);
        }
      });
    }

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
