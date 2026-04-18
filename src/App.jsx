import React, { useState } from "react";

export default function App() {
  const [model, setModel] = useState(null);
  const [productRef, setProductRef] = useState(null);

  const [product, setProduct] = useState("");
  const [location, setLocation] = useState("");
  const [mood, setMood] = useState("");

  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");

  const loadImage = (e, setter) => {
    const file = e.target.files[0];
    if (file) setter(URL.createObjectURL(file));
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
          product,
          setting: location,
          vibe: mood
        })
      });

      const d = await r.json();
      setOutput(d.result || "No output");
    } catch (err) {
      setOutput("Connection failed.");
    }

    setLoading(false);
  };

  const copyText = async () => {
    await navigator.clipboard.writeText(output);
  };

  return (
    <div className="app">
      <div className="container">

        <h1>SizukaShop Prompt 🔥</h1>
        <p className="sub">Creator Workflow</p>

        <div className="grid2">

          <div className="card">
            <h3>Model Reference</h3>
            <input type="file" onChange={(e) => loadImage(e, setModel)} />
            <div className="preview">
              {model ? <img src={model} alt="" /> : "Upload model image"}
            </div>
          </div>

          <div className="card">
            <h3>Product Reference</h3>
            <input type="file" onChange={(e) => loadImage(e, setProductRef)} />
            <div className="preview">
              {productRef ? <img src={productRef} alt="" /> : "Upload product image"}
            </div>
          </div>

        </div>

        <div className="grid3">

          <input
            placeholder="Product"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />

          <input
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <input
            placeholder="Mood"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
          />

        </div>

        <button className="mainbtn" onClick={createPrompt}>
          {loading ? "Creating..." : "Create Prompt"}
        </button>

        <div className="card">
          <div className="toprow">
            <h3>Output</h3>
            <button onClick={copyText}>Copy</button>
          </div>

          <textarea readOnly value={output} />
        </div>

      </div>
    </div>
  );
}
