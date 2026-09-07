# Plugin EquiNutrition API

Plugin WordPress/WooCommerce pour `boutique.equinutrition.fr`.

La version 1.3.0 redirige les commandes vers la page publique `/commande-confirmee` de `equinutrition.fr` et envoie un récapitulatif HTML détaillé au client ainsi qu’à `info@equinutrition.fr`.

## Installation Hostinger

Le plugin ne se place pas dans la base de données. Son code se place dans le système de fichiers WordPress :

```text
public_html/wp-content/plugins/equinutrition-api/
```

Selon l’installation Hostinger, le dossier WordPress peut être `public_html`, `domains/boutique.equinutrition.fr/public_html` ou un dossier personnalisé. Le chemin à retenir est toujours :

```text
wp-content/plugins/equinutrition-api/equinutrition-api.php
```

Dans hPanel :

1. Ouvrir **Sites > boutique.equinutrition.fr > Gestionnaire de fichiers**.
2. Ouvrir le dossier racine de WordPress.
3. Aller dans `wp-content/plugins`.
4. Créer `equinutrition-api`.
5. Envoyer `equinutrition-api.php` dans ce dossier.
6. Activer **EquiNutrition - Store API** dans `wp-admin > Extensions`.

Après une mise à jour du fichier, remplacez-le dans le même dossier puis vérifiez :

```text
https://boutique.equinutrition.fr/wp-json/equinutrition/v1/health
```

La réponse attendue contient `"status":"ok"` et la version du plugin.

Les utilisateurs, commandes et données WooCommerce seront ensuite stockés dans la base WordPress par les API natives de WordPress/WooCommerce. Il ne faut pas modifier directement les tables SQL.

## Configuration wp-config.php

Avant la ligne `/* That's all, stop editing! */` :

```php
define( 'EQUINUTRITION_FRONTEND_URL', 'https://equinutrition.fr' );
define( 'EQUINUTRITION_CONTACT_EMAIL', 'info@equinutrition.fr' );
define( 'EQUINUTRITION_ORDER_EMAIL', 'info@equinutrition.fr' );
define( 'EQUINUTRITION_SENDER_NAME', 'EquiNutrition' );
define( 'EQUINUTRITION_SENDER_EMAIL', 'info@equinutrition.fr' );
define( 'EQUINUTRITION_BANK_HOLDER', 'TITULAIRE A VALIDER' );
define( 'EQUINUTRITION_BANK_IBAN', 'IBAN A VALIDER' );
define( 'EQUINUTRITION_BANK_BIC', 'BIC A VALIDER' );
```

Aucun secret WooCommerce ou paiement ne doit être placé dans le frontend React.

## Clés WooCommerce : non nécessaires dans cette version

Ne créez pas de clé WooCommerce `ck_...` / `cs_...` pour ce projet. Le plugin est chargé directement par WordPress et utilise les fonctions internes de WooCommerce (`wc_create_order`, `wc_get_orders`, `wc_create_new_customer`).

La configuration à renseigner est uniquement celle du bloc `wp-config.php` ci-dessus : domaine frontend, adresses e-mail et coordonnées bancaires. Le fichier `.env` du frontend contient seulement `VITE_API_URL` ; il ne doit contenir aucun secret.

## Inscription et vérification e-mail

L’inscription ne crée ni utilisateur WordPress, ni cookie de session, ni jeton de connexion. Les données sont placées temporairement pendant 48 heures dans un transient WordPress ; le mot de passe y est chiffré avec AES-256-CBC et protégé par un HMAC, à partir des sels WordPress. Le lien envoyé vers `/verification-email` crée le compte uniquement après validation. Les comptes déjà existants continuent de se connecter normalement.

La limitation temporaire est réservée aux échecs d’inscription. Les requêtes valides et les tentatives de connexion ne sont pas comptabilisées par ce mécanisme ; une protection WAF/CAPTCHA reste recommandée pour les autres formulaires publics.

## URL REST utilisée par le frontend

```text
https://boutique.equinutrition.fr/wp-json/equinutrition/v1/
```

Routes principales :

```text
POST /auth/register
POST /auth/login
POST /auth/logout
GET  /auth/me
POST /auth/verify-email
POST /auth/forgot-password
POST /auth/reset-password
GET  /auth/orders
POST /contact
POST /assessments
POST /checkout
POST /orders/lookup
GET  /health
```

## CORS

Le plugin autorise uniquement l’origine configurée par `EQUINUTRITION_FRONTEND_URL`. Dans `wp-config.php` :

```php
define( 'EQUINUTRITION_FRONTEND_URL', 'https://equinutrition.fr' );
```

Le code utilise `rest_pre_serve_request` pour les réponses API et renvoie également les en-têtes CORS sur les requêtes pré-vol `OPTIONS`. Il autorise `Content-Type` et `Authorization`, nécessaires aux appels JSON et aux sessions client.

Après chaque mise à jour du plugin, testez depuis un terminal :

```powershell
curl.exe -i -X OPTIONS https://boutique.equinutrition.fr/wp-json/equinutrition/v1/checkout `
  -H "Origin: https://equinutrition.fr" `
  -H "Access-Control-Request-Method: POST" `
  -H "Access-Control-Request-Headers: content-type"
```

La réponse `204` doit contenir au minimum `Access-Control-Allow-Origin: https://equinutrition.fr`, `Access-Control-Allow-Methods` et `Access-Control-Allow-Headers`.

## E-mails

Configurer WordPress avec un plugin SMTP et une adresse du domaine `equinutrition.fr`. Vérifier SPF, DKIM et DMARC. Le plugin utilise `EQUINUTRITION_CONTACT_EMAIL` comme boîte de réception et expéditeur par défaut.

Pour les e-mails de commande, ajoutez dans `wp-config.php` :

```php
define( 'EQUINUTRITION_SENDER_NAME', 'EquiNutrition' );
define( 'EQUINUTRITION_CONTACT_EMAIL', 'info@equinutrition.fr' );
define( 'EQUINUTRITION_ORDER_EMAIL', 'info@equinutrition.fr' );
define( 'EQUINUTRITION_SENDER_EMAIL', 'info@equinutrition.fr' );
```

L’adresse expéditrice doit être authentifiée dans WP Mail SMTP. En cas d’échec, le plugin écrit l’erreur remontée par `wp_mail` dans le journal PHP/WordPress et marque l’envoi comme non transmis dans la page de confirmation.

Pour le paiement par virement, remplacez impérativement les trois valeurs bancaires d’exemple par les coordonnées officielles validées de l’activité. Le plugin envoie deux e-mails après création de la commande : un récapitulatif complet au client et le même détail à `info@equinutrition.fr`. Les coordonnées bancaires ne sont jamais écrites dans le frontend.

## Produits et commandes

Les fiches produits restent dans `src/data/products.ts` côté React. Comme pour Ossau Bois, le plugin reçoit les lignes de commande (`productId`, nom, conditionnement, prix unitaire et quantité) et crée les lignes WooCommerce correspondantes. Les SKU ne sont ni transmis, ni enregistrés, ni affichés côté serveur.

Les produits n’ont donc pas besoin d’exister dans le catalogue WooCommerce pour cette version. WooCommerce sert à stocker les commandes et à envoyer les e-mails transactionnels.

Chaque nouvelle commande reçoit une référence indépendante de WooCommerce au format `NE-26-10456`. La première commande de chaque année démarre à `10456`, puis la séquence est incrémentée de façon atomique. La page de confirmation charge les lignes et le total avec un jeton aléatoire valable 48 heures ; aucune donnée personnelle n’est placée dans l’URL.

## Sécurité avant mise en production

- Activer HTTPS sur les deux domaines.
- Autoriser uniquement `https://equinutrition.fr` en CORS.
- Installer et tester SMTP.
- Activer un CAPTCHA ou une limitation WAF sur les formulaires publics.
- Utiliser un compte WordPress dédié à l’API, sans administrateur global si possible.
- Ne jamais publier de clés WooCommerce, Stripe, SMTP ou JWT dans `dist/`.
- Tester inscription, vérification e-mail, connexion, reset, commande et suivi avec de vraies données de test.

## Sessions et validation serveur

L’API dépose la session dans un cookie `HttpOnly`, `Secure`, `SameSite=Lax` : le frontend ne stocke aucun jeton d’authentification. HTTPS est donc obligatoire sur `boutique.equinutrition.fr`.

Le panier est contrôlé côté serveur avant la création d’une commande : identifiant frontend, nom, quantité, prix strictement positif et transport. Les SKU ne font pas partie de ce flux.

La redirection vers `/commande-confirmee` contient la référence et un jeton aléatoire temporaire. L’e-mail n’apparaît jamais dans l’URL ; le détail et le total sont lus pendant 48 heures après vérification du jeton.

## Sessions et validation serveur

L’API dépose la session dans un cookie `HttpOnly`, `Secure`, `SameSite=Lax` : le frontend ne stocke aucun jeton d’authentification. Le HTTPS est donc obligatoire sur `boutique.equinutrition.fr`.

Le panier est contrôlé avant toute création de commande : identifiant frontend, nom, conditionnement, quantité, prix strictement positif et mode de livraison. Les SKU ne font pas partie de ce flux.

La redirection de confirmation ne contient pas l’e-mail ni les données personnelles : le détail et le total sont relus avec le jeton temporaire associé à la commande.
