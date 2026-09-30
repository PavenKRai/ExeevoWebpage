import { cn } from "./cn";

type Option = { value: string; label: string };

export function SegmentedControl({
  options,
  value,
  onChange,
  label,
}: {
  options: Option[];
  value: string;
  onChange: (v: string) => void;
  label: string;
}) {
  return (
    <div role="group" aria-label={label} className="glass-light inline-flex gap-1 rounded-full p-1.5">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
          className={cn(
            "min-h-11 min-w-28 rounded-full px-6 text-[15px] font-semibold transition-colors duration-300",
            value === o.value ? "bg-ink text-white" : "text-heading hover:bg-white/60",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
