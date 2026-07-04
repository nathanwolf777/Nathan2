import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://trophyframes.vercel.app";
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api", "/confirmation"] },
    sitemap: `${base}/sitemap.xml`,
  };
}
