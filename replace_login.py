import sys

with open("src/main/resources/templates/login.html", "r") as f:
    content = f.read()

target = """            <!-- Floating Premium Alerts -->
            <div th:if="${param.registered != null or param.verify_notice != null or param.verified != null or param.error != null or param.logout != null}" class="premium-toast-container">
                <div th:if="${param.registered}" class="premium-toast" id="toastRegistered">
                    <i class="bi bi-check-circle-fill"></i>
                    <span>Registration successful! Please log in.</span>
                </div>
                
                <div th:if="${param.verify_notice}" class="premium-toast" id="toastVerifyNotice">
                    <i class="bi bi-envelope-check-fill"></i>
                    <span>Please check your email to verify your account.</span>
                </div>

                <div th:if="${param.verified}" class="premium-toast" id="toastVerified">
                    <i class="bi bi-patch-check-fill"></i>
                    <span>Email verified successfully. You can now log in.</span>
                </div>

                <div th:if="${param.error}" class="premium-toast error" id="toastError">
                    <i class="bi bi-exclamation-triangle-fill"></i>
                    <span th:text="${session != null and session.SPRING_SECURITY_LAST_EXCEPTION != null ? session.SPRING_SECURITY_LAST_EXCEPTION.message : 'Invalid email or password.'}"></span>
                </div>

                <div th:if="${param.logout}" class="premium-toast" id="toastLogout">
                    <i class="bi bi-shield-lock-fill"></i>
                    <span>You have securely logged out.</span>
                </div>
            </div>
            <script>
                // Auto-remove toast notifications after 3 seconds
                document.querySelectorAll('.premium-toast').forEach(function(toast) {
                    setTimeout(function() { 
                        toast.classList.add('fade-out');
                        setTimeout(function() { toast.parentElement.remove(); }, 500);
                    }, 3000);
                });
            </script>"""

replacement = """            <!-- Inline Premium Alerts -->
            <div th:if="${param.registered != null or param.verify_notice != null or param.verified != null or param.error != null or param.logout != null}" class="mb-4">
                <div th:if="${param.registered}" class="alert alert-success d-flex align-items-center" role="alert" style="border-radius: 12px; font-size: 0.9rem;">
                    <i class="bi bi-check-circle-fill me-2 fs-5 text-success"></i>
                    <div>Registration successful! Please log in.</div>
                </div>
                
                <div th:if="${param.verify_notice}" class="alert alert-warning d-flex align-items-center" role="alert" style="border-radius: 12px; font-size: 0.9rem;">
                    <i class="bi bi-envelope-check-fill me-2 fs-5 text-warning"></i>
                    <div>Please check your email to verify your account.</div>
                </div>

                <div th:if="${param.verified}" class="alert alert-success d-flex align-items-center" role="alert" style="border-radius: 12px; font-size: 0.9rem;">
                    <i class="bi bi-patch-check-fill me-2 fs-5 text-success"></i>
                    <div>Email verified successfully. You can now log in.</div>
                </div>

                <div th:if="${param.error}" class="alert alert-danger d-flex align-items-center" role="alert" style="border-radius: 12px; font-size: 0.9rem;">
                    <i class="bi bi-exclamation-triangle-fill me-2 fs-5 text-danger"></i>
                    <div th:text="${session != null and session.SPRING_SECURITY_LAST_EXCEPTION != null ? session.SPRING_SECURITY_LAST_EXCEPTION.message : 'Invalid email or password.'}"></div>
                </div>

                <div th:if="${param.logout}" class="alert alert-info d-flex align-items-center" role="alert" style="border-radius: 12px; font-size: 0.9rem;">
                    <i class="bi bi-shield-lock-fill me-2 fs-5 text-info"></i>
                    <div>You have securely logged out.</div>
                </div>
            </div>"""

if target in content:
    with open("src/main/resources/templates/login.html", "w") as f:
        f.write(content.replace(target, replacement))
    print("Replaced successfully")
else:
    print("Target not found!")
