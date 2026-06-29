package com.school.service;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class GoogleAuthService {

    @org.springframework.beans.factory.annotation.Value("${google.client.id}")
    private String clientId;

    public GoogleIdToken.Payload verifyToken(String credential) throws Exception {
        if (clientId == null || clientId.isEmpty()) {
            throw new Exception("Google Sign-In is not properly configured on the server (Missing google.client.id). Please contact the administrator.");
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
