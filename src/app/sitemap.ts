import type { MetadataRoute } from "next";
import { getModulos } from "@/lib/modulos";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://fullstack.factorit.cl";

  const modulos = getModulos();

  const moduloUrls: MetadataRoute.Sitemap = modulos.map((m) => ({
    url: `${baseUrl}/modulos/${m.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const temaUrls: MetadataRoute.Sitemap = modulos
    .filter((m) => m.disponible)
    .flatMap((m) =>
      m.temas.map((t) => ({
        url: `${baseUrl}/modulos/${m.slug}/${t.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      }))
    );

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...moduloUrls,
    ...temaUrls,
  ];
}
