import re

with open('src/main/resources/templates/index.html', 'r') as f:
    content = f.read()

# 1. Update RECOMMENDED NOTES header
old_recommended = """<h3 class="m-0 section-title" style="font-family: 'Outfit', sans-serif; font-size: 1.6rem; font-weight: 800; color: #f59e0b; letter-spacing: -0.5px; text-decoration: underline; text-underline-offset: 8px; text-decoration-thickness: 3px; text-decoration-color: rgba(245, 158, 11, 0.4);">RECOMMENDED NOTES</h3>"""
new_recommended = """<h3 class="premium-gradient-header warning">RECOMMENDED NOTES</h3>"""
content = content.replace(old_recommended, new_recommended)

# 2. Update PREMIUM FEATURES header
old_premium_header = """<h3 class="m-0 section-title" style="font-family: 'Outfit', sans-serif; font-size: 1.6rem; font-weight: 800; color: #3b82f6; letter-spacing: -0.5px; text-decoration: underline; text-underline-offset: 8px; text-decoration-thickness: 3px; text-decoration-color: rgba(59, 130, 246, 0.4);">PREMIUM FEATURES</h3>"""
new_premium_header = """<h3 class="premium-gradient-header">PREMIUM FEATURES</h3>"""
content = content.replace(old_premium_header, new_premium_header)

# 3. Unlock Premium Card replacement
pattern_card = re.compile(r'<!-- Access Restricted Banner \(PREMIUM DESIGN\) -->.*?<style>.*?</style>', re.DOTALL)

new_card = """<!-- Access Restricted Banner (PREMIUM DESIGN V2) -->
                        <div class="premium-unlock-card-v2 mb-4 text-center">
                            <div class="d-flex align-items-center justify-content-center mb-3">
                                <div class="d-flex align-items-center justify-content-center" style="width: 48px; height: 48px; background: rgba(245,158,11,0.1); border-radius: 12px; color: #f59e0b; font-size: 1.5rem; margin-right: 15px;">
                                    <i class="bi bi-rocket-takeoff-fill"></i>
                                </div>
                                <h4 class="mb-0" style="font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 1.4rem; color: #1e293b;">Unlock Premium</h4>
                            </div>
                            <p style="font-size: 0.9rem; color: #64748b; margin-bottom: 24px; line-height: 1.6;">
                                Get unlimited access to <strong class="text-dark">past papers</strong>, <strong class="text-dark">assignments</strong>, and <strong class="text-dark">premium notes</strong> curated for your success.
                            </p>
                            <a href="/register" class="btn w-100 btn-shimmer fw-bold d-flex align-items-center justify-content-center gap-2 text-decoration-none" style="padding: 14px; border-radius: 14px; font-size: 1rem; font-family: 'Outfit', sans-serif; letter-spacing: 0.5px;">
                                <span>Create Free Account</span>
                                <i class="bi bi-arrow-right"></i>
                            </a>
                        </div>"""

content = re.sub(pattern_card, new_card, content)

with open('src/main/resources/templates/index.html', 'w') as f:
    f.write(content)

print("index.html updated.")
