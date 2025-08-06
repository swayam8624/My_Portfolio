import { NextRequest } from "next/server";
import { StreamingTextResponse, Message, OpenAIStream, OpenAIStreamPayload } from "ai";
import { blogToolPrompts } from "@/lib/prompts/blogTools";

// Environment variable for your self-hosted Ollama instance
const OLLAMA_URL = process.env.OLLAMA_URL || "http://localhost:11434";

export async function POST(req: NextRequest) {
  try {
    const { feature, userInput } = await req.json();

    if (!feature || !userInput) {
      return new Response(JSON.stringify({ error: "Missing feature or input." }), { status: 400 });
    }

    const promptGenerator = blogToolPrompts[feature];
    if (!promptGenerator) {
      return new Response(JSON.stringify({ error: `Unknown feature: ${feature}` }), { status: 400 });
    }

    const systemPrompt = promptGenerator(userInput);
    const messages: Message[] = [
      { role: "system", content: systemPrompt },
      { role: "user", content: userInput },
    ];

    const payload: OpenAIStreamPayload = {
      model: "llama3", // or your Ollama model like "mistral", "codellama", etc.
      messages,
      stream: true,
    };

    const stream = await OpenAIStream(payload, {
      apiUrl: `${OLLAMA_URL}/v1/chat/completions`, // 👈 critical for Ollama
    });

    return new StreamingTextResponse(stream);
  } catch (err) {
    console.error("Blog Assistant API Error:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
