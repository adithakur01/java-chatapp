package com.chatapp.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "messages")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Message {
    @Id
    private String id;
    private String senderId;
    private String senderName;
    private String senderAvatar;
    private String content;
    private String type;
    private String receiverId;
    private long timestamp;
}
