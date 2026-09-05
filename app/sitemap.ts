import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/site";
import { SERVICES } from "./lib/services";
import { LOCATIONS } from "./lib/locations";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/szolgaltatasok`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...SERVICES.map((s) => ({
      url: `${SITE_URL}/szolgaltatasok/${s.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...LOCATIONS.map((l) => ({
      url: `${SITE_URL}/kazancsere/${l.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${SITE_URL}/kell-e-uj-kazan`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/munkaink`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/rolunk`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/kapcsolat`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];
}
