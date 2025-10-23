// src/app/api/chat/route.ts

import { createOllama } from 'ollama-ai-provider';
import { streamText } from "ai";
import { SYSTEM_PROMPT } from './prompt'; // <-- STEP 1: Import your new prompt

const ollama = createOllama();
export const runtime = 'edge';
export const maxDuration = 30;

function errorHandler(error: unknown) {
  if (error == null) { return 'Unknown error'; }
  if (typeof error === 'string') { return error; }
  if (error instanceof Error) { return error.message; }
  return JSON.stringify(error);
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // --- STEP 2: Add the system prompt to the beginning of the conversation ---
    messages.unshift(SYSTEM_PROMPT);
    
    const result = streamText({
      model: ollama("phi3"),
      messages,
    });

    return result.toDataStreamResponse({
      getErrorMessage: errorHandler,
    });
  } catch (err) {
    console.error("Global error:", err);
    const errorMessage = errorHandler(err);
    return new Response(errorMessage, { status: 500 });
  }
}