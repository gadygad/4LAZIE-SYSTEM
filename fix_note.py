import re

with open("src/main/java/com/school/model/Note.java", "r") as f:
    content = f.read()

# Add fields
new_fields = """    @Column(name = "module_name", length = 150)
    private String moduleName;

    @Column(name = "module_code", length = 20)
    private String moduleCode;

    @Column(name = "category", length = 50)"""

content = content.replace('    @Column(name = "category", length = 50)', new_fields)

# Add to constructors
old_constructor = "public Note(String title, String filename, Integer levelNo, Integer semesterNo, String category, LocalDateTime uploadDate) {"
new_constructor = "public Note(String title, String filename, Integer levelNo, Integer semesterNo, String category, String moduleName, String moduleCode, LocalDateTime uploadDate) {"
content = content.replace(old_constructor, new_constructor)

old_constructor_body = """        this.semesterNo = semesterNo;
        this.category = category;"""
new_constructor_body = """        this.semesterNo = semesterNo;
        this.category = category;
        this.moduleName = moduleName;
        this.moduleCode = moduleCode;"""
content = content.replace(old_constructor_body, new_constructor_body)

# Add getters/setters
getters = """    public String getModuleName() {
        return moduleName;
    }

    public void setModuleName(String moduleName) {
        this.moduleName = moduleName;
    }

    public String getModuleCode() {
        return moduleCode;
    }

    public void setModuleCode(String moduleCode) {
        this.moduleCode = moduleCode;
    }

    public String getCategory() {"""
content = content.replace("    public String getCategory() {", getters)

with open("src/main/java/com/school/model/Note.java", "w") as f:
    f.write(content)

