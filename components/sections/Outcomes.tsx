import { home } from "@/content/site";

export function Outcomes() {
  return (
    <section className="section bg-frost">
      <div className="frame">
        <ul className="border-t border-hairline">
          {home.outcomes.map((o) => (
            <li key={o.statement} className="sr grid gap-4 border-b border-hairline py-12 md:grid-cols-[6fr_5fr] md:gap-16 md:py-16">
              <h3>{o.statement}</h3>
              <p className="body-lg text-body">{o.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
