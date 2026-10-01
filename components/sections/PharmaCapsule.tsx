import "./scene-choreo.css";

const ORB = "radial-gradient(circle at 32% 28%, rgba(255,255,255,.6), rgba(255,255,255,0) 24%), var(--ex-orb)";
const blob = "linear-gradient(135deg, var(--ex-magenta), var(--ex-blue))";
const hi = "radial-gradient(circle at 30% 25%, rgba(255,255,255,.55), rgba(255,255,255,0) 35%)";

/** Scroll-scrubbed (see scene-choreo.css): turns to its rest pose, spins about its axis, halves part to show the dots. */
export function PharmaCapsule() {
  return (
    <div aria-hidden="true" className="relative h-[520px] w-[520px]" style={{ perspective: "1200px" }}>
      <div className="cz cz-glow absolute left-[120px] top-[140px] h-[260px] w-[300px] rounded-full opacity-55 blur-[70px]" style={{ background: ORB }} />
      <div className="float absolute left-[70px] top-[200px] h-[150px] w-[400px]" style={{ transform: "rotateZ(-32deg) rotateY(-18deg)", transformStyle: "preserve-3d" }}>
        <div className="cz cz-turn absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
          <div className="cz cz-spin absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
            <div
              className="cz cz-halfl absolute left-0 top-0 h-[150px] w-[200px] rounded-l-[75px]"
              style={{ background: `${hi}, ${blob}`, boxShadow: "0 30px 60px -20px rgba(223,25,149,.5)" }}
            />
            <div className="cz cz-halfr glass-light absolute left-[200px] top-0 h-[150px] w-[200px] rounded-r-[75px] !border-l-0" />
            <div className="cz cz-dots absolute inset-0">
              <span className="absolute left-[236px] top-[44px] h-[18px] w-[18px] rounded-full bg-brand-green opacity-80" />
              <span className="absolute left-[284px] top-[80px] h-3 w-3 rounded-full bg-brand-blue opacity-70" />
              <span className="absolute left-[318px] top-10 h-2.5 w-2.5 rounded-full bg-magenta opacity-70" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
