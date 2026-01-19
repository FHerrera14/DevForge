
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateImage = async (prompt: string, aspectRatio: "1:1" | "16:9" | "9:16" | "3:4" | "4:3" = "1:1") => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: prompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image data found in response");
  } catch (error) {
    console.error("Image generation error:", error);
    throw error;
  }
};

export const editImage = async (base64Image: string, prompt: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image.split(',')[1],
              mimeType: 'image/png'
            }
          },
          { text: prompt }
        ]
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No edited image data found");
  } catch (error) {
    console.error("Image editing error:", error);
    throw error;
  }
};

export const analyzeModel = async (base64Image: string, modelContext: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image.split(',')[1],
              mimeType: 'image/png'
            }
          },
          { text: `Analyze this 3D model/wireframe for game optimization. Context: ${modelContext}. Provide specific feedback on: 1. Topology efficiency, 2. UV mapping potential, 3. LOD suggestions, 4. Possible draw call reductions. Use a helpful, technical tone for a game developer.` }
        ]
      }
    });
    return response.text;
  } catch (error) {
    console.error("Model analysis error:", error);
    throw error;
  }
};

export const findFreeAssets = async (query: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Search for free game development assets for Unity and Unreal Engine related to: "${query}". Provide a list of 5-6 high-quality recommendations with a short description for each. Focus on legitimate free assets from official stores or reputable sites like itch.io.`,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });
    
    const text = response.text;
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    return { text, sources };
  } catch (error) {
    console.error("Asset search error:", error);
    throw error;
  }
};
