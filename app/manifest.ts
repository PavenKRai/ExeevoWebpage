import type { MetadataRoute } from "next";
import { orgFacts } from "@/content/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Exeevo",
    short_name: "Exeevo",
    description: orgFacts.tagline,
    start_url: "/",
    display: "browser",
    background_color: "#182026",
    theme_color: "#182026",
    icons: [{ src: "/icon.png", sizes: "229x229", type: "image/png" }],
  };
}
