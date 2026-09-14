import type { MetadataRoute } from "next";
import { SITE_URL } from "./(site)/lib/site";
import { SERVICES } from "./(site)/lib/services";
import { LOCATIONS } from "./(site)/lib/locations";

// Statikus export: a fajl build kozben keszul el.
export const dynamic = "force-static";

/* Az oldal perjelre vegzodo cimeken el (trailingSlash a next.config-ban),
   a canonical linkek is igy neznek ki. A sitemap ugyanezt adja, kulonben a
   Google atiranyitast latna minden cimnel. */
const page = (path: string) => `${SITE_URL}${path}/`;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: page("/szolgaltatasok"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...SERVICES.map((s) => ({
      url: page(`/szolgaltatasok/${s.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...LOCATIONS.map((l) => ({
      url: page(`/kazancsere/${l.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: page("/kell-e-uj-kazan"),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: page("/munkaink"),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: page("/rolunk"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: page("/kapcsolat"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: page("/adatkezelesi-tajekoztato"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: page("/aszf"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: page("/impresszum"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
