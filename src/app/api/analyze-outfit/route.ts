import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { imageBase64, genderContext, stylingPreference, selectedStyles } = body;

    const geminiApiKey = process.env.GEMINI_API_KEY;
    const openAiApiKey = process.env.OPENAI_API_KEY;

    // 1. If Gemini Vision API is configured, execute real Gemini Vision inference
    if (geminiApiKey && imageBase64 && imageBase64.startsWith('data:image')) {
      const mimeType = imageBase64.substring(
        imageBase64.indexOf(':') + 1,
        imageBase64.indexOf(';')
      );
      const base64Data = imageBase64.split(',')[1];

      const prompt = `You are FITCHECK's Senior Editorial Fashion Critic & AI Vision Stylist.
Analyze this outfit image inclusively without restrictive gender stereotypes.
Context provided by user: Gender profile: ${genderContext || 'Inclusive'}, Styling preference: ${
        stylingPreference || 'Flexible'
      }, Preferred styles: ${(selectedStyles || []).join(', ')}.

Return ONLY valid JSON with the following exact structure:
{
  "detected_items": [
    { "item_type": "Shirt/Blouse/Trousers/Loafers/Hijab/etc", "category": "Tops|Bottoms|Outerwear|Dresses|Shoes|Bags|Accessories|Hijab", "color_name": "Cream", "hex_code": "#FFFDD0", "confidence_note": "Detected in upper silhouette" }
  ],
  "detected_styles": ["Old Money", "Minimalist"],
  "color_harmony": "Editorial Tonal & Neutral Harmony",
  "score_breakdown": {
    "color_harmony": 90,
    "outfit_combination": 88,
    "style_consistency": 92,
    "accessories_match": 85
  },
  "strengths": ["Point 1", "Point 2", "Point 3"],
  "weaknesses": ["Point 1"],
  "improvement_tips": ["Tip 1", "Tip 2"],
  "accessory_recommendations": ["Rec 1", "Rec 2"],
  "alternative_combinations": ["Alt 1", "Alt 2"]
}`;

      const geminiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  { text: prompt },
                  { inline_data: { mime_type: mimeType, data: base64Data } },
                ],
              },
            ],
            generationConfig: {
              response_mime_type: 'application/json',
            },
          }),
        }
      );

      if (geminiRes.ok) {
        const geminiData = await geminiRes.json();
        const rawText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawText) {
          const parsed = JSON.parse(rawText);
          return NextResponse.json({
            ai_configured: true,
            provider: 'Google Gemini Vision API',
            analysis: parsed,
          });
        }
      }
    }

    // 2. If OpenAI Vision API is configured
    if (openAiApiKey && imageBase64) {
      const openAiRes = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openAiApiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          response_format: { type: 'json_object' },
          messages: [
            {
              role: 'system',
              content:
                'You are FITCHECK Editorial Fashion Analyzer. Output JSON with detected_items, detected_styles, color_harmony, score_breakdown (color_harmony, outfit_combination, style_consistency, accessories_match 0-100), strengths, weaknesses, improvement_tips, accessory_recommendations, alternative_combinations.',
            },
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: `Analyze this outfit inclusively. Context: ${genderContext}, ${stylingPreference}.`,
                },
                { type: 'image_url', image_url: { url: imageBase64 } },
              ],
            },
          ],
        }),
      });

      if (openAiRes.ok) {
        const openAiData = await openAiRes.json();
        const content = openAiData?.choices?.[0]?.message?.content;
        if (content) {
          return NextResponse.json({
            ai_configured: true,
            provider: 'OpenAI Vision API',
            analysis: JSON.parse(content),
          });
        }
      }
    }

    // 3. Honest fallback response when AI Vision API key is not configured
    return NextResponse.json({
      ai_configured: false,
      provider: 'Rule-Based Sartorial & Pixel Engine (Honest Fallback)',
      message:
        'External AI Vision API key (GEMINI_API_KEY / OPENAI_API_KEY) is not configured in environment variables. Running FITCHECK deterministic pixel color extraction & sartorial rule evaluation.',
    });
  } catch (error) {
    console.error('Analyze outfit API error:', error);
    return NextResponse.json({
      ai_configured: false,
      provider: 'Rule-Based Sartorial & Pixel Engine (Honest Fallback)',
      message: 'Fallback to deterministic rule-based fashion evaluation.',
    });
  }
}

