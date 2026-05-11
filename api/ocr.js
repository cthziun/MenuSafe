export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.OCR_SPACE_API_KEY;
  if (!apiKey) {
    return response.status(500).json({ error: "Missing OCR_SPACE_API_KEY environment variable." });
  }

  try {
    const { image, language = "auto" } = request.body || {};
    if (!image || typeof image !== "string") {
      return response.status(400).json({ error: "Missing image data." });
    }

    const formData = new FormData();
    formData.append("base64Image", image);
    formData.append("language", language);
    formData.append("isOverlayRequired", "false");
    formData.append("detectOrientation", "true");
    formData.append("scale", "true");
    formData.append("OCREngine", "2");

    const ocrResponse = await fetch("https://api.ocr.space/parse/image", {
      method: "POST",
      headers: { apikey: apiKey },
      body: formData,
    });

    const data = await ocrResponse.json();
    if (!ocrResponse.ok || data.IsErroredOnProcessing) {
      const message = Array.isArray(data.ErrorMessage) ? data.ErrorMessage.join(" ") : data.ErrorMessage;
      return response.status(502).json({ error: message || "OCR.space could not process the image." });
    }

    const text = (data.ParsedResults || [])
      .map((result) => result.ParsedText || "")
      .join("\n")
      .trim();

    return response.status(200).json({ text });
  } catch (error) {
    return response.status(500).json({ error: error.message || "OCR request failed." });
  }
}
