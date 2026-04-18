export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { modelImage, productImage, setting, vibe } = req.body;

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
                  "Analyze these images and create one premium prompt. Setting: " +
                  setting +
                  ". Mood: " +
                  vibe
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

    const txt =
      data.output_text ||
      data.output?.[0]?.content?.[0]?.text ||
      data.choices?.[0]?.message?.content ||
      JSON.stringify(data);

    return res.status(200).json({ result: txt });

  } catch (error) {
    return res.status(500).json({
      error: error.toString()
    });
  }
}
