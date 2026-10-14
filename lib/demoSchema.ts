import { z } from "zod";
import { contact } from "@/content/services";

const options: readonly string[] = contact.serviceOptions;

/** The "Talk to our team" enquiry (the Get a demo buttons lead to this form). Shared by the client form and /api/demo. */
export const demoSchema = z.object({
  fullName: z.string().trim().min(1, "Enter your full name."),
  email: z
    .string()
    .trim()
    .min(1, "Enter your work email.")
    .pipe(z.email("Enter a valid email address, for example name@company.com.")),
  company: z.string().trim().min(1, "Enter your company."),
  country: z.string().trim().min(1, "Enter your country."),
  service: z
    .string()
    .min(1, "Select the service you are interested in.")
    .refine((v) => options.includes(v), "Select one of the listed services."),
  consent: z.boolean().refine((v) => v === true, "Confirm consent so we can contact you."),
});

export type DemoInput = z.infer<typeof demoSchema>;
