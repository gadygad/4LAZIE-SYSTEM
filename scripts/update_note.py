import re

filename = '../src/main/java/com/school/model/Note.java'
with open(filename, 'r') as f:
    content = f.read()

# Add field
target_field_insertion = """    @Column(name = "download_count", nullable = false, columnDefinition = "int default 0")
    private Integer downloadCount = 0;"""

new_field = """    @Column(name = "download_count", nullable = false, columnDefinition = "int default 0")
    private Integer downloadCount = 0;

    @Column(name = "unit_number")
    private Integer unitNumber;"""

if target_field_insertion in content:
    content = content.replace(target_field_insertion, new_field)

# Add getter and setter
target_getter_insertion = """    public Institution getInstitution() {
        return institution;
    }"""

new_getter = """    public Integer getUnitNumber() {
        return unitNumber;
    }

    public void setUnitNumber(Integer unitNumber) {
        this.unitNumber = unitNumber;
    }

    public Institution getInstitution() {
        return institution;
    }"""

if target_getter_insertion in content:
    content = content.replace(target_getter_insertion, new_getter)

with open(filename, 'w') as f:
    f.write(content)
