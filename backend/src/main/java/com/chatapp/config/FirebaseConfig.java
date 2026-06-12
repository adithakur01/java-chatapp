package com.chatapp.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.context.annotation.Configuration;
import javax.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;

@Configuration
public class FirebaseConfig {

    @PostConstruct
    public void initialize() {
        InputStream serviceAccount =
            getClass().getClassLoader()
                .getResourceAsStream("firebase-service-account.json");

        if (serviceAccount == null) {
            System.out.println("❌ Firebase init failed: firebase-service-account.json not found on classpath");
            return;
        }

        try {
            FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();

            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
                System.out.println("✅ Firebase initialized successfully");
            }

        } catch (Exception e) {
            System.out.println("❌ Firebase init failed: " + e.getMessage());
        }
    }
}
