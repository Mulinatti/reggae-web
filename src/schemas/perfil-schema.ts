import { z } from "zod";

const perfilSchema = z.object({
  sun: z.number(),
  irrigation: z.number(),
  temp: z.number(),
  time: z.number().optional()
});

export default perfilSchema;
