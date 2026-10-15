import type { ComponentProps } from "react";

type Base = { label: string; error?: string; id: string };

function Wrap({ id, label, error, children }: Base & { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[13px] font-medium text-body">{label}</label>
      {children}
      {error && <p id={`${id}-error`} className="text-[13.5px] font-medium text-error">{error}</p>}
    </div>
  );
}

const field = "h-[52px] w-full rounded-input border border-[#D3DBE0] bg-white px-4 text-[15px] text-heading";

export function TextField({ label, error, id, ...rest }: Base & ComponentProps<"input">) {
  return (
    <Wrap id={id} label={label} error={error}>
      <input id={id} className={field} aria-invalid={error ? true : undefined} aria-describedby={error ? `${id}-error` : undefined} {...rest} />
    </Wrap>
  );
}

export function SelectField({ label, error, id, options, ...rest }: Base & { options: readonly string[] } & ComponentProps<"select">) {
  return (
    <Wrap id={id} label={label} error={error}>
      <select id={id} className={field} aria-invalid={error ? true : undefined} aria-describedby={error ? `${id}-error` : undefined} {...rest}>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </Wrap>
  );
}
