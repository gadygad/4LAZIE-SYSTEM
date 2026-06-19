$path = "c:\Users\minde\OneDrive\Desktop\4LAZIE\src\main\resources\templates\home.html"

if (Test-Path $path) {
    $content = Get-Content -Path $path -Raw -Encoding UTF8
    
    $oldCss = @'
        .hero-sidebar {
            width: 85px !important;
            min-width: 85px !important;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
            overflow-x: hidden !important;
        }
        .hero-sidebar:hover {
            width: 320px !important;
            min-width: 320px !important;
            box-shadow: 10px 0 30px rgba(0,0,0,0.15) !important;
        }
        .hero-sidebar .sidebar-accordion, .hero-sidebar .sidebar-header, .hero-sidebar > div:last-child {
            opacity: 0 !important;
            visibility: hidden !important;
            transition: all 0.2s ease !important;
            white-space: nowrap;
        }
        .hero-sidebar:hover .sidebar-accordion, .hero-sidebar:hover .sidebar-header, .hero-sidebar:hover > div:last-child {
            opacity: 1 !important;
            visibility: visible !important;
            transition-delay: 0.15s !important;
        }
        .hero-sidebar::before {
            content: "\F479"; /* bi-list */
            font-family: bootstrap-icons !important;
            font-size: 2rem;
            color: rgba(255,255,255,0.9);
            position: absolute;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            transition: all 0.3s ease;
            z-index: 100;
        }
        .hero-sidebar:hover::before {
            opacity: 0;
            visibility: hidden;
        }
'@
    
    $newCss = @'
        @media (min-width: 992px) {
            .page-layout > .hero-sidebar {
                width: 85px !important;
                min-width: 85px !important;
                transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
                overflow-x: hidden !important;
            }
            .page-layout > .hero-sidebar:hover {
                width: 320px !important;
                min-width: 320px !important;
                box-shadow: 10px 0 30px rgba(0,0,0,0.15) !important;
            }
            .page-layout > .hero-sidebar .sidebar-accordion, 
            .page-layout > .hero-sidebar .sidebar-header, 
            .page-layout > .hero-sidebar > div:last-child {
                opacity: 0 !important;
                visibility: hidden !important;
                transition: all 0.2s ease !important;
                white-space: nowrap;
            }
            .page-layout > .hero-sidebar:hover .sidebar-accordion, 
            .page-layout > .hero-sidebar:hover .sidebar-header, 
            .page-layout > .hero-sidebar:hover > div:last-child {
                opacity: 1 !important;
                visibility: visible !important;
                transition-delay: 0.15s !important;
            }
            .page-layout > .hero-sidebar::before {
                content: "\F479"; /* bi-list */
                font-family: bootstrap-icons !important;
                font-size: 2rem;
                color: rgba(255,255,255,0.9);
                position: absolute;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                transition: all 0.3s ease;
                z-index: 100;
            }
            .page-layout > .hero-sidebar:hover::before {
                opacity: 0;
                visibility: hidden;
            }
        }
'@
    
    $content = $content.Replace($oldCss, $newCss)
    Set-Content -Path $path -Value $content -Encoding UTF8
    Write-Output "Applied media query fix."
} else {
    Write-Output "File not found."
}
