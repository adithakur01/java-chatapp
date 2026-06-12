import { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const useWebSocket = (user) => {
  const [messages, setMessages]     = useState([]);
  const [connected, setConnected]   = useState(false);
  const clientRef = useRef(null);

  useEffect(() => {
    if (!user) return;

    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      onConnect: () => {
        setConnected(true);
        console.log("✅ WebSocket connected");

        // Group messages subscribe karo
        client.subscribe("/topic/messages", (msg) => {
          const received = JSON.parse(msg.body);
          setMessages((prev) => [...prev, received]);
        });

        // Private messages subscribe karo
        client.subscribe(`/user/${user.uid}/queue/private`, (msg) => {
          const received = JSON.parse(msg.body);
          setMessages((prev) => [...prev, received]);
        });
      },
      onDisconnect: () => {
        setConnected(false);
        console.log("❌ WebSocket disconnected");
      },
    });

    client.activate();
    clientRef.current = client;

    return () => client.deactivate();
  }, [user]);

  const sendMessage = (content, type = "TEXT", receiverId = null) => {
    if (!clientRef.current?.connected) return;

    const message = {
      senderId:     user.uid,
      senderName:   user.displayName || "Anonymous",
      senderAvatar: user.photoURL || "",
      content,
      type,
      receiverId,
      timestamp:    Date.now(),
    };

    if (type === "PRIVATE" && receiverId) {
      clientRef.current.publish({
        destination: "/app/chat.private",
        body: JSON.stringify(message),
      });
    } else {
      clientRef.current.publish({
        destination: "/app/chat.send",
        body: JSON.stringify(message),
      });
    }
  };

  return { messages, connected, sendMessage, setMessages };
};

export default useWebSocket;