document.addEventListener('DOMContentLoaded', function() {
    // Setup PDF.js worker
    if (typeof pdfjsLib !== 'undefined') {
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
    }

    const url = window.documentUrl || '';
    const filename = window.documentFilename || '';
    
    const loader = document.getElementById('pdf-loader');
    const errorDiv = document.getElementById('pdf-error');
    const canvasContainer = document.getElementById('canvas-container');
    const controls = document.querySelector('.pdf-controls');
    
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
        // LOAD PDF USING BROWSER NATIVE VIEWER (FASTEST & SCALABLE)
        if (controls) controls.style.display = 'none';
        if (canvasContainer) {
            canvasContainer.style.padding = '0';
            // Convert http to https just in case
            const safeUrl = url.replace('http://', 'https://');
            canvasContainer.innerHTML = `<iframe src="${safeUrl}" style="width: 100%; height: 100%; border: none;"></iframe>`;
        }
        hideLoader();
        
    } else if (filename.endsWith('.jpg') || filename.endsWith('.jpeg') || filename.endsWith('.png')) {
        // LOAD IMAGE DIRECTLY
        if (controls) controls.style.display = 'none';
        if (canvasContainer) {
            canvasContainer.innerHTML = `<img src="${url}" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.25);" alt="Document Image">`;
        }
        hideLoader();
    } else {
        // LOAD WORD/PPT/EXCEL USING GOOGLE DOCS VIEWER
        if (controls) controls.style.display = 'none';
        if (canvasContainer) {
            canvasContainer.style.padding = '0';
            
            const safeUrl = url.replace('http://', 'https://');
            const encodedUrl = encodeURIComponent(safeUrl);
            const viewerUrl = "https://docs.google.com/gview?url=" + encodedUrl + "&embedded=true";
            
            canvasContainer.innerHTML = `<iframe src="${viewerUrl}" style="width: 100%; height: 100%; border: none;"></iframe>`;
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
