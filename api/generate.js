
export default async function handler(req,res){
 if(req.method!=='POST') return res.status(405).json({error:'Method not allowed'});
 const {product,setting,vibe}=req.body;
 try{
 const response=await fetch(process.env.AI_BASE_URL + '/v1/responses',{
   method:'POST',
   headers:{
    'Content-Type':'application/json',
    'Authorization':'Bearer '+process.env.AI_API_KEY
   },
   body:JSON.stringify({
     model:'openai/gpt-4o-mini',
     input:`Buat prompt affiliate Shopee yang menjual untuk produk ${product}, setting ${setting}, vibe ${vibe}. Beri hook, prompt gambar, prompt video, hashtag.`
   })
 });
 const data=await response.json();
 const txt = data.output_text || JSON.stringify(data);
 res.status(200).json({result:txt});
 }catch(e){res.status(500).json({error:e.toString()})}
}
