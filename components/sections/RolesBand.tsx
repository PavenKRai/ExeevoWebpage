import { Button } from "@/components/ui/Button";
import { Glow } from "@/components/glass/Glow";

export function RolesBand({ text, cta, href }: { text: string; cta: string; href: string }) {
  return (
    <section className="on-dark section relative overflow-hidden bg-ink">
      <Glow color="blue" className="-right-24 -top-24 size-[420px]" />
      <div className="frame grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-center lg:gap-16">
        <p className="sr lead text-white">{text}</p>
        <div className="sr d1 lg:justify-self-end">
          <Button href={href} size="hero">
            {cta}
          </Button>
        </div>
      </div>
    </section>
  );
}
