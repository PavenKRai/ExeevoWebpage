import "./scene-choreo.css";

const ORB = "radial-gradient(circle at 32% 28%, rgba(255,255,255,.6), rgba(255,255,255,0) 24%), var(--ex-orb)";

/** Scroll-scrubbed (see scene-choreo.css): turns in Y through its -24deg rest pose while the orb window brightens. */
export function MedtechDevice() {
  return (
    <div aria-hidden="true" className="relative h-[520px] w-[520px]" style={{ perspective: "1200px" }}>
      <div className="cz cz-glow absolute left-[130px] top-[120px] h-[300px] w-[280px] rounded-full opacity-55 blur-[70px]" style={{ background: ORB }} />
      <div className="float absolute left-[140px] top-[80px] h-[380px] w-[250px]" style={{ transform: "rotateY(-24deg) rotateX(8deg)", transformStyle: "preserve-3d" }}>
        <div className="cz cz-turn absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
          <div className="glass-light absolute inset-0 rounded-[44px]" />
          <div className="cz cz-win absolute left-[45px] top-[46px] h-40 w-40 rounded-full">
            <div className="size-full rounded-full" style={{ background: ORB, animation: "spin 40s linear infinite" }} />
            <div className="absolute inset-0 rounded-full" style={{ boxShadow: "inset 0 0 0 10px rgba(255,255,255,.7)" }} />
          </div>
          <span className="absolute left-[45px] top-[250px] h-2.5 w-40 rounded-[5px] bg-body/20" />
          <span className="absolute left-[45px] top-[274px] h-2.5 w-[110px] rounded-[5px] bg-body/10" />
          <span className="absolute left-[45px] top-[316px] h-6 w-12 rounded-xl bg-ink" />
        </div>
      </div>
    </div>
  );
}
