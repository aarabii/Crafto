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
    system: "You generate three notifications for a messages app.",
    prompt: input,
    maxTokens: 1024,
    temperature: temperature,
    schema: z.object({
      data: z.array(
        z.object({
          description: z.string().describe("Add generated description."),
        })
      ),
    }),
  });

  return { data };
}
