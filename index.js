document.head.innerHTML += `
  <title>CodeFlip – Code Rewriter</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: #1e1e2f;
      color: #e0e0e0;
    }
    header {
      background: linear-gradient(to right, #2c3e50, #4ca1af);
      color: #fff;
      text-align: center;
      padding: 50px 20px;
    }
    header h1 {
      font-size: 48px;
      margin-bottom: 10px;
    }
    header p {
      font-size: 20px;
      margin: 0 auto;
      max-width: 700px;
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
    section h2 {
      color: #00bfa6;
      margin-bottom: 15px;
    }
    ul li {
      margin-bottom: 10px;
    }
    footer {
      text-align: center;
      padding: 20px;
      background-color: #141421;
      color: #ccc;
      margin-top: 40px;
      font-size: 14px;
    }
    a {
      color: #00bfa6;
      font-weight: bold;
      text-decoration: none;
      transition: color 0.3s ease;
    }
    a:hover {
      color: #ffd54f;
      text-decoration: underline;
    }
    /* Chat */
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
      display: none;
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
  </style>
`;

document.body.innerHTML = `
  <header>
    <h1>Welcome to CodeFlip</h1>
    <p>Rewrite Code Across Languages Instantly with AI</p>
    <a href="converter.html" target="_blank" class="btn">Try CodeFlip</a>
  </header>
  <section id="features">
    <h2>Features</h2>
    <ul>
      <li>Convert code between Python, Java, JavaScript, and more</li>
      <li>Language-accurate translation using AI</li>
      <li>Instant results with copy/download option</li>
      <li>Great for learning and debugging</li>
      <li>Fully browser-based – no install needed</li>
    </ul>
  </section>
  <section id="how-it-works">
    <h2>How It Works</h2>
    <img src="image.jpeg" alt="Code conversion demo" width="500">
    <p>Paste your source code, select target language, and click convert. Done!</p>
  </section>
  <section id="about">
    <h2>About the Project</h2>
    <p>CodeFlip is built for developers, students, and educators to explore multilingual coding easily.</p>
  </section>
  <footer>
    <p>&copy; 2025 CodeFlip. All rights reserved.</p>
    <a href="https://github.com/your-username/codeflip" target="_blank">View on GitHub</a>
  </footer>

  <button id="chatBtn">💬</button>
  <div id="chatWindow">
    <div id="chatMessages"></div>
    <div id="chatInput">
      <input type="text" id="chatText" placeholder="Ask something...">
      <button id="chatSend">➡</button>
    </div>
  </div>
`;

document.getElementById("chatBtn").addEventListener("click", () => {
  const win = document.getElementById("chatWindow");
  win.style.display = win.style.display === "flex" ? "none" : "flex";
});

document.getElementById("chatSend").addEventListener("click", async () => {
  const input = document.getElementById("chatText");
  const msg = input.value.trim();
  if (!msg) return;
  const chatMessages = document.getElementById("chatMessages");
  chatMessages.innerHTML += `<div><b>You:</b> ${msg}</div>`;
  input.value = "";

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [{ role: "user", content: msg }]
      })
    });
    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "No reply";
    chatMessages.innerHTML += `<div><b>AI:</b> ${reply}</div>`;
    chatMessages.scrollTop = chatMessages.scrollHeight;
  } catch (e) {
    chatMessages.innerHTML += `<div style="color:red;"><b>Error:</b> Could not connect</div>`;
  }
});
