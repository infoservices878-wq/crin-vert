# Nutrition Équine — storefront e-commerce

Frontend React/Vite pour Nutrition Équine. Il est destiné à être déployé sur
`nutrition-equine.com` et communique avec l'API sécurisée située sur
`boutique.nutrition-equine.com`.

## Démarrer (avec données de démo, sans rien configurer)

1. Ouvrir le dossier `crin-vert` dans VS Code
2. Terminal VS Code : `npm install`
3. `npm run dev` → ouvre l'URL affichée (ex. http://localhost:5173)

Le site fonctionne immédiatement avec 9 produits de démonstration
(`src/data/products.ts`).

## Configurer l'API de production

1. Copie `.env.example` en `.env`
2. Renseigne `VITE_API_URL=https://boutique.nutrition-equine.com`
3. Relance `npm run dev`.

Les clés WooCommerce et celles des prestataires de paiement restent exclusivement
sur le serveur. Ne les ajoutez jamais au frontend : les variables `VITE_*` sont
visibles dans le navigateur.

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

## Avant ouverture

- Consultez [DEPLOYMENT.md](DEPLOYMENT.md) : endpoints API, CORS, réécriture SPA,
  services de paiement/livraison/e-mail et checklist de sécurité.
- Remplacez les contenus d'exemple (coordonnées, chiffres, avis, visuels et textes
  réglementaires) par des éléments réels et validés avant publication.
