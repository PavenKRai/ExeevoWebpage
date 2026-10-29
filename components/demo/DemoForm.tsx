"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { capabilityOptions, demo } from "@/content/demo";
import { demoSchema, type DemoInput } from "@/lib/demoSchema";
import { Button } from "../ui/Button";
import { SelectField, TextAreaField, TextField } from "./DemoFields";

export function DemoForm() {
  const [done, setDone] = useState(false);
  const [failure, setFailure] = useState<string | null>(null);
  const [startedAt] = useState(() => Date.now());
  const [trap, setTrap] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DemoInput>({
    resolver: zodResolver(demoSchema),
    defaultValues: { fullName: "", email: "", jobTitle: "", company: "", country: "", service: capabilityOptions[0], message: "", consent: false },
  });

  async function onSubmit(values: DemoInput) {
    setFailure(null);
    try {
      const body = JSON.stringify({ ...values, startedAt, website: trap });
      const res = await fetch("/api/demo", { method: "POST", headers: { "Content-Type": "application/json" }, body });
      if (res.ok) return setDone(true);
      if (res.status === 400) return setFailure("Some details were not accepted. Check each field and submit again.");
      if (res.status === 429) return setFailure("Too many requests from your connection. Try again in a few minutes.");
      setFailure("The request service is unavailable right now. Try again shortly, or contact our team directly.");
    } catch {
      setFailure("We could not reach the server. Check your connection and submit again.");
    }
  }

  if (done) {
    return (
      <div role="status" className="grid min-h-[320px] content-center gap-3 text-heading">
        <p className="text-[28px] font-light leading-tight tracking-[-0.02em]">{demo.success}</p>
      </div>
    );
  }

  return (
    <form aria-label={demo.title} noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[18px]">
      <input type="text" name="website" value={trap} onChange={(e) => setTrap(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" className="hp" />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField id="demo-name" label="Full name" autoComplete="name" error={errors.fullName?.message} {...register("fullName")} />
        <TextField id="demo-email" label="Work email" type="email" autoComplete="email" error={errors.email?.message} {...register("email")} />
        <TextField id="demo-job" label={demo.jobTitleLabel} autoComplete="organization-title" error={errors.jobTitle?.message} {...register("jobTitle")} />
        <TextField id="demo-company" label="Company" autoComplete="organization" error={errors.company?.message} {...register("company")} />
        <div className="sm:col-span-2">
          <TextField id="demo-country" label="Country" autoComplete="country-name" error={errors.country?.message} {...register("country")} />
        </div>
      </div>
      <SelectField id="demo-service" label={demo.capabilityLabel} options={capabilityOptions} error={errors.service?.message} {...register("service")} />
      <TextAreaField id="demo-message" label={demo.messageLabel} hint={demo.messageHint} error={errors.message?.message} {...register("message")} />
      {failure && (
        <p role="alert" className="rounded-input border border-error bg-white p-4 text-[15px] font-medium text-error">
          {failure}
        </p>
      )}
      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="grid gap-1">
          <label htmlFor="demo-consent" className="flex min-h-11 max-w-[300px] cursor-pointer items-center gap-2.5 text-[13px] leading-[1.45] text-muted">
            <input
              id="demo-consent"
              type="checkbox"
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={errors.consent ? "demo-consent-error" : undefined}
              className="size-[18px] shrink-0 accent-[#1D262D]"
              {...register("consent")}
            />
            <span>{demo.consent}</span>
          </label>
          {errors.consent && (
            <p id="demo-consent-error" className="text-[13.5px] font-medium text-error">
              {errors.consent.message}
            </p>
          )}
        </div>
        <Button type="submit" disabled={isSubmitting} className="disabled:opacity-70">
          {isSubmitting ? demo.sending : demo.submit}
        </Button>
      </div>
    </form>
  );
}
