export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { modelImage, productImage, setting, vibe } = req.body;

  try {
    const response = await fetch(process.env.AI_BASE_URL + "/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.AI_API_KEY
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        input: [
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text:
                  "Analyze these reference images. First image is model reference, second image is product reference. Create premium image generation prompt based on both images. Setting: " +
                  setting +
                  ". Mood: " +
                  vibe +
                  "."
              },
              {
                type: "input_image",
                image_url: modelImage
              },
              {
                type: "input_image",
                image_url: productImage
              }
            ]
          }
        ]
      })
    });

    const data = await response.json();

res.status(200).json({
 raw: data,
 result:
   data.output_text ||
   data.output?.[0]?.content?.[0]?.text ||
   JSON.stringify(data)
});
  }
}
