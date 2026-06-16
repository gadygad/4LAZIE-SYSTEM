import re

with open("src/main/resources/templates/guest_notes.html", "r") as f:
    content = f.read()

# 1. Remove the lingering hardcoded Semester 2 block
content = re.sub(r'<!-- NTA Level 5 Semester 2 Modules -->.*?(?=<!-- PREMIUM FEATURES -->)', '', content, flags=re.DOTALL)

# 2. Update the dynamic block to have Read and Download buttons
old_dynamic_note = """<a th:each="note : ${entry.value}" th:href="@{'/view/' + ${note.id}}" class="unit-item">
                                    <span class="fw-semibold">
                                        <i class="bi bi-file-earmark-text me-2 text-primary" th:if="${note.category == 'Note' || note.category == null}"></i>
                                        <i class="bi bi-file-earmark-pdf me-2 text-danger" th:if="${note.category == 'Past Paper'}"></i>
                                        <i class="bi bi-camera-video me-2 text-warning" th:if="${note.category == 'Video Tutorial'}"></i>
                                        <i class="bi bi-clipboard-check me-2 text-success" th:if="${note.category == 'Assignment'}"></i>
                                        <span th:text="${note.title}">Note Title</span>
                                    </span>
                                    <span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">View</span>
                                </a>"""

new_dynamic_note = """<div th:each="note : ${entry.value}" class="unit-item d-flex justify-content-between align-items-center">
                                    <span class="fw-semibold">
                                        <i class="bi bi-file-earmark-text me-2 text-primary" th:if="${note.category == 'Note' || note.category == null}"></i>
                                        <i class="bi bi-file-earmark-pdf me-2 text-danger" th:if="${note.category == 'Past Paper'}"></i>
                                        <i class="bi bi-camera-video me-2 text-warning" th:if="${note.category == 'Video Tutorial'}"></i>
                                        <i class="bi bi-clipboard-check me-2 text-success" th:if="${note.category == 'Assignment'}"></i>
                                        <span th:text="${note.title}">Note Title</span>
                                    </span>
                                    <div class="d-flex gap-2">
                                        <a th:href="@{'/view/' + ${note.id}}" class="btn btn-sm btn-light rounded-pill px-3 text-primary fw-bold" style="font-size: 0.8rem; border: 1px solid rgba(37, 99, 235, 0.2); transition: all 0.2s;">
                                            <i class="bi bi-eye-fill me-1"></i> Read
                                        </a>
                                        <a th:href="@{'/download/' + ${note.id}}" class="btn btn-sm btn-primary rounded-pill px-3 fw-bold shadow-sm" style="font-size: 0.8rem; transition: all 0.2s;">
                                            <i class="bi bi-cloud-download-fill me-1"></i> Download
                                        </a>
                                    </div>
                                </div>"""

content = content.replace(old_dynamic_note, new_dynamic_note)

with open("src/main/resources/templates/guest_notes.html", "w") as f:
    f.write(content)

