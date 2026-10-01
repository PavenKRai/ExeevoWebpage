import { Layer, Parallax, SceneProgress } from "@/components/scene/Layer";
import { Scene } from "@/components/scene/Scene";

export const metadata = { title: "Scene proof", robots: { index: false } };

export default function SceneProof() {
  return (
    <main>
      <div className="h-[50vh] bg-mist" />
      <Scene pin={200} stageClassName="bg-ink on-dark">
        <Parallax depth={120} className="absolute left-[10%] top-[20%] size-60 rounded-full bg-brand-blue/40 blur-3xl" />
        <div className="frame flex h-full items-center">
          <Layer from={{ o: 0, y: 120 }} range={[0, 0.4]} className="text-5xl text-white" data-testid="a">
            First idea
          </Layer>
          <Layer from={{ o: 0, x: 200, s: 0.8 }} range={[0.5, 0.9]} className="ml-10 text-5xl text-white" data-testid="b">
            Second idea
          </Layer>
        </div>
        <div className="absolute inset-x-0 bottom-0"><SceneProgress /></div>
      </Scene>
      <div className="h-[80vh] bg-frost" />
    </main>
  );
}
