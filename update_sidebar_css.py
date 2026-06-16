with open('src/main/resources/static/css/premium-theme.css', 'r') as f:
    content = f.read()

old_css = """.sidebar-hover-content {
    margin-left: 10px; border-left: 2px solid rgba(255,255,255,0.1); padding-left: 10px;
}
.sidebar-hover-content a {
    display: block; color: rgba(255,255,255,0.7); text-decoration: none; font-size: 0.85rem;
    padding: 8px 10px; transition: color 0.2s;
}
.sidebar-hover-content a:hover { color: #fff; }"""

new_css = """.sidebar-hover-content {
    margin-left: 24px;
    border-left: 1px dashed rgba(255, 255, 255, 0.15);
    padding-left: 8px;
    margin-top: 4px;
    margin-bottom: 8px;
}
.sidebar-hover-content a {
    display: flex;
    align-items: center;
    color: rgba(255, 255, 255, 0.6);
    text-decoration: none;
    font-size: 0.8rem;
    font-weight: 500;
    padding: 8px 12px;
    border-radius: 8px;
    transition: all 0.3s ease;
    margin-bottom: 2px;
    position: relative;
    font-family: 'Outfit', sans-serif;
    letter-spacing: 0.5px;
}
.sidebar-hover-content a::before {
    content: '';
    position: absolute;
    left: -9px;
    top: 50%;
    transform: translateY(-50%);
    width: 6px;
    height: 1px;
    background: rgba(255, 255, 255, 0.15);
    transition: all 0.3s ease;
}
.sidebar-hover-content a:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.08);
    transform: translateX(4px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
.sidebar-hover-content a:hover::before {
    width: 8px;
    background: var(--primary);
}
/* Active styling for selected links */
.sidebar-hover-content a[style*="color: #fff"] {
    background: rgba(255, 255, 255, 0.1);
    font-weight: 600;
    color: #fff !important;
}
.sidebar-hover-content a[style*="color: #fff"]::before {
    background: var(--primary);
    width: 10px;
}"""

content = content.replace(old_css, new_css)

with open('src/main/resources/static/css/premium-theme.css', 'w') as f:
    f.write(content)
print("CSS updated")
