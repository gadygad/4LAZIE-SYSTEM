$path = "c:\Users\minde\OneDrive\Desktop\4LAZIE\src\main\resources\static\css\premium-theme.css"

if (Test-Path $path) {
    $content = Get-Content -Path $path -Raw -Encoding UTF8
    
    # We will append an ultra-premium block at the end of premium-theme.css
    $premiumCss = @'

/* ==========================================================
   ULTRA PREMIUM SIDEBAR SELECTION (NTA Level, Course, Sem)
   ========================================================== */
   
.program-btn {
    background: rgba(255,255,255,0.03) !important;
    border: 1px solid rgba(255,255,255,0.05) !important;
    border-radius: 14px !important;
    padding: 12px 16px !important;
    margin-bottom: 8px !important;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1) !important;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
}
.program-btn:hover {
    background: rgba(255,255,255,0.08) !important;
    border: 1px solid rgba(255,255,255,0.15) !important;
    transform: translateY(-2px) !important;
    box-shadow: 0 8px 25px rgba(0,0,0,0.2) !important;
}
.program-btn.active-program {
    background: linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15)) !important;
    border: 1px solid rgba(139,92,246,0.3) !important;
    border-left: 4px solid #8b5cf6 !important;
}
.program-btn .prog-icon {
    box-shadow: 0 4px 10px rgba(0,0,0,0.2) !important;
}

/* Premium Flyout Menu */
@media (min-width: 992px) {
    .program-levels {
        background: rgba(15, 23, 42, 0.85) !important;
        backdrop-filter: blur(24px) !important;
        -webkit-backdrop-filter: blur(24px) !important;
        border: 1px solid rgba(255,255,255,0.1) !important;
        border-radius: 16px !important;
        padding: 16px !important;
        box-shadow: 0 20px 50px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.2) !important;
    }
    
    /* Small pointer triangle pointing to sidebar */
    .program-levels::before {
        content: '';
        position: absolute;
        top: 20px;
        left: -6px;
        width: 12px;
        height: 12px;
        background: rgba(15, 23, 42, 0.95);
        border-left: 1px solid rgba(255,255,255,0.1);
        border-bottom: 1px solid rgba(255,255,255,0.1);
        transform: rotate(45deg);
    }
}

/* NTA Levels */
.level-group {
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.04);
    border-radius: 12px;
    padding: 10px;
    margin-bottom: 10px !important;
    transition: all 0.3s ease;
}
.level-group:hover {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
}
.level-group-label {
    display: inline-block;
    background: linear-gradient(135deg, #fcd34d 0%, #f59e0b 100%);
    color: #fff !important;
    padding: 4px 10px !important;
    border-radius: 6px;
    font-size: 0.65rem !important;
    font-weight: 800 !important;
    letter-spacing: 1px !important;
    box-shadow: 0 4px 10px rgba(245, 158, 11, 0.3);
    margin-bottom: 8px !important;
    text-shadow: 0 1px 2px rgba(0,0,0,0.2);
}

/* Semester Selections */
.sem-link {
    background: rgba(0,0,0,0.2) !important;
    border: 1px solid rgba(255,255,255,0.03) !important;
    border-radius: 8px !important;
    padding: 8px 12px !important;
    margin-bottom: 4px !important;
    font-size: 0.8rem !important;
    transition: all 0.3s ease !important;
    position: relative;
    overflow: hidden;
}
.sem-link::after {
    content: '\F282'; /* bi-chevron-right */
    font-family: bootstrap-icons;
    position: absolute;
    right: 12px;
    opacity: 0;
    transform: translateX(-10px);
    transition: all 0.3s ease;
    color: #fcd34d;
    font-size: 0.7rem;
}
.sem-link:hover {
    background: linear-gradient(90deg, rgba(59,130,246,0.15), rgba(139,92,246,0.1)) !important;
    border: 1px solid rgba(139,92,246,0.3) !important;
    color: #fff !important;
    transform: translateX(4px) !important;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2) !important;
}
.sem-link:hover::after {
    opacity: 1;
    transform: translateX(0);
}
.sem-link.active-link {
    background: linear-gradient(90deg, #3b82f6, #8b5cf6) !important;
    color: #fff !important;
    border: none !important;
    box-shadow: 0 4px 15px rgba(59,130,246,0.4) !important;
}
.sem-link .sem-dot {
    display: none !important; /* Remove the old dot */
}
.sem-link::before {
    content: '\F4B4'; /* bi-journal-bookmark */
    font-family: bootstrap-icons;
    margin-right: 8px;
    font-size: 0.9rem;
    color: #94a3b8;
    transition: color 0.3s ease;
}
.sem-link:hover::before {
    color: #fcd34d;
}
.sem-link.active-link::before {
    color: #fff;
}
'@

    if (-not $content.Contains("ULTRA PREMIUM SIDEBAR SELECTION")) {
        $content = $content + "`n" + $premiumCss
        Set-Content -Path $path -Value $content -Encoding UTF8
        Write-Output "Applied Ultra Premium styling to premium-theme.css"
    } else {
        # Already applied, but maybe update it
        $content = $content -replace '(?s)/\* ==========================================================.*?ULTRA PREMIUM SIDEBAR SELECTION.*?(?=\Z|\*/)', ''
        $content = $content + "`n" + $premiumCss
        Set-Content -Path $path -Value $content -Encoding UTF8
        Write-Output "Updated Ultra Premium styling in premium-theme.css"
    }
} else {
    Write-Output "File not found."
}
