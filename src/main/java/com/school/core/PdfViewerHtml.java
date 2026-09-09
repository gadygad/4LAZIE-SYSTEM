package com.school.core;

/**
 * Renders any PDF (notes, the academic calendar, etc.) via PDF.js instead of
 * a native browser/iframe PDF viewer, since that support is inconsistent
 * across real devices (mobile Safari in particular) — some devices save the
 * file to disk instead of displaying it. PDF.js fetches the raw bytes itself
 * and paints every page onto a canvas sized to the viewport, so the result
 * is both reliable and responsive across phones, tablets, and desktops.
 */
public final class PdfViewerHtml {

    private PdfViewerHtml() {}

    private static final String TEMPLATE = """
            <!DOCTYPE html>
            <html>
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=3.0">
            <title>__TITLE__ | 4LAZIE</title>
            <style>
                * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
                html, body { margin: 0; height: 100%; background: #14151a; overflow: hidden; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }

                #topBar { position: fixed; top: 0; left: 0; right: 0; height: 56px; display: flex; align-items: center; justify-content: space-between; padding: 0 12px; background: rgba(17, 17, 17, 0.92); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); z-index: 30; border-bottom: 1px solid rgba(255,255,255,0.06); }
                #topBar .title { color: #f1f5f9; font-size: 0.85rem; font-weight: 600; max-width: 40vw; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                #topBar .pageIndicator { color: #9ca3af; font-size: 0.8rem; font-weight: 600; font-variant-numeric: tabular-nums; white-space: nowrap; }
                .iconBtn { width: 38px; height: 38px; border-radius: 50%; border: none; background: rgba(255,255,255,0.08); color: #f1f5f9; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; cursor: pointer; flex-shrink: 0; transition: background 0.15s ease; }
                .iconBtn:active { background: rgba(16, 185, 129, 0.35); transform: scale(0.94); }
                .zoomGroup { display: flex; align-items: center; gap: 6px; }

                #viewerContainer { position: absolute; top: 56px; left: 0; right: 0; bottom: 0; overflow: auto; -webkit-overflow-scrolling: touch; display: flex; flex-direction: column; align-items: center; padding: 16px 10px 100px; }
                .pageWrap { position: relative; flex-shrink: 0; margin-bottom: 14px; box-shadow: 0 6px 24px rgba(0,0,0,0.45); border-radius: 4px; overflow: hidden; background: #fff; line-height: 0; }
                .pageWrap canvas { display: block; }
                .pageNumBadge { position: absolute; bottom: 8px; right: 8px; background: rgba(17,17,17,0.65); color: #e5e7eb; font-size: 0.65rem; font-weight: 700; padding: 3px 8px; border-radius: 20px; }

                #loadingOverlay { position: fixed; inset: 0; background: #14151a; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #e5e7eb; z-index: 40; gap: 14px; }
                .spinner { width: 38px; height: 38px; border: 3px solid rgba(255,255,255,0.15); border-top-color: #10b981; border-radius: 50%; animation: spin 0.75s linear infinite; }
                @keyframes spin { to { transform: rotate(360deg); } }
                #loadingOverlay .msg { font-size: 0.85rem; color: #9ca3af; }

                #errorOverlay { display: none; position: fixed; inset: 0; background: #14151a; flex-direction: column; align-items: center; justify-content: center; color: #e5e7eb; z-index: 40; gap: 10px; padding: 24px; text-align: center; }
                #errorOverlay .icon { font-size: 2.2rem; margin-bottom: 4px; }
                #errorOverlay h2 { font-size: 1.05rem; margin: 0; }
                #errorOverlay p { font-size: 0.85rem; color: #9ca3af; margin: 0 0 8px; max-width: 320px; }
                #errorOverlay .actions { display: flex; gap: 10px; }
                .pillBtn { border: none; border-radius: 100px; padding: 10px 20px; font-size: 0.8rem; font-weight: 700; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; }
                .pillBtn.primary { background: #10b981; color: #ffffff; }
                .pillBtn.ghost { background: rgba(255,255,255,0.08); color: #e5e7eb; }

                .downloadFab { position: fixed; bottom: 22px; right: 18px; width: 52px; height: 52px; border-radius: 50%; background: #10b981; color: #ffffff; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 25px rgba(16, 185, 129, 0.45); text-decoration: none; font-size: 1.25rem; z-index: 30; transition: transform 0.15s ease; }
                .downloadFab:active { transform: scale(0.92); }
            </style>
            </head>
            <body>

            <div id="loadingOverlay">
                <div class="spinner"></div>
                <div class="msg">Opening document&hellip;</div>
            </div>

            <div id="errorOverlay">
                <div class="icon">&#128193;</div>
                <h2>Couldn't open this document</h2>
                <p>__ERROR_MESSAGE__</p>
                <div class="actions">
                    <button type="button" class="pillBtn ghost" onclick="location.reload();">Try again</button>
                    __DOWNLOAD_ERROR_BTN__
                </div>
            </div>

            <div id="topBar">
                <button type="button" class="iconBtn" title="Back" onclick="window.history.length > 1 ? window.history.back() : window.location.href = '/dashboard';">&#8592;</button>
                <span class="title">__TITLE__</span>
                <div class="zoomGroup">
                    <span class="pageIndicator"><span id="pageNum">1</span>/<span id="pageCount">&ndash;</span></span>
                    <button type="button" class="iconBtn" id="zoomOutBtn" title="Zoom out">&minus;</button>
                    <button type="button" class="iconBtn" id="zoomInBtn" title="Zoom in">+</button>
                </div>
            </div>

            <div id="viewerContainer"></div>

            __DOWNLOAD_FAB__

            <script src="https://cdn.jsdelivr.net/npm/pdfjs-dist@3/build/pdf.min.js"></script>
            <script>
            (function () {
                var PDF_URL = "__PROXY_URL__";
                pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdn.jsdelivr.net/npm/pdfjs-dist@3/build/pdf.worker.min.js";

                var container = document.getElementById('viewerContainer');
                var loadingOverlay = document.getElementById('loadingOverlay');
                var errorOverlay = document.getElementById('errorOverlay');
                var pageNumEl = document.getElementById('pageNum');
                var pageCountEl = document.getElementById('pageCount');

                var pdfDoc = null;
                var zoomStep = 0; // -2..+4, each step is ~15% — keeps zoom subtle and predictable
                var observer = null;

                function baseScaleFor(step) {
                    return Math.pow(1.15, step);
                }

                function renderAllPages() {
                    if (observer) { observer.disconnect(); }
                    container.innerHTML = '';
                    var containerWidth = container.clientWidth - 20;
                    var renderQueue = Promise.resolve();

                    var _loop = function (num) {
                        renderQueue = renderQueue.then(function () {
                            return pdfDoc.getPage(num).then(function (page) {
                                var unscaledViewport = page.getViewport({ scale: 1 });
                                var fitScale = (containerWidth / unscaledViewport.width) * baseScaleFor(zoomStep);
                                var viewport = page.getViewport({ scale: fitScale });

                                var wrap = document.createElement('div');
                                wrap.className = 'pageWrap';
                                wrap.dataset.page = num;

                                var canvas = document.createElement('canvas');
                                // Rendered above the screen's own pixel density so a
                                // native pinch/ctrl-scroll zoom (which just rescales this
                                // raster, unlike the +/- buttons which re-render at the
                                // new target scale) still looks sharp instead of blurry.
                                // Capped so very high-DPI devices don't blow up memory/CPU
                                // rendering every page of a long document at once.
                                var outputScale = Math.min((window.devicePixelRatio || 1) * 1.5, 4);
                                canvas.width = Math.floor(viewport.width * outputScale);
                                canvas.height = Math.floor(viewport.height * outputScale);
                                canvas.style.width = Math.floor(viewport.width) + 'px';
                                canvas.style.height = Math.floor(viewport.height) + 'px';

                                var badge = document.createElement('div');
                                badge.className = 'pageNumBadge';
                                badge.textContent = num + ' / ' + pdfDoc.numPages;

                                wrap.appendChild(canvas);
                                wrap.appendChild(badge);
                                container.appendChild(wrap);

                                var ctx = canvas.getContext('2d');
                                var transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;
                                return page.render({ canvasContext: ctx, viewport: viewport, transform: transform }).promise;
                            });
                        });
                    };
                    for (var num = 1; num <= pdfDoc.numPages; num++) { _loop(num); }

                    renderQueue.then(function () {
                        setupPageTracking();
                    });
                }

                function setupPageTracking() {
                    var wraps = container.querySelectorAll('.pageWrap');
                    observer = new IntersectionObserver(function (entries) {
                        var best = null;
                        entries.forEach(function (e) {
                            if (e.isIntersecting && (!best || e.intersectionRatio > best.intersectionRatio)) { best = e; }
                        });
                        if (best) { pageNumEl.textContent = best.target.dataset.page; }
                    }, { root: container, threshold: [0.25, 0.5, 0.75] });
                    wraps.forEach(function (w) { observer.observe(w); });
                }

                function applyZoom(delta) {
                    var next = zoomStep + delta;
                    if (next < -2 || next > 4) return;
                    zoomStep = next;
                    var currentTopPage = pageNumEl.textContent;
                    renderAllPages();
                    var target = container.querySelector('.pageWrap[data-page="' + currentTopPage + '"]');
                    if (target) { target.scrollIntoView({ block: 'start' }); }
                }

                document.getElementById('zoomInBtn').addEventListener('click', function () { applyZoom(1); });
                document.getElementById('zoomOutBtn').addEventListener('click', function () { applyZoom(-1); });

                var resizeTimer = null;
                window.addEventListener('resize', function () {
                    clearTimeout(resizeTimer);
                    resizeTimer = setTimeout(function () { if (pdfDoc) renderAllPages(); }, 250);
                });

                pdfjsLib.getDocument(PDF_URL).promise.then(function (pdf) {
                    pdfDoc = pdf;
                    pageCountEl.textContent = pdf.numPages;
                    loadingOverlay.style.display = 'none';
                    renderAllPages();
                }).catch(function (err) {
                    loadingOverlay.style.display = 'none';
                    errorOverlay.style.display = 'flex';
                });
            })();
            </script>
            </body>
            </html>
            """;

    public static String render(String title, String pdfUrl, String downloadUrl) {
        return render(title, pdfUrl, downloadUrl, true);
    }

    // allowDownload=false drops the download FAB and the error screen's
    // download button entirely, rather than just hiding them with CSS —
    // used for the currently-active class timetable / academic calendar so
    // students have a reason to keep coming back to the site to check them
    // instead of downloading once and never returning. Once either moves to
    // the archive it's rendered with allowDownload=true again, same as
    // notes always are.
    public static String render(String title, String pdfUrl, String downloadUrl, boolean allowDownload) {
        String safeTitle = title != null
                ? title.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace("\"", "&quot;")
                : "Document";
        String errorMessage = allowDownload
                ? "The preview failed to load. You can try again, or download it instead."
                : "The preview failed to load. Please try again.";
        String downloadFab = allowDownload
                ? "<a class=\"downloadFab\" href=\"" + downloadUrl + "\" title=\"Download\">&#8681;</a>"
                : "";
        String downloadErrorBtn = allowDownload
                ? "<a class=\"pillBtn primary\" href=\"" + downloadUrl + "\">&#8681; Download</a>"
                : "";
        return TEMPLATE
                .replace("__TITLE__", safeTitle)
                .replace("__PROXY_URL__", pdfUrl)
                .replace("__ERROR_MESSAGE__", errorMessage)
                .replace("__DOWNLOAD_FAB__", downloadFab)
                .replace("__DOWNLOAD_ERROR_BTN__", downloadErrorBtn);
    }
}
