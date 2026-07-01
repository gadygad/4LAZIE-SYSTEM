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
        
        let observer = null;
        let pdfDoc = null;
        let scale = 1.2;

        const renderAllPagesLazy = () => {
            canvasContainer.innerHTML = '';
            canvasContainer.style.flexDirection = 'column';
            canvasContainer.style.alignItems = 'center';
            canvasContainer.style.gap = '20px';
            canvasContainer.style.padding = '20px 0';

            if (observer) observer.disconnect();

            pdfDoc.getPage(1).then(firstPage => {
                let currentScale = scale;
                if (window.innerWidth < 768) {
                    const tempViewport = firstPage.getViewport({ scale: 1.0 });
                    const containerWidth = window.innerWidth - 32; 
                    currentScale = containerWidth / tempViewport.width;
                    scale = currentScale;
                }
                
                const firstViewport = firstPage.getViewport({ scale: currentScale });
                const pageW = Math.floor(firstViewport.width);
                const pageH = Math.floor(firstViewport.height);
                const outputScale = (window.devicePixelRatio || 1) * 2; // Increased for extra crispness
                
                observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const canvas = entry.target;
                            const num = parseInt(canvas.dataset.pageNum);
                            document.getElementById('page-num').textContent = num;

                            if (!canvas.dataset.rendered) {
                                canvas.dataset.rendered = "true";
                                
                                pdfDoc.getPage(num).then(page => {
                                    const viewport = page.getViewport({ scale: currentScale });
                                    canvas.width = Math.floor(viewport.width * outputScale);
                                    canvas.height = Math.floor(viewport.height * outputScale);
                                    canvas.style.width = Math.floor(viewport.width) + "px";
                                    canvas.style.height = Math.floor(viewport.height) + "px";

                                    const renderCtx = {
                                        canvasContext: canvas.getContext('2d'),
                                        transform: outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null,
                                        viewport: viewport
                                    };
                                    page.render(renderCtx);
                                });
                            }
                        }
                    });
                }, { rootMargin: "800px 0px" });

                for (let num = 1; num <= pdfDoc.numPages; num++) {
                    const canvas = document.createElement('canvas');
                    canvas.className = 'pdf-page-canvas';
                    canvas.dataset.pageNum = num;
                    canvas.style.boxShadow = '0 10px 40px rgba(0,0,0,0.1)';
                    canvas.style.borderRadius = '8px';
                    canvas.style.backgroundColor = '#fff';
                    // Pre-allocate space to avoid scroll jumping
                    canvas.style.width = pageW + "px";
                    canvas.style.height = pageH + "px";
                    
                    canvasContainer.appendChild(canvas);
                    observer.observe(canvas);
                }
            });
        };

        const zoomInBtn = document.getElementById('zoom-in');
        const zoomOutBtn = document.getElementById('zoom-out');
        
        if (zoomInBtn) {
            zoomInBtn.addEventListener('click', () => {
                scale += 0.2;
                renderAllPagesLazy();
            });
        }
        
        if (zoomOutBtn) {
            zoomOutBtn.addEventListener('click', () => {
                if (scale <= 0.6) return;
                scale -= 0.2;
                renderAllPagesLazy();
            });
        }

        // Fetch PDF Document
        pdfjsLib.getDocument(safeUrl).promise.then(pdfDoc_ => {
            pdfDoc = pdfDoc_;
            document.getElementById('page-count').textContent = pdfDoc.numPages;
            hideLoader();
            
            renderAllPagesLazy();
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
    } else if (filename.endsWith('.doc') || filename.endsWith('.docx') || filename.endsWith('.ppt') || filename.endsWith('.pptx') || filename.endsWith('.xls') || filename.endsWith('.xlsx')) {
        // LOAD WORD/PPT/EXCEL USING MICROSOFT OFFICE ONLINE VIEWER (HIGHEST QUALITY)
        if (controls) controls.style.display = 'none';
        if (canvasContainer) {
            canvasContainer.style.padding = '0';
            canvasContainer.style.display = 'block';
            canvasContainer.style.height = '100vh'; // Force full height
            
            const safeUrl = url.replace('http://', 'https://');
            const encodedUrl = encodeURIComponent(safeUrl);
            const viewerUrl = "https://view.officeapps.live.com/op/embed.aspx?src=" + encodedUrl;
            
            canvasContainer.innerHTML = `<iframe src="${viewerUrl}" style="width: 100%; height: 100vh; border: none; background: #fff;"></iframe>`;
        }
        hideLoader();
    } else {
        // LOAD OTHER FILES USING GOOGLE DOCS VIEWER
        if (controls) controls.style.display = 'none';
        if (canvasContainer) {
            canvasContainer.style.padding = '0';
            canvasContainer.style.display = 'block';
            canvasContainer.style.height = '100vh';
            
            const safeUrl = url.replace('http://', 'https://');
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
