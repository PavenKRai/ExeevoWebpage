"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { demoSchema, type DemoInput } from "@/lib/demoSchema";
import { Button } from "../ui/Button";
import { SelectField, TextField } from "./DemoFields";

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
    defaultValues: { fullName: "", email: "", company: "", country: "", teams: copy.teams[0] ?? "", consent: false },
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
      <div role="status" className="grid min-h-[400px] content-center gap-3 text-white">
        <p className="font-display text-[28px] font-semibold leading-tight tracking-tight">{copy.success}</p>
      </div>
    );
  }

  return (
    <form aria-label="Request a demo" noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[18px] lg:min-h-[400px]">
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField id="demo-name" label="Full name" autoComplete="name" error={errors.fullName?.message} {...register("fullName")} />
        <TextField id="demo-email" label="Work email" type="email" autoComplete="email" error={errors.email?.message} {...register("email")} />
        <TextField id="demo-company" label="Company" autoComplete="organization" error={errors.company?.message} {...register("company")} />
        <TextField id="demo-country" label="Country" autoComplete="country-name" error={errors.country?.message} {...register("country")} />
      </div>
      <SelectField id="demo-teams" label="Which teams are you buying for?" options={copy.teams} error={errors.teams?.message} {...register("teams")} />
      {failure && (
        <p role="alert" className="rounded-input border border-error-on-dark bg-white/[0.07] p-4 text-[15px] font-medium text-error-on-dark">
          {failure}
        </p>
      )}
      <div className="mt-auto flex flex-col gap-4 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="grid gap-1">
          <label htmlFor="demo-consent" className="flex min-h-11 max-w-[300px] cursor-pointer items-center gap-2.5 text-[13px] leading-[1.45] text-on-dark">
            <input
              id="demo-consent"
              type="checkbox"
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={errors.consent ? "demo-consent-error" : undefined}
              className="size-[18px] shrink-0 accent-white"
              {...register("consent")}
            />
            <span>{copy.consent}</span>
          </label>
          {errors.consent && (
            <p id="demo-consent-error" className="text-[14px] font-medium text-error-on-dark">
              {errors.consent.message}
            </p>
          )}
        </div>
        <Button type="submit" disabled={isSubmitting} className="ctad min-h-[54px]! px-7! disabled:opacity-70">
          Request a demo
        </Button>
      </div>
    </form>
  );
}
