const fs = require('fs');
let content = fs.readFileSync('src/main/java/com/school/config/CurriculumInitializer.java', 'utf8');
const htmlContent = fs.readFileSync('insert_deg_ce_y4_s1.js', 'utf8').split('const html = `')[1].split('`;')[0].replace(/"/g, '\\"').replace(/\n/g, '\\n" +\n"');
const insertion = `
            // Seed DEG_CE Year 4 Sem 1 Timetable
            com.school.model.Timetable tt_ce_y4_s1 = timetableRepository.findByProgramTypeAndLevelNoAndSemesterNo("DEG_CE", 4, 1).orElse(new com.school.model.Timetable());
            tt_ce_y4_s1.setProgramType("DEG_CE");
            tt_ce_y4_s1.setLevelNo(4);
            tt_ce_y4_s1.setSemesterNo(1);
            tt_ce_y4_s1.setHtmlContent("${htmlContent}");
            timetableRepository.save(tt_ce_y4_s1);
`;
content = content.replace('// Seed DEG_CE Year 3 Sem 2 Timetable', insertion + '\n            // Seed DEG_CE Year 3 Sem 2 Timetable');
fs.writeFileSync('src/main/java/com/school/config/CurriculumInitializer.java', content);
