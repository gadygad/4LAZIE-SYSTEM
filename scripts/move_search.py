import sys

files = ['../src/main/resources/templates/notes.html', '../src/main/resources/templates/guest_notes.html']

for file_path in files:
    try:
        with open(file_path, 'r') as f:
            content = f.read()

        # Step 1: Remove old search container block
        start_marker = "<!-- Search Bar Section -->"
        end_marker = "<!-- Prominent Guest Prompt Banner -->"
        
        if start_marker in content and end_marker in content:
            idx1 = content.find(start_marker)
            idx2 = content.find(end_marker)
            if idx1 != -1 and idx2 != -1:
                content = content[:idx1] + content[idx2:]
        
        # Step 2: Inject the new search bar into the navbar
        navbar_brand_end = "</a>\n            <div class=\"d-flex align-items-center gap-2\">"
        
        new_search_html = """</a>
            <!-- NEW SEARCH BAR HERE -->
            <div class="search-container position-relative mx-3 d-none d-md-block" style="flex-grow: 1; max-width: 450px;">
                <form action="/notes" method="get" class="m-0">
                    <input type="hidden" name="level" th:value="${selectedLevel}">
                    <input type="hidden" name="semester" th:value="${selectedSemester}">
                    <input type="hidden" name="category" th:value="${selectedCategory}">
                    <i class="bi bi-search position-absolute text-muted" style="left: 18px; top: 50%; transform: translateY(-50%); font-size: 1rem; z-index: 5;"></i>
                    <input type="text" name="search" th:value="${searchQuery}" class="form-control position-relative" placeholder="Search by title or keywords..."
                           style="padding: 10px 20px 10px 50px; border-radius: 100px; border: 1px solid rgba(255,255,255,0.08); background: rgba(0,0,0,0.2); font-size: 0.95rem; font-weight: 500; transition: all 0.3s ease; color: #f8fafc;"
                           onfocus="this.style.boxShadow='0 0 0 4px rgba(59,130,246,0.1)'; this.style.borderColor='rgba(255,255,255,0.2)'; this.style.background='rgba(0,0,0,0.4)';"
                           onblur="this.style.boxShadow='none'; this.style.borderColor='rgba(255,255,255,0.08)'; this.style.background='rgba(0,0,0,0.2)';">
                </form>
            </div>
            <div class="d-flex align-items-center gap-2">"""
            
        if "<!-- NEW SEARCH BAR HERE -->" not in content and navbar_brand_end in content:
            content = content.replace(navbar_brand_end, new_search_html)
            
        with open(file_path, 'w') as f:
            f.write(content)
        print(f"Updated {file_path}")
    except FileNotFoundError:
        pass
