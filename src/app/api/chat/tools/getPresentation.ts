import { tool } from 'ai';
import { z } from 'zod';

export const getPresentation = tool({
  description:
    'This tool returns a concise personal introduction of Vaibhav Arya. It is used to answer the question "Who are you?" or "Tell me about yourself"',
  parameters: z.object({}),
  execute: async () => {
    return {
      presentation:
        "I'm Vaibhav Arya, a 21-year-old developer specializing in AI at Delhi. Formerly a Coder, Not a intern yet. I'm passionate about AI, tech, Machine Learning and Entrepreneurship",
    };
  },
});
