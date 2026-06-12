import { useState } from "react";

const MessageInput = ({ onSend, connected }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim() || !connected) return;
    onSend(text.trim());
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="px-4 py-4 border-t border-white/10 bg-[#0a0a1a]">
      <div className="flex items-center gap-3 bg-white/5 border border-white/10 
                      rounded-2xl px-4 py-2">

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={connected ? "Type a message..." : "Connecting..."}
          disabled={!connected}
          className="flex-1 bg-transparent text-white placeholder-gray-500 
                     focus:outline-none text-sm"
        />

        <button
          onClick={handleSend}
          disabled={!text.trim() || !connected}
          className="w-9 h-9 bg-gradient-to-r from-blue-600 to-purple-600 
                     rounded-xl flex items-center justify-center
                     disabled:opacity-30 hover:from-blue-500 hover:to-purple-500 
                     transition duration-200"
        >
          <svg className="w-4 h-4 text-white rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>

      </div>

      <p className={`text-xs mt-1 ml-1 ${connected ? "text-green-500" : "text-red-400"}`}>
        {connected ? "● Connected" : "○ Connecting..."}
      </p>
    </div>
  );
};

export default MessageInput;