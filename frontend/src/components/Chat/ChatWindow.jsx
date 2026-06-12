import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

const ChatWindow = ({ messages, currentUser, onUserClick }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
      {messages.length === 0 && (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500 text-sm">
            No messages yet. Say hello! 👋
          </p>
        </div>
      )}
      {messages.map((msg, index) => (
        <MessageBubble
          key={index}
          message={msg}
          isOwn={msg.senderId === currentUser?.uid}
          onUserClick={onUserClick}
        />
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatWindow;