// generate.js (backend)
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { product, setting, vibe, productImage } = req.body;

  if (!product && !productImage) {
    return res.status(400).json({ error: 'Upload product image or fill product name first.' });
  }

  try {
    const systemPrompt = `You are an elite affiliate prompt generator. Analyze the product first. Focus ONLY on the uploaded product. Do not invent tea, shoes, dessert, coffee, or unrelated items unless directly relevant. Create 5 unique concepts. Each concept must contain IMAGE PROMPT and VIDEO PROMPT in English. Prioritize product visibility and selling appeal.`;

    const userPrompt = `Product Name: ${product || 'Unknown'}\nBackground: ${setting || 'Auto choose best'}\nVibe: ${vibe || 'Auto choose best'}\nGenerate 5 concepts.`;

    const input = productImage
      ? [
          { role: 'system', content: systemPrompt },
          {
            role: 'user',
            content: [
              { type: 'input_text', text: userPrompt },
              { type: 'input_image', image_url: productImage }
            ]
          }
        ]
      : [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ];

    const response = await fetch(process.env.AI_BASE_URL + '/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + process.env.AI_API_KEY
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        input
      })
    });

    const data = await response.json();

    const txt =
      data.output_text ||
      data.output?.[0]?.content?.[0]?.text ||
      data.choices?.[0]?.message?.content ||
      'Failed to generate output';

    return res.status(200).json({ result: txt });
  } catch (error) {
    return res.status(500).json({ error: error.toString() });
  }
}

/* ===============================
App.jsx (frontend replacement)
=============================== */
import React, { useState } from "react";

export default function App() {
  const [modelImage, setModelImage] = useState(null);
  const [productImage, setProductImage] = useState(null);
  const [product, setProduct] = useState("");
  const [setting, setSetting] = useState("");
  const [vibe, setVibe] = useState("");
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const handleFile = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    const base64 = await fileToBase64(file);
    if (type === "model") setModelImage(base64);
    if (type === "product") setProductImage(base64);
  };

  const generatePrompt = async () => {
    setLoading(true);
    setOutput("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product,
          setting,
          vibe,
          modelImage,
          productImage
        })
      });

      const data = await res.json();
      setOutput(data.result || data.error || "No output");
    } catch (err) {
      setOutput("Connection failed.");
    }

    setLoading(false);
  };

  const copyOutput = async () => {
    await navigator.clipboard.writeText(output);
  };

  return (
    <div className="app">
      <div className="container">
        <h1>SizukaShop Vision 🔥</h1>
        <p className="sub">AI Analyze Real Product Images</p>

        <div className="grid2">
          <div className="card">
            <h3>Model Image</h3>
            <input type="file" accept="image/*" onChange={(e) => handleFile(e, "model")} />
          </div>

          <div className="card">
            <h3>Product Image *</h3>
            <input type="file" accept="image/*" onChange={(e) => handleFile(e, "product")} />
          </div>
        </div>

        <div className="grid3">
          <input placeholder="Product Name (optional)" value={product} onChange={(e) => setProduct(e.target.value)} />
          <input placeholder="Background (cafe / hotel / studio)" value={setting} onChange={(e) => setSetting(e.target.value)} />
          <input placeholder="Vibe (luxury / cute / elegant)" value={vibe} onChange={(e) => setVibe(e.target.value)} />
        </div>

        <button className="mainbtn" onClick={generatePrompt} disabled={loading}>
          {loading ? "Analyzing..." : "Analyze & Create Prompt"}
        </button>

        <div className="card">
          <div className="toprow">
            <h3>Output</h3>
            <button onClick={copyOutput}>Copy</button>
          </div>
          <textarea readOnly value={output} />
        </div>
      </div>
    </div>
  );
}
