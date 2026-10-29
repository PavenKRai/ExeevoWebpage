import type { ComponentProps } from "react";

type Base = { label: string; error?: string; id: string; required?: boolean };

function Wrap({ id, label, error, required, children }: Base & { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[13px] font-medium text-body">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-[13.5px] font-medium text-error">
          {error}
        </p>
      )}
    </div>
  );
}

const field =
  "h-[52px] w-full rounded-input border border-[#D3DBE0] bg-white px-4 text-[15px] text-heading";

export function TextField({ label, error, id, required, ...rest }: Base & ComponentProps<"input">) {
  return (
    <Wrap id={id} label={label} error={error} required={required}>
      <input
        id={id}
        className={field}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...rest}
      />
    </Wrap>
  );
}

export function SelectField({
  label,
  error,
  id,
  options,
  ...rest
}: Base & { options: readonly string[] } & ComponentProps<"select">) {
  return (
    <Wrap id={id} label={label} error={error}>
      <select
        id={id}
        className={field}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...rest}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </Wrap>
  );
}

export function TextAreaField({
  label,
  error,
  id,
  hint,
  ...rest
}: Base & { hint?: string } & ComponentProps<"textarea">) {
  const described =
    [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") ||
    undefined;
  return (
    <Wrap id={id} label={label} error={error}>
      <textarea
        id={id}
        rows={4}
        className="w-full resize-y rounded-input border border-[#D3DBE0] bg-white px-4 py-3 text-[15px] text-heading"
        aria-invalid={error ? true : undefined}
        aria-describedby={described}
        {...rest}
      />
      {hint && (
        <p id={`${id}-hint`} className="text-[13px] text-muted">
          {hint}
        </p>
      )}
    </Wrap>
  );
}
