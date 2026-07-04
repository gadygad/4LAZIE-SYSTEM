const fs = require('fs');
const files = [
    'd:/4LAZIE/src/main/resources/templates/assignments_past_papers.html',
    'd:/4LAZIE/src/main/resources/templates/cat1_past_papers.html',
    'd:/4LAZIE/src/main/resources/templates/cat2_past_papers.html',
    'd:/4LAZIE/src/main/resources/templates/ue_past_papers.html',
    'd:/4LAZIE/src/main/resources/templates/projects_past_papers.html'
];

files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        // Find the level container HTML label to give it an ID if it doesn't have one
        content = content.replace(/<label class="premium-label">Which NTA Level\?<\/label>/g, '<label class="premium-label" id="levelLabel">Which NTA Level?</label>');

        // Replace the hiding logic with updating logic
        const oldLogic = `            if (levelContainer) {
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
            }`;
            
        const newLogic = `            if (levelContainer) {
                levelContainer.style.display = 'block';
                void levelContainer.offsetWidth;
                levelContainer.style.opacity = '1';
                levelContainer.style.transform = 'translateY(0)';
                
                const levelLabel = document.getElementById('levelLabel');
                const levelDropdownList = document.getElementById('levelDropdownList');
                const levelDropdownText = document.getElementById('levelDropdownText');
                const assignmentLevel = document.getElementById('assignmentLevel');
                
                if (isDegree) {
                    if (levelLabel) levelLabel.textContent = "Which Year?";
                    let opts = '<div class="glass-dropdown-item active" data-value="1">Year 1</div>' +
                               '<div class="glass-dropdown-item" data-value="2">Year 2</div>' +
                               '<div class="glass-dropdown-item" data-value="3">Year 3</div>';
                    if (programVal !== 'DEG_CS') {
                        opts += '<div class="glass-dropdown-item" data-value="4">Year 4</div>';
                    }
                    if (levelDropdownList) levelDropdownList.innerHTML = opts;
                    if (levelDropdownText) levelDropdownText.textContent = "Year 1";
                    if (assignmentLevel) assignmentLevel.value = "1";
                } else {
                    if (levelLabel) levelLabel.textContent = "Which NTA Level?";
                    let opts = '<div class="glass-dropdown-item active" data-value="4">NTA Level 4</div>' +
                               '<div class="glass-dropdown-item" data-value="5">NTA Level 5</div>' +
                               '<div class="glass-dropdown-item" data-value="6">NTA Level 6</div>';
                    if (levelDropdownList) levelDropdownList.innerHTML = opts;
                    if (levelDropdownText) levelDropdownText.textContent = "NTA Level 4";
                    if (assignmentLevel) assignmentLevel.value = "4";
                }
                
                // Rebind event listeners for new items
                if (levelDropdownList) {
                    const items = levelDropdownList.querySelectorAll('.glass-dropdown-item');
                    const wrapper = document.getElementById('levelDropdownWrapper');
                    const header = document.getElementById('levelDropdownHeader');
                    items.forEach(item => {
                        item.addEventListener('click', function(e) {
                            if (levelDropdownText) levelDropdownText.textContent = this.textContent;
                            if (assignmentLevel) assignmentLevel.value = this.dataset.value;
                            items.forEach(i => i.classList.remove('active'));
                            this.classList.add('active');
                            if (wrapper) wrapper.classList.remove('open');
                            if (header) header.classList.remove('open');
                            e.stopPropagation();
                        });
                    });
                }
            }`;

        if (content.includes(oldLogic)) {
            content = content.replace(oldLogic, newLogic);
            fs.writeFileSync(file, content, 'utf8');
            console.log("Updated", file);
        } else {
            console.log("Old logic not found in", file);
        }
    }
});
