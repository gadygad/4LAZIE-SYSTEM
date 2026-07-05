const fs = require('fs');

let content = fs.readFileSync('src/main/java/com/school/config/CurriculumInitializer.java', 'utf8');
const startIdx = content.indexOf('// Seed DEG_CE Year 3 Sem 2 Timetable');
const endIdx = content.indexOf('// Seed DIP_CSE Level 4 Sem 1');
const before = content.substring(0, startIdx);
const after = content.substring(endIdx);

const y3_s2_raw = fs.readFileSync('update_tt_theme2.js', 'utf8').split('const html = `')[1].split('`;')[0];
const y3_s2_html = y3_s2_raw
    .replace(/<\/?thead>/g, '')
    .replace(/<\/?tbody>/g, '')
    .replace(/<th rowspan="7" style="border: 1px solid #000; background: #a3a3a3;/g, '<th rowspan="7" style="border: 1px solid #000; background: #e5e7eb;')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n" +\n"');

const y4_s1_raw = fs.readFileSync('insert_deg_ce_y4_s1.js', 'utf8').split('const html = `')[1].split('`;')[0];
const y4_s1_html = y4_s1_raw
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n" +\n"');

const replaceContent = `// Seed DEG_CE Year 3 Sem 2 Timetable
            com.school.model.Timetable tt = timetableRepository.findByProgramTypeAndLevelNoAndSemesterNo("DEG_CE", 3, 2).orElse(new com.school.model.Timetable());
            tt.setProgramType("DEG_CE");
            tt.setLevelNo(3);
            tt.setSemesterNo(2);
            tt.setHtmlContent("${y3_s2_html}");
            timetableRepository.save(tt);

            // Seed DEG_CE Year 4 Sem 1 Timetable
            com.school.model.Timetable tt_y4_s1 = timetableRepository.findByProgramTypeAndLevelNoAndSemesterNo("DEG_CE", 4, 1).orElse(new com.school.model.Timetable());
            tt_y4_s1.setProgramType("DEG_CE");
            tt_y4_s1.setLevelNo(4);
            tt_y4_s1.setSemesterNo(1);
            tt_y4_s1.setHtmlContent("${y4_s1_html}");
            timetableRepository.save(tt_y4_s1);

            `;

fs.writeFileSync('src/main/java/com/school/config/CurriculumInitializer.java', before + replaceContent + after);
