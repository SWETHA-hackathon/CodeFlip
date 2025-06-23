// Inject title and style
document.head.innerHTML += `
  <title>CodeFlip – Code Converter</title>
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
    .converter {
      padding: 40px 20px;
      max-width: 900px;
      margin: 40px auto;
      background-color: #28293d;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    }
    textarea {
      width: 100%;
      height: 200px;
      background: #1e1e2f;
      color: #e0e0e0;
      border: 1px solid #444;
      border-radius: 8px;
      padding: 12px;
      font-family: monospace;
      font-size: 16px;
      margin-bottom: 20px;
    }
    select, button {
      padding: 10px 14px;
      border-radius: 6px;
      font-size: 16px;
      margin-right: 10px;
    }
    button {
      background: #00bfa6;
      color: white;
      border: none;
      cursor: pointer;
    }
    button:hover {
      background: #009e8f;
    }
    footer {
      text-align: center;
      padding: 20px;
      background-color: #141421;
      color: #ccc;
      margin-top: 40px;
      font-size: 14px;
    }
  </style>
`;

// Inject body content
document.body.innerHTML = `
  <header>
    <h1>CodeFlip Converter</h1>
    <p>Simulate code conversion across programming languages</p>
  </header>
  <div class="converter">
    <label for="sourceLang">From:</label>
    <select id="sourceLang">
      <option value="python">Python</option>
      <option value="java">Java</option>
      <option value="javascript">JavaScript</option>
    </select>
    <label for="targetLang">To:</label>
    <select id="targetLang">
      <option value="java">Java</option>
      <option value="python">Python</option>
      <option value="javascript">JavaScript</option>
    </select>
    <textarea id="inputCode" placeholder="Paste your code here..."></textarea>
    <button id="convertBtn">Convert</button>
    <h3 style="color:#00bfa6; margin-top: 20px;">Converted Code:</h3>
    <textarea id="outputCode" readonly></textarea>
    <button id="copyBtn">Copy</button>
    <button id="downloadBtn">Download</button>
  </div>
  <footer>
    <p>&copy; 2025 CodeFlip. All rights reserved.</p>
  </footer>
`;

// Logic
function convertCode() {
  const input = document.getElementById("inputCode").value;
  const from = document.getElementById("sourceLang").value;
  const to = document.getElementById("targetLang").value;
  let output = "";

  if (from === "python" && to === "java") {
    output = `
public class Hello {
    public static String greet(String name) {
        return "Hello, " + name + "!";
    }
    public static void main(String[] args) {
        System.out.println(greet("CodeFlip"));
    }
}`;
  } else if (from === "java" && to === "python") {
    output = `
def greet(name):
    return f"Hello, {name}!"
print(greet("CodeFlip"))`;
  } else if (from === "python" && to === "javascript") {
    output = `
function greet(name) {
    return "Hello, " + name + "!";
}
console.log(greet("CodeFlip"));`;
  } else {
    output = "// Conversion for selected languages is not yet supported.";
  }

  document.getElementById("outputCode").value = output.trim();
}

function copyCode() {
  const code = document.getElementById("outputCode");
  navigator.clipboard.writeText(code.value)
    .then(() => alert("Code copied to clipboard!"))
    .catch(() => alert("Copy failed. Please try manually."));
}

function downloadCode() {
  const code = document.getElementById("outputCode").value;
  const blob = new Blob([code], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "converted_code.txt";
  link.click();
}

// Attach events
document.getElementById("convertBtn").addEventListener("click", convertCode);
document.getElementById("copyBtn").addEventListener("click", copyCode);
document.getElementById("downloadBtn").addEventListener("click", downloadCode);
