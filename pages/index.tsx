import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    const botMessage = { role: "assistant", content: data.reply };
    setMessages((prev) => [...prev, botMessage]);
    setInput("");
  };

  return (
    <main style={{ maxWidth: "600px", margin: "auto", fontFamily: "sans-serif", padding: "20px" }}>
      <h2>Hi, I am Judy – your Assistant 🤖</h2>
      <div style={{ border: "1px solid #ccc", padding: "10px", height: "300px", overflowY: "auto" }}>
        {messages.map((m, i) => (
          <p key={i}><strong>{m.role === "user" ? "You" : "Judy"}:</strong> {m.content}</p>
        ))}
      </div>
      <div style={{ marginTop: "10px" }}>
        <input
          style={{ width: "80%", padding: "8px" }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
        />
        <button style={{ padding: "8px 12px", marginLeft: "5px" }} onClick={sendMessage}>Send</button>
      </div>
    </main>
  );
}
