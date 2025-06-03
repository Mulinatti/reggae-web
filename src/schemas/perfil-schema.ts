import { z } from "zod";

const perfilSchema = z.object({
  deviceId: z.string(),
  sun: z.coerce.number(),
  min: z.coerce.number(),
  max: z.coerce.number(),
  time: z.optional(z.date())
});

export default perfilSchema;
