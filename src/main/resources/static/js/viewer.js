document.addEventListener('DOMContentLoaded', function() {
    // Setup PDF.js worker
    if (typeof pdfjsLib !== 'undefined') {
        // Commented out to prevent cross-origin SecurityError in Chrome. 
        // PDF.js will automatically fall back to a fake worker on the main thread.
        // pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
    }

    const url = window.documentUrl || '';
    const directUrl = window.documentDirectUrl || url;
    const filename = window.documentFilename || '';
    
    const loader = document.getElementById('pdf-loader');
    const errorDiv = document.getElementById('pdf-error');
    const canvasContainer = document.getElementById('canvas-container');
    const controls = document.querySelector('.floating-controls');
    
    function hideLoader() {
        if (loader) {
            loader.classList.remove('d-flex');
            loader.style.display = 'none';
        }
    }

    if (!url || url.trim() === '') {
        hideLoader();
        if (errorDiv) errorDiv.style.display = 'block';
    } else if (filename.endsWith('.pdf')) {
        // USE NATIVE BROWSER PDF VIEWER (HIGHEST QUALITY, NATIVE SCROLL/ZOOM)
        const safeUrl = directUrl.replace('http://', 'https://');
        
        if (controls) controls.style.display = 'none';
        hideLoader();
        
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (canvasContainer) {
            canvasContainer.style.padding = '0';
            canvasContainer.style.display = 'block';
            canvasContainer.style.height = 'calc(100vh - 60px)';
            canvasContainer.style.overflow = 'hidden';
            
            if (isMobile) {
                // Mobile fallback since some mobile browsers don't support native PDF iframes
                const fallbackUrl = directUrl.startsWith('http') ? directUrl.replace('http://', 'https://') : window.location.origin + directUrl;
                const encodedUrl = encodeURIComponent(fallbackUrl);
                const viewerUrl = "https://docs.google.com/gview?url=" + encodedUrl + "&embedded=true";
                canvasContainer.innerHTML = `<iframe src="${viewerUrl}" style="width: 100%; height: 100%; border: none; background: #fff;"></iframe>`;
            } else {
                // Desktop native viewer (gives the exact UI requested)
                canvasContainer.innerHTML = `<iframe src="${safeUrl}" style="width: 100%; height: 100%; border: none; background: #fff;"></iframe>`;
            }
        }

    } else if (filename.endsWith('.jpg') || filename.endsWith('.jpeg') || filename.endsWith('.png')) {
        // LOAD IMAGE DIRECTLY
        if (controls) controls.style.display = 'none';
        if (canvasContainer) {
            canvasContainer.innerHTML = `<img src="${directUrl}" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.25);" alt="Document Image">`;
        }
        hideLoader();
    } else if (filename.endsWith('.doc') || filename.endsWith('.docx') || filename.endsWith('.ppt') || filename.endsWith('.pptx') || filename.endsWith('.xls') || filename.endsWith('.xlsx')) {
        // LOAD WORD/PPT/EXCEL USING MICROSOFT OFFICE ONLINE VIEWER (HIGHEST QUALITY)
        if (controls) controls.style.display = 'none';
        if (canvasContainer) {
            canvasContainer.style.padding = '0';
            canvasContainer.style.display = 'block';
            canvasContainer.style.height = 'calc(100vh - 60px)'; // Full screen minus navbar height
            canvasContainer.style.overflow = 'hidden';
            
            const safeUrl = directUrl.replace('http://', 'https://');
            const encodedUrl = encodeURIComponent(safeUrl);
            const viewerUrl = "https://view.officeapps.live.com/op/embed.aspx?src=" + encodedUrl;
            
            canvasContainer.innerHTML = `<iframe src="${viewerUrl}" style="width: 100%; height: 100%; border: none; background: #fff; overflow: hidden;" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>`;
        }
        hideLoader();
    } else {
        // LOAD OTHER FILES USING GOOGLE DOCS VIEWER
        if (controls) controls.style.display = 'none';
        if (canvasContainer) {
            canvasContainer.style.padding = '0';
            canvasContainer.style.display = 'block';
            canvasContainer.style.height = '100vh';
            
            const safeUrl = directUrl.replace('http://', 'https://');
            const encodedUrl = encodeURIComponent(safeUrl);
            const viewerUrl = "https://docs.google.com/gview?url=" + encodedUrl + "&embedded=true";
            
            canvasContainer.innerHTML = `<iframe src="${viewerUrl}" style="width: 100%; height: 100vh; border: none; background: #fff;"></iframe>`;
        }
        hideLoader();
    }
});

function toggleSaveNote(btn, noteId) {
    const getCsrfToken = () => {
        const match = document.cookie.match(new RegExp('(^| )XSRF-TOKEN=([^;]+)'));
        return match ? match[2] : '';
    };
    fetch('/save-note/' + noteId, { 
        method: 'POST',
        headers: {
            'X-XSRF-TOKEN': getCsrfToken()
        }
    })
    .then(r => r.json())
    .then(data => {
        if(data.success) {
            const icon = btn.querySelector('i');
            const span = btn.querySelector('span');
            if(data.saved) {
                icon.classList.remove('bi-bookmark');
                icon.classList.add('bi-bookmark-fill', 'text-success');
                span.innerText = 'Saved';
                btn.classList.add('saved');
            } else {
                icon.classList.remove('bi-bookmark-fill', 'text-success');
                icon.classList.add('bi-bookmark');
                span.innerText = 'Save';
                btn.classList.remove('saved');
            }
        } else {
            alert(data.message || 'Error saving note.');
        }
    });
}
