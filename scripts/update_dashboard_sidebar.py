import re

def update_sidebar():
    filename = '../src/main/resources/templates/dashboard.html'
    with open(filename, 'r') as f:
        content = f.read()

    # Update hero-sidebar
    old_sidebar = """        .hero-sidebar {
            width: 340px;
            background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);
            padding: 40px 20px;
            display: flex; flex-direction: column; justify-content: flex-start;
            position: relative; overflow: visible;
            box-shadow: 4px 0 24px rgba(0,0,0,0.06);
            flex-shrink: 0; z-index: 10;
        }"""
        
    new_sidebar = """        .hero-sidebar {
            width: 340px;
            background: rgba(11, 17, 32, 0.92); /* Midnight Blue with transparency */
            backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
            border-right: 1px solid rgba(255, 255, 255, 0.08);
            padding: 40px 20px;
            display: flex; flex-direction: column; justify-content: flex-start;
            position: relative; overflow: visible;
            box-shadow: 10px 0 40px rgba(0,0,0,0.5);
            flex-shrink: 0; z-index: 10;
        }"""
        
    if old_sidebar in content:
        content = content.replace(old_sidebar, new_sidebar)
        print("Updated .hero-sidebar")
    else:
        print("Could not find old_sidebar")

    # Update hover effects to be more glassy
    old_hover = """        .sidebar-hover-btn:hover { background: rgba(255,255,255,0.1); color: #fff; }"""
    new_hover = """        .sidebar-hover-btn { border: 1px solid transparent; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .sidebar-hover-btn:hover { background: rgba(255,255,255,0.06); color: #fff; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 4px 15px rgba(0,0,0,0.2); backdrop-filter: blur(10px); }"""
        
    if old_hover in content:
        content = content.replace(old_hover, new_hover)
        print("Updated .sidebar-hover-btn:hover")
    else:
        print("Could not find old_hover")
    
    # Update active item background to match
    old_active = "'background: rgba(255,255,255,0.15);'"
    new_active = "'background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); box-shadow: 0 4px 15px rgba(0,0,0,0.2); backdrop-filter: blur(10px);'"
    if old_active in content:
        content = content.replace(old_active, new_active)
        print("Updated active item")
    else:
        print("Could not find old_active")

    # Update orbs for better premium feel under glass
    old_orbs = """        .orb-1 { width: 300px; height: 300px; top: -100px; right: -100px; background: radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%); }
        .orb-2 { width: 250px; height: 250px; bottom: -50px; left: -100px; background: radial-gradient(circle, rgba(29,78,216,0.2) 0%, transparent 70%); }
        .orb-3 { width: 200px; height: 200px; top: 50%; left: 30%; background: radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%); }"""
        
    new_orbs = """        .orb-1 { width: 350px; height: 350px; top: -100px; right: -150px; background: radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%); }
        .orb-2 { width: 300px; height: 300px; bottom: -50px; left: -150px; background: radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, transparent 70%); }
        .orb-3 { width: 250px; height: 250px; top: 40%; left: 20%; background: radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%); }"""
        
    if old_orbs in content:
        content = content.replace(old_orbs, new_orbs)
        print("Updated orbs")
    else:
        print("Could not find old_orbs")

    with open(filename, 'w') as f:
        f.write(content)

update_sidebar()
