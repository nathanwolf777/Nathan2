import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site TrophyFrames.",
};

export default function MentionsPage() {
  return (
    <LegalLayout
      title="Mentions légales"
      updated="Juillet 2026"
      sections={[
        {
          h: "Éditeur du site",
          p: "Le site TrophyFrames est édité par Nathan Oumeila, entrepreneur individuel (EI), immatriculé sous le numéro SIRET 10634668700010. Siège : 105B chemin de Boissonnier, 26120 Ourches, France. Adresse électronique : trophyframespro@gmail.com. TVA non applicable, article 293 B du Code général des impôts.",
        },
        {
          h: "Directeur de la publication",
          p: "Nathan Oumeila.",
        },
        {
          h: "Hébergement",
          p: "Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis (vercel.com).",
        },
        {
          h: "Propriété intellectuelle",
          p: "L'ensemble des éléments du site TrophyFrames (textes, visuels, logo, mise en page) est protégé par le droit de la propriété intellectuelle. Toute reproduction sans autorisation est interdite. Les marques et logos de tiers éventuellement visibles appartiennent à leurs propriétaires respectifs.",
        },
        {
          h: "Paiement",
          p: "Les paiements en ligne sont traités de manière sécurisée par Stripe. Aucune donnée bancaire n'est stockée par TrophyFrames.",
        },
        {
          h: "Contact",
          p: "Pour toute question, vous pouvez nous écrire à trophyframespro@gmail.com ou via la page Contact du site.",
        },
      ]}
    />
  );
}
