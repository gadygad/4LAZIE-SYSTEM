with open("src/main/resources/templates/guest_notes.html", "r") as f:
    content = f.read()

# Replace col-lg-9 col-xl-8 with col-lg-7
content = content.replace('<div class="col-lg-9 col-xl-8">', '<div class="col-lg-7">')

# Extract from "<h3 class="fw-bold mb-4 text-warning d-flex align-items-center">" (line 320)
# to "<div class="col-md-6">... </div> </div> </div>" (around line 465)
import re
pattern = r'<h3 class="fw-bold mb-4 text-warning d-flex align-items-center">.*?<div class="permissions-box row mt-5">.*?</div>\s*</div>\s*</div>'
replacement = """
                <div class="d-flex justify-content-start gap-3 mt-5">
                    <a href="/register" class="btn btn-premium px-4 py-2 fs-6 fw-bold text-uppercase">Register for Full Access</a>
                    <a href="/login" class="btn btn-outline-dark px-4 py-2 fs-6 fw-bold text-uppercase" style="border-radius: 14px;">Login</a>
                </div>
            </div> <!-- Close col-lg-7 -->

            <!-- RIGHT: PREMIUM FEATURES -->
            <div class="col-lg-5 mt-5 mt-lg-0">
                <div class="sticky-top" style="top: 100px;">
                    <h3 class="section-title text-start mb-4" style="font-size: 1.5rem; color: #f59e0b; font-family: 'Outfit', sans-serif; letter-spacing: 1px; text-transform: uppercase; font-weight: 700; text-decoration: underline; text-underline-offset: 8px; text-decoration-thickness: 3px; text-decoration-color: rgba(245, 158, 11, 0.4);">PREMIUM FEATURES</h3>
                    
                    <div class="premium-grid mb-4">
                        <a href="/register" class="premium-item">
                            <span class="icon-text text-dark text-uppercase fw-bold" style="font-size: 1rem;"><i class="bi bi-file-earmark-text me-2 text-primary"></i> CAT 1 PAST PAPERS</span>
                            <span class="arrow text-secondary"><i class="bi bi-lock-fill"></i></span>
                        </a>
                        <a href="/register" class="premium-item">
                            <span class="icon-text text-dark text-uppercase fw-bold" style="font-size: 1rem;"><i class="bi bi-file-earmark-text me-2 text-primary"></i> CAT 2 PAST PAPERS</span>
                            <span class="arrow text-secondary"><i class="bi bi-lock-fill"></i></span>
                        </a>
                        <a href="/register" class="premium-item">
                            <span class="icon-text text-dark text-uppercase fw-bold" style="font-size: 1rem;"><i class="bi bi-journal-check me-2 text-primary"></i> ASSIGNMENTS & SOLUTIONS</span>
                            <span class="arrow text-secondary"><i class="bi bi-lock-fill"></i></span>
                        </a>
                        <a href="/register" class="premium-item">
                            <span class="icon-text text-dark text-uppercase fw-bold" style="font-size: 1rem;"><i class="bi bi-award me-2 text-primary"></i> UNIVERSITY EXAMS (UE)</span>
                            <span class="arrow text-secondary"><i class="bi bi-lock-fill"></i></span>
                        </a>
                    </div>

                    <!-- Access Restricted Banner -->
                    <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border-radius: 16px; padding: 25px; color: white; box-shadow: 0 15px 30px rgba(0,0,0,0.15); position: relative; overflow: hidden;">
                        <!-- Decoration -->
                        <div style="position: absolute; top: -30px; right: -30px; font-size: 8rem; opacity: 0.05; transform: rotate(-15deg); pointer-events: none;">🔒</div>
                        
                        <h4 style="font-family: 'Outfit', sans-serif; font-weight: 700; margin-bottom: 12px; font-size: 1.3rem;">Unlock All Materials</h4>
                        <p style="font-size: 0.95rem; color: #cbd5e1; margin-bottom: 20px; line-height: 1.6;">
                            Register an account to get full access to all past papers, assignments, and premium notes.
                        </p>
                        <a href="/register" class="btn w-100 fw-bold" style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; border: none; padding: 12px; border-radius: 10px; font-size: 1rem; box-shadow: 0 4px 15px rgba(59,130,246,0.3);">
                            Create Account Now <i class="bi bi-arrow-right ms-2"></i>
                        </a>
                    </div>
                </div>
"""
content = re.sub(pattern, replacement, content, flags=re.DOTALL)

with open("src/main/resources/templates/guest_notes.html", "w") as f:
    f.write(content)
