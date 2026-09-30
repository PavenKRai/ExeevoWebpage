"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { demoSchema, type DemoInput } from "@/lib/demoSchema";
import { Button } from "../ui/Button";
import { Field } from "../ui/Field";
import { Select } from "../ui/Select";

type Copy = { consent: string; success: string; teams: readonly string[] };

export function DemoForm({ copy }: { copy: Copy }) {
  const [done, setDone] = useState(false);
  const [failure, setFailure] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DemoInput>({
    resolver: zodResolver(demoSchema),
    defaultValues: { fullName: "", email: "", company: "", country: "", teams: "", consent: false },
  });

  async function onSubmit(values: DemoInput) {
    setFailure(null);
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.ok) return setDone(true);
      if (res.status === 400) return setFailure("Some details were not accepted. Check each field and submit again.");
      setFailure("The request service is unavailable right now. Try again shortly, or contact our team directly.");
    } catch {
      setFailure("We could not reach the server. Check your connection and submit again.");
    }
  }

  if (done) {
    return (
      <div role="status" className="grid min-h-[320px] content-center gap-3 text-heading">
        <p className="font-display text-[28px] font-semibold leading-tight tracking-tight">{copy.success}</p>
      </div>
    );
  }

  return (
    <form aria-label="Request a demo" noValidate onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
      <Field id="demo-name" label="Full name" autoComplete="name" error={errors.fullName?.message} {...register("fullName")} />
      <Field id="demo-email" label="Work email" type="email" autoComplete="email" error={errors.email?.message} {...register("email")} />
      <Field id="demo-company" label="Company" autoComplete="organization" error={errors.company?.message} {...register("company")} />
      <Field id="demo-country" label="Country" autoComplete="country-name" error={errors.country?.message} {...register("country")} />
      <Select
        id="demo-teams"
        label="Which teams are you buying for?"
        options={copy.teams}
        error={errors.teams?.message}
        {...register("teams")}
      />
      <div className="grid gap-2">
        <label htmlFor="demo-consent" className="flex min-h-11 cursor-pointer items-start gap-3 text-[15px] text-body">
          <input
            id="demo-consent"
            type="checkbox"
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? "demo-consent-error" : undefined}
            className="mt-0.5 size-[22px] shrink-0 accent-ink"
            {...register("consent")}
          />
          <span>{copy.consent}</span>
        </label>
        {errors.consent && (
          <p id="demo-consent-error" className="text-[14px] font-medium text-error">
            {errors.consent.message}
          </p>
        )}
      </div>
      {failure && (
        <p role="alert" className="rounded-input border border-[#B3261E] bg-white/80 p-4 text-[15px] font-medium text-error">
          {failure}
        </p>
      )}
      <Button type="submit" disabled={isSubmitting} className="w-full disabled:opacity-70">
        Request a demo
      </Button>
    </form>
  );
}
