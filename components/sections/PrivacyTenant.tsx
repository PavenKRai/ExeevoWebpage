import { TextLink } from "../ui/TextLink";
import { TenantDiagram } from "./TenantDiagram";
import { home } from "@/content/site";

export function PrivacyTenant() {
  const p = home.privacy;
  return (
    <section className="section bg-mist">
      <div className="frame grid items-center gap-14 lg:grid-cols-2">
        <div className="srl">
          <h2>{p.title}</h2>
          <p className="lead mt-5 text-brand-blue">{p.lead}</p>
          <p className="body-lg mt-5 text-body">{p.body}</p>
          <TextLink href="/why-exeevo" className="mt-6">
            {p.link}
          </TextLink>
        </div>
        <div className="srr">
          <TenantDiagram diagram={p.diagram} />
        </div>
      </div>
    </section>
  );
}
