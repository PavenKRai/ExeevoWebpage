"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsletterSchema, type NewsletterInput } from "@/lib/newsletterSchema";
import "../sections/demo-section.css";

type Copy = { title: string; body: string; field: string; cta: string; success: string };

/** "Get new resources in your inbox": dark glass panel over a sphere, ending every Resources page. */
export function NewsletterBlock({ copy }: { copy: Copy }) {
  const [done, setDone] = useState(false);
  const [failure, setFailure] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<NewsletterInput>({ resolver: zodResolver(newsletterSchema), defaultValues: { email: "" } });

  async function onSubmit(values: NewsletterInput) {
    setFailure(null);
    try {
      const res = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      if (res.ok) return setDone(true);
      setFailure(res.status === 400 ? "That email address was not accepted. Check it and try again." : "Subscriptions are unavailable right now. Try again shortly.");
    } catch {
      setFailure("We could not reach the server. Check your connection and try again.");
    }
  }

  return (
    <section aria-labelledby="newsletter-title" className="on-dark sr relative mt-20 overflow-hidden rounded-[36px] bg-ink p-8 lg:mt-[120px] lg:flex lg:items-center lg:justify-between lg:gap-10 lg:p-16">
      <div aria-hidden="true" className="demo-orb pointer-events-none absolute -right-24 -top-32 size-[320px] opacity-90 lg:-right-[90px] lg:-top-[120px] lg:size-[420px]" />
      <div aria-hidden="true" className="glass-dark pointer-events-none absolute -right-10 -top-12 size-[240px] rounded-full lg:-right-5 lg:-top-10 lg:size-[320px]" />
      <div className="relative flex max-w-[520px] flex-col gap-3">
        <h2 id="newsletter-title" className="text-[clamp(30px,3.4vw,42px)] leading-[1.08] tracking-[-0.03em]">{copy.title}</h2>
        <p className="text-[16px] leading-[1.55] text-on-dark">{copy.body}</p>
      </div>
      <div className="glass-dark relative mt-8 rounded-[20px] p-2 lg:mr-[180px] lg:mt-0 lg:w-[520px]">
        {done ? (
          <p role="status" className="flex min-h-[52px] items-center px-4 text-[16px] font-medium text-white">{copy.success}</p>
        ) : (
          <form noValidate aria-label="Subscribe to new resources" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 sm:flex-row">
            <label htmlFor="nl-email" className="sr-only">{copy.field}</label>
            <input
              id="nl-email"
              type="email"
              autoComplete="email"
              placeholder={copy.field}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email || failure ? "nl-error" : undefined}
              className="demo-field flex-1"
              {...register("email")}
            />
            <button type="submit" disabled={isSubmitting} className="btn-primary h-[52px] shrink-0 rounded-[15px] px-6 text-[15px] font-semibold disabled:opacity-70">
              {copy.cta}
            </button>
          </form>
        )}
        {(errors.email || failure) && (
          <p id="nl-error" role="alert" className="px-2 pb-1 pt-2 text-[14px] font-medium text-error-on-dark">{errors.email?.message ?? failure}</p>
        )}
      </div>
    </section>
  );
}
