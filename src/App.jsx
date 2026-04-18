import React, { useState } from "react";

export default function App() {
  const [model, setModel] = useState(null);
  const [productRef, setProductRef] = useState(null);

  const [product, setProduct] = useState("");
  const [setting, setSetting] = useState("");
  const [vibe, setVibe] = useState("");

  const [tab, setTab] = useState("Prompt");
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    Prompt: "",
    Caption: "",
    Hashtag: "",
  });

  const loadImage = (e, setter) => {
    const file = e.target.files[0];
    if (file) setter(URL.createObjectURL(file));
  };

  const generate = async () => {
    setLoading(true);

    try {
      const r = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product,
          setting,
          vibe,
        }),
      });

      const d = await r.json();
      const result = d.result || "No output";

      setData({
        Prompt: result,
        Caption: `Upgrade your look instantly with this ${product} ✨`,
        Hashtag: "#shopeefinds #fashionviral #racunshopee #viralproduk",
      });
    } catch (err) {
      setData({
        Prompt: "Connection failed.",
        Caption: "",
        Hashtag: "",
      });
    }

    setLoading(false);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(data[tab]);
  };

  return (
    <div className="app">
      <div className="container">
        <h1>SizukaShop AI PRO 🔥</h1>
        <p className="sub">Real Build Version</p>

        <div className="grid2">
          <div className="box">
            <h3>1. Model Reference</h3>
            <input type="file" onChange={(e) => loadImage(e, setModel)} />
            <div className="preview">
              {model ? <img src={model} alt="" /> : "Upload model image"}
            </div>
          </div>

          <div className="box">
            <h3>2. Product Reference</h3>
            <input type="file" onChange={(e) => loadImage(e, setProductRef)} />
            <div className="preview">
              {productRef ? <img src={productRef} alt="" /> : "Upload product image"}
            </div>
          </div>
        </div>

        <div className="grid3">
          <input
            placeholder="3. Product"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />

          <input
            placeholder="4. Location"
            value={setting}
            onChange={(e) => setSetting(e.target.value)}
          />

          <input
            placeholder="5. Mood"
            value={vibe}
            onChange={(e) => setVibe(e.target.value)}
          />
        </div>

        <button className="generate" onClick={generate}>
          {loading ? "Generating..." : "6. GENERATE"}
        </button>

        <div className="tabs">
          <button onClick={() => setTab("Prompt")}>Prompt</button>
          <button onClick={() => setTab("Caption")}>Caption</button>
          <button onClick={() => setTab("Hashtag")}>Hashtag</button>
        </div>

        <div className="box">
          <div className="outtop">
            <h3>7. Output</h3>
            <button onClick={copy}>Copy</button>
          </div>

          <textarea readOnly value={data[tab]} />
        </div>
      </div>
    </div>
  );
}
