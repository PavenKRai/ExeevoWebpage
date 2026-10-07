// Maps an old exeevo.com path to its new home. Shared by sanitise.mjs (rewrites body links) and redirects.mjs.
const p_last = (p) => p.split("/").filter(Boolean).pop();
const norm = (p) => {
  let s = p.split(/[?#]/)[0];
  try { s = decodeURIComponent(s); } catch { /* keep as is */ }
  s = s.toLowerCase().replace(/\/+$/, "");
  return s || "/";
};

/** Content types: old prefix -> new prefix (slug is carried over). */
export const typeRoutes = [
  ["/resources/publications/blog", "/resources/blog"],
  ["/resources/publications/white-papers", "/resources/white-papers"],
  ["/resources/publications/webinars", "/resources/webinars"],
  ["/resources/publications/press-releases", "/resources/press-releases"],
  ["/resources/publications/case-studies", "/resources/case-studies"],
  ["/resources/analyst-reports", "/resources/analyst-reports"],
  ["/recursos/publicaciones/blog", "/resources/blog"],
  ["/recursos/publicaciones/libros-blancos", "/resources/white-papers"],
  ["/recursos/publicaciones/seminarios-web", "/resources/webinars"],
  ["/recursos/publicaciones/comunicados-de-prensa", "/resources/press-releases"],
  ["/events", "/events"],
  ["/glossary", "/glossary"],
];

const modules = {
  "life-sciences-crm": "/platform?module=crm-sales",
  "medical-crm": "/platform?module=medical-crm",
  "marketing-automation": "/platform?module=marketing-automation",
  "event-management": "/platform?module=event-management",
  "content-management": "/platform?module=content-management",
  "customer-insights": "/platform?module=customer-insights",
  "mobile-crm-app": "/platform?module=mobile-app",
  "mobile-app": "/platform?module=mobile-app",
};

// Ordered keyword rules for generic pages (all languages); first match wins. Tested against the lower-cased, decoded path.
const rules = [
  [/(^|\/)(accueil|home-spanish|home-german|home-arabic)$/, "/"],
  [/^\/products\/(?:omnipresence(?:-crm)?\/)?([^/]+)$/, (m) => modules[m[1]] ?? "/platform"],
  [/^\/(omnipresence|omnicare|omnisight|crm)$|^\/products\/omnipresence-copilot(\/|$)|^\/products\/(crm|omnipresence)$|%e8%a3%bd%e5%93%81|製品/, (m) => modules[p_last(m.input)] ?? "/platform"],
  [/^\/about-us\/leadership$/, "/about"],
  [/^\/pharma-crm$/, "/industries?industry=pharma"],
  [/^\/(medtech|medical-device)-crm$/, "/industries?industry=medtech"],
  [/customer-insights-for-ls/, modules["customer-insights"]],
  [/marketing-automation-for-life-sciences/, modules["marketing-automation"]],
  [/event-management-life-sciences/, modules["event-management"]],
  [/content-management-life-sciences/, modules["content-management"]],
  [/(^|\/)(produits|produkte|productos|seihin)(\/|$)|^\/(products|pharma-crm|services|nos-services|servicios|dienstleistungen|sabisu-naiyo)$/, "/platform"],
  [/life-sciences-crm-comparison|^\/(trust|low-code-no-code|microsoft)$/, "/why-exeevo"],
  [/etudes-de-cas|case-studies|%e3%82%b1|ケース/, "/resources/case-studies"],
  [/blogue|\/blog$|bloggen|burogu/, "/resources/blog"],
  [/livres-blancs|libros-blancos|weisse-papiere|howaito-pepa/, "/resources/white-papers"],
  [/webinaires|seminarios-web|webinare|webina$/, "/resources/webinars"],
  [/comuniques-de-presse|comunicados-de-prensa|mitteilungen-an-die-presse|puresu-ririsu/, "/resources/press-releases"],
  [/rapports-danalystes|informes-de-analistas|analystenberichte|anarisuto-repoto/, "/resources/analyst-reports"],
  [/(^|\/)(a-propos|sobre-nosotros|ueber-uns|kaisha-gaiyo|about-us)\/(presse|pulse|shinbun|press)$|^\/press$/, "/resources/press-releases"],
  [/nos-leaders|liderazgo|fuehrung|ridashippu|our-people|%d9%82%d9%8a%d8%a7%d8%af%d8%a9|قيادة/, "/about"],
  [/partenaires|socios|\/partner$|patona|partners$/, "/partners"],
  [/carrieres|carreras|karriere|kyaria|careers/, "/careers"],
  [/^\/(a-propos|sobre-nosotros|ueber-uns|kaisha-gaiyo|about-us)$/, "/about"],
  [/politique-de-confidentialite|politica-de-privacidad|datenschutzbestimmungen|puraibashi-porishi|privacy-policy/, "/privacy"],
  [/politique-relative-aux-cookies|politica-de-cookies|kukki-porishi|cookie-policy/, "/cookies"],
  [/plan-du-site|mapa-del-sitio|lageplan|saito-mappu|site-map/, "/site-map"],
  [/contactez-nous|kontakt|contacto|o-toiawase|contact-us|demo-request|pricing/, "/getting-started"],
  [/(^|\/)(evenements|eventos|veranstaltungen|events)$/, "/events"],
  [/(^|\/)(formation|formacion|ausbildung|toreningu|training|learn)$/, "/resources"],
  [/(^|\/)(ressources|recursos|ressourcen|risosu)(\/(nos-publications|publicaciones|veroffentlichungen|shuppanbutsu|publications))?$|^\/resources(\/publications)?$/, "/resources"],
  [/^\/docs(\/|$)/, "/getting-started"],
];

/** Returns the new path for an old path, or null when the path is not an old-site URL we know. */
export function mapOldPath(path) {
  // Language-prefixed paths (/es/..., /ar/...) map like their unprefixed equivalent.
  const p = norm(path).replace(/^\/(fr|es|de|ja|ar)(?=\/|$)/, "") || "/";
  if (p === "/") return "/";
  for (const [from, to] of typeRoutes) {
    if (p === from) return to;
    if (p.startsWith(from + "/")) return to + p.slice(from.length);
  }
  for (const [re, to] of rules) {
    const m = p.match(re);
    if (m) return typeof to === "function" ? to(m) : to;
  }
  return null;
}
