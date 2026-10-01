import Image from "next/image";
import { Check } from "lucide-react";
import { Layer } from "@/components/scene/Layer";
import { Scene } from "@/components/scene/Scene";

type Row = { capability: string; exeevo: string; generic: string; point: string };

function CheckTile({ size = 24, pop }: { size?: number; pop?: [number, number] }) {
  return (
    <Layer
      as="span"
      from={{ o: 0, s: 0 }}
      range={pop ?? [0, 0.001]}
      className="flex shrink-0 items-center justify-center rounded-lg bg-ink text-white"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <Check size={13} strokeWidth={2.6} />
    </Layer>
  );
}

/** Row i lands inside [rowStart, rowStart + 0.14] of the pinned interval. */
const rowStart = (n: number) => 0.2 + n * 0.12;

export function ComparisonTable({
  title,
  columns,
  rows,
  footnote,
}: {
  title: string;
  columns: readonly string[];
  rows: readonly Row[];
  footnote: string;
}) {
  const th = "px-7 text-left text-[15px] font-medium text-muted";
  return (
    <Scene id="why-compare" pin={80} stageClassName="bg-mist">
      <div className="py-16 lg:h-[900px] lg:pb-0 lg:pt-[110px] pinned:flex pinned:h-full pinned:flex-col pinned:justify-center pinned:py-0 pinned:pb-3 pinned:pt-[clamp(84px,12svh,110px)]">
        <div className="frame">
          <Layer from={{ y: 24 }} range={[0, 0.16]}>
            <h2 className="[text-wrap:wrap] text-[clamp(32px,4vw,46px)] leading-[1.08] tracking-[-0.03em]">
              {title}
            </h2>
          </Layer>

          <Layer
            from={{ o: 0, y: 50 }}
            range={[0.04, 0.22]}
            className="relative mt-[70px] hidden pb-2.5 md:block pinned:mt-[clamp(24px,5svh,70px)]"
          >
            <Layer
              aria-hidden="true"
              from={{ o: 0.4 }}
              range={[0.2, 0.86]}
              className="pointer-events-none absolute -top-[18px] bottom-[-28px] left-[30.47%] w-[25.78%] origin-top rounded-[28px] border-2 border-transparent shadow-[0_40px_80px_-40px_rgba(7,98,200,0.45)]"
              style={
                {
                  "--s0": "1 0.14",
                  background:
                    "linear-gradient(#fff,#fff) padding-box, linear-gradient(170deg, var(--ex-magenta), var(--ex-blue) 50%, var(--ex-green)) border-box",
                } as React.CSSProperties
              }
            />
            <table className="relative w-full table-fixed border-collapse text-[15px]">
              <colgroup>
                <col style={{ width: "30.47%" }} />
                <col style={{ width: "25.78%" }} />
                <col style={{ width: "21.875%" }} />
                <col style={{ width: "21.875%" }} />
              </colgroup>
              <thead>
                <tr className="h-[70px] pinned:h-[clamp(52px,7.5svh,70px)]">
                  <th scope="col" className={`${th} !px-6`}>
                    {columns[0]}
                  </th>
                  <th scope="col" className="px-8 text-left">
                    <span className="flex items-center gap-2.5">
                      <Image src="/brand/exeevo-icon.png" alt="" width={26} height={26} />
                      <Image
                        src="/brand/exeevo-wordmark-slate.png"
                        alt={columns[1]}
                        width={83}
                        height={14}
                        style={{ width: 83, height: "auto" }}
                      />
                    </span>
                  </th>
                  <th scope="col" className={th}>
                    {columns[2]}
                  </th>
                  <th scope="col" className={th}>
                    {columns[3]}
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, n) => (
                  <Layer
                    as="tr"
                    key={r.capability}
                    from={{ o: 0, y: 34 }}
                    range={[rowStart(n), rowStart(n) + 0.1]}
                    className="h-[88px] border-t border-hairline pinned:h-[clamp(56px,9svh,88px)]"
                  >
                    <th
                      scope="row"
                      className="px-6 text-left font-[550] leading-[1.35] text-heading"
                    >
                      {r.capability}
                    </th>
                    <td className="px-8 font-[550] text-heading">
                      <span className="flex items-center gap-2.5">
                        <CheckTile pop={[rowStart(n) + 0.06, rowStart(n) + 0.15]} />
                        {r.exeevo}
                      </span>
                    </td>
                    <Layer
                      as="td"
                      from={{ o: 0.35 }}
                      range={[rowStart(n) + 0.04, rowStart(n) + 0.2]}
                      className="px-7 leading-[1.4] text-muted"
                    >
                      {r.generic}
                    </Layer>
                    <Layer
                      as="td"
                      from={{ o: 0.35 }}
                      range={[rowStart(n) + 0.04, rowStart(n) + 0.2]}
                      className="px-7 leading-[1.4] text-muted"
                    >
                      {r.point}
                    </Layer>
                  </Layer>
                ))}
              </tbody>
            </table>
          </Layer>

          <ul className="mt-10 grid gap-5 md:hidden">
            {rows.map((r) => (
              <li
                key={r.capability}
                className="sr rounded-card bg-white p-6 shadow-[0_24px_50px_-30px_rgba(24,32,38,0.3)]"
              >
                <h3 className="mb-4 text-[20px]">{r.capability}</h3>
                <dl className="grid gap-4">
                  <div>
                    <dt className="mb-1 text-[14px] font-medium text-muted">{columns[1]}</dt>
                    <dd className="flex items-start gap-2.5 font-[550] text-heading">
                      <CheckTile />
                      <span>{r.exeevo}</span>
                    </dd>
                  </div>
                  <div>
                    <dt className="mb-1 text-[14px] font-medium text-muted">{columns[2]}</dt>
                    <dd className="text-muted">{r.generic}</dd>
                  </div>
                  <div>
                    <dt className="mb-1 text-[14px] font-medium text-muted">{columns[3]}</dt>
                    <dd className="text-muted">{r.point}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>

          <Layer from={{ o: 0, y: 12 }} range={[0.86, 1]}>
            <p className="mt-10 max-w-[760px] text-[13px] text-muted md:mt-[50px] pinned:mt-[clamp(30px,5.5svh,50px)]">
              {footnote}
            </p>
          </Layer>
        </div>
      </div>
    </Scene>
  );
}
