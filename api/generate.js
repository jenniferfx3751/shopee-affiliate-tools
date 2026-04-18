export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { product, setting, vibe } = req.body;

  try {
    const prompt = `
Kamu adalah AI Prompt Generator premium untuk konten affiliate e-commerce.

TUGAS:
Buat output PROMPT VISUAL yang menjual untuk produk: ${product}

DETAIL USER:
- Background: ${setting || "auto choose best background"}
- Vibe: ${vibe || "auto choose best vibe"}

ATURAN WAJIB:
1. Analisa dulu jenis produk (tas, baju, sepatu, skincare, makanan, dll).
2. Tentukan cara menampilkan produk paling menarik secara visual.
3. Buat 5 konsep berbeda total.
4. Setiap konsep berisi:
   - Judul konsep
   - IMAGE PROMPT
   - VIDEO PROMPT
5. Jangan kasih hashtag.
6. Jangan kasih CTA.
7. Jangan kasih penjelasan tambahan.
8. Bahasa Inggris.
9. Model wanita elegan Korea-face style, premium commercial look.
10. Jika fashion: tonjolkan fit/fabric.
11. Jika tas: tonjolkan texture/logo/hand carry.
12. Jika sepatu: tonjolkan sole/angle kaki.
13. Jika makanan: tonjolkan texture/steam/close-up.
14. Hasil harus cocok untuk Shopee / TikTok Shop / Reels ads.

FORMAT:

1. [Concept Name]
IMAGE PROMPT: ...
VIDEO PROMPT: ...

2. [Concept Name]
IMAGE PROMPT: ...
VIDEO PROMPT: ...

lanjut sampai 5 konsep
`;

    const response = await fetch(
      process.env.AI_BASE_URL + "/v1/responses",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.AI_API_KEY
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          input: prompt
        })
      }
    );

    const data = await response.json();

    const txt =
      data.output_text ||
      data.output?.[0]?.content?.[0]?.text ||
      data.choices?.[0]?.message?.content ||
      "Failed to generate output";

    return res.status(200).json({ result: txt });

  } catch (e) {
    return res.status(500).json({
      error: e.toString()
    });
  }
}
