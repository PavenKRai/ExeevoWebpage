import { capabilities } from "./platform";

export const demo = {
  title: "Talk to our team",
  body: "To discuss any of our capabilities, contact your Exeevo account team, or tell us where you are and we'll come back with the right starting point.",
  consent: "I agree to receive communications from Exeevo about its products, services and events, and understand I can unsubscribe at any time.",
  success: "Request sent",
  submit: "Send request",
  sending: "Sending…",
  capabilityLabel: "Which capability are you interested in?",
  messageLabel: "Message",
  messageHint: "Optional. Tell us what you would like to cover.",
  jobTitleLabel: "Job title",
  contactEmail: "sales@exeevo.com",
  errors: {
    invalid: "Some details were not accepted. Check each field and submit again.",
    blocked: "We could not verify this request. Try again, or contact our team directly at",
    busy: "Too many requests from your connection. Try again in a few minutes, or contact our team directly at",
    down: "We could not send your request right now. Please try again shortly, or contact our team directly at",
    offline: "We could not reach the server. Check your connection and try again, or contact our team directly at",
  },
  notSure: "Not sure yet: help me choose",
} as const;

export const capabilityOptions: readonly string[] = [demo.notSure, ...capabilities.map((c) => c.name)];
