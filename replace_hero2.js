const fs = require('fs');

let file = 'src/main/resources/templates/public/home.html';
let c = fs.readFileSync(file, 'utf8');

let searchStart = '<div class="d-flex align-items-center gap-2 mb-2 justify-content-center justify-content-md-start">';
let searchEnd = 'of Tanzania.\n                                    </p>';

let startIdx = c.indexOf(searchStart);
let endIdx = c.indexOf(searchEnd, startIdx);

if (startIdx !== -1 && endIdx !== -1) {
    let oldBlock = c.substring(startIdx, endIdx + searchEnd.length);
    let newBlock = `<div class="d-flex align-items-center gap-2 mb-4 justify-content-center justify-content-md-start">
                                    <div class="icon-wrapper" style="width: 36px; height: 36px; border-radius: 10px; background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.05)); display: flex; align-items: center; justify-content: center; border: 1px solid rgba(16, 185, 129, 0.25); box-shadow: 0 4px 15px rgba(16, 185, 129, 0.1);">
                                        <i class="bi bi-mortarboard-fill"
                                            style="background: linear-gradient(135deg, #10b981, #059669); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-size: 1.2rem; filter: drop-shadow(0 2px 4px rgba(16, 185, 129,0.3));"></i>
                                    </div>
                                    <span
                                        style="font-family:'Outfit',sans-serif; font-weight:800; font-size:0.75rem; color:#64748b; letter-spacing:1.8px; text-transform:uppercase; line-height:1.5; background: linear-gradient(90deg, #475569, #94a3b8); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">St.
                                        Joseph University in Science &amp; Technology <br class="d-md-none"><span
                                            class="d-none d-md-inline" style="color: #cbd5e1; margin: 0 4px;">&bull;</span> Est. 2011</span>
                                </div>

                                <!-- Main Heading -->
                                <style>
                                    @media (max-width: 767.98px) {
                                        .hero-main-title {
                                            font-size: clamp(2.2rem, 8vw, 2.8rem) !important;
                                            line-height: 1.15 !important;
                                            text-align: left !important;
                                            margin-bottom: 24px !important;
                                        }
                                        .hero-highlight {
                                            display: inline-block;
                                            margin-top: 5px;
                                        }
                                    }
                                    
                                    .premium-gradient-text {
                                        background: linear-gradient(135deg, #0f172a 0%, #334155 100%);
                                        -webkit-background-clip: text;
                                        -webkit-text-fill-color: transparent;
                                    }
                                </style>
                                <h2 class="hero-main-title text-center text-md-start"
                                    style="font-family:'Outfit',sans-serif; font-weight:900; font-size:clamp(2.8rem, 4.5vw, 4rem); line-height:1.1; margin-bottom:28px; letter-spacing:-1.5px;">
                                    <span class="premium-gradient-text">Your SJUIT Study Materials,</span><br class="d-none d-md-block"> 
                                    <span class="hero-highlight position-relative" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; display: inline-block;">
                                        All in One Place.
                                        <svg class="position-absolute d-none d-md-block" style="bottom: -12px; left: 0; width: 100%; height: 16px; z-index: -1;" viewBox="0 0 200 12" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 10C50 2 150 2 200 10" stroke="url(#gradientStroke)" stroke-width="5" stroke-linecap="round"/><defs><linearGradient id="gradientStroke" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="rgba(16, 185, 129, 0.4)" /><stop offset="100%" stop-color="rgba(5, 150, 105, 0.1)" /></linearGradient></defs></svg>
                                    </span>
                                </h2>

                                <!-- Desktop shows everything, Mobile uses premium collapse -->
                                <div class="collapse d-md-block mt-3" id="heroDetailsContent">
                                    <!-- Paragraph Intro -->
                                    <div class="position-relative" style="padding-left: 20px; border-left: 4px solid #10b981; border-radius: 2px; margin-bottom: 32px; background: linear-gradient(90deg, rgba(16, 185, 129, 0.05) 0%, transparent 100%); padding-top: 8px; padding-bottom: 8px;">
                                        <p style="font-size:1.05rem; color:#475569; line-height:1.8; margin-bottom:0; max-width:95%; font-weight: 400; letter-spacing: 0.2px;">
                                            <strong style="color:#0f172a; font-weight: 700;">4LAZIE</strong> is a modern academic resource
                                            platform built exclusively for students of
                                            <strong style="color:#0f172a; font-weight: 600;">St. Joseph University in Science &amp; Technology
                                                (SJUIT)</strong>, Dar es Salaam &mdash;
                                            Tanzania's leading private technical university, fully accredited by the
                                            <strong style="color:#0f172a; font-weight: 600;">Tanzania Commission for Universities
                                                (TCU)</strong>, with engineering programmes
                                            endorsed by the <strong style="color:#0f172a; font-weight: 600;">Engineers Registration Board
                                                (ERB)</strong> of Tanzania.
                                        </p>`;
    fs.writeFileSync(file, c.replace(oldBlock, newBlock));
    console.log("Success replacing in home.html");
} else {
    console.log("Target not found. StartIdx: " + startIdx + ", EndIdx: " + endIdx);
}
