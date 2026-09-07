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
define( 'EQUINUTRITION_CONTACT_EMAIL', 'contact@equinutrition.fr' );
define( 'EQUINUTRITION_ORDER_EMAIL', 'info@equinutrition.fr' );
define( 'EQUINUTRITION_BANK_HOLDER', 'TITULAIRE A VALIDER' );
define( 'EQUINUTRITION_BANK_IBAN', 'IBAN A VALIDER' );
define( 'EQUINUTRITION_BANK_BIC', 'BIC A VALIDER' );
```

Aucun secret WooCommerce ou paiement ne doit être placé dans le frontend React.

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

Le code utilise `rest_pre_serve_request` pour renvoyer les en-têtes CORS au bon moment et répond aux requêtes pré-vol `OPTIONS`. Il autorise `Content-Type` et `Authorization`, nécessaires aux appels JSON et aux sessions client.

## E-mails

Configurer WordPress avec un plugin SMTP et une adresse du domaine `equinutrition.fr`. Vérifier SPF, DKIM et DMARC. Le plugin utilise `EQUINUTRITION_CONTACT_EMAIL` comme boîte de réception et expéditeur par défaut.

Pour le paiement par virement, remplacez impérativement les trois valeurs bancaires d’exemple par les coordonnées officielles validées de l’activité. Le plugin envoie deux e-mails après création de la commande : un récapitulatif complet au client et le même détail à `info@equinutrition.fr`. Les coordonnées bancaires ne sont jamais écrites dans le frontend.

## Produits et commandes

Les fiches produits restent dans `src/data/products.ts` côté React. Le fichier `catalog.php` contient la liste blanche serveur des SKU et des prix de base autorisés. Le plugin refuse une référence inconnue et recalcule le prix côté serveur selon le conditionnement; il ne fait jamais confiance au prix envoyé par le navigateur.

Les produits n’ont donc pas besoin d’exister dans le catalogue WooCommerce pour cette version. WooCommerce sert à stocker la commande et à fournir la page de paiement. Si le catalogue local change, mettez à jour `catalog.php` en même temps que `src/data/products.ts`.

## Sécurité avant mise en production

- Activer HTTPS sur les deux domaines.
- Autoriser uniquement `https://equinutrition.fr` en CORS.
- Installer et tester SMTP.
- Activer un CAPTCHA ou une limitation WAF sur les formulaires publics.
- Utiliser un compte WordPress dédié à l’API, sans administrateur global si possible.
- Ne jamais publier de clés WooCommerce, Stripe, SMTP ou JWT dans `dist/`.
- Tester inscription, vérification e-mail, connexion, reset, commande et suivi avec de vraies données de test.
