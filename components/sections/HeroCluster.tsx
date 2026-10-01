import type { CSSProperties } from "react";
import { HeroOrb } from "../glass/HeroOrb";
import { Layer } from "../scene/Layer";
import { home } from "@/content/site";
import "../../app/styles/home.css";
import "../../app/styles/home-scenes.css";

// Design-space (600x600) placement of the three floating cards.
const cards = [
  { cls: "hm-t1", style: { left: 10, top: 52, width: 262, transform: "rotateY(18deg) translateZ(40px)", "--cx": "40px", "--cy": "-380px", "--cs": 1.25, "--a": 0.12, "--b": 0.5 } },
  { cls: "hm-t2", style: { left: 356, top: 236, width: 250, transform: "rotateY(-16deg) translateZ(90px)", "--cx": "380px", "--cy": "-90px", "--cs": 1.45, "--a": 0.08, "--b": 0.46 } },
  { cls: "hm-t3 max-[639px]:hidden", style: { left: 70, top: 430, width: 278, transform: "rotateY(12deg) translateZ(20px)", "--cx": "-260px", "--cy": "300px", "--cs": 1.15, "--a": 0.16, "--b": 0.56 } },
] as const;

const rings = [
  { cls: "hm-oa", inset: 0, color: "var(--ex-magenta)", border: undefined },
  { cls: "hm-ob", inset: 30, color: "var(--ex-green)", border: undefined },
  { cls: "hm-oc", inset: -20, color: "#fff", border: "rgba(255,255,255,.14)" },
] as const;

/** The hero sphere cluster, drawn in a 600x600 design box and scaled with --hs. */
export function HeroCluster() {
  return (
    <HeroOrb className="hm-stage hm-hero-stage drift">
      <div className="hm-canvas" data-orb>
        <div className="absolute inset-0 [perspective:1400px]">
          <Layer aria-hidden="true" to={{ s: 1.5, o: 0.5 }} range={[0.1, 0.9]} className="absolute left-[100px] top-[100px] size-[400px]">
            <span className="hm-blob hm-orb-glow inset-0 opacity-50 blur-[70px]" />
          </Layer>
          <span aria-hidden="true" className="hm-orb hm-spin absolute left-[140px] top-[140px] size-[320px]" />
          <span
            aria-hidden="true"
            className="absolute left-[140px] top-[140px] size-[320px] rounded-full"
            style={{
              background:
                "radial-gradient(circle at 34% 30%, rgba(255,255,255,.55), rgba(255,255,255,0) 26%), radial-gradient(circle at 70% 78%, rgba(24,32,38,.45), rgba(24,32,38,0) 55%)",
            }}
          />
          <span
            aria-hidden="true"
            className="glass-dark absolute left-[250px] top-[210px] size-[260px] rounded-full"
            style={{ background: "linear-gradient(145deg, rgba(255,255,255,.22), rgba(255,255,255,.04))" }}
          />
          <Layer aria-hidden="true" to={{ s: 1.45, o: 0.2, rot: 50 }} range={[0.15, 0.85]} className="absolute left-[60px] top-[60px] size-[480px] [perspective:1400px]">
            {rings.map((r) => (
              <div
                key={r.cls}
                className={`hm-ring ${r.cls}`}
                style={{ inset: r.inset, color: r.color, ...(r.border ? { borderColor: r.border } : {}) } as CSSProperties}
              >
                <span className="hm-sat" />
              </div>
            ))}
          </Layer>
          {home.heroCards.map((c, i) => (
            <div
              key={c.title}
              className={`hs-card glass-dark absolute flex flex-col gap-2.5 rounded-[22px] leading-[normal] px-[22px] py-5 text-[color:var(--hm-fg)] ${cards[i].cls}`}
              style={cards[i].style as CSSProperties}
            >
              <div className="flex items-center gap-2 text-[12.5px] text-[color:var(--hm-fg-3)]">
                <span className="hm-dot" data-c={c.category} style={{ "--d": "7px" } as CSSProperties} />
                {c.tag}
              </div>
              <div className="text-[18px] font-semibold tracking-[-0.01em]">{c.title}</div>
              <div className="text-[14px] leading-[1.45] text-on-dark">{c.body}</div>
            </div>
          ))}
        </div>
      </div>
    </HeroOrb>
  );
}
