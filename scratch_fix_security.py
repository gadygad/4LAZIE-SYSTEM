import re

with open('src/main/java/com/school/config/SecurityConfig.java', 'r') as f:
    content = f.read()

# Add frameOptions().sameOrigin() to csrf block or create a headers block
if "headers(headers -> headers.frameOptions" not in content:
    # Find the CSRF configuration block
    new_block = """            .csrf(csrf -> csrf.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()))
            .headers(headers -> headers.frameOptions(frame -> frame.sameOrigin()));"""
    content = re.sub(r'\.csrf\(csrf -> csrf\.csrfTokenRepository\(CookieCsrfTokenRepository\.withHttpOnlyFalse\(\)\)\);', new_block, content)
    
    with open('src/main/java/com/school/config/SecurityConfig.java', 'w') as f:
        f.write(content)
        print("Updated SecurityConfig.java")

