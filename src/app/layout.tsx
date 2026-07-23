import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://trophyframes.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "TrophyFrames — Vos performances, immortalisées",
    template: "%s — TrophyFrames",
  },
  description:
    "Cadres souvenirs personnalisés pour les passionnés de compétitions fitness. Immortalisez vos performances avec un cadre premium en édition unique. À partir de 34,99 € — livraison offerte en point relais, en France.",
  keywords: [
    "cadre personnalisé",
    "fitness",
    "compétition",
    "crossfit",
    "hyrox",
    "trophée",
    "souvenir sportif",
    "cadre premium",
  ],
  authors: [{ name: "TrophyFrames" }],
  openGraph: {
    title: "TrophyFrames — Vos performances, immortalisées",
    description:
      "Cadres souvenirs personnalisés premium pour athlètes. À partir de 34,99 € — livraison offerte en point relais, en France.",
    url: baseUrl,
    siteName: "TrophyFrames",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TrophyFrames — Vos performances, immortalisées",
    description: "Cadres souvenirs personnalisés premium pour athlètes.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="grain min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
