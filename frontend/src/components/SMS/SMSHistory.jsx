export default function SMSHistory({ messages }) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">SMS History</h2>
      <div className="space-y-2">
        {messages.map((msg, idx) => (
          <div key={idx} className="p-3 border rounded bg-gray-50">
            <p className="font-semibold">{msg.phoneNumber}</p>
            <p className="text-sm text-gray-600">{msg.message}</p>
            <small className="text-xs text-gray-400">{new Date(msg.timestamp).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
