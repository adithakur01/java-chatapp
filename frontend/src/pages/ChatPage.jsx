import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { signOut, updateProfile } from "firebase/auth";
import { useAuth } from "../context/AuthContext";
import useWebSocket from "../hooks/useWebSocket";
import { fetchMessages } from "../services/chatService";
import api from "../services/api";
import ChatWindow from "../components/Chat/ChatWindow";
import MessageInput from "../components/Chat/MessageInput";
import UserList from "../components/Chat/UserList";
import ProfileModal from "../components/Chat/ProfileModal";

const ChatPage = () => {
  const { user } = useAuth();
  const navigate  = useNavigate();
  const [profileUser, setProfileUser] = useState(null);
  const [profileVisible, setProfileVisible] = useState(false);
  const { messages, connected, sendMessage, setMessages } = useWebSocket(user);

  // Purane messages load karo
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const old = await fetchMessages();
        setMessages(old);
      } catch (e) {
        console.log("Could not load old messages");
      }
    };
    if (user) loadMessages();
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const handleOpenProfile = (userProfile) => {
    if (!userProfile) return;
    setProfileUser(userProfile);
    setProfileVisible(true);
  };

  const handleCloseProfile = () => {
    setProfileVisible(false);
  };

  const handleSaveProfile = async ({ displayName, photoURL }) => {
    if (!user) return;

    try {
      await updateProfile(auth.currentUser, { displayName, photoURL });
      await api.put("/auth/profile", { username: displayName, avatarUrl: photoURL });
      setProfileUser((prev) => prev ? { ...prev, displayName, photoURL } : prev);
    } catch (e) {
      console.error("Failed to update profile", e);
    }
  };

  const handleRequestPrivateChat = () => {
    if (!profileUser || !user || profileUser.uid === user.uid) return;

    sendMessage(
      `Hi ${profileUser.displayName || "there"}, I'd like to continue this conversation privately.`,
      "PRIVATE",
      profileUser.uid
    );
    setProfileVisible(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a1a] flex relative overflow-hidden">

      {/* Background orbs */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-blue-600 opacity-5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-purple-600 opacity-5 rounded-full blur-[100px]" />

      {/* Sidebar */}
      <UserList
        currentUser={user}
        onLogout={handleLogout}
        onProfileClick={() => handleOpenProfile(user)}
      />

      {/* Main Chat */}
      <div className="flex-1 flex flex-col relative z-10">

        {/* Top bar */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <h2 className="text-white font-semibold">Global Chat</h2>
          <span className="text-gray-500 text-xs ml-auto">
            {connected ? "Live" : "Connecting..."}
          </span>
        </div>

        {/* Messages */}
        <ChatWindow messages={messages} currentUser={user} onUserClick={handleOpenProfile} />

        {/* Input */}
        <MessageInput onSend={sendMessage} connected={connected} />
      </div>

      {/* Profile Modal */}
      <ProfileModal
        visible={profileVisible}
        user={profileUser}
        isCurrentUser={profileUser?.uid === user?.uid}
        onClose={handleCloseProfile}
        onSave={handleSaveProfile}
        onRequest={handleRequestPrivateChat}
      />

    </div>
  );
};

export default ChatPage;