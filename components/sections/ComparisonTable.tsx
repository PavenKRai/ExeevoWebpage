import { Check } from "lucide-react";

type Row = { capability: string; exeevo: string; generic: string; point: string };

function CheckTile() {
  return (
    <span className="mr-3 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-[9px] bg-ink text-white" aria-hidden="true">
      <Check size={16} strokeWidth={1.8} />
    </span>
  );
}

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
  return (
    <section className="section bg-mist">
      <div className="frame">
        <h2 className="sr mb-12 max-w-[720px]">{title}</h2>

        <div className="relative hidden md:block">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-3 -top-3 left-[28%] w-[24%] rounded-panel border-[1.5px] border-transparent bg-white shadow-[0_30px_70px_-30px_rgba(7,98,200,0.45)]"
            style={{ background: "linear-gradient(#fff,#fff) padding-box, linear-gradient(180deg, var(--ex-magenta), var(--ex-blue) 55%, var(--ex-green)) border-box" }}
          />
          <table className="relative w-full table-fixed border-collapse text-left">
            <colgroup>
              <col className="w-[28%]" />
              <col className="w-[24%]" />
              <col className="w-[24%]" />
              <col className="w-[24%]" />
            </colgroup>
            <thead>
              <tr>
                {columns.map((c, i) => (
                  <th key={c} scope="col" className={`px-6 pb-5 pt-4 font-display text-[18px] font-semibold ${i === 1 ? "text-heading" : "text-muted"}`}>
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.capability} className="sr border-t border-hairline">
                  <th scope="row" className="px-6 py-6 align-top text-[16px] font-semibold text-heading">
                    {r.capability}
                  </th>
                  <td className="px-6 py-6 align-top text-[16px] font-semibold text-heading">
                    <span className="flex items-start">
                      <CheckTile />
                      <span>{r.exeevo}</span>
                    </span>
                  </td>
                  <td className="px-6 py-6 align-top text-[16px] text-muted">{r.generic}</td>
                  <td className="px-6 py-6 align-top text-[16px] text-muted">{r.point}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ul className="grid gap-5 md:hidden">
          {rows.map((r) => (
            <li key={r.capability} className="sr rounded-card bg-white p-6 shadow-[0_24px_50px_-30px_rgba(24,32,38,0.3)]">
              <h3 className="mb-4 text-[20px]">{r.capability}</h3>
              <dl className="grid gap-4">
                <div>
                  <dt className="mb-1 text-[14px] font-semibold text-muted">{columns[1]}</dt>
                  <dd className="flex items-start font-semibold text-heading">
                    <CheckTile />
                    <span>{r.exeevo}</span>
                  </dd>
                </div>
                <div>
                  <dt className="mb-1 text-[14px] font-semibold text-muted">{columns[2]}</dt>
                  <dd className="text-muted">{r.generic}</dd>
                </div>
                <div>
                  <dt className="mb-1 text-[14px] font-semibold text-muted">{columns[3]}</dt>
                  <dd className="text-muted">{r.point}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-[14px] text-muted">{footnote}</p>
      </div>
    </section>
  );
}
