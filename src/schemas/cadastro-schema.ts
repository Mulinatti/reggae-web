import { z } from "zod";

const cadastroSchema = z.object({
  username: z.string(),
  password: z.string(),
  password2: z.string(),
}).refine((cadastro) => cadastro.password == cadastro.password2, {
    message: "Senhas precisam ser iguais !",
});

export default cadastroSchema;