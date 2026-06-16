import re

def move_footer(filename):
    with open(filename, 'r') as f:
        content = f.read()

    # Find the footer block
    footer_block = "    <!-- Shared Footer -->\n    <footer th:replace=\"~{fragments/footer :: footer}\"></footer>"
    
    if footer_block in content:
        # Remove it from its current position
        content = content.replace(footer_block, "")
        
        # Now we need to insert it just before the </div> that closes main-content.
        # But there are also script tags!
        # The script tag is:
        #     <!-- Bootstrap 5 JS -->
        #     <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        script_block = '    <!-- Bootstrap 5 JS -->\n    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>\n</div>\n</div>'
        
        # If the script block is there, we can just replace the FIRST </div> in that block with </div> + footer
        if script_block in content:
            new_script_block = '</div>\n\n' + footer_block + '\n\n    <!-- Bootstrap 5 JS -->\n    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>\n</div>'
            content = content.replace(script_block, new_script_block)
            
            with open(filename, 'w') as f:
                f.write(content)
            print(f"Fixed {filename}")
        else:
            print(f"Could not find script block in {filename}")

move_footer('src/main/resources/templates/dashboard.html')
move_footer('src/main/resources/templates/guest_notes.html')
