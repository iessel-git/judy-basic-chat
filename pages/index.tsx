import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I’m Judy, your assistant 🤖" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");
    // Normally call API here
  };

  return (
    <main style={{ maxWidth: 600, margin: "auto", fontFamily: "sans-serif" }}>
      <h2>Hi, I am Judy – your Assistant 🤖</h2>
      <div style={{ border: "1px solid #ccc", padding: 10, height: 300, overflowY: "auto" }}>
        {messages.map((msg, i) => (
          <p key={i}><strong>{msg.role}:</strong> {msg.content}</p>
        ))}
      </div>
      <input
        style={{ width: "80%", padding: 8, marginTop: 10 }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Type your message..."
      />
      <button style={{ padding: "8px 12px" }} onClick={sendMessage}>Send</button>
    </main>
  );
}
