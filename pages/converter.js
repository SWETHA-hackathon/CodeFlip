import { useState } from "react";

export default function Converter() {
  const [inputCode, setInputCode] = useState("");
  const [sourceLang, setSourceLang] = useState("python");
  const [targetLang, setTargetLang] = useState("java");
  const [outputCode, setOutputCode] = useState("");

  const convertCode = () => {
    let output = "";
    if (sourceLang === "python" && targetLang === "java") {
      output = `
public class Hello {
    public static String greet(String name) {
        return "Hello, " + name + "!";
    }
    public static void main(String[] args) {
        System.out.println(greet("CodeFlip"));
    }
}`;
    } else if (sourceLang === "java" && targetLang === "python") {
      output = `
def greet(name):
    return f"Hello, {name}!"
print(greet("CodeFlip"))`;
    } else if (sourceLang === "python" && targetLang === "javascript") {
      output = `
function greet(name) {
    return "Hello, " + name + "!";
}
console.log(greet("CodeFlip"));`;
    } else {
      output = "// Conversion for selected languages is not yet supported.";
    }
    setOutputCode(output.trim());
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(outputCode);
      alert("Code copied to clipboard!");
    } catch {
      alert("Copy failed. Please try manually.");
    }
  };

  const downloadCode = () => {
    const blob = new Blob([outputCode], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "converted_code.txt";
    link.click();
  };

  return (
    <div>
      <header>
        <h1>CodeFlip Converter</h1>
        <p>Simulate code conversion across programming languages</p>
      </header>

      <div className="converter">
        <label htmlFor="sourceLang">From:</label>
        <select id="sourceLang" value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="javascript">JavaScript</option>
        </select>

        <label htmlFor="targetLang">To:</label>
        <select id="targetLang" value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
          <option value="java">Java</option>
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
        </select>

        <textarea
          id="inputCode"
          placeholder="Paste your code here..."
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
        ></textarea>

        <button onClick={convertCode}>Convert</button>

        <h3 style={{ color: "#00bfa6", marginTop: "20px" }}>Converted Code:</h3>
        <textarea id="outputCode" value={outputCode} readOnly></textarea>

        <button onClick={copyCode}>Copy</button>
        <button onClick={downloadCode}>Download</button>
      </div>

      <footer>
        <p>&copy; 2025 CodeFlip. All rights reserved.</p>
      </footer>

      <style jsx>{`
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
      `}</style>
    </div>
  );
}
