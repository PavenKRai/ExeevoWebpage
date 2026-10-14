import analystReports from "./analyst-reports.json";
import blog from "./blog.json";
import caseStudies from "./case-studies.json";
import events from "./events.json";
import glossary from "./glossary.json";
import pressReleases from "./press-releases.json";
import webinars from "./webinars.json";
import whitePapers from "./white-papers.json";

import type { Resource, ResourceType } from "./types";

/** Bundled content (the migrated site as JSON): the fallback when Sanity is not configured, and the test fixture. */
const data: Record<ResourceType, Resource[]> = {
  blog,
  "white-papers": whitePapers,
  webinars,
  "press-releases": pressReleases,
  "case-studies": caseStudies,
  "analyst-reports": analystReports,
  events,
  glossary,
} as Record<ResourceType, Resource[]>;

export const localResources = (type: ResourceType): Resource[] => data[type];
