import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://trophyframes.vercel.app";
  const routes = ["", "/configurateur", "/faq", "/contact", "/cgv", "/confidentialite", "/mentions-legales"];
  return routes.map((r) => ({
    url: `${base}${r}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: r === "" || r === "/configurateur" ? 1 : 0.6,
  }));
}
