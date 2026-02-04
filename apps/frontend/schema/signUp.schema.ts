import * as z from "zod";

export const signUpFormSchema = z.object({
  name: z
    .string()
    .min(3, "Name Must Be minimum 3 Character")
    .max(10, "Name Should not be Greater than 10 Characters"),
  email: z.email(),
  password: z
    .string()
    .min(3, "Should Be minimum 3 Character")
    .max(10, "Should not be Greater than 10 Characters"),
});
