import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente",
  description: "Conditions générales de vente de TrophyFrames.",
};

export default function CGVPage() {
  return (
    <LegalLayout
      title="Conditions Générales de Vente"
      updated="Juillet 2026"
      sections={[
        {
          h: "1. Identité du vendeur",
          p: "Le site TrophyFrames est édité et exploité par Nathan Oumeila, entrepreneur individuel (EI), immatriculé sous le numéro SIRET 10634668700010, dont le siège est situé 105B chemin de Boissonnier, 26120 Ourches, France. Contact : trophyframespro@gmail.com. TVA non applicable, article 293 B du Code général des impôts.",
        },
        {
          h: "2. Objet",
          p: "Les présentes conditions générales de vente régissent les ventes de cadres souvenirs personnalisés proposés sur le site TrophyFrames. Toute commande implique l'acceptation sans réserve des présentes conditions.",
        },
        {
          h: "3. Produits",
          p: "TrophyFrames propose des cadres personnalisés (modèles Solo et Duo), fabriqués à la demande selon les informations fournies par le client via le configurateur (temps, nom, classements, etc.). Le centre du cadre comporte une bande velcro permettant au client de coller lui-même, à réception, le patch reçu lors de sa compétition. Chaque cadre mesure 27 × 21 × 1,4 cm.",
        },
        {
          h: "4. Prix",
          p: "Le cadre Solo est vendu 34,99 €, le cadre Duo 39,99 € et le cadre Duo (1 patch) 34,99 €, toutes taxes comprises. La livraison en point relais est offerte ; la livraison à domicile est facturée 2 € en supplément. Les prix sont indiqués en euros. TrophyFrames se réserve le droit de modifier ses prix à tout moment ; le prix appliqué est celui en vigueur au moment de la validation de la commande.",
        },
        {
          h: "5. Commande et paiement",
          p: "La commande est validée après paiement intégral. Les paiements sont traités de manière sécurisée par Stripe ; TrophyFrames n'a jamais accès aux données bancaires du client. Une confirmation de commande est affichée à l'écran et envoyée par email.",
        },
        {
          h: "6. Livraison",
          p: "Nous livrons uniquement en France pour le moment. Deux modes sont proposés : la livraison en point relais, offerte, et la livraison à domicile, facturée 2 €. En cas de choix du point relais, le client reçoit après sa commande un email lui permettant de sélectionner le point relais de son choix. Chaque cadre étant fabriqué à la demande, le délai indicatif de fabrication et de livraison est de 5 à 10 jours ouvrés à compter de la validation de la commande. Ce délai est donné à titre indicatif ; TrophyFrames ne saurait être tenue responsable des retards imputables au transporteur.",
        },
        {
          h: "7. Droit de rétractation",
          p: "Conformément à l'article L221-28 3° du Code de la consommation, les biens confectionnés selon les spécifications du consommateur ou nettement personnalisés sont exclus du droit de rétractation. Les cadres TrophyFrames étant personnalisés à la demande, ils ne peuvent faire l'objet d'un droit de rétractation ni d'un remboursement à ce titre. En validant sa commande, le client reconnaît expressément renoncer à son droit de rétractation.",
        },
        {
          h: "8. Produit défectueux ou endommagé",
          p: "Si un cadre parvient au client cassé, défectueux ou non conforme à la commande, le client dispose d'un délai de 14 jours à compter de la réception pour effectuer une réclamation via la page Contact, accompagnée de photos. TrophyFrames proposera alors, au choix du client, un remplacement gratuit ou un remboursement intégral.",
        },
        {
          h: "9. Personnalisation et responsabilité du client",
          p: "Le client est seul responsable de l'exactitude des informations transmises lors de la personnalisation. Toute erreur de saisie (orthographe, temps, classement) relève de sa responsabilité et ne peut donner lieu à remboursement. Le patch de compétition étant collé par le client après réception, TrophyFrames n'intervient pas dans son ajout.",
        },
        {
          h: "10. Garanties légales",
          p: "Indépendamment des présentes conditions, le client bénéficie de la garantie légale de conformité (articles L217-3 et suivants du Code de la consommation) et de la garantie contre les vices cachés (articles 1641 et suivants du Code civil).",
        },
        {
          h: "11. Données personnelles",
          p: "Les données collectées sont nécessaires au traitement des commandes et sont traitées conformément à la Politique de confidentialité accessible sur le site.",
        },
        {
          h: "12. Droit applicable et litiges",
          p: "Les présentes conditions sont soumises au droit français. En cas de litige, le client peut recourir gratuitement à un médiateur de la consommation. À défaut de résolution amiable, les tribunaux français sont compétents.",
        },
      ]}
    />
  );
}
