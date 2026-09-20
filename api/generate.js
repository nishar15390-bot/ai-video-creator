import { fal } from "@fal-ai/client";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt } = req.body || {};

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({
        error: "Please enter a video prompt."
      });
    }

    const result = await fal.subscribe("minimax/h3-max/text-to-video", {
      input: {
        prompt: prompt.trim(),
        prompt_expansion_mode: "disabled"
      }
    });

    return res.status(200).json({
      success: true,
      video: result.data?.video || null,
      requestId: result.requestId
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: error?.message || "Video generation failed."
    });
  }
}
