# Mise en production : equinutrition.fr

## À faire dans Hostinger et WordPress avant publication

Le build copie `public/.htaccess` à la racine de `dist/`. Conservez ce fichier à la racine de `equinutrition.fr` : il assure la réécriture des routes React, la compression, le cache long des assets versionnés et des en-têtes de sécurité.

1. Activez le SSL sur `equinutrition.fr` et `boutique.equinutrition.fr`, puis forcez HTTPS.
2. Activez LiteSpeed Cache / la compression Brotli si disponible ; ne cachez jamais les routes `wp-json/equinutrition/v1/*` de l’API.
3. Installez et configurez WP Mail SMTP avec une boîte `@equinutrition.fr`, SPF, DKIM et DMARC validés.
4. Activez une protection anti-bots/WAF (Cloudflare ou Hostinger) sur les formulaires publics et la connexion WordPress.
5. Gardez l’administration WordPress sur `boutique.equinutrition.fr` et activez la double authentification des administrateurs.

Le parcours actuel crée une commande WooCommerce avec paiement par virement. Comme pour Ossau Bois, catalogue et prix restent dans React. Avant d’ajouter Stripe, PayPal ou le paiement carte, déplacez la grille tarifaire vers le serveur afin que le montant soit recalculé côté backend.

## Architecture retenue

- `https://equinutrition.fr` : build React/Vite statique, hébergé sur Hostinger.
- `https://boutique.equinutrition.fr` : API métier et serveur d’administration, sans interface d’administration exposée au front.
- Le front doit recevoir uniquement `VITE_API_URL=https://boutique.equinutrition.fr/wp-json/equinutrition` au moment du build.

Ne placez jamais dans `.env` du frontend une clé WooCommerce (`ck_` / `cs_`), une clé Stripe, un mot de passe SMTP ou un secret JWT : toutes les variables `VITE_*` sont publiques après compilation.

## Contrat minimal de l'API

L'API doit répondre en JSON, envoyer les en-têtes CORS seulement pour `https://equinutrition.fr` (et l'URL de préproduction), et appliquer une limitation de débit / CAPTCHA sur les formulaires publics.

| Route | Rôle |
| --- | --- |
| `POST /v1/contact` | Envoie le message au service client et retourne `{ id }`. |
| `POST /v1/assessments` | Enregistre une demande de bilan équin et notifie l'équipe. |
| `POST /v1/checkout` | Valide les coordonnées, le panier et le mode de livraison, crée une commande WooCommerce en attente de virement, puis retourne `{ checkoutUrl }`. |
| `POST /v1/orders/lookup` | Retourne le statut et l'URL de suivi après contrôle du numéro de commande + e-mail. |
| `POST /v1/auth/register`, `POST /v1/auth/login` | Comptes clients, avec cookies `HttpOnly` ou jetons courts et renouvelables. |

Le serveur est l'unique source de vérité pour les comptes, commandes, frais de port, livraisons et messages. Les prix restent temporairement dans le catalogue React, comme pour Ossau Bois ; ils doivent être déplacés vers le serveur avant tout paiement carte ou automatisé.
Les produits, compositions et posologies restent définis dans `src/data/products.ts` côté frontend. Le serveur ne doit pas devenir une seconde source de catalogue produit sans décision explicite.

## Où placer les clés WordPress et WooCommerce

Les clés se configurent uniquement sur le serveur `boutique.equinutrition.fr`, jamais dans le projet React et jamais dans une variable `VITE_*`.

Dans le fichier d’environnement privé du backend, configurez par exemple :

```env
PUBLIC_STORE_URL=https://equinutrition.fr
WORDPRESS_URL=https://votre-wordpress-interne.example
WOOCOMMERCE_CONSUMER_KEY=ck_...
WOOCOMMERCE_CONSUMER_SECRET=cs_...
WORDPRESS_JWT_SECRET=une-valeur-longue-et-aleatoire
STRIPE_SECRET_KEY=sk_...
SMTP_HOST=smtp.example
SMTP_USER=...
SMTP_PASSWORD=...
```

Dans WordPress, créez les clés WooCommerce depuis `WooCommerce > Réglages > Avancé > API REST`, avec les permissions `Lecture/Écriture`. Le serveur backend les utilise ensuite pour communiquer avec WooCommerce. Le navigateur appelle uniquement les routes publiques `/v1/...` de `boutique.equinutrition.fr`.

Dans le frontend, le seul fichier concerné est `.env` :

```env
VITE_API_URL=https://boutique.equinutrition.fr/wp-json/equinutrition
```

Après chaque modification de `VITE_API_URL`, relancez `npm run build` puis republiez `dist/`. Les secrets du backend doivent être injectés dans l’environnement du serveur ou dans son gestionnaire de secrets, jamais dans `dist/`.

## Configuration Hostinger

1. Créez les deux DNS : `equinutrition.fr` pour le frontend, sous-domaine `boutique` pour l'API et l’administration.
2. Ajoutez un certificat TLS valide aux deux noms de domaine, forcez HTTPS et activez HSTS après validation.
3. Chargez le contenu de `dist/` sur le domaine principal après `npm run build`.
4. Configurez une réécriture SPA : toute URL qui n'est pas un fichier réel doit servir `index.html`. Sans cela, les fiches produits et les nouvelles pages renverront une erreur 404 lors d'un accès direct.
5. Définissez `VITE_API_URL` avant la compilation, puis reconstruisez. Une modification du fichier `.env` après l'upload ne modifie pas le build déjà généré.

## Services externes à choisir avant ouverture

- Paiement : Stripe (CB, Apple Pay/Google Pay) et/ou PayPal, avec webhooks vérifiés côté API.
- Livraison : Sendcloud, Boxtal ou l'API directe des transporteurs, afin de calculer le vrai tarif au poids, choisir les relais et envoyer le suivi.
- E-mail transactionnel : Brevo, Mailjet ou Postmark pour confirmations, factures et suivi d'expédition.
- Consentement : une CMP conforme CNIL (Axeptio, Didomi ou Tarte au citron) avant d'activer analytics/retargeting.
- Avis : Avis Vérifiés, Trustpilot ou Judge.me. Les avis affichés doivent être authentiques et modérés ; ne publiez pas de compteurs ou témoignages fictifs.

## Vérifications avant lancement

- Réelles coordonnées société, médiateur, politique de confidentialité, CGV, retours et allégations produit validés juridiquement.
- Mentions réglementaires et étiquetage des aliments pour équidés validés par un professionnel compétent.
- Test complet : paiement, webhooks, annulation, rupture, e-mail, facture, livraison, retour et mobile.
- Sauvegardes, mises à jour WordPress/extensions, WAF, comptes administrateurs avec MFA et journalisation active.
