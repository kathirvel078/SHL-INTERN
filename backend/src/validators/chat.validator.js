import { z } from "zod";

export const chatSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum([
        "user",
        "assistant",
        "system",
      ]),

      content:
  z
    .string()
    .min(1)
    .max(1000)
    })
  ),
});