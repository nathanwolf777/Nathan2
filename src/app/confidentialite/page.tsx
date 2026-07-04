import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité et protection des données de TrophyFrames.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Politique de confidentialité"
      updated="Janvier 2026"
      sections={[
        {
          h: "1. Responsable du traitement",
          p: "Le responsable du traitement est Nathan Oumeila, entrepreneur individuel (EI), SIRET 10634668700010, 105B chemin de Boissonnier, 26120 Ourches — éditeur du site TrophyFrames. Les données sont traitées conformément au Règlement Général sur la Protection des Données (RGPD). Contact : trophyframespro@gmail.com.",
        },
        {
          h: "2. Données collectées",
          p: "Nous collectons les données nécessaires au traitement de votre commande : nom, prénom, adresse email, adresse de livraison, ainsi que les informations de personnalisation du cadre. Les données de paiement sont traitées exclusivement par Stripe et ne transitent jamais par nos serveurs.",
        },
        {
          h: "3. Finalités",
          p: "Vos données sont utilisées pour traiter et livrer votre commande, vous envoyer les confirmations et suivis, et répondre à vos demandes. Nous n'utilisons pas vos données à des fins publicitaires sans votre consentement.",
        },
        {
          h: "4. Conservation",
          p: "Vos données de commande sont conservées pendant la durée légale requise à des fins comptables et de garantie. Les visuels que vous téléchargez sont conservés uniquement le temps de la fabrication.",
        },
        {
          h: "5. Partage des données",
          p: "Vos données ne sont partagées qu'avec nos prestataires indispensables (Stripe pour le paiement, transporteur pour la livraison). Aucune donnée n'est vendue à des tiers.",
        },
        {
          h: "6. Vos droits",
          p: "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement, de portabilité et d'opposition sur vos données. Pour exercer ces droits, contactez-nous via la page Contact.",
        },
        {
          h: "7. Cookies",
          p: "Le site utilise uniquement des cookies techniques nécessaires à son bon fonctionnement et au traitement sécurisé des paiements. Aucun cookie de traçage publicitaire n'est déposé sans consentement.",
        },
      ]}
    />
  );
}
