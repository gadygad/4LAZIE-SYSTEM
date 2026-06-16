import glob

files = glob.glob('src/main/resources/templates/*.html')

for file in files:
    with open(file, 'r') as f:
        content = f.read()

    # Look for the extra </div> before <!-- Close col-lg-7 -->
    # It might be around the empty state or right after the accordion
    
    # Let's fix guest_notes.html first
    if file.endswith('guest_notes.html'):
        # In guest_notes.html:
        # <p class="text-secondary fw-semibold mb-0" style="font-size: 1.1rem;">No materials found for this selection yet.</p>
        # </div>
        # 
        # 
        #             </div> <!-- Close col-lg-7 -->
        # We need to make sure there are NO extra </div> between the empty state </div> and <!-- Close col-lg-7 -->.
        pass # Let's just do a specific string replace

    # Just do a manual targeted replace for both
