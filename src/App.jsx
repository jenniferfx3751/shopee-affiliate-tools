
import React,{useState} from 'react';
export default function App(){
 const [product,setProduct]=useState(''); const [setting,setSetting]=useState(''); const [vibe,setVibe]=useState(''); const [result,setResult]=useState('');
 const gen=()=>setResult(`Create a cinematic Shopee affiliate promo video featuring Sizuka showcasing ${product}. Scene in ${setting}. Mood: ${vibe}. Focus on premium visuals, close-up details, 9:16 vertical.`);
 return <div className='wrap'><div className='card'>
 <h1>SizukaShop AI Prompt Premium ✨</h1>
 <p className='sub'>Generate premium affiliate prompts in seconds.</p>
 <div className='grid'>
 <input value={product} onChange={e=>setProduct(e.target.value)} placeholder='Produk'/>
 <input value={setting} onChange={e=>setSetting(e.target.value)} placeholder='Setting'/>
 <input value={vibe} onChange={e=>setVibe(e.target.value)} placeholder='Vibe'/>
 <select><option>Shopee Video</option><option>TikTok Shop</option></select>
 </div>
 <div className='grid3'>
 <label className='btn orange'>Upload Foto Sizuka<input hidden type='file'/></label>
 <label className='btn pink'>Upload Foto Produk<input hidden type='file'/></label>
 <button className='btn indigo' onClick={gen}>Generate Prompt</button>
 </div>
 <textarea readOnly value={result} placeholder='Hasil prompt muncul di sini...' />
 </div></div>
}
