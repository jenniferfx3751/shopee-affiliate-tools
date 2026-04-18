
import React,{useState} from 'react';
export default function App(){
 const [p,setP]=useState(''); const [s,setS]=useState(''); const [v,setV]=useState(''); const [r,setR]=useState('');
 const gen=()=>setR(`Create a cinematic Shopee affiliate promo video featuring Sizuka showcasing ${p}. Scene in ${s}. Mood: ${v}. Focus on product details, smooth camera motion, 9:16 vertical.`);
 return <div className="wrap"><div className="card"><h1>Shopee Affiliate Tools Pro</h1>
 <input placeholder="Produk" value={p} onChange={e=>setP(e.target.value)} />
 <input placeholder="Setting" value={s} onChange={e=>setS(e.target.value)} />
 <input placeholder="Vibe" value={v} onChange={e=>setV(e.target.value)} />
 <button onClick={gen}>Generate Prompt</button>
 <textarea readOnly value={r} placeholder="Hasil prompt..." />
 </div></div>
}
