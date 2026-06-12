import { useState, useCallback } from 'react';
import { chatService } from '../services/chatService';

export function useMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMessages = useCallback(async (userId, recipientId) => {
    setLoading(true);
    try {
      const data = await chatService.getMessages(userId, recipientId);
      setMessages(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const sendMessage = useCallback(async (messageData) => {
    try {
      const newMessage = await chatService.sendMessage(messageData);
      setMessages(prev => [...prev, newMessage]);
      return newMessage;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  return { messages, loading, error, fetchMessages, sendMessage };
}
