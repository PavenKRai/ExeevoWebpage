import { gettingStarted, servicesPage } from "@/content/services";

/** "Two paths to go live" (Core / Enterprise) at the top of the Implement phase. */
export function PathsBlock() {
  return (
    <div className="sr grid gap-4 md:grid-cols-2">
      <div className="flex flex-col gap-2 pb-2 md:col-span-2">
        <h3 className="h3 !text-[26px] !font-normal">{servicesPage.paths.title}</h3>
        <p className="body-text">{servicesPage.paths.body}</p>
      </div>
      {gettingStarted.paths.map((p) => (
        <div key={p.slug} className="card lift flex flex-col gap-3 p-[26px]">
          <p className="text-[13.5px] font-medium text-muted">{p.tag}</p>
          <h3 className="h3">{p.title}</h3>
          <p className="body-text">{p.body}</p>
          <ul className="flex flex-wrap gap-1.5 pt-1.5">
            {p.chips.map((c) => (
              <li key={c} className="rounded-full border border-hairline bg-porcelain px-[11px] py-[7px] text-[13.5px] font-medium text-body">{c}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
