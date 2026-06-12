import { useState } from "react";
import { sendSMS } from "../../services/smsService";

const SMSForm = ({ currentUser, onClose }) => {
  const [phone,   setPhone]   = useState("");
  const [message, setMessage] = useState("");
  const [status,  setStatus]  = useState("");
  const [loading, setLoading] = useState(false);

  const validatePhone = (num) => {
    return /^[6-9]\d{9}$/.test(num); // India: 10 digits, starts with 6-9
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!validatePhone(phone)) {
      setStatus("invalid");
      return;
    }
    setLoading(true);
    setStatus("");
    try {
      await sendSMS(phone, message, currentUser?.displayName || "Someone");
      setStatus("success");
      setPhone("");
      setMessage("");
    } catch (err) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center 
                    justify-center z-50 px-4">
      <div className="bg-[#0f0f1f] border border-white/10 rounded-3xl p-8 
                      w-full max-w-md shadow-2xl">

        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white text-xl font-semibold">Send SMS</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition"
          >
            ✕
          </button>
        </div>

        {status === "success" && (
          <div className="bg-green-500/10 border border-green-500/30 text-green-400 
                          text-sm px-4 py-3 rounded-xl mb-5">
            ✅ SMS sent successfully!
          </div>
        )}
        {status === "error" && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 
                          text-sm px-4 py-3 rounded-xl mb-5">
            ❌ Failed to send SMS. Check MSG91 config.
          </div>
        )}
        {status === "invalid" && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 
                          text-sm px-4 py-3 rounded-xl mb-5">
            ⚠️ Enter valid 10-digit Indian mobile number
          </div>
        )}

        <form onSubmit={handleSend} className="space-y-4">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              +91
            </span>
            <input
              type="tel"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
              maxLength={10}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 
                         text-white placeholder-gray-500 focus:outline-none 
                         focus:border-cyan-500/50 transition"
              required
            />
          </div>

          <textarea
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 
                       text-white placeholder-gray-500 focus:outline-none 
                       focus:border-cyan-500/50 transition resize-none"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 
                       hover:from-cyan-500 hover:to-blue-500 text-white font-semibold 
                       rounded-xl transition shadow-lg shadow-cyan-500/25 
                       disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send SMS 📱"}
          </button>
        </form>

      </div>
    </div>
  );
};

export default SMSForm;