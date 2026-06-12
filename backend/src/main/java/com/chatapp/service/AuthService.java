package com.chatapp.service;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.cloud.FirestoreClient;
import com.google.cloud.firestore.Firestore;
import com.chatapp.model.User;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    // Firebase token verify karo
    public FirebaseToken verifyToken(String idToken) {
        try {
            return FirebaseAuth.getInstance().verifyIdToken(idToken);
        } catch (Exception e) {
            throw new RuntimeException("Invalid token");
        }
    }

    // User Firestore mein save karo
    public void saveUser(User user) {
        try {
            Firestore db = FirestoreClient.getFirestore();
            db.collection("users")
              .document(user.getUid())
              .set(user)
              .get();
            System.out.println("✅ User saved: " + user.getUsername());
        } catch (Exception e) {
            System.out.println("❌ Save user failed: " + e.getMessage());
        }
    }

    // User fetch karo
    public User getUser(String uid) {
        try {
            Firestore db = FirestoreClient.getFirestore();
            return db.collection("users")
                     .document(uid)
                     .get()
                     .get()
                     .toObject(User.class);
        } catch (Exception e) {
            return null;
        }
    }
}
