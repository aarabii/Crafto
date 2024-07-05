"use server";

import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

const groq = createOpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.AI_API_KEY,
});

export async function generate(
  input: string,
  model: string,
  temperature: number
) {
  const { object: data } = await generateObject({
    model: groq(model),
    system: `You are an AI assistant tasked with generating an engaging description or bio based on the user input. Use the provided details to tailor the content according to the specified account type, tone, and whether or not to include emojis. 
    - The bio should not exceed 150 characters.
    - The description should not exceed 2000 characters and should include relevant hashtags. Provide at least 4 results in JSON format.`,
    prompt: input,
    maxTokens: 2048,
    temperature: temperature,
    schema: z.object({
      result: z.array(
        z.object({
          description: z.string().describe("Generated description or bio."),
        })
      ),
    }),
  });

  return {
    result: data.result.map((item: { description: string }) => ({
      result: item.description,
    })),
  };
}
