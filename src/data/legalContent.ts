export interface LegalSection {
  heading: string
  paragraphs: string[]
  list?: string[]
}

export interface LegalPageContent {
  slug: string
  title: string
  updated: string
  intro?: string
  sections: LegalSection[]
}

export const LEGAL_PAGES: Record<string, LegalPageContent> = {
  'mentions-legales': {
    slug: 'mentions-legales',
    title: 'Mentions légales',
    updated: 'Dernière mise à jour : janvier 2026',
    sections: [
      {
        heading: 'Éditeur du site',
        paragraphs: [
          "Le site nutritionequine.com (ci-après « le Site ») est édité par Nutrition Équine SAS, Société par actions simplifiée (SAS), au capital social de 2 000 €, immatriculée au RCS sous le numéro 998 932 008 R.C.S. Chartres , dont le siège social est situé à la Folie, 28130 Maintenon.",
          'Numéro de TVA : FR48998932008',
          'Numéro SIRET : 99893200800019',
          'Dirigeant : TOCZE-THIROUIN Clémentine',
          'Directeur de la publication : TOCZE-THIROUIN Clémentine',
          'Contact : contact@nutritionequine.com',
          
        ],
      },
      {
        heading: 'Hébergement',
        paragraphs: [
          "Le Site est hébergé par un prestataire d'hébergement web établi dans l'Union européenne. Les coordonnées complètes de l'hébergeur seront communiquées sur demande à l'adresse ci-dessus.",
        ],
      },
      {
        heading: 'Propriété intellectuelle',
        paragraphs: [
          "L'ensemble des contenus présents sur le Site (textes, visuels, logos, illustrations, structure) est protégé par le droit de la propriété intellectuelle. Toute reproduction, représentation ou exploitation, totale ou partielle, sans autorisation préalable de Nutrition Équine SAS est interdite.",
        ],
      },
      {
        heading: 'Données personnelles',
        paragraphs: [
          "Les informations recueillies via le Site (formulaire de contact, création de compte, commande) font l'objet d'un traitement destiné à la gestion de la relation client. Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données, que vous pouvez exercer en écrivant à contact@nutritionequine.com.",
        ],
      },
      {
        heading: 'Cookies',
        paragraphs: [
          "Le Site peut utiliser des cookies nécessaires à son bon fonctionnement (panier, préférences d'affichage) ainsi que, le cas échéant, des cookies de mesure d'audience. Vous pouvez à tout moment configurer votre navigateur pour refuser les cookies.",
        ],
      },
      {
        heading: 'Médiation et litiges',
        paragraphs: [
          "En cas de litige, le client peut recourir à une médiation conventionnelle ou à tout autre mode alternatif de règlement des différends. Conformément à la réglementation en vigueur, la plateforme de règlement en ligne des litiges de la Commission européenne est également accessible.",
        ],
      },
    ],
  },

  cgv: {
    slug: 'cgv',
    title: 'Conditions générales de vente',
    updated: 'Dernière mise à jour : janvier 2026',
    intro:
      "Les présentes conditions générales de vente (CGV) régissent les relations contractuelles entre Nutrition Équine SAS et toute personne effectuant un achat sur le Site. Toute commande implique l'acceptation sans réserve des présentes CGV.",
    sections: [
      {
        heading: 'Article 1 — Objet',
        paragraphs: [
          "Les présentes CGV s'appliquent à toutes les ventes d'aliments complémentaires et de compléments alimentaires pour chevaux et poneys conclues sur le Site, à distance, entre Nutrition Équine SAS et ses clients.",
        ],
      },
      {
        heading: 'Article 2 — Produits et prix',
        paragraphs: [
          "Les produits proposés à la vente sont ceux figurant sur le Site au jour de la consultation, dans la limite des stocks disponibles. Les prix sont indiqués en euros, toutes taxes comprises (TTC). Nutrition Équine SAS se réserve le droit de modifier ses prix à tout moment, les produits étant facturés sur la base du tarif en vigueur au moment de la validation de la commande.",
        ],
      },
      {
        heading: 'Article 3 — Commande',
        paragraphs: [
          "La commande est validée après confirmation du panier, saisie des informations de livraison et paiement. Un e-mail de confirmation récapitulant la commande est envoyé au client. Nutrition Équine SAS se réserve le droit d'annuler ou de refuser toute commande d'un client avec lequel existerait un litige relatif au paiement d'une commande antérieure.",
        ],
      },
      {
        heading: 'Article 4 — Paiement',
        paragraphs: [
          'Le paiement est exigible immédiatement à la commande. Les moyens de paiement acceptés et les modalités de sécurisation sont détaillés sur la page Paiement du Site.',
        ],
      },
      {
        heading: 'Article 5 — Livraison',
        paragraphs: [
          'Les délais et modalités de livraison sont détaillés sur la page Livraison du Site. Le transfert des risques s\'opère au moment de la remise des produits au transporteur.',
        ],
      },
      {
        heading: 'Article 6 — Droit de rétractation',
        paragraphs: [
          "Conformément au Code de la consommation, le client dispose d'un délai de 14 jours à compter de la réception de sa commande pour exercer son droit de rétractation, sous réserve des exceptions applicables aux denrées et compléments alimentaires descellés. Le détail de cette procédure figure sur la page Retour et remboursement du Site.",
        ],
      },
      {
        heading: 'Article 7 — Garanties',
        paragraphs: [
          'Les produits vendus bénéficient de la garantie légale de conformité et de la garantie contre les vices cachés, dans les conditions prévues par le Code civil et le Code de la consommation.',
        ],
      },
      {
        heading: 'Article 8 — Responsabilité',
        paragraphs: [
          "Les compléments alimentaires proposés sur le Site sont destinés à l'alimentation des équidés et doivent être utilisés conformément aux dosages indiqués. Nutrition Équine SAS ne saurait être tenue responsable d'une utilisation non conforme aux préconisations figurant sur l'emballage ou la fiche produit. En cas de doute, il est recommandé de consulter un vétérinaire.",
        ],
      },
      {
        heading: 'Article 9 — Droit applicable et litiges',
        paragraphs: [
          "Les présentes CGV sont soumises au droit français. En cas de litige, une solution amiable sera recherchée avant toute action judiciaire, les tribunaux français étant seuls compétents à défaut d'accord.",
        ],
      },
    ],
  },

  livraison: {
    slug: 'livraison',
    title: 'Livraison',
    updated: 'Dernière mise à jour : janvier 2026',
    sections: [
      {
        heading: 'Zones de livraison',
        paragraphs: [
          'Nutrition Équine livre en France métropolitaine, en Belgique, au Luxembourg et en Suisse. Pour toute autre destination, contactez notre service client afin d\'obtenir un devis de livraison.',
        ],
      },
      {
        heading: 'Frais et délais',
        paragraphs: [
          "La livraison est offerte en France métropolitaine dès 79 € d'achat. En dessous de ce montant, une participation forfaitaire aux frais de port est appliquée et calculée automatiquement dans le panier selon la destination et le poids de la commande.",
        ],
        list: [
          'France métropolitaine : 2 à 4 jours ouvrés',
          'Belgique, Luxembourg : 3 à 5 jours ouvrés',
          'Suisse : 5 à 8 jours ouvrés (frais de douane éventuels à la charge du destinataire)',
        ],
      },
      {
        heading: 'Transporteurs',
        paragraphs: [
          'Selon le poids et le volume de votre commande, celle-ci est confiée à Colissimo, Chronopost ou un transporteur spécialisé pour les colis volumineux (seaux et sacs de plusieurs kilos). Une livraison en point relais est proposée pour les colis éligibles.',
        ],
      },
      {
        heading: 'Suivi de commande',
        paragraphs: [
          "Dès l'expédition de votre commande, un e-mail contenant le numéro de suivi vous est envoyé. Vous pouvez également suivre l'état de votre commande depuis la rubrique « Suivi de commande » accessible depuis votre compte.",
        ],
      },
      {
        heading: 'Colis manquant ou endommagé',
        paragraphs: [
          "En cas de colis manquant, endommagé ou de retard anormal, contactez notre service client dans les 7 jours suivant la date de livraison indiquée afin que nous puissions ouvrir une enquête auprès du transporteur.",
        ],
      },
    ],
  },

  'retours-remboursement': {
    slug: 'retours-remboursement',
    title: 'Retour et remboursement',
    updated: 'Dernière mise à jour : janvier 2026',
    sections: [
      {
        heading: 'Droit de rétractation',
        paragraphs: [
          "Conformément au Code de la consommation, vous disposez d'un délai de 14 jours calendaires à compter de la réception de votre commande pour exercer votre droit de rétractation, sans avoir à justifier de motif.",
        ],
      },
      {
        heading: 'Exception applicable aux produits alimentaires',
        paragraphs: [
          "Nos compléments et aliments pour chevaux étant des denrées scellées pour des raisons d'hygiène et de conservation, ils ne peuvent être ni repris ni échangés une fois l'emballage ouvert, sauf en cas de produit non conforme ou défectueux. Seuls les produits dans leur emballage d'origine, non ouverts et non entamés, peuvent faire l'objet d'un retour.",
        ],
      },
      {
        heading: 'Procédure de retour',
        paragraphs: [
          'Pour retourner un article, contactez notre service client à contact@nutritionequine.com en indiquant votre numéro de commande. Nous vous communiquerons la marche à suivre et, si nécessaire, une adresse de retour. Les frais de retour sont à la charge du client, sauf en cas de produit non conforme ou erreur de notre part.',
        ],
        list: [
          "Produit dans son emballage d'origine, non ouvert",
          'Accompagné de la facture ou du numéro de commande',
          'Retour expédié dans les 14 jours suivant la demande',
        ],
      },
      {
        heading: 'Remboursement',
        paragraphs: [
          'Le remboursement est effectué par le même moyen de paiement que celui utilisé lors de la commande, dans un délai maximum de 14 jours après réception et contrôle du produit retourné. Les frais de livraison initiaux sont remboursés uniquement en cas de retour intégral de la commande.',
        ],
      },
      {
        heading: 'Produit non conforme ou endommagé',
        paragraphs: [
          "Si vous recevez un produit non conforme, défectueux ou endommagé pendant le transport, contactez-nous sous 7 jours avec une photo du produit concerné : nous procédons à un échange ou à un remboursement intégral, frais de retour inclus.",
        ],
      },
    ],
  },

  paiement: {
    slug: 'paiement',
    title: 'Paiement',
    updated: 'Dernière mise à jour : janvier 2026',
    sections: [
      {
        heading: 'Moyens de paiement acceptés',
        paragraphs: ['Le règlement de votre commande peut s\'effectuer par :'],
        list: [
          'Carte bancaire (Visa, Mastercard)',
          'PayPal',
          'Paiement en plusieurs fois sans frais (dès 100 € d\'achat), via notre partenaire de paiement fractionné',
        ],
      },
      {
        heading: 'Sécurité des paiements',
        paragraphs: [
          "Toutes les transactions sont chiffrées et sécurisées via le protocole SSL et l'authentification 3D Secure. Nutrition Équine SAS ne stocke à aucun moment les données bancaires de ses clients : celles-ci sont directement traitées par notre prestataire de paiement certifié.",
        ],
      },
      {
        heading: 'Facturation',
        paragraphs: [
          "Une facture est automatiquement générée et envoyée par e-mail après validation de votre commande. Elle est également téléchargeable à tout moment depuis votre espace client.",
        ],
      },
      {
        heading: 'Paiement à un tiers',
        paragraphs: [
          "Depuis votre panier, vous pouvez générer un lien de paiement à transmettre à un tiers (club, propriétaire, association) qui souhaite régler votre commande à votre place.",
        ],
      },
    ],
  },
}
