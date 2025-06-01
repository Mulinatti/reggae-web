import { z } from "zod";

const perfilSchema = z.object({
  sun: z.coerce.number(),
  irrigation: z.coerce.number(),
  temp: z.coerce.number(),
  time: z.optional(z.date())
});

export default perfilSchema;
