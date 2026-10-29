import { capabilities } from "./platform";

export const demo = {
  title: "Talk to our team",
  body: "To discuss any of our capabilities, contact your Exeevo account team, or tell us where you are and we'll come back with the right starting point.",
  consent: "Consent to marketing",
  success: "Request received. [CONFIRMATION COPY]",
  submit: "Send request",
  sending: "Sending…",
  capabilityLabel: "Which capability are you interested in?",
  messageLabel: "Message",
  messageHint: "Optional. Tell us what you would like to cover.",
  jobTitleLabel: "Job title",
  notSure: "Not sure yet: help me choose",
} as const;

export const capabilityOptions: readonly string[] = [demo.notSure, ...capabilities.map((c) => c.name)];
