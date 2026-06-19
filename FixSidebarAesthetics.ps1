$path = "c:\Users\minde\OneDrive\Desktop\4LAZIE\src\main\resources\static\css\premium-theme.css"

if (Test-Path $path) {
    $content = Get-Content -Path $path -Raw -Encoding UTF8
    
    $cleanCss = @'
/* ==========================================================
   ULTRA PREMIUM SIDEBAR SELECTION (NTA Level, Course, Sem)
   ========================================================== */
   
.program-btn {
    background: transparent !important;
    border: none !important;
    border-radius: 10px !important;
    padding: 10px 14px !important;
    margin-bottom: 4px !important;
    box-shadow: none !important;
    transition: all 0.3s ease !important;
    border-left: 3px solid transparent !important;
}
.program-btn:hover {
    background: rgba(255,255,255,0.04) !important;
    transform: none !important;
}
.program-btn.active-program {
    background: rgba(59,130,246,0.08) !important;
    border-left: 3px solid #3b82f6 !important;
}
.program-btn .prog-icon {
    box-shadow: none !important;
    background: rgba(255,255,255,0.05) !important;
}
.program-btn.active-program .prog-icon {
    background: rgba(59,130,246,0.2) !important;
    color: #60a5fa !important;
}

/* NTA Levels - Clean Timeline Style */
.level-group {
    background: transparent !important;
    border: none !important;
    padding: 0 0 8px 16px !important;
    margin-bottom: 0 !important;
    border-left: 1px solid rgba(255,255,255,0.08) !important;
    margin-left: 30px !important;
    position: relative;
    transition: none !important;
}
.level-group:hover {
    background: transparent !important;
    border-left: 1px solid rgba(255,255,255,0.15) !important;
}
.level-group-label {
    display: inline-block !important;
    background: transparent !important;
    color: #64748b !important;
    padding: 12px 0 6px 0 !important;
    font-size: 0.65rem !important;
    font-weight: 700 !important;
    letter-spacing: 1px !important;
    box-shadow: none !important;
    text-shadow: none !important;
    text-transform: uppercase;
}

/* Semester Selections - Clean Rows */
.sem-link {
    background: transparent !important;
    border: none !important;
    border-radius: 0 !important;
    padding: 6px 10px 6px 0 !important;
    margin-bottom: 2px !important;
    font-size: 0.75rem !important;
    color: #94a3b8 !important;
    transition: all 0.2s ease !important;
    position: relative;
    text-decoration: none !important;
    display: flex !important;
    align-items: center !important;
    box-shadow: none !important;
}
.sem-link::after, .sem-link::before {
    display: none !important; /* Remove those ugly pseudo-elements */
}
.sem-link:hover {
    background: transparent !important;
    color: #fff !important;
    transform: translateX(4px) !important;
    box-shadow: none !important;
}
.sem-link.active-link {
    background: transparent !important;
    color: #60a5fa !important;
    font-weight: 600 !important;
    box-shadow: none !important;
}
.sem-link .sem-dot {
    display: block !important;
    width: 10px !important;
    height: 1px !important;
    background: rgba(255,255,255,0.15) !important;
    margin-right: 12px !important;
    transition: all 0.2s !important;
    border-radius: 0 !important;
    box-shadow: none !important;
}
.sem-link:hover .sem-dot {
    background: rgba(255,255,255,0.4) !important;
    width: 16px !important;
}
.sem-link.active-link .sem-dot {
    background: #3b82f6 !important;
    width: 16px !important;
    height: 2px !important;
}
'@

    # Replace the old block if it exists
    if ($content -match '(?s)/\* ==========================================================.*?ULTRA PREMIUM SIDEBAR SELECTION.*?(?=\Z|\*/)') {
        $content = $content -replace '(?s)/\* ==========================================================.*?ULTRA PREMIUM SIDEBAR SELECTION.*?(?=\Z|\*/)', ''
    }
    
    $content = $content + "`n" + $cleanCss
    Set-Content -Path $path -Value $content -Encoding UTF8
    Write-Output "Applied sleek minimalist tree style to sidebar."
} else {
    Write-Output "File not found."
}
