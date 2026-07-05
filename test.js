document = {
    addEventListener: function() {},
    getElementById: function() { return { querySelectorAll: function() { return []; }, addEventListener: function(){} }; }
};
TomSelect = function() {};
Array = global.Array;

document.addEventListener('DOMContentLoaded', function() {
    let eduSelectEl = document.getElementById('eduLevel');
    let courseSelectEl = document.getElementById('courseSelect');
    let levelLabel = document.getElementById('levelLabel');
    let dynamicFields = document.getElementById('dynamicFields');
    let originalOptions = Array.from(courseSelectEl.querySelectorAll('option')).map(opt => ({
        value: opt.value, 
        text: opt.text, 
        type: opt.getAttribute('data-type')
    }));

    let eduTomSelect = null, courseTomSelect = null;
    try {
        eduTomSelect = new TomSelect(eduSelectEl, { create: false, controlInput: null });
        courseTomSelect = new TomSelect(courseSelectEl, { create: false, controlInput: null });
    } catch(e) {
        console.error('Tom Select error:', e);
    }

    function handleEduChange(selectedType) {
        if (!selectedType) {
            dynamicFields.classList.add('d-none');
            if (courseTomSelect) courseTomSelect.disable();
            else courseSelectEl.disabled = true;
            return;
        }

        dynamicFields.classList.remove('d-none');

        if (selectedType === 'DIP') {
            levelLabel.innerHTML = 'NTA Level';
        } else if (selectedType === 'DEG') {
            levelLabel.innerHTML = 'Year';
        } else {
            levelLabel.innerHTML = 'Level/Year';
        }

        if (courseTomSelect) {
            courseTomSelect.clear(true);
            courseTomSelect.clearOptions();
            courseTomSelect.enable();
            courseTomSelect.addOption({value: "", text: "Select Course"});
            originalOptions.forEach(opt => {
                if (opt.value && opt.type === selectedType) {
                    courseTomSelect.addOption({value: opt.value, text: opt.text});
                }
            });
        } else {
            courseSelectEl.innerHTML = '<option value="">Select Course</option>';
            courseSelectEl.disabled = false;
            originalOptions.forEach(opt => {
                if (opt.value && opt.type === selectedType) {
                    let newOpt = document.createElement('option');
                    newOpt.value = opt.value;
                    newOpt.text = opt.text;
                    courseSelectEl.appendChild(newOpt);
                }
            });
        }
    }

    if (eduTomSelect) {
        eduTomSelect.on('change', handleEduChange);
    }
    eduSelectEl.addEventListener('change', function(e) {
        handleEduChange(e.target.value);
    });
});
