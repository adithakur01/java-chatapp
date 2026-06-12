import React, { useState, useEffect } from "react";

const ProfileModal = ({ visible, user, isCurrentUser, onClose, onSave, onRequest }) => {
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setDisplayName(user?.displayName || "");
    setPhotoURL(user?.photoURL || "");
  }, [user]);

  if (!visible || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-w-md w-full rounded-3xl bg-[#f7fbff] text-[#102133] shadow-2xl border border-[#d8e2ee] p-6">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[#dbe7f5] flex items-center justify-center text-2xl font-bold text-[#0f2b4c]">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName} className="w-full h-full object-cover" />
              ) : (
                user.displayName?.[0]?.toUpperCase() || "U"
              )}
            </div>
            <div>
              <p className="text-lg font-semibold">{user.displayName || "Unnamed user"}</p>
              <p className="text-sm text-[#5f748f]">{user.email}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-[#526080] hover:text-[#22304d] text-xl">×</button>
        </div>

        {isCurrentUser ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#324364] mb-2">Display name</label>
              <input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full rounded-2xl border border-[#c6d2e8] bg-white px-4 py-3 text-sm text-[#14253f] focus:outline-none focus:border-[#5b8df2]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#324364] mb-2">Photo URL</label>
              <input
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder="https://..."
                className="w-full rounded-2xl border border-[#c6d2e8] bg-white px-4 py-3 text-sm text-[#14253f] focus:outline-none focus:border-[#5b8df2]"
              />
            </div>
            <button
              disabled={saving}
              onClick={async () => {
                setSaving(true);
                await onSave({ displayName, photoURL });
                setSaving(false);
              }}
              className="w-full rounded-2xl bg-[#3b74f8] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#335fde] disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save profile"}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-[#4b6078] leading-relaxed">
              View this user profile. Send a private chat request if you want to continue the conversation privately.
            </p>
            <button
              onClick={onRequest}
              className="w-full rounded-2xl bg-[#0f75d4] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#095bb3]"
            >
              Request personal chat
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileModal;
