$path = "c:\Users\minde\OneDrive\Desktop\4LAZIE\src\main\resources\templates\home.html"

if (Test-Path $path) {
    $content = Get-Content -Path $path -Raw -Encoding UTF8
    
    # 1. Update the headers "RECOMMENDED NOTES" and "PREMIUM FEATURES" to have premium gold style and smaller h3 size
    # Find the RECOMMENDED NOTES header
    $oldRec = '<h3 class="premium-gradient-header warning">RECOMMENDED NOTES</h3>'
    $newRec = '<h3 class="premium-gradient-header" style="font-size: 1.4rem; background: linear-gradient(135deg, #fcd34d 0%, #f59e0b 50%, #b45309 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-shadow: 0 4px 15px rgba(245, 158, 11, 0.2); letter-spacing: 0.5px; margin-bottom: 0;">RECOMMENDED NOTES</h3>'
    $content = $content.Replace($oldRec, $newRec)
    
    # Find the PREMIUM FEATURES header
    $oldPrem = '<h3 class="premium-gradient-header">PREMIUM FEATURES</h3>'
    $newPrem = '<h3 class="premium-gradient-header" style="font-size: 1.4rem; background: linear-gradient(135deg, #fcd34d 0%, #f59e0b 50%, #b45309 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-shadow: 0 4px 15px rgba(245, 158, 11, 0.2); letter-spacing: 0.5px; margin-bottom: 0;">PREMIUM FEATURES</h3>'
    $content = $content.Replace($oldPrem, $newPrem)
    
    # 2. Sidebar hover expansion logic
    # The sidebar CSS is located in home.html around line 350
    $oldSidebarCss = @'
        .hero-sidebar {
            width: 300px;
            min-width: 300px;
            background: linear-gradient(180deg, #1c1f30 0%, #26293d 100%); /* Premium dark theme */
            position: sticky;
            top: 64px;
            height: calc(100vh - 64px);
            overflow-y: auto;
            overflow-x: hidden;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            padding: 32px 20px;
            z-index: 10;
            border-right: 1px solid rgba(255,255,255,0.1);
        }
'@
    
    $newSidebarCss = @'
        .hero-sidebar {
            width: 85px;
            min-width: 85px;
            background: linear-gradient(180deg, #1c1f30 0%, #26293d 100%);
            position: sticky;
            top: 64px;
            height: calc(100vh - 64px);
            overflow-y: auto;
            overflow-x: hidden;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            padding: 32px 15px;
            z-index: 1040;
            border-right: 1px solid rgba(255,255,255,0.1);
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 4px 0 15px rgba(0,0,0,0.05);
        }
        .hero-sidebar:hover {
            width: 320px;
            min-width: 320px;
            padding: 32px 20px;
            box-shadow: 10px 0 30px rgba(0,0,0,0.15);
        }
        .hero-sidebar .sidebar-accordion {
            width: 100%;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease;
        }
        .hero-sidebar:hover .sidebar-accordion {
            opacity: 1;
            visibility: visible;
            transition-delay: 0.1s;
        }
        .hero-sidebar .sidebar-glass-card {
            width: 100%;
            transition: all 0.4s ease;
        }
        /* Create a generic icon for the collapsed state to indicate it's a menu */
        .hero-sidebar::before {
            content: "\F479"; /* bi-list from bootstrap icons */
            font-family: bootstrap-icons !important;
            font-size: 1.8rem;
            color: rgba(255,255,255,0.7);
            position: absolute;
            top: 35px;
            left: 50%;
            transform: translateX(-50%);
            transition: all 0.3s ease;
        }
        .hero-sidebar:hover::before {
            opacity: 0;
            visibility: hidden;
        }
        .hero-sidebar .orb { opacity: 0; transition: opacity 0.4s; }
        .hero-sidebar:hover .orb { opacity: 1; }
        
        .hero-sidebar:hover .sidebar-glass-card {
            background: rgba(255,255,255,0.07);
        }
'@
    
    if ($content.Contains('.hero-sidebar {')) {
        # Using a regex replace because whitespace might not match exactly
        $content = $content -replace '(?s)\.hero-sidebar\s*\{\s*width: 300px;.*?border-right:[^\}]+\}', $newSidebarCss
    }
    
    Set-Content -Path $path -Value $content -Encoding UTF8
    Write-Output "Applied styles to home.html"
} else {
    Write-Output "home.html not found."
}
