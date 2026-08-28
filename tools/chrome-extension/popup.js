document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('results');
    const loading = document.getElementById('loading');
    const apiTarget = document.getElementById('apiTarget');
    const openPortalBtn = document.getElementById('openPortal');
    
    // Set default target if previously saved
    chrome.storage.local.get(['apiTarget'], (result) => {
        if (result.apiTarget) {
            apiTarget.value = result.apiTarget;
        }
    });

    apiTarget.addEventListener('change', (e) => {
        chrome.storage.local.set({ apiTarget: e.target.value });
    });

    openPortalBtn.addEventListener('click', () => {
        chrome.tabs.create({ url: apiTarget.value });
    });

    let debounceTimeout;

    searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimeout);
        const query = e.target.value.trim();

        if (query.length < 2) {
            resultsContainer.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">🔍</div>
                    <p>Type to search 4LAZIE materials...</p>
                </div>
            `;
            return;
        }

        loading.style.display = 'block';

        debounceTimeout = setTimeout(() => {
            fetchResults(query);
        }, 300);
    });

    async function fetchResults(query) {
        const baseUrl = apiTarget.value;
        try {
            const response = await fetch(`${baseUrl}/api/search?q=${encodeURIComponent(query)}`);
            if (!response.ok) throw new Error('API Error');
            
            const data = await response.json();
            displayResults(data.notes || [], baseUrl);
        } catch (error) {
            console.error('Search failed:', error);
            resultsContainer.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">⚠️</div>
                    <p style="color: #ef4444;">Failed to connect to 4LAZIE API. Is the server running?</p>
                </div>
            `;
        } finally {
            loading.style.display = 'none';
        }
    }

    function displayResults(notes, baseUrl) {
        if (notes.length === 0) {
            resultsContainer.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">📄</div>
                    <p>No materials found for your search.</p>
                </div>
            `;
            return;
        }

        resultsContainer.innerHTML = notes.map(note => `
            <a href="${baseUrl}/view/${note.encryptedSlug || note.id}" target="_blank" class="result-item">
                <div class="result-title">${escapeHTML(note.title)}</div>
                <div class="result-meta">
                    <span>${escapeHTML(note.moduleName || note.programType)}</span>
                    <span class="result-category">${escapeHTML(note.category || 'Note')}</span>
                </div>
            </a>
        `).join('');
    }

    function escapeHTML(str) {
        if (!str) return '';
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }
});
