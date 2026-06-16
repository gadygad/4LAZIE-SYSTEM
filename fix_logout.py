import sys

file_path = 'src/main/resources/templates/dashboard.html'
try:
    with open(file_path, 'r') as f:
        content = f.read()
        
    old_btn = """<a href="/profile" class="btn w-100 fw-bold d-flex align-items-center justify-content-center gap-2 position-relative overflow-hidden" 
                               style="background: linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05)); border: 1px solid rgba(255,255,255,0.1); color: white; border: none; padding: 12px; border-radius: 12px; font-size: 0.9rem; font-family: 'Outfit', sans-serif; box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4); transition: all 0.3s ease;" 
                               onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 12px 25px rgba(0, 0, 0, 0.6)';" 
                               onmouseout="this.style.transform='none'; this.style.boxShadow='0 8px 20px rgba(0, 0, 0, 0.4)';">
                                <span>View Full Profile</span>
                                <i class="bi bi-arrow-right"></i>
                            </a>"""
                            
    new_btns = """<a href="/profile" class="btn w-100 fw-bold d-flex align-items-center justify-content-center gap-2 position-relative overflow-hidden" 
                               style="background: linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05)); border: 1px solid rgba(255,255,255,0.1); color: white; padding: 12px; border-radius: 12px; font-size: 0.9rem; font-family: 'Outfit', sans-serif; box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4); transition: all 0.3s ease;" 
                               onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 12px 25px rgba(0, 0, 0, 0.6)';" 
                               onmouseout="this.style.transform='none'; this.style.boxShadow='0 8px 20px rgba(0, 0, 0, 0.4)';">
                                <span>View Full Profile</span>
                                <i class="bi bi-arrow-right"></i>
                            </a>
                            
                            <a href="/logout" class="btn w-100 fw-bold d-flex align-items-center justify-content-center gap-2 mt-3" 
                               style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); color: #ef4444; padding: 12px; border-radius: 12px; font-size: 0.9rem; font-family: 'Outfit', sans-serif; transition: all 0.3s ease;" 
                               onmouseover="this.style.background='rgba(239, 68, 68, 0.2)'; this.style.transform='translateY(-2px)';" 
                               onmouseout="this.style.background='rgba(239, 68, 68, 0.1)'; this.style.transform='none';">
                                <i class="bi bi-box-arrow-right"></i>
                                <span>Logout</span>
                            </a>"""
                            
    if old_btn in content:
        content = content.replace(old_btn, new_btns)
        with open(file_path, 'w') as f:
            f.write(content)
        print("Logout button added to dashboard.html")
    else:
        print("Could not find the profile button in dashboard.html to attach logout button.")
except Exception as e:
    print(f"Error: {e}")
