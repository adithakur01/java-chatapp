const MessageBubble = ({ message, isOwn, onUserClick }) => {
  const time = new Date(message.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-2`}>
      <div className={`flex items-end gap-2 max-w-[70%] ${isOwn ? "flex-row-reverse" : "flex-row"}`}>

        {/* Avatar */}
        {!isOwn && (
          <button
            type="button"
            onClick={() => onUserClick?.({
              uid: message.senderId,
              displayName: message.senderName,
              photoURL: message.senderAvatar,
            })}
            className="w-8 h-8 rounded-full flex-shrink-0 overflow-hidden focus:outline-none"
          >
            {message.senderAvatar ? (
              <img
                src={message.senderAvatar}
                className="w-8 h-8 rounded-full object-cover"
                alt={message.senderName}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div
              className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 
                         items-center justify-center text-white text-xs font-bold"
              style={{ display: message.senderAvatar ? 'none' : 'flex' }}
            >
              {message.senderName?.[0]?.toUpperCase()}
            </div>
          </button>
        )}

        <div>
          {/* Sender name */}
          {!isOwn && (
            <button
              type="button"
              onClick={() => onUserClick?.({
                uid: message.senderId,
                displayName: message.senderName,
                photoURL: message.senderAvatar,
              })}
              className="text-xs text-gray-400 mb-1 ml-1 hover:text-white focus:outline-none"
            >
              {message.senderName}
            </button>
          )}

          {/* Bubble */}
          <div className={`px-4 py-2 rounded-2xl text-sm ${
            isOwn
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-sm"
              : "bg-white/10 text-gray-100 rounded-bl-sm border border-white/10"
          }`}>
            {message.content}
          </div>

          {/* Time */}
          <p className={`text-xs text-gray-500 mt-1 ${isOwn ? "text-right" : "text-left"} mx-1`}>
            {time}
          </p>
        </div>

      </div>
    </div>
  );
};

export default MessageBubble;