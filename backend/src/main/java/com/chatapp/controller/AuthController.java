package com.chatapp.controller;

import com.google.firebase.auth.FirebaseToken;
import com.chatapp.model.User;
import com.chatapp.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    // Naya user register karo
    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody Map<String, String> body) {
        try {
            String token = authHeader.replace("Bearer ", "");
            FirebaseToken decoded = authService.verifyToken(token);

            String username = body.get("username");
            String avatarUrl = body.getOrDefault("avatarUrl", decoded.getPicture());
            if (username == null || username.isBlank()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Username is required"));
            }

            User existingUser = authService.getUser(decoded.getUid());
            long createdAt = existingUser != null ? existingUser.getCreatedAt() : System.currentTimeMillis();

            User user = new User();
            user.setUid(decoded.getUid());
            user.setEmail(decoded.getEmail());
            user.setUsername(username);
            user.setAvatarUrl(avatarUrl);
            user.setCreatedAt(createdAt);

            authService.saveUser(user);
            return ResponseEntity.ok(Map.of("message", "User registered", "uid", decoded.getUid()));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // Current user info
    @GetMapping("/me")
    public ResponseEntity<?> getMe(
            @RequestHeader("Authorization") String authHeader) {
        try {
            String token = authHeader.replace("Bearer ", "");
            FirebaseToken decoded = authService.verifyToken(token);
            User user = authService.getUser(decoded.getUid());
            if (user == null) {
                return ResponseEntity.status(404).body(Map.of("error", "User not registered"));
            }
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody Map<String, String> body) {
        try {
            String token = authHeader.replace("Bearer ", "");
            FirebaseToken decoded = authService.verifyToken(token);
            String username = body.get("username");
            String avatarUrl = body.get("avatarUrl");
            if (username == null || username.isBlank()) {
                return ResponseEntity.badRequest().body(Map.of("error", "Username is required"));
            }

            User existingUser = authService.getUser(decoded.getUid());
            long createdAt = existingUser != null ? existingUser.getCreatedAt() : System.currentTimeMillis();

            User user = new User();
            user.setUid(decoded.getUid());
            user.setEmail(decoded.getEmail());
            user.setUsername(username);
            user.setAvatarUrl(avatarUrl != null ? avatarUrl : decoded.getPicture());
            user.setCreatedAt(createdAt);

            authService.saveUser(user);
            return ResponseEntity.ok(Map.of("message", "Profile updated", "uid", decoded.getUid()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
