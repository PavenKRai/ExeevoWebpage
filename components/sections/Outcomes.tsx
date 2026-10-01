import { home } from "@/content/site";

export function Outcomes() {
  return (
    <section className="bg-frost px-5 py-16 sm:px-8 lg:pb-[95px] lg:pt-[110px] min-[1440px]:px-20">
      <ul className="mx-auto max-w-[1280px] border-b border-hairline">
        {home.outcomes.map((o) => (
          <li key={o.statement} className="grid gap-4 border-t border-hairline py-[42px] lg:grid-cols-12 lg:gap-x-6">
            <h3 className="srl text-[clamp(24px,1.4vw+12px,28px)] lg:col-span-6">{o.statement}</h3>
            <p className="srr text-[18px] font-[350] leading-[1.6] text-muted lg:col-span-5 lg:col-start-8">{o.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
