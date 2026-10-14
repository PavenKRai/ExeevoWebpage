import { z } from "zod";

export const newsletterSchema = z.object({
  email: z.string().trim().min(1, "Enter your work email.").pipe(z.email("Enter a valid email address, for example name@company.com.")),
});
export type NewsletterInput = z.infer<typeof newsletterSchema>;
