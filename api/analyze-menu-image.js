const GEMINI_MODEL = "gemini-2.5-flash";

function extractJson(text) {
  const trimmed = String(text || "").trim();
  if (!trimmed) return null;

  try {
    return JSON.parse(trimmed);
  } catch {
    const match = trimmed.match(/\{[\s\S]*\}/);
    if (!match) return null;
    return JSON.parse(match[0]);
  }
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    return response.status(500).json({ error: "Missing GEMINI_API_KEY environment variable." });
  }

  try {
    const { image } = request.body || {};
    if (!image || typeof image !== "string" || !image.startsWith("data:image/")) {
      return response.status(400).json({ error: "Missing image data." });
    }

    const [metadata, base64Data] = image.split(",");
    const mimeType = metadata.match(/^data:(image\/[^;]+);base64$/)?.[1];
    if (!mimeType || !base64Data) {
      return response.status(400).json({ error: "Invalid image format." });
    }

    const prompt = `Extract structured restaurant menu data from this image.

Return JSON only with this shape:
{
  "dishes": [
    {
      "category": "string or empty",
      "name": "dish name in the menu language",
      "english_name": "English translation if useful, otherwise empty",
      "price": "visible price or empty",
      "visible_ingredients": ["ingredients explicitly visible on the menu"],
      "likely_ingredients": ["common likely ingredients, only when clearly suggested by the dish"],
      "allergy_risks": ["allergy or dietary risk clues such as peanut, dairy, egg, soy, wheat, shellfish, pork, beef, alcohol"],
      "uncertainty_notes": ["what is not visible or should be confirmed with staff"]
    }
  ]
}

Rules:
- Do not invent exact ingredients. Put uncertain guesses in likely_ingredients.
- Preserve Chinese dish names when visible.
- Group menu text into real dishes, not every decorative label or price.
- Ignore phone/browser UI, restaurant slogans, and unrelated text.
- If the image is too unclear, return an empty dishes array.`;

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                { text: prompt },
                {
                  inline_data: {
                    mime_type: mimeType,
                    data: base64Data,
                  },
                },
              ],
            },
          ],
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.1,
          },
        }),
      }
    );

    const data = await geminiResponse.json();
    if (!geminiResponse.ok) {
      const message = data.error?.message || "Gemini could not analyze the image.";
      return response.status(502).json({ error: message });
    }

    const text = data.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("\n") || "";
    const parsed = extractJson(text);
    const dishes = Array.isArray(parsed?.dishes) ? parsed.dishes : [];

    return response.status(200).json({ dishes, raw: text });
  } catch (error) {
    return response.status(500).json({ error: error.message || "Menu image analysis failed." });
  }
}
