const fs = require('fs');
const path = require('path');

const files = [
    'cat1_past_papers.html',
    'cat2_past_papers.html',
    'assignments_past_papers.html',
    'ue_past_papers.html',
    'projects_past_papers.html'
];
const base_dir = path.join('d:', '4LAZIE', 'src', 'main', 'resources', 'templates');

const dropdown_css = `
        .custom-glass-dropdown {
            position: relative;
            width: 100%;
            font-family: 'Outfit', sans-serif;
            user-select: none;
        }

        .glass-dropdown-header {
            background: rgba(255, 255, 255, 0.4);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(16, 185, 129, 0.2);
            border-radius: 12px;
            padding: 12px 18px;
            font-weight: 700;
            color: #1e293b;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: inset 0 2px 5px rgba(0,0,0,0.02);
        }

        .glass-dropdown-header:hover {
            background: rgba(255, 255, 255, 0.6);
            border-color: rgba(16, 185, 129, 0.4);
            box-shadow: 0 4px 15px rgba(16, 185, 129, 0.08);
        }

        .glass-dropdown-header.open {
            border-color: #10b981;
            box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.15);
            background: rgba(255, 255, 255, 0.8);
        }

        .glass-dropdown-header .dropdown-icon {
            color: #10b981;
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .glass-dropdown-header.open .dropdown-icon {
            transform: rotate(-180deg);
        }

        .glass-dropdown-list {
            position: absolute;
            top: calc(100% + 8px);
            left: 0;
            width: 100%;
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(16, 185, 129, 0.15);
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(16, 185, 129, 0.15);
            z-index: 1000;
            overflow: hidden;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .custom-glass-dropdown.open .glass-dropdown-list {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }

        .glass-dropdown-item {
            padding: 12px 18px;
            font-weight: 600;
            color: #475569;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .glass-dropdown-item:hover {
            background: rgba(16, 185, 129, 0.1);
            color: #10b981;
            padding-left: 24px;
        }

        .glass-dropdown-item.active {
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(52, 211, 153, 0.05));
            color: #059669;
            font-weight: 700;
            border-left: 3px solid #10b981;
        }
`;

function processFile(filename) {
    const filepath = path.join(base_dir, filename);
    let content = fs.readFileSync(filepath, 'utf8');
    
    if (content.includes('.custom-glass-dropdown')) {
        console.log(`Skipping ${filename}, already processed.`);
        return;
    }

    content = content.replace('.btn-premium-search {', dropdown_css + '\n        .btn-premium-search {');
    
    const match = content.match(/<select id="([a-zA-Z0-9]+)Program"/);
    if (!match) {
        console.log(`Skipping ${filename}, prefix not found`);
        return;
    }
    const prefix = match[1];
    
    const prog_html = `<div class="custom-glass-dropdown" id="programDropdownWrapper">
                            <div class="glass-dropdown-header" id="programDropdownHeader">
                                <span id="programDropdownText">Diploma</span>
                                <i class="bi bi-chevron-down dropdown-icon"></i>
                            </div>
                            <div class="glass-dropdown-list" id="programDropdownList">
                                <div class="glass-dropdown-item active" data-value="DIPLOMA">Diploma</div>
                                <div class="glass-dropdown-item" data-value="DEGREE">Degree</div>
                            </div>
                            <!-- Hidden inputs to keep JS logic intact -->
                            <input type="radio" id="progDiploma" name="${prefix}Program" value="DIPLOMA" checked class="d-none">
                            <input type="radio" id="progDegree" name="${prefix}Program" value="DEGREE" class="d-none">
                        </div>`;
    content = content.replace(new RegExp(`<select id="${prefix}Program" class="premium-select">[\\s\\S]*?<\\/select>`), prog_html);
    
    content = content.replace(
        /<div class="col-md-6 col-lg-3">\s*<div class="premium-input-group">\s*<label class="premium-label">Are you in Degree or Diploma\?<\/label>/,
        '<div class="col-md-6 col-lg-3" style="z-index: 50;">\n                    <div class="premium-input-group" style="z-index: 50;">\n                        <label class="premium-label">Are you in Degree or Diploma?</label>'
    );

    const course_html = `<div class="custom-glass-dropdown" id="courseDropdownWrapper">
                            <div class="glass-dropdown-header" id="courseDropdownHeader">
                                <span id="courseDropdownText">Select Course</span>
                                <i class="bi bi-chevron-down dropdown-icon"></i>
                            </div>
                            <div class="glass-dropdown-list" id="courseDropdownList">
                            </div>
                            <input type="hidden" id="${prefix}Course" value="">
                        </div>`;
    content = content.replace(new RegExp(`<select id="${prefix}Course" class="premium-select">[\\s\\S]*?<\\/select>`), course_html);
    content = content.replace(
        /<div class="col-md-6 col-lg-3">\s*<div class="premium-input-group">\s*<label class="premium-label">Select your Course<\/label>/,
        '<div class="col-md-6 col-lg-3" style="z-index: 40;">\n                    <div class="premium-input-group" style="z-index: 40;">\n                        <label class="premium-label">Select your Course</label>'
    );

    const level_html = `<div class="custom-glass-dropdown" id="levelDropdownWrapper">
                            <div class="glass-dropdown-header" id="levelDropdownHeader">
                                <span id="levelDropdownText">NTA Level 4</span>
                                <i class="bi bi-chevron-down dropdown-icon"></i>
                            </div>
                            <div class="glass-dropdown-list" id="levelDropdownList">
                                <div class="glass-dropdown-item active" data-value="4">NTA Level 4</div>
                                <div class="glass-dropdown-item" data-value="5">NTA Level 5</div>
                                <div class="glass-dropdown-item" data-value="6">NTA Level 6</div>
                            </div>
                            <input type="hidden" id="${prefix}Level" value="4">
                        </div>`;
    content = content.replace(new RegExp(`<select id="${prefix}Level" class="premium-select">[\\s\\S]*?<\\/select>`), level_html);
    content = content.replace(
        /<div class="col-md-6 col-lg-3" id="levelContainer" style="(.*?)">/,
        '<div class="col-md-6 col-lg-3" id="levelContainer" style="$1 z-index: 30;">'
    );
    content = content.replace(
        /<div class="premium-input-group">\s*<label class="premium-label">Which NTA Level\?<\/label>/,
        '<div class="premium-input-group" style="z-index: 30;">\n                        <label class="premium-label">Which NTA Level?</label>'
    );

    const semester_html = `<div class="custom-glass-dropdown" id="semesterDropdownWrapper">
                            <div class="glass-dropdown-header" id="semesterDropdownHeader">
                                <span id="semesterDropdownText">Semester 1</span>
                                <i class="bi bi-chevron-down dropdown-icon"></i>
                            </div>
                            <div class="glass-dropdown-list" id="semesterDropdownList">
                                <div class="glass-dropdown-item active" data-value="1">Semester 1</div>
                                <div class="glass-dropdown-item" data-value="2">Semester 2</div>
                            </div>
                            <input type="hidden" id="${prefix}Semester" value="1">
                        </div>`;
    content = content.replace(new RegExp(`<select id="${prefix}Semester" class="premium-select">[\\s\\S]*?<\\/select>`), semester_html);
    content = content.replace(
        /<div class="col-md-6 col-lg-3">\s*<div class="premium-input-group">\s*<label class="premium-label">Which Semester\?<\/label>/,
        '<div class="col-md-6 col-lg-3" style="z-index: 20;">\n                    <div class="premium-input-group" style="z-index: 20;">\n                        <label class="premium-label">Which Semester?</label>'
    );
    
    const dropdown_js = `
        function bindGenericDropdown(wrapperId, headerId, textId, inputId) {
            const wrapper = document.getElementById(wrapperId);
            const header = document.getElementById(headerId);
            const textEl = document.getElementById(textId);
            const hiddenInput = document.getElementById(inputId);
            const items = wrapper ? wrapper.querySelectorAll('.glass-dropdown-item') : [];
            if(!wrapper) return;
            
            header.addEventListener('click', function(e) {
                wrapper.classList.toggle('open');
                header.classList.toggle('open');
                e.stopPropagation();
            });
            
            items.forEach(item => {
                item.addEventListener('click', function() {
                    textEl.textContent = this.textContent;
                    items.forEach(i => i.classList.remove('active'));
                    this.classList.add('active');
                    hiddenInput.value = this.dataset.value;
                    wrapper.classList.remove('open');
                    header.classList.remove('open');
                });
            });
            
            document.addEventListener('click', function(e) {
                if (!wrapper.contains(e.target)) {
                    wrapper.classList.remove('open');
                    header.classList.remove('open');
                }
            });
        }
        
        bindGenericDropdown('levelDropdownWrapper', 'levelDropdownHeader', 'levelDropdownText', '${prefix}Level');
        bindGenericDropdown('semesterDropdownWrapper', 'semesterDropdownHeader', 'semesterDropdownText', '${prefix}Semester');
        
        const courseWrapper = document.getElementById('courseDropdownWrapper');
        const courseHeader = document.getElementById('courseDropdownHeader');
        if(courseHeader) {
            courseHeader.addEventListener('click', function(e) {
                courseWrapper.classList.toggle('open');
                courseHeader.classList.toggle('open');
                e.stopPropagation();
            });
            document.addEventListener('click', function(e) {
                if (!courseWrapper.contains(e.target)) {
                    courseWrapper.classList.remove('open');
                    courseHeader.classList.remove('open');
                }
            });
        }
        
        // Program Dropdown specific logic
        const programDropdownWrapper = document.getElementById('programDropdownWrapper');
        const programDropdownHeader = document.getElementById('programDropdownHeader');
        const programDropdownText = document.getElementById('programDropdownText');
        const programDropdownItems = document.querySelectorAll('#programDropdownList .glass-dropdown-item');
        const progDiplomaRadio = document.getElementById('progDiploma');
        const progDegreeRadio = document.getElementById('progDegree');

        if(programDropdownHeader) {
            programDropdownHeader.addEventListener('click', function(e) {
                programDropdownWrapper.classList.toggle('open');
                programDropdownHeader.classList.toggle('open');
                e.stopPropagation();
            });

            programDropdownItems.forEach(item => {
                item.addEventListener('click', function() {
                    programDropdownText.textContent = this.textContent;
                    programDropdownItems.forEach(i => i.classList.remove('active'));
                    this.classList.add('active');
                    
                    if (this.dataset.value === 'DIPLOMA') {
                        progDiplomaRadio.checked = true;
                        progDegreeRadio.checked = false;
                    } else {
                        progDegreeRadio.checked = true;
                        progDiplomaRadio.checked = false;
                    }
                    
                    programDropdownWrapper.classList.remove('open');
                    programDropdownHeader.classList.remove('open');
                    updateCourses();
                });
            });

            document.addEventListener('click', function(e) {
                if (!programDropdownWrapper.contains(e.target)) {
                    programDropdownWrapper.classList.remove('open');
                    programDropdownHeader.classList.remove('open');
                }
            });
        }
    `;
    content = content.replace('function updateCourses() {', dropdown_js + '\n        function updateCourses() {');
    
    const update_courses_body = `
            const programVal = document.querySelector('input[name="${prefix}Program"]:checked').value;
            const isDegree = programVal === 'DEGREE';
            
            // Handle NTA Level Dropdown Animation
            const levelContainer = document.getElementById('levelContainer');
            if (levelContainer) {
                if (!isDegree) {
                    levelContainer.style.display = 'block';
                    // Trigger reflow for animation
                    void levelContainer.offsetWidth;
                    levelContainer.style.opacity = '1';
                    levelContainer.style.transform = 'translateY(0)';
                } else {
                    levelContainer.style.opacity = '0';
                    levelContainer.style.transform = 'translateY(-10px)';
                    levelContainer.style.display = 'none';
                }
            }
            
            const targetCourses = isDegree ? sjuitDegreeCourses : sjuitDiplomaCourses;
            const courseList = document.getElementById('courseDropdownList');
            const courseText = document.getElementById('courseDropdownText');
            
            courseList.innerHTML = '';
            
            if (targetCourses.length === 0) {
                courseText.textContent = "No courses available";
                courseSelect.value = "";
                return;
            }
            
            targetCourses.forEach((c, index) => {
                const item = document.createElement('div');
                item.className = 'glass-dropdown-item' + (index === 0 ? ' active' : '');
                item.dataset.value = c.value;
                item.textContent = c.text;
                
                if (index === 0) {
                    courseText.textContent = c.text;
                    courseSelect.value = c.value;
                }
                
                item.addEventListener('click', function() {
                    courseText.textContent = this.textContent;
                    courseList.querySelectorAll('.glass-dropdown-item').forEach(i => i.classList.remove('active'));
                    this.classList.add('active');
                    courseSelect.value = this.dataset.value;
                    document.getElementById('courseDropdownWrapper').classList.remove('open');
                    document.getElementById('courseDropdownHeader').classList.remove('open');
                });
                
                courseList.appendChild(item);
            });
        }`;
    content = content.replace(/const isDegree = programSelect\.value === 'DEGREE';[\s\S]*?courseSelect\.appendChild\(opt\);\s*\n\s*\}/, update_courses_body);

    content = content.replace(/programSelect\.addEventListener\('change', updateCourses\);/, '');
    
    content = content.replace(/const programVal = programSelect\.value;/, `const programVal = document.querySelector('input[name="${prefix}Program"]:checked').value;`);
    
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`Successfully processed ${filename}`);
}

files.forEach(file => processFile(file));
