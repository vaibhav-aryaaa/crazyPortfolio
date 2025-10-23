// src/components/chat/chatmessage.tsx
import type { Message } from 'ai/react';

export function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-md rounded-2xl px-4 py-2 ${
          isUser
            ? 'bg-blue-500 text-white'
            : 'bg-neutral-200 text-black dark:bg-neutral-800 dark:text-white'
        }`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
}