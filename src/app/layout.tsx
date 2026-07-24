import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://trophy-frames.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "TrophyFrames — Vos performances, immortalisées",
    template: "%s — TrophyFrames",
  },
  description:
    "Cadres souvenirs personnalisés pour les passionnés de compétitions fitness. Immortalisez vos performances avec un cadre premium en édition unique. À partir de 39,99 € — livraison offerte en point relais, en France.",
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
      "Cadres souvenirs personnalisés premium pour athlètes. À partir de 39,99 € — livraison offerte en point relais, en France.",
    url: baseUrl,
    siteName: "TrophyFrames",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TrophyFrames — cadres souvenirs personnalisés pour athlètes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TrophyFrames — Vos performances, immortalisées",
    description: "Cadres souvenirs personnalisés premium pour athlètes.",
    images: ["/og-image.jpg"],
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
