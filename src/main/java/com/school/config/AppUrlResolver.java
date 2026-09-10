package com.school.config;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * Builds the app's own base URL (scheme + host + port) for links embedded in
 * emails and notifications, without trusting the request's Host header.
 *
 * Several call sites used to build this URL from
 * request.getScheme()/getServerName()/getServerPort() directly. Tomcat's
 * getServerName() reflects whatever Host header the client sent, so an
 * attacker who sends a request with a forged Host header gets that host
 * echoed straight into a password-reset/verification/notification link —
 * a phishing link that looks legitimate because it's mailed from the real
 * 4LAZIE sender address.
 *
 * RENDER_EXTERNAL_URL is set automatically by Render to the service's real
 * public URL, so it's used whenever present. Locally (no Render env, no
 * internet-facing attacker) it falls back to the request-derived value.
 */
@Component
public class AppUrlResolver {

    private final String configuredBaseUrl;

    public AppUrlResolver(@Value("${RENDER_EXTERNAL_URL:}") String renderExternalUrl) {
        this.configuredBaseUrl = (renderExternalUrl == null || renderExternalUrl.isBlank())
                ? null
                : stripTrailingSlash(renderExternalUrl.trim());
    }

    public String resolve(HttpServletRequest request) {
        if (configuredBaseUrl != null) {
            return configuredBaseUrl;
        }
        String scheme = request.getScheme();
        int port = request.getServerPort();
        boolean defaultPort = ("http".equals(scheme) && port == 80) || ("https".equals(scheme) && port == 443);
        return scheme + "://" + request.getServerName() + (defaultPort ? "" : ":" + port);
    }

    private static String stripTrailingSlash(String url) {
        return url.endsWith("/") ? url.substring(0, url.length() - 1) : url;
    }
}
