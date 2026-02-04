import * as z from "zod";

export const signInFormSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(3, "Should Be minimum 3 Character")
    .max(10, "Should not be Greater than 10 Characters"),
});
