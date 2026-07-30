const fs = require('fs');

let file = 'src/main/resources/templates/public/home.html';
let raw = fs.readFileSync(file, 'utf8');
// Normalize all line endings to LF for consistent matching
let c = raw.replace(/\r\n/g, '\n');

let searchStart = '                            <style>\n                                .premium-glass-card {\n                                    background: rgba(255, 255, 255, 0.7);';
let searchEnd = '                                        </div>\n                                    </div>\n                                </div>\n                            </div>';

let startIdx = c.indexOf(searchStart);
let endIdx = c.indexOf(searchEnd, startIdx);

if (startIdx !== -1 && endIdx !== -1) {
    let oldBlock = c.substring(startIdx, endIdx + searchEnd.length);
    let newBlock = `                            <style>
                                 .premium-glass-card {
                                     background: rgba(255, 255, 255, 0.65);
                                     backdrop-filter: blur(20px);
                                     -webkit-backdrop-filter: blur(20px);
                                     border: 1px solid rgba(16, 185, 129, 0.08);
                                     border-radius: 16px;
                                     transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                                     overflow: hidden;
                                     box-shadow: 0 4px 30px rgba(0, 0, 0, 0.02);
                                 }
                                 .premium-glass-card:hover {
                                     transform: scale(1.015) translateY(-3px);
                                     box-shadow: 0 12px 30px rgba(16, 185, 129, 0.08);
                                     border-color: rgba(16, 185, 129, 0.25);
                                     background: #ffffff;
                                 }
                                 .premium-glass-card .icon-box {
                                     width: 44px;
                                     height: 44px;
                                     min-width: 44px;
                                     border-radius: 12px;
                                     background: rgba(16, 185, 129, 0.08);
                                     display: flex;
                                     align-items: center;
                                     justify-content: center;
                                     font-size: 1.3rem;
                                     color: #10b981;
                                     border: 1px solid rgba(16, 185, 129, 0.12);
                                     transition: all 0.3s ease;
                                 }
                                 .premium-glass-card:hover .icon-box {
                                     background: linear-gradient(135deg, #10b981, #059669);
                                     color: white;
                                     box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
                                     border-color: transparent;
                                 }
                                 
                                 /* Tag badges */
                                 .nta-badge {
                                     background: rgba(16, 185, 129, 0.08);
                                     color: #059669;
                                     border: 1px solid rgba(16, 185, 129, 0.12);
                                     padding: 3px 10px;
                                     border-radius: 30px;
                                     font-size: 0.65rem;
                                     font-weight: 700;
                                     display: inline-flex;
                                     align-items: center;
                                     gap: 4px;
                                 }
                                 .sem-badge {
                                     background: rgba(59, 130, 246, 0.08);
                                     color: #2563eb;
                                     border: 1px solid rgba(59, 130, 246, 0.12);
                                     padding: 3px 10px;
                                     border-radius: 30px;
                                     font-size: 0.65rem;
                                     font-weight: 700;
                                     display: inline-flex;
                                     align-items: center;
                                     gap: 4px;
                                 }
                                 .stat-badge {
                                     background: rgba(100, 116, 139, 0.05);
                                     color: #64748b;
                                     padding: 3px 10px;
                                     border-radius: 30px;
                                     font-size: 0.65rem;
                                     font-weight: 600;
                                     display: inline-flex;
                                     align-items: center;
                                     gap: 4px;
                                 }
                             </style>
 
                             <div class="premium-scroll-container">
                                 <div class="d-flex flex-column gap-3 px-1 pb-2">
                                     <!-- Dynamic List of Notes -->
                                     <div th:each="note : \${popularNotes}" class="premium-glass-card d-flex align-items-center justify-content-between p-3 gap-3">
                                         <div class="d-flex align-items-center gap-3 w-100" style="min-width: 0;">
                                             <div class="icon-box flex-shrink-0">
                                                 <i class="bi bi-file-earmark-text-fill"></i>
                                             </div>
                                             <div class="w-100" style="min-width: 0;">
                                                 <div class="fw-bold mb-1" style="color: #0f172a; font-size: 0.88rem; font-family: 'Outfit', sans-serif; line-height: 1.35; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; letter-spacing: -0.2px;" th:text="\${note.title}">TITLE</div>
                                                 <div class="d-flex flex-wrap align-items-center gap-2 mt-1">
                                                     <span class="nta-badge"><i class="bi bi-mortarboard-fill"></i> NTA <span th:text="\${note.levelNo}">4</span></span>
                                                     <span th:if="\${note.semesterNo != null}" class="sem-badge"><i class="bi bi-calendar2-week-fill"></i> S<span th:text="\${note.semesterNo}">1</span></span>
                                                     
                                                     <!-- Stats Inline -->
                                                     <span class="stat-badge" title="Views">
                                                         <i class="bi bi-eye-fill"></i><span th:text="\${note.viewCount != null ? note.viewCount : 0}"></span>
                                                     </span>
                                                     <span class="stat-badge" title="Downloads">
                                                         <i class="bi bi-cloud-arrow-down-fill"></i><span th:text="\${note.downloadCount != null ? note.downloadCount : 0}"></span>
                                                     </span>
                                                 </div>
                                             </div>
                                         </div>
                                         
                                         <!-- Action Buttons Stacked -->
                                         <div class="d-flex flex-column justify-content-center flex-shrink-0 gap-2">
                                             <a th:href="@{'/view/' + \${note.encryptedSlug}}" class="btn d-flex align-items-center justify-content-center" style="background: #10b981; color: white; border-radius: 100px; padding: 6px 16px; font-size: 0.72rem; font-weight: 700; border: none; transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1); box-shadow: 0 4px 12px rgba(16, 185, 129, 0.15); height: 26px;" onmouseover="this.style.background='#059669'; this.style.transform='scale(1.05)';" onmouseout="this.style.background='#10b981'; this.style.transform='scale(1)';" title="Read">
                                                 <i class="bi bi-eye"></i><span class="ms-1">READ</span>
                                             </a>
                                             <a th:href="@{'/download/' + \${note.encryptedSlug}}" class="btn d-flex align-items-center justify-content-center" style="background: rgba(16, 185, 129, 0.08); color: #059669; border-radius: 100px; padding: 6px 16px; font-size: 0.72rem; font-weight: 700; border: 1px solid rgba(16, 185, 129, 0.15); transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1); height: 26px;" onmouseover="this.style.background='rgba(16, 185, 129, 0.15)'; this.style.transform='scale(1.05)';" onmouseout="this.style.background='rgba(16, 185, 129, 0.08)'; this.style.transform='scale(1)';" title="Download">
                                                 <i class="bi bi-cloud-arrow-down"></i><span class="ms-1">DOWNLOAD</span>
                                             </a>
                                         </div>
                                     </div>
                                 </div>
                             </div>`;
    
    // Write back normalized line endings to avoid git diff noise or preserve original CRLF
    let replacedContent = c.replace(oldBlock, newBlock);
    if (raw.includes('\r\n')) {
        replacedContent = replacedContent.replace(/\n/g, '\r\n');
    }
    fs.writeFileSync(file, replacedContent);
    console.log('Successfully updated popular notes view with CRLF normalization.');
} else {
    console.log('Unable to locate template popular notes block with normalized LF');
}
