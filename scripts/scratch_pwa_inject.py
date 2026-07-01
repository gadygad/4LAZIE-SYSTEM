import glob
import re

files = glob.glob('src/main/resources/templates/**/*.html', recursive=True)

pwa_tags = """
    <!-- PWA Manifest & Theme Color -->
    <link rel="manifest" href="/manifest.json">
    <meta name="theme-color" content="#10b981">
    <link rel="apple-touch-icon" href="/images/logo.png">
"""

pwa_script = """
    <!-- PWA Service Worker Registration -->
    <script>
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('PWA ServiceWorker registered with scope:', registration.scope);
                    })
                    .catch(err => {
                        console.error('PWA ServiceWorker registration failed:', err);
                    });
            });
        }
    </script>
"""

for file in files:
    with open(file, 'r') as f:
        content = f.read()

    original_content = content
    
    # Inject manifest into <head> if not already there
    if '<head>' in content and 'manifest.json' not in content:
        content = content.replace('<head>', '<head>\n' + pwa_tags)
        
    # Inject script before </body> if not already there
    if '</body>' in content and 'sw.js' not in content:
        content = content.replace('</body>', pwa_script + '\n</body>')
        
    if content != original_content:
        with open(file, 'w') as f:
            f.write(content)
        print(f"Injected PWA code in {file}")

