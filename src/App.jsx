
import React,{useState} from 'react';
export default function App(){
const [product,setProduct]=useState('');const [setting,setSetting]=useState('');const [vibe,setVibe]=useState('');const [out,setOut]=useState('');
const gen=()=>setOut(`Create a premium Shopee affiliate video for ${product}. Scene: ${setting}. Mood: ${vibe}. Use uploaded model and product references.`);
return <div style={{padding:'20px',fontFamily:'Arial'}}><h1>SizukaShop AI Prompt Premium</h1>
<label>Upload Foto Sizuka<input type='file'/></label><br/><br/>
<label>Upload Foto Produk<input type='file'/></label><br/><br/>
<input placeholder='Produk' value={product} onChange={e=>setProduct(e.target.value)} /><br/><br/>
<input placeholder='Setting' value={setting} onChange={e=>setSetting(e.target.value)} /><br/><br/>
<input placeholder='Vibe' value={vibe} onChange={e=>setVibe(e.target.value)} /><br/><br/>
<button onClick={gen}>Generate Prompt</button><br/><br/>
<textarea value={out} readOnly rows='10' cols='60'/>
</div>}
