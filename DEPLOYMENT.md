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
| `POST /v1/checkout` | Valide les coordonnées, le panier et le mode de livraison, crée une commande WooCommerce en attente de virement, puis retourne une référence `NE-26-10456` et une URL de confirmation sécurisée. |
| `GET /v1/orders/confirmation?token=…` | Retourne pendant 48 h le détail et le total de la commande associée au jeton aléatoire de confirmation. |
| `POST /v1/orders/lookup` | Retourne le statut et l'URL de suivi après contrôle du numéro de commande + e-mail. |
| `POST /v1/auth/register`, `POST /v1/auth/login` | Comptes clients, avec cookies `HttpOnly` ou jetons courts et renouvelables. |

Le serveur est l'unique source de vérité pour les comptes, commandes, frais de port, livraisons et messages. Les prix restent temporairement dans le catalogue React, comme pour Ossau Bois ; ils doivent être déplacés vers le serveur avant tout paiement carte ou automatisé.
Les produits, compositions et posologies restent définis dans `src/data/products.ts` côté frontend. Le serveur ne doit pas devenir une seconde source de catalogue produit sans décision explicite.

## Clés WooCommerce : aucune clé à insérer actuellement

L’architecture actuelle n’utilise pas l’API REST WooCommerce. Le plugin `equinutrition-api` est exécuté à l’intérieur de WordPress et appelle directement les fonctions natives de WooCommerce pour créer et lire les commandes. Il ne faut donc créer ni renseigner de clé `ck_...` / `cs_...` pour le fonctionnement actuel.

Ne mettez jamais de clé WooCommerce, Stripe, SMTP ou JWT dans React, `.env`, `.env.example` ou une variable `VITE_*` : elles seraient visibles dans le navigateur après compilation.

## E-mails de commande : configuration obligatoire

Le code envoie désormais depuis l’adresse déclarée dans `wp-config.php` et journalise tout échec de `wp_mail`. Ajoutez, avant le test réel :

```php
define( 'EQUINUTRITION_SENDER_NAME', 'EquiNutrition' );
define( 'EQUINUTRITION_CONTACT_EMAIL', 'info@equinutrition.fr' );
define( 'EQUINUTRITION_ORDER_EMAIL', 'info@equinutrition.fr' );
define( 'EQUINUTRITION_SENDER_EMAIL', 'info@equinutrition.fr' );
```

Dans WordPress, installez **WP Mail SMTP**, reliez-le à cette boîte (ou à Brevo, Mailjet ou Postmark), puis envoyez un test depuis l’écran du plugin. Vérifiez aussi SPF et DKIM du domaine. Sans un transport SMTP valide, WordPress peut accepter l’envoi sans que le message n’arrive au client.

Si une future intégration serveur distincte doit utiliser l’API REST WooCommerce, les clés seront créées dans `WooCommerce > Réglages > Avancé > API REST` et stockées exclusivement dans le gestionnaire de secrets de ce serveur distinct. Cette étape ne s’applique pas aujourd’hui.

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
