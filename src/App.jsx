import React, { useState } from 'react';
import './style.css';

export default function App() {
  const [product, setProduct] = useState('');
  const [setting, setSetting] = useState('');
  const [vibe, setVibe] = useState('');
  const [modelImage, setModelImage] = useState(null);
  const [productImage, setProductImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  };

  const handleUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const base64 = await fileToBase64(file);

    if (type === 'model') setModelImage(base64);
    if (type === 'product') setProductImage(base64);
  };

  const generatePrompt = async () => {
    setLoading(true);
    setOutput('');

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product,
          setting,
          vibe,
          modelImage,
          productImage
        })
      });

      const data = await res.json();
      setOutput(data.result || data.error || 'No output');
    } catch (error) {
      setOutput('Connection failed');
    }

    setLoading(false);
  };

  const copyText = async () => {
    await navigator.clipboard.writeText(output);
  };

  return (
    <div className="app">
      <div className="container">
        <h1>SizukaShop Vision 🔥</h1>
        <p className="sub">AI Product Prompt Generator</p>

        <div className="grid2">
          <div className="card">
            <h3>Model Image</h3>
            <input type="file" accept="image/*" onChange={(e) => handleUpload(e, 'model')} />
          </div>

          <div className="card">
            <h3>Product Image</h3>
            <input type="file" accept="image/*" onChange={(e) => handleUpload(e, 'product')} />
          </div>
        </div>

        <div className="grid3">
          <input
            placeholder="Product name"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />

          <input
            placeholder="Background (cafe / hotel / studio)"
            value={setting}
            onChange={(e) => setSetting(e.target.value)}
          />

          <input
            placeholder="Vibe (luxury / cute / elegant)"
            value={vibe}
            onChange={(e) => setVibe(e.target.value)}
          />
        </div>

        <button className="mainbtn" onClick={generatePrompt} disabled={loading}>
          {loading ? 'Generating...' : 'Analyze & Create Prompt'}
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
