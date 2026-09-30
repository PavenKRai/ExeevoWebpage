import { Orb } from "@/components/glass/Orb";

export function MedtechDevice() {
  return (
    <div aria-hidden="true" className="relative mx-auto h-[300px] w-[240px]" style={{ perspective: "1200px" }}>
      <div className="float absolute inset-0">
        <div className="glass-light flex h-full w-full flex-col items-center gap-4 rounded-panel p-6" style={{ transform: "rotateY(-24deg)", transformStyle: "preserve-3d" }}>
          <div className="flex h-[120px] w-[120px] items-center justify-center rounded-full border border-white/80 bg-ink/90 p-2">
            <Orb size={100} />
          </div>
          <span className="h-3 w-3/4 rounded-full bg-heading/20" />
          <span className="h-3 w-1/2 rounded-full bg-heading/15" />
          <span className="mt-auto h-9 w-20 rounded-chip bg-ink" />
        </div>
      </div>
    </div>
  );
}
