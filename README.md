# TrophyFrames

Site e-commerce premium pour cadres souvenirs personnalisés destinés aux passionnés de compétitions fitness.

**Stack :** Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS · Framer Motion · Stripe Checkout.

## Fonctionnalités

- **Configurateur temps réel** — cœur du site. Champs à gauche, prévisualisation ultra-réaliste à droite (effet verre, reflets, glare qui suit la souris, rotation 3D, zoom au survol).
- **Modèles Solo & Duo** avec bascule animée.
- **Stripe Checkout** — paiement, collecte d'adresse de livraison, page de confirmation.
- **Back-office `/admin`** — liste des commandes, aperçu du cadre, infos client, statut, bouton « Marquer comme expédiée ».
- **Pages** : Accueil, Configurateur, FAQ, Contact, CGV, Politique de confidentialité, Confirmation.
- **SEO** : métadonnées OpenGraph/Twitter, `sitemap.xml`, `robots.txt`, langue FR.
- **Animations Framer Motion** partout : apparition au scroll, hover, transitions, micro-interactions.
- **Responsive** mobile → desktop.

## Installation

```bash
npm install
cp .env.example .env.local   # renseignez vos clés
npm run dev
```

Ouvrez http://localhost:3000

## Variables d'environnement

| Variable | Description |
|---|---|
| `STRIPE_SECRET_KEY` | Clé secrète Stripe (`sk_...`) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Clé publique Stripe (`pk_...`) |
| `STRIPE_WEBHOOK_SECRET` | Secret du webhook (`whsec_...`) |
| `NEXT_PUBLIC_BASE_URL` | URL du site (ex. `https://trophyframes.vercel.app`) |
| `ADMIN_PASSWORD` | Mot de passe de l'espace `/admin` |

## Paiement & commandes

1. Le configurateur envoie la config à `/api/checkout`, qui crée une session Stripe Checkout.
2. Après paiement, Stripe redirige vers `/confirmation?session_id=...`.
3. La page de confirmation appelle `/api/orders` qui enregistre la commande (fallback si le webhook n'est pas configuré).
4. En production, configurez un webhook Stripe vers `/api/webhook` (événement `checkout.session.completed`) pour un enregistrement fiable.

### Stockage des commandes

Les commandes sont stockées dans `.data/orders.json` (persistance simple de démonstration). **Pour la production, remplacez `src/lib/orders.ts` par une vraie base de données** (Postgres, Supabase, etc.), car le système de fichiers de Vercel est éphémère. Les visuels centraux doivent être uploadés vers un stockage objet (S3, Vercel Blob) — le code actuel ne conserve qu'un indicateur pour rester dans les limites de métadonnées Stripe.

## Back-office

Accès : `/admin` — connectez-vous avec `ADMIN_PASSWORD`.

## Déploiement sur Vercel

1. Poussez le repo sur GitHub.
2. Importez le projet sur [vercel.com](https://vercel.com).
3. Ajoutez les variables d'environnement.
4. Déployez. Configurez le webhook Stripe vers `https://votre-domaine/api/webhook`.

## Structure

```
src/
├── app/
│   ├── page.tsx              # Accueil
│   ├── configurateur/        # Configurateur
│   ├── faq · contact · cgv · confidentialite
│   ├── confirmation/         # Page post-paiement
│   ├── admin/                # Back-office + admin/api
│   └── api/                  # checkout · webhook · orders
├── components/
│   ├── FramePreview.tsx      # Rendu réaliste du cadre (glass, glare, 3D)
│   ├── Configurator.tsx      # Formulaire + preview
│   ├── Nav · Footer · Reveal · LegalLayout
├── data/product.ts           # Types, prix, pays, drapeaux
└── lib/                       # stripe.ts · orders.ts
```
