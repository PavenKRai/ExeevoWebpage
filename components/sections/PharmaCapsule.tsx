export function PharmaCapsule() {
  return (
    <div aria-hidden="true" className="relative mx-auto h-[220px] w-[360px] max-w-full" style={{ perspective: "1200px" }}>
      <div className="float absolute inset-0 flex items-center justify-center">
        <div className="relative flex h-[120px] w-[320px] max-w-full overflow-hidden rounded-full shadow-[0_40px_70px_-30px_rgba(7,98,200,0.55)]" style={{ transform: "rotate(-32deg) rotateY(-12deg)", transformStyle: "preserve-3d" }}>
          <div className="relative w-1/2" style={{ background: "linear-gradient(120deg, var(--ex-magenta), var(--ex-blue))" }}>
            <span className="absolute left-[14%] top-[14%] h-[22%] w-[70%] rounded-full bg-white/60 blur-[2px]" />
          </div>
          <div className="glass-light relative flex w-1/2 items-center justify-center gap-3 !rounded-none">
            <span className="h-4 w-4 rounded-full bg-magenta" />
            <span className="h-5 w-5 rounded-full bg-brand-blue" />
            <span className="h-4 w-4 rounded-full bg-brand-green" />
            <span className="absolute left-[10%] top-[14%] h-[18%] w-[60%] rounded-full bg-white/70 blur-[2px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
