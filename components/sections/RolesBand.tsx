import { Button } from "@/components/ui/Button";
import { Layer } from "@/components/scene/Layer";
import { Scene } from "@/components/scene/Scene";

/** Split the sentence into three balanced phrases at its commas (copy is unchanged, only wrapped). */
function phrases(text: string, count = 3) {
  const parts = text.split(/(?<=,)\s+/);
  const target = text.length / count;
  const out: string[] = [];
  let cur = "";
  for (const p of parts) {
    if (cur && out.length < count - 1 && cur.length + p.length / 2 > target) {
      out.push(cur);
      cur = p;
    } else cur = cur ? `${cur} ${p}` : p;
  }
  out.push(cur);
  return out;
}

/** Scene B: the dark band pinned full-bleed; the sentence reveals phrase by phrase. */
export function RolesBand({ text, cta, href }: { text: string; cta: string; href: string }) {
  const lines = phrases(text);
  const step = 0.22;
  return (
    <Scene
      fit
      id="platform-roles-band"
      aria-label="Solutions by role"
      pin={45}
      stageClassName="lab-grid bg-mist pb-16 xl:pb-20 pinned:flex pinned:items-stretch pinned:bg-ink pinned:bg-none pinned:pb-0"
    >
      <div className="frame relative flex pinned:max-w-none pinned:p-0">
        <div className="on-dark relative flex min-h-[140px] w-full flex-col items-start justify-between gap-6 overflow-hidden rounded-[30px] bg-ink px-6 py-8 md:flex-row md:items-center md:px-10 pinned:min-h-full pinned:flex-col pinned:items-start pinned:justify-center pinned:gap-10 pinned:rounded-none pinned:px-[var(--ex-gutter)] pinned:py-0 pinned:md:flex-col pinned:md:items-start">
          <Layer
            aria-hidden="true"
            from={{ x: "-70vw", y: "14vh", s: 0.7, o: 0.3 }}
            range={[0, 1]}
            className="pointer-events-none absolute -right-10 -top-20 size-[300px] rounded-full opacity-50 blur-[60px] pinned:size-[460px]"
            style={{ background: "var(--ex-orb)" }}
          />
          <p className="relative max-w-[760px] text-[18px] leading-[1.5] text-white/[.86] pinned:max-w-[1120px] pinned:text-[clamp(22px,2.5vw,36px)] pinned:font-[350] pinned:leading-[1.25] pinned:tracking-[-0.02em]">
            {lines.map((l, i) => (
              <Layer
                key={l}
                as="span"
                from={{ o: 0, y: 48, blur: 6 }}
                range={[i * step, i * step + 0.25]}
                className="inline pinned:block"
              >
                {l}{" "}
              </Layer>
            ))}
          </p>
          <Layer from={{ o: 0, y: 36 }} range={[lines.length * step, lines.length * step + 0.2]} className="relative shrink-0">
            <Button href={href} size="hero">
              {cta}
            </Button>
          </Layer>
        </div>
      </div>
    </Scene>
  );
}
