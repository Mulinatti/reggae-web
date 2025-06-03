import { z } from "zod";

const cadastroSchema = z
  .object({
    username: z.string(),
    deviceId: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export default cadastroSchema;
