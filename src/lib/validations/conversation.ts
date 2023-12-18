import { z } from "zod";

export const ConversationPayloadSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["assistant", "user"]),
      content: z.string().min(1).max(255),
    })
  ),
  isFormSubmitted: z.boolean(),
  isPreview: z.boolean().optional(),
});