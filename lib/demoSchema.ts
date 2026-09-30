import { z } from "zod";

export const demoSchema = z.object({
  fullName: z.string().trim().min(1, "Enter your full name."),
  email: z
    .string()
    .trim()
    .min(1, "Enter your work email.")
    .pipe(z.email("Enter a valid email address, for example name@company.com.")),
  company: z.string().trim().min(1, "Enter your company."),
  country: z.string().trim().min(1, "Enter your country."),
  teams: z.string().min(1, "Select which teams you are buying for."),
  consent: z.boolean().refine((v) => v === true, "Confirm consent so we can contact you."),
});

export type DemoInput = z.infer<typeof demoSchema>;
