import React, { useState } from "react";

export default function App() {
  const [model, setModel] = useState("");
  const [product, setProduct] = useState("");

  const [setting, setSetting] = useState("");
  const [vibe, setVibe] = useState("");

  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");

  const fileToBase64 = (file, setter) => {
    const reader = new FileReader();
    reader.onloadend = () => {
  let base64 = reader.result;

  if (base64.startsWith("data:application/octet-stream")) {
    base64 = base64.replace(
      "data:application/octet-stream",
      "data:image/png"
    );
  }

  setter(base64);
};
    reader.readAsDataURL(file);
  };

  const createPrompt = async () => {
    setLoading(true);

    try {
      const r = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          modelImage: model,
          productImage: product,
          setting,
          vibe
        })
      });

      const d = await r.json();
      setOutput(d.result || "No output");
    } catch {
      setOutput("Connection failed");
    }

    setLoading(false);
  };

  return (
    <div className="app">
      <div className="container">
        <h1>SizukaShop Vision 🔥</h1>
        <p className="sub">AI Analyze Reference Images</p>

        <div className="grid2">
          <div className="card">
            <h3>Model Image</h3>
            <input type="file" onChange={(e)=>fileToBase64(e.target.files[0],setModel)} />
          </div>

          <div className="card">
            <h3>Product Image</h3>
            <input type="file" onChange={(e)=>fileToBase64(e.target.files[0],setProduct)} />
          </div>
        </div>

        <div className="grid2">
          <input placeholder="Location" value={setting} onChange={(e)=>setSetting(e.target.value)} />
          <input placeholder="Mood" value={vibe} onChange={(e)=>setVibe(e.target.value)} />
        </div>

        <button className="mainbtn" onClick={createPrompt}>
          {loading ? "Analyzing..." : "Analyze & Create Prompt"}
        </button>

        <div className="card">
          <h3>Output</h3>
          <textarea readOnly value={output}></textarea>
        </div>
      </div>
    </div>
  );
}
