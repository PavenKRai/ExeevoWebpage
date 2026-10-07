/**
 * Canonical origin of the site: https://exeevo.com in production. NEXT_PUBLIC_SITE_URL overrides it (e.g. for a staging
 * host, so staging never claims to be the production site). Every canonical URL, Open Graph URL, the sitemap and
 * robots.txt are built from this value.
 */
const PRODUCTION = "https://exeevo.com";
const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");

export const siteUrl = fromEnv ?? (process.env.NODE_ENV === "production" ? PRODUCTION : "http://localhost:3000");

/**
 * True when NEXT_PUBLIC_SITE_URL points at a staging host (for example a *.vercel.app link) rather than exeevo.com or
 * localhost. Staging must never be indexed: robots.txt disallows everything and every page gets noindex.
 */
export const isStaging = !!fromEnv && fromEnv !== PRODUCTION && !/^https?:\/\/(localhost|127\.0\.0\.1)(:|\/|$)/.test(fromEnv);
