import os

card_html = """                        <!-- Access Restricted Banner (PREMIUM DESIGN) -->
                        <div class="premium-unlock-card position-relative overflow-hidden mb-4" style="background: linear-gradient(145deg, #0f172a, #1e293b); border-radius: 20px; padding: 30px; color: white; box-shadow: 0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.05); z-index: 1;">
                            
                            <!-- Glowing background effect -->
                            <div style="position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle at top right, rgba(59,130,246,0.15) 0%, transparent 40%); z-index: -1; pointer-events: none;"></div>
                            
                            <!-- Premium Lock Icon -->
                            <div class="mb-3 d-flex align-items-center justify-content-center" style="width: 50px; height: 50px; background: rgba(59,130,246,0.1); border-radius: 14px; border: 1px solid rgba(59,130,246,0.2); box-shadow: 0 0 20px rgba(59,130,246,0.2);">
                                <i class="bi bi-lock-fill text-primary fs-4"></i>
                            </div>
                            
                            <h4 style="font-family: 'Outfit', sans-serif; font-weight: 800; margin-bottom: 10px; font-size: 1.4rem; letter-spacing: -0.5px; background: linear-gradient(90deg, #fff, #94a3b8); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Unlock Premium Access</h4>
                            
                            <p style="font-size: 0.95rem; color: #94a3b8; margin-bottom: 25px; line-height: 1.6; font-weight: 400;">
                                Join our platform today to get unlimited access to <span class="text-white fw-medium">past papers</span>, <span class="text-white fw-medium">assignments</span>, and <span class="text-white fw-medium">premium notes</span> curated for your success.
                            </p>
                            
                            <a href="/register" class="btn w-100 fw-bold d-flex align-items-center justify-content-center gap-2 position-relative overflow-hidden premium-btn-hover" style="background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%); color: white; border: none; padding: 14px; border-radius: 12px; font-size: 1rem; box-shadow: 0 8px 25px rgba(37,99,235,0.4); transition: all 0.3s ease; font-family: 'Outfit', sans-serif; letter-spacing: 0.5px;">
                                <span style="position: relative; z-index: 2;">Create Free Account</span>
                                <i class="bi bi-arrow-right" style="position: relative; z-index: 2;"></i>
                                <!-- Button Shine Effect -->
                                <div style="position: absolute; top: 0; left: -100%; width: 50%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent); transform: skewX(-20deg); transition: all 0.5s ease; z-index: 1;" class="btn-shine"></div>
                            </a>
                        </div>
                        <style>
                            .premium-btn-hover:hover { transform: translateY(-3px); box-shadow: 0 12px 30px rgba(37,99,235,0.5) !important; }
                            .premium-btn-hover:hover .btn-shine { left: 200% !important; transition: all 0.8s ease; }
                            .premium-unlock-card { transition: all 0.3s ease; }
                            .premium-unlock-card:hover { transform: translateY(-5px); box-shadow: 0 25px 50px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15) !important; border-color: rgba(255,255,255,0.1) !important; }
                        </style>"""

def replace_in_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    start_str = "<!-- Access Restricted Banner -->"
    end_str = "</a>\n                        </div>"
    
    if start_str in content and end_str in content:
        start_idx = content.find(start_str)
        end_idx = content.find(end_str, start_idx) + len(end_str)
        
        old_card = content[start_idx:end_idx]
        content = content.replace(old_card, card_html)
        
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated {filepath}")
    else:
        print(f"Could not find card in {filepath}")

replace_in_file('src/main/resources/templates/index.html')
replace_in_file('src/main/resources/templates/home.html')
