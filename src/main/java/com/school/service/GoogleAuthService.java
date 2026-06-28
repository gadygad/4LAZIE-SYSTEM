package com.school.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class GoogleAuthService {

    public GoogleIdToken.Payload verifyToken(String credential) throws Exception {
        String clientId = System.getenv("GOOGLE_CLIENT_ID");
        if (clientId == null || clientId.isEmpty()) {
            throw new Exception("Google Sign-In is not properly configured on the server (Missing GOOGLE_CLIENT_ID). Please contact the administrator.");
        }
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                .setAudience(Collections.singletonList(clientId))
                .build();

        GoogleIdToken idToken = verifier.verify(credential);
        if (idToken != null) {
            return idToken.getPayload();
        } else {
            throw new Exception("Invalid Google ID token.");
        }
    }
}
