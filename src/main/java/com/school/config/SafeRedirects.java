package com.school.config;

import jakarta.servlet.http.HttpServletRequest;

/**
 * Turns an attacker-controlled Referer header into a redirect target that
 * can never leave this app's own host. A bare string check like
 * referer.contains(request.getServerName()) is not enough — it's satisfied
 * by "https://evil.com/?host=<ourhost>" or "https://evil-<ourhost>.attacker.com"
 * just as easily as a genuine same-host URL. Parsing with java.net.URI and
 * comparing only the resolved host closes both of those.
 */
public final class SafeRedirects {

    private SafeRedirects() {
    }

    public static String sameHostPathOrDefault(HttpServletRequest request, String referer, String fallback) {
        if (referer != null && !referer.isEmpty()) {
            try {
                java.net.URI refererUri = java.net.URI.create(referer);
                if (request.getServerName().equalsIgnoreCase(refererUri.getHost())) {
                    String path = refererUri.getRawPath();
                    if (path != null && path.startsWith("/")) {
                        String query = refererUri.getRawQuery();
                        return query != null ? path + "?" + query : path;
                    }
                }
            } catch (IllegalArgumentException ignored) {
                // Malformed Referer header — fall through to the default below.
            }
        }
        return fallback;
    }
}
