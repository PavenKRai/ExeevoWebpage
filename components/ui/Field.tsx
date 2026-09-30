import type { ComponentProps } from "react";
import { cn } from "./cn";

type Props = { label: string; error?: string; id: string } & ComponentProps<"input">;

export function Field({ label, error, id, className, ...rest }: Props) {
  const errId = `${id}-error`;
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-[15px] font-semibold text-heading">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errId : undefined}
        className={cn("h-[52px] rounded-input border border-slate/20 bg-white/70 px-4 text-[16px] text-heading", className)}
        {...rest}
      />
      {error && (
        <p id={errId} className="text-[14px] font-medium text-error">
          {error}
        </p>
      )}
    </div>
  );
}
