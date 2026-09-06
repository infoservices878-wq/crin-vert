# Mise en production : nutrition-equine.com

## Architecture retenue

- `https://nutrition-equine.com` : build React/Vite statique, hébergé sur Hostinger.
- `https://boutique.nutrition-equine.com` : API métier et WooCommerce, sans interface d'administration exposée au front.
- Le front doit recevoir uniquement `VITE_API_URL=https://boutique.nutrition-equine.com` au moment du build.

Ne placez jamais dans `.env` du frontend une clé WooCommerce (`ck_` / `cs_`), une clé Stripe, un mot de passe SMTP ou un secret JWT : toutes les variables `VITE_*` sont publiques après compilation.

## Contrat minimal de l'API

L'API doit répondre en JSON, envoyer les en-têtes CORS seulement pour `https://nutrition-equine.com` (et l'URL de préproduction), et appliquer une limitation de débit / CAPTCHA sur les formulaires publics.

| Route | Rôle |
| --- | --- |
| `POST /v1/contact` | Envoie le message au service client et retourne `{ id }`. |
| `POST /v1/assessments` | Enregistre une demande de bilan équin et notifie l'équipe. |
| `POST /v1/checkout` | Revalide prix, stock, poids et livraison côté serveur, crée la commande puis retourne `{ checkoutUrl }` Stripe/PayPal/WooCommerce. |
| `POST /v1/orders/lookup` | Retourne le statut et l'URL de suivi après contrôle du numéro de commande + e-mail. |
| `POST /v1/auth/register`, `POST /v1/auth/login` | Comptes clients, avec cookies `HttpOnly` ou jetons courts et renouvelables. |

Le serveur est l'unique source de vérité : il ne doit jamais faire confiance aux prix, frais de port, remises ou statuts envoyés par le navigateur.

## Configuration Hostinger

1. Créez les deux DNS : domaine principal pour le frontend, sous-domaine `boutique` pour l'API.
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
