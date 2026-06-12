package com.chatapp.service;

import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.firebase.cloud.FirestoreClient;
import com.chatapp.model.Message;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class ChatService {

    // Message save karo Firestore mein
    public void saveMessage(Message message) {
        try {
            Firestore db = FirestoreClient.getFirestore();
            message.setTimestamp(System.currentTimeMillis());
            db.collection("messages")
              .add(message)
              .get();
        } catch (Exception e) {
            System.out.println("❌ Save message failed: " + e.getMessage());
        }
    }

    // Last 50 messages fetch karo
    public List<Message> getRecentMessages() {
        List<Message> messages = new ArrayList<>();
        try {
            Firestore db = FirestoreClient.getFirestore();
            List<QueryDocumentSnapshot> docs = db.collection("messages")
                .orderBy("timestamp")
                .limitToLast(50)
                .get()
                .get()
                .getDocuments();

            for (QueryDocumentSnapshot doc : docs) {
                Message msg = doc.toObject(Message.class);
                msg.setId(doc.getId());
                messages.add(msg);
            }
        } catch (Exception e) {
            System.out.println("❌ Fetch messages failed: " + e.getMessage());
        }
        return messages;
    }
}
