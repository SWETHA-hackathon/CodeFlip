import { useState } from "react";

export default function Home() {
  const [chatVisible, setChatVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

const handleSend = async () => {
  if (!input.trim()) return;

  setMessages((prev) => [...prev, { from: "You", text: input }]);
  const userInput = input;
  setInput("");

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",  // <- Try this again
        messages: [{ role: "user", content: userInput }]
      })
    });

    if (!res.ok) {
      console.error("HTTP error", res.status, res.statusText);
      setMessages((prev) => [...prev, { from: "AI", text: `Error: HTTP ${res.status} ${res.statusText}` }]);
      return;
    }

    const data = await res.json();
    console.log("API Response:", data);

    if (data?.choices && data.choices.length > 0 && data.choices[0].message?.content) {
      const reply = data.choices[0].message.content;
      setMessages((prev) => [...prev, { from: "AI", text: reply }]);
    } else if (data?.error) {
      setMessages((prev) => [...prev, { from: "AI", text: `Error: ${data.error.message}` }]);
    } else {
      setMessages((prev) => [...prev, { from: "AI", text: "Error: No valid reply from API." }]);
    }
  } catch (e) {
    console.error("Fetch error:", e);
    setMessages((prev) => [...prev, { from: "AI", text: "Error: Could not connect" }]);
  }
};


  return (
    <div>
      <header>
        <h1>Welcome to CodeFlip</h1>
        <p>Rewrite Code Across Languages Instantly with AI</p>
        <a href="/converter" className="btn">Try CodeFlip</a>
      </header>

      <section>
        <h2>Features</h2>
        <ul>
          <li>Convert code between Python, Java, JavaScript, and more</li>
          <li>Language-accurate translation using AI</li>
          <li>Instant results with copy/download option</li>
          <li>Great for learning and debugging</li>
          <li>Fully browser-based – no install needed</li>
        </ul>
      </section>

      <section>
        <h2>How It Works</h2>
        <img src="/image.jpeg" alt="Code conversion demo" width="500" />
        <p>Paste your source code, select target language, and click convert. Done!</p>
      </section>

      <section>
        <h2>About the Project</h2>
        <p>CodeFlip is built for developers, students, and educators to explore multilingual coding easily.</p>
      </section>

      <footer>
        <p>&copy; 2025 CodeFlip. All rights reserved.</p>
        <a href="https://github.com/your-username/codeflip" target="_blank" rel="noreferrer">View on GitHub</a>
      </footer>

      <button id="chatBtn" onClick={() => setChatVisible(!chatVisible)}>💬</button>

      {chatVisible && (
        <div id="chatWindow">
          <div id="chatMessages">
            {messages.map((m, i) => (
              <div key={i}><b>{m.from}:</b> {m.text}</div>
            ))}
          </div>
          <div id="chatInput">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
            />
            <button onClick={handleSend}>➡</button>
          </div>
        </div>
      )}

      <style jsx>{`
        header {
          background: linear-gradient(to right, #2c3e50, #4ca1af);
          color: #fff;
          text-align: center;
          padding: 50px 20px;
        }
        .btn {
          display: inline-block;
          padding: 10px 20px;
          margin-top: 10px;
          border-radius: 6px;
          background: #00bfa6;
          color: #fff;
          text-decoration: none;
        }
        .btn:hover {
          background: #009e8f;
        }
        section {
          padding: 40px 20px;
          max-width: 900px;
          margin: 20px auto;
          background-color: #28293d;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }
        footer {
          text-align: center;
          padding: 20px;
          background-color: #141421;
          color: #ccc;
          margin-top: 40px;
          font-size: 14px;
        }
        #chatBtn {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: #00bfa6;
          color: #fff;
          border: none;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          font-size: 30px;
          cursor: pointer;
        }
        #chatWindow {
          position: fixed;
          bottom: 90px;
          right: 20px;
          width: 300px;
          background: #28293d;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.5);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        #chatMessages {
          padding: 10px;
          height: 200px;
          overflow-y: auto;
          font-size: 14px;
        }
        #chatInput {
          display: flex;
          border-top: 1px solid #444;
        }
        #chatInput input {
          flex: 1;
          padding: 8px;
          background: #1e1e2f;
          color: #e0e0e0;
          border: none;
          outline: none;
        }
        #chatInput button {
          padding: 8px;
          background: #00bfa6;
          border: none;
          color: #fff;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
