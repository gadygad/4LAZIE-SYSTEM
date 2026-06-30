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
        // LOAD PDF USING PDF.JS FOR BEAUTIFUL CUSTOM UI
        const safeUrl = url.replace('http://', 'https://');
        
        let pdfDoc = null,
            pageNum = 1,
            pageIsRendering = false,
            pageNumIsPending = null,
            scale = 1.2,
            canvas = document.getElementById('pdf-render'),
            ctx = canvas.getContext('2d');

        const renderPage = num => {
            pageIsRendering = true;
            pdfDoc.getPage(num).then(page => {
                const viewport = page.getViewport({ scale });
                const outputScale = window.devicePixelRatio || 1;
                
                canvas.width = Math.floor(viewport.width * outputScale);
                canvas.height = Math.floor(viewport.height * outputScale);
                canvas.style.width = Math.floor(viewport.width) + "px";
                canvas.style.height =  Math.floor(viewport.height) + "px";

                const transform = outputScale !== 1 
                  ? [outputScale, 0, 0, outputScale, 0, 0] 
                  : null;

                const renderCtx = {
                    canvasContext: ctx,
                    transform: transform,
                    viewport: viewport
                };

                page.render(renderCtx).promise.then(() => {
                    pageIsRendering = false;
                    if (pageNumIsPending !== null) {
                        renderPage(pageNumIsPending);
                        pageNumIsPending = null;
                    }
                });
                document.getElementById('page-num').textContent = num;
            });
        };

        const queueRenderPage = num => {
            if (pageIsRendering) {
                pageNumIsPending = num;
            } else {
                renderPage(num);
            }
        };

        const showPrevPage = () => {
            if (pageNum <= 1) return;
            pageNum--;
            queueRenderPage(pageNum);
        };

        const showNextPage = () => {
            if (pageNum >= pdfDoc.numPages) return;
            pageNum++;
            queueRenderPage(pageNum);
        };

        document.getElementById('prev-page').addEventListener('click', showPrevPage);
        document.getElementById('next-page').addEventListener('click', showNextPage);
        
        document.getElementById('zoom-in').addEventListener('click', () => {
            scale += 0.2;
            queueRenderPage(pageNum);
        });
        
        document.getElementById('zoom-out').addEventListener('click', () => {
            if (scale <= 0.6) return;
            scale -= 0.2;
            queueRenderPage(pageNum);
        });

        // Fetch PDF Document
        pdfjsLib.getDocument(safeUrl).promise.then(pdfDoc_ => {
            pdfDoc = pdfDoc_;
            document.getElementById('page-count').textContent = pdfDoc.numPages;
            hideLoader();
            
            // Calculate best initial scale for mobile
            if (window.innerWidth < 768) {
                pdfDoc.getPage(1).then(page => {
                    const tempViewport = page.getViewport({ scale: 1.0 });
                    const containerWidth = canvasContainer.clientWidth > 0 ? canvasContainer.clientWidth - 40 : window.innerWidth - 40;
                    scale = containerWidth / tempViewport.width;
                    renderPage(pageNum);
                });
            } else {
                renderPage(pageNum);
            }
        }).catch(err => {
            console.error('Error fetching PDF: ', err);
            hideLoader();
            // Fallback to iframe if pdf.js fails (e.g. CORS)
            if (controls) controls.style.display = 'none';
            if (canvasContainer) {
                canvasContainer.style.padding = '0';
                canvasContainer.innerHTML = `<iframe src="${safeUrl}" style="width: 100%; height: 100%; border: none;"></iframe>`;
            }
        });

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
