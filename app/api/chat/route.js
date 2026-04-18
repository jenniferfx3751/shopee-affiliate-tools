import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL
});

export async function POST(req) {
  try {
    const { message } = await req.json();

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are SizukaShop AI, a helpful shopping assistant." },
        { role: "user", content: message }
      ]
    });

    const reply = completion.choices?.[0]?.message?.content || "Maaf, tidak ada jawaban.";

    return Response.json({ reply });

  } catch (error) {
    return Response.json({
      reply: "Maaf, AI sedang error.",
      error: error.message
    }, { status: 500 });
  }
}
