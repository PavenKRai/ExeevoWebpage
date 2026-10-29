import { z } from "zod";
import { capabilityOptions } from "@/content/demo";

/** The "Talk to our team" enquiry (the Get a demo buttons lead to this form on Home). Shared by the client form and /api/demo. */
export const demoSchema = z.object({
  fullName: z.string().trim().min(1, "Enter your full name.").max(120, "Use 120 characters or fewer."),
  email: z
    .string()
    .trim()
    .min(1, "Enter your work email.")
    .max(200, "Use 200 characters or fewer.")
    .pipe(z.email("Enter a valid email address, for example name@company.com.")),
  jobTitle: z.string().trim().max(120, "Use 120 characters or fewer."),
  company: z.string().trim().min(1, "Enter your company.").max(160, "Use 160 characters or fewer."),
  country: z.string().trim().min(1, "Enter your country.").max(100, "Use 100 characters or fewer."),
  service: z
    .string()
    .min(1, "Select the capability you are interested in.")
    .refine((v) => capabilityOptions.includes(v), "Select one of the listed capabilities."),
  message: z.string().trim().max(2000, "Use 2000 characters or fewer."),
  consent: z.boolean(), // marketing opt-in: optional, sent to the flow as true or false
});

export type DemoInput = z.infer<typeof demoSchema>;
