"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsletter as copy } from "@/content/resources/config";
import { newsletterSchema, type NewsletterInput } from "@/lib/newsletterSchema";

/** "Get new resources in your inbox": light glass block on a mist ground ending every Resources page. The description line shows only when copy is provided. */
export function NewsletterBlock() {
  const [done, setDone] = useState(false);
  const [failure, setFailure] = useState<string | null>(null);
  const [startedAt] = useState(() => Date.now());
  const [trap, setTrap] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<NewsletterInput>({ resolver: zodResolver(newsletterSchema), defaultValues: { email: "" } });

  async function onSubmit(values: NewsletterInput) {
    setFailure(null);
    try {
      const res = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...values, startedAt, website: trap }) });
      if (res.ok) return setDone(true);
      setFailure(res.status === 400 ? "That email address was not accepted. Check it and try again." : "Subscriptions are unavailable right now. Try again shortly.");
    } catch {
      setFailure("We could not reach the server. Check your connection and try again.");
    }
  }

  return (
    <section aria-labelledby="newsletter-title" className="relative overflow-hidden bg-mist py-[100px]">
      <div className="aura left-[30%] top-[20%] h-80 w-[520px] bg-brand-blue opacity-[.16] max-lg:hidden" aria-hidden="true" />
      <div className="aura left-[15%] top-[35%] h-[280px] w-[360px] bg-brand-green opacity-[.12] max-lg:hidden" aria-hidden="true" />
      <div className="wrap">
        <div className="glass sr grid items-center gap-5 rounded-[32px] p-8 lg:grid-cols-12 lg:gap-x-6 lg:p-11">
          <div className="flex flex-col gap-3 lg:col-span-6">
            <h2 id="newsletter-title" className="h2 !text-[38px]">Get new resources <b>in your inbox</b></h2>
            {copy.body && <p className="body-text !text-[15.5px]">{copy.body}</p>}
          </div>
          <div className="flex flex-col gap-2.5 lg:col-span-5 lg:col-start-8">
            {done ? (
              <p role="status" className="text-[16px] font-medium text-heading">{copy.success}</p>
            ) : (
              <form noValidate aria-label="Subscribe to new resources" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2.5">
                <input type="text" name="website" value={trap} onChange={(e) => setTrap(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp" />
                <label htmlFor="nl-email" className="text-[13px] font-medium text-body">{copy.field}</label>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    id="nl-email"
                    type="email"
                    autoComplete="email"
                    placeholder="name@company.com"
                    aria-invalid={errors.email ? true : undefined}
                    aria-describedby={errors.email || failure ? "nl-error" : undefined}
                    className="h-[50px] min-w-0 flex-1 rounded-full border border-[#D3DBE0] bg-white px-4 text-[15px] text-heading"
                    {...register("email")}
                  />
                  <button type="submit" disabled={isSubmitting} className="btn btn-ink disabled:opacity-70">{copy.cta}</button>
                </div>
              </form>
            )}
            {(errors.email || failure) && <p id="nl-error" role="alert" className="text-[14px] font-medium text-error">{errors.email?.message ?? failure}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
