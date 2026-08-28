# Nutrition Équine — site de démonstration

Site vitrine + catalogue pour compléments alimentaires équins, en React + Vite +
TypeScript + Tailwind CSS, prêt à être branché sur un backend WordPress/WooCommerce
en headless.

## Démarrer (avec données de démo, sans rien configurer)

1. Ouvrir le dossier `crin-vert` dans VS Code
2. Terminal VS Code : `npm install`
3. `npm run dev` → ouvre l'URL affichée (ex. http://localhost:5173)

Le site fonctionne immédiatement avec 9 produits de démonstration
(`src/data/products.ts`).

## Brancher sur ton WordPress/WooCommerce local

1. Copie `.env.example` en `.env`
2. Renseigne :
   - `VITE_WC_URL` → l'URL de ton site Local (ex. `https://cheval-clone.local`)
   - `VITE_WC_CONSUMER_KEY` et `VITE_WC_CONSUMER_SECRET` → générés à l'étape 3
     qu'on a faite ensemble dans WooCommerce → Réglages → Avancé → REST API
3. Relance `npm run dev`

Le site basculera automatiquement sur tes vrais produits WooCommerce (fonction
`getProducts()` dans `src/lib/woocommerce.ts`).

⚠️ Les champs **composition** et **posologie** n'existent pas nativement dans
WooCommerce : ajoute-les comme champs personnalisés sur chaque produit
(clé `composition` en JSON, clé `posologie` en texte) pour qu'ils s'affichent —
sinon un texte par défaut s'affiche à la place.

## Structure

- `src/pages/` — Accueil, Catalogue (filtres + tri), Fiche produit (onglets)
- `src/components/` — Header (mega menu), Footer, ProductCard, panier
- `src/data/products.ts` — produits de démo
- `src/lib/woocommerce.ts` — bascule démo ↔ API réelle

## Publier sur GitHub (via VS Code, sans ligne de commande)

1. Onglet **Source Control** (icône branche, barre latérale gauche)
2. Bouton **Publish to GitHub** → choisis un nom de dépôt → Publier

## Limites de ce prototype

- Panier fonctionnel visuellement, mais pas de vrai tunnel de paiement
- Images produit remplacées par des illustrations générées (pas de vraies photos)
- Les pages Mentions légales / CGV / Livraison / Retours / Paiement contiennent un
  contenu type généré à titre d'exemple (coordonnées et SIRET fictifs) — à faire
  relire par un professionnel avant toute mise en production réelle
