package com.chatapp.controller;

import com.chatapp.model.Message;
import com.chatapp.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    // Recent messages fetch karo
    @GetMapping
    public List<Message> getMessages() {
        return chatService.getRecentMessages();
    }

    // WebSocket — group message
    @MessageMapping("/chat.send")
    @SendTo("/topic/messages")
    public Message sendMessage(Message message) {
        chatService.saveMessage(message);
        return message;
    }

    // WebSocket — private message
    @MessageMapping("/chat.private")
    public void sendPrivateMessage(Message message) {
        chatService.saveMessage(message);
        messagingTemplate.convertAndSendToUser(
            message.getReceiverId(),
            "/queue/private",
            message
        );
    }
}
