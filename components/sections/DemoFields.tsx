import type { ComponentProps } from "react";

type Base = { label: string; error?: string; id: string };

function Wrap({ id, label, error, children }: Base & { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[14px] font-medium leading-[1.2] text-on-dark">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-[14px] font-medium text-error-on-dark">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextField({ label, error, id, ...rest }: Base & ComponentProps<"input">) {
  return (
    <Wrap id={id} label={label} error={error}>
      <input id={id} className="demo-field" aria-invalid={error ? true : undefined} aria-describedby={error ? `${id}-error` : undefined} {...rest} />
    </Wrap>
  );
}

export function SelectField({ label, error, id, options, ...rest }: Base & { options: readonly string[] } & ComponentProps<"select">) {
  return (
    <Wrap id={id} label={label} error={error}>
      <select id={id} className="demo-field" aria-invalid={error ? true : undefined} aria-describedby={error ? `${id}-error` : undefined} {...rest}>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </Wrap>
  );
}
