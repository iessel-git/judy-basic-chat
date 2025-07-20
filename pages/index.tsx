import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [messages, setMessages] = useState<
    { role: string; content: string }[]
  >([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage.content }),
    });

    const data = await res.json();
    const botMessage = { role: "assistant", content: data.reply || "Error" };
    setMessages((prev) => [...prev, botMessage]);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <main style={{ maxWidth: 600, margin: "auto", fontFamily: "sans-serif" }}>
      <h2>Hi, I am Judy – your Assistant 🤖</h2>
      <div
        style={{
          border: "1px solid #ccc",
          padding: 10,
          height: 300,
          overflowY: "auto",
          marginBottom: 10,
        }}
      >
        {messages.map((m, i) => (
          <p key={i}>
            <strong>{m.role}:</strong> {m.content}
          </p>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <input
        style={{ width: "80%", padding: 8 }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Type your message..."
      />
      <button
        style={{ padding: "8px 12px", marginLeft: 8 }}
        onClick={sendMessage}
      >
        Send
      </button>
    </main>
  );
}
