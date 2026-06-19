$path = "c:\Users\minde\OneDrive\Desktop\4LAZIE\src\main\resources\templates\home.html"

if (Test-Path $path) {
    $content = Get-Content -Path $path -Raw -Encoding UTF8
    
    # Remove previous failed CSS block
    $pattern = '(?s)@media \(min-width: 992px\) \{\s*\.page-layout > \.hero-sidebar \{.*?\}\s*\}'
    $content = $content -replace $pattern, ''
    
    # Inject the working flyout CSS
    $newCss = @'
    <style id="custom-flyout-sidebar">
        @media (min-width: 992px) {
            .page-layout > .hero-sidebar {
                width: 85px !important;
                min-width: 85px !important;
                transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1), min-width 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
                overflow-x: hidden !important;
                white-space: nowrap !important;
            }
            .page-layout > .hero-sidebar:hover {
                width: 320px !important;
                min-width: 320px !important;
                box-shadow: 10px 0 30px rgba(0,0,0,0.2) !important;
            }
            /* Prevent text wrapping during transition */
            .page-layout > .hero-sidebar * {
                white-space: nowrap !important;
            }
            /* Center the header text and logo when collapsed */
            .page-layout > .hero-sidebar .sidebar-header {
                padding-left: 10px !important;
                transition: padding 0.4s ease;
            }
            .page-layout > .hero-sidebar:hover .sidebar-header {
                padding-left: 20px !important;
            }
        }
    </style>
</head>
'@
    
    if ($content.Contains('<style id="custom-flyout-sidebar">')) {
        $content = $content -replace '(?s)<style id="custom-flyout-sidebar">.*?</style>', ''
    }
    
    $content = $content.Replace("</head>", $newCss)
    Set-Content -Path $path -Value $content -Encoding UTF8
    Write-Output "Applied robust flyout sidebar CSS"
} else {
    Write-Output "File not found"
}
