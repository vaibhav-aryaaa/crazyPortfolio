// src/app/api/chat/route.ts
import OpenAI from 'openai';
import { streamText } from 'ai';
import { SYSTEM_PROMPT } from './prompt';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const runtime = 'edge';
export const maxDuration = 30;

function errorHandler(error: unknown) {
  if (error == null) return 'Unknown error';
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.message;
  return JSON.stringify(error);
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Add system prompt
    messages.unshift(SYSTEM_PROMPT);

    // Convert messages to OpenAI format
    const formattedMessages = messages.map((msg: any) => ({
      role: msg.role,
      content: msg.content
    }));

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: formattedMessages,
      temperature: 0.7
    });

    const assistantMessage = completion.choices[0].message?.content || '';
    return new Response(assistantMessage, { status: 200 });
  } catch (err) {
    console.error('Global error:', err);
    const errorMessage = errorHandler(err);
    return new Response(errorMessage, { status: 500 });
  }
}