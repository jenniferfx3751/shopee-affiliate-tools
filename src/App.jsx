
import React,{useState} from 'react';
export default function App(){
const [product,setProduct]=useState('');const [setting,setSetting]=useState('');const [vibe,setVibe]=useState('');const [out,setOut]=useState('');const [loading,setLoading]=useState(false);
const gen=async()=>{setLoading(true);const r=await fetch('/api/generate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({product,setting,vibe})});const d=await r.json();setOut(d.result||JSON.stringify(d));setLoading(false);}
return <div className='wrap'><div className='card'><h1>SizukaShop AI v4 🔥</h1>
<input placeholder='Produk' value={product} onChange={e=>setProduct(e.target.value)} />
<input placeholder='Setting' value={setting} onChange={e=>setSetting(e.target.value)} />
<input placeholder='Vibe' value={vibe} onChange={e=>setVibe(e.target.value)} />
<button onClick={gen}>{loading?'Generating...':'Generate AI Prompt'}</button>
<textarea readOnly value={out} placeholder='Hasil AI muncul di sini...' />
</div></div>}
