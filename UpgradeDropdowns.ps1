$files = @(
    "c:\Users\minde\OneDrive\Desktop\4LAZIE\src\main\resources\templates\home.html",
    "c:\Users\minde\OneDrive\Desktop\4LAZIE\src\main\resources\templates\index.html"
)

$target1 = '<a href="#" class="text-secondary dropdown-toggle-hide-arrow" data-bs-toggle="dropdown" aria-expanded="false" title="Filter Options"'
$replace1 = '<button type="button" class="btn text-secondary p-0 border-0" onclick="const m = this.nextElementSibling; m.classList.toggle(''show'');" onblur="setTimeout(() => this.nextElementSibling.classList.remove(''show''), 200)" title="Filter Options"'

$target2 = '<ul class="dropdown-menu dropdown-menu-end shadow-lg border-0" style="border-radius: 16px; font-family: ''Outfit'', sans-serif; padding: 12px 8px; min-width: 220px;">'
$replace2 = '<ul class="dropdown-menu dropdown-menu-end border-0 position-absolute" style="top: calc(100% + 12px); right: 0; border-radius: 20px; font-family: ''Outfit'', sans-serif; padding: 16px; min-width: 260px; z-index: 9999; background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.8) !important; box-shadow: 0 24px 48px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.02) !important; transform-origin: top right; animation: dropdownPop 0.2s cubic-bezier(0.16, 1, 0.3, 1);">'

$target3 = '</a>'
$replace3 = '</button>'

$target4 = '<style>.dropdown-toggle-hide-arrow::after { display: none; } .dropdown-item:hover { background-color: #f8fafc; color: #0f172a; }</style>'
$replace4 = '<style>@keyframes dropdownPop { 0% { opacity: 0; transform: scale(0.95) translateY(-10px); } 100% { opacity: 1; transform: scale(1) translateY(0); } } .dropdown-item { transition: all 0.2s ease; margin-bottom: 4px; border-radius: 10px; } .dropdown-item:hover { background-color: #f8fafc !important; color: #0f172a !important; transform: translateX(4px); }</style>'

foreach ($path in $files) {
    if (Test-Path $path) {
        $content = Get-Content -Path $path -Raw -Encoding UTF8
        
        # Replace anchor with button start
        $content = $content.Replace($target1, $replace1)
        
        # Replace ul with premium ul
        $content = $content.Replace($target2, $replace2)
        
        # We need to replace the </a> immediately following <i class="bi bi-three-dots-vertical"></i>
        # To be safe, we'll replace `<i class="bi bi-three-dots-vertical"></i>` `</a>` with `</button>`
        $content = $content -replace '<i class="bi bi-three-dots-vertical"></i>\s*</a>', '<i class="bi bi-three-dots-vertical"></i></button>'
        
        # Replace styles
        $content = $content.Replace($target4, $replace4)
        
        Set-Content -Path $path -Value $content -Encoding UTF8
    }
}
Write-Output "Dropdowns upgraded successfully."
