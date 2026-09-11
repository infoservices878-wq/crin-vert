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

const COMPANY = 'NUTRITION EQUINE, SARL au capital de 2 000 €, inscrite au RCS de Chartres sous le n° 998 932 008'
const ADDRESS = 'La Folie, 28130 Maintenon, France'
const CONTACT = 'info@equinutrition.fr'
const UPDATED = 'Dernière mise à jour : Mars 2026'

export const LEGAL_PAGES: Record<string, LegalPageContent> = {
  'mentions-legales': {
    slug: 'mentions-legales',
    title: 'Mentions légales',
    updated: UPDATED,
    intro: 'Ces informations permettent d’identifier l’éditeur du site et de contacter Nutrition Equine en toute transparence.',
    sections: [
      {
        heading: 'Éditeur du site',
        paragraphs: [
          `Le site https://equinutrition.fr (le « Site ») est édité par ${COMPANY}.`,
          `Siège social : ${ADDRESS}. SIREN : 998 932 008. SIRET du siège : 998 932 008 00019. TVA intracommunautaire : FR48 998 932 008. Code APE : 10.91Z — Fabrication d’aliments pour animaux de ferme.`,
          `La directrice de la publication est Mme Clémentine TOCZE-THIROUIN, gérante. Pour toute demande : ${CONTACT}.`,
        ],
      },
      {
        heading: 'Propriété intellectuelle',
        paragraphs: [
          'La structure du Site, ses textes, logos, éléments graphiques, bases de données et contenus éditoriaux sont protégés par le droit de la propriété intellectuelle. Toute reproduction, adaptation, extraction ou diffusion sans autorisation écrite préalable de Nutrition Equine est interdite, sauf exception légale.',
          'Les marques, visuels et dénominations de tiers restent la propriété de leurs titulaires respectifs. Leur présence éventuelle sur le Site ne vaut ni transfert de droit ni affiliation.',
        ],
      },
      {
        heading: 'Responsabilité et informations produits',
        paragraphs: [
          'Les informations présentées ont un rôle informatif. Les aliments et compléments destinés aux équidés doivent être utilisés conformément à leur étiquetage, leur dosage et les précautions indiquées. Ils ne remplacent ni une ration adaptée, ni l’avis d’un vétérinaire.',
          'Nutrition Equine veille à l’exactitude des contenus publiés, sans pouvoir garantir l’absence absolue d’erreur ou la disponibilité continue du Site. Toute erreur matérielle peut être signalée à l’adresse de contact ci-dessus.',
        ],
      },
      {
        heading: 'Données personnelles et cookies',
        paragraphs: [
          'Nutrition Equine traite certaines données personnelles pour la gestion du Site, des demandes, des comptes et des commandes. Les informations détaillées figurent dans la Politique de confidentialité.',
          'Le Site utilise des traceurs strictement nécessaires à son fonctionnement. Tout traceur non essentiel est soumis au choix préalable de l’utilisateur conformément à la réglementation applicable.',
        ],
      },
      {
        heading: 'Réclamations, médiation et droit applicable',
        paragraphs: [
          `Toute réclamation doit d’abord être adressée à ${CONTACT}, avec les éléments utiles (numéro de commande, objet de la demande et coordonnées).`,
          'Après tentative de résolution amiable, un consommateur peut recourir gratuitement au médiateur de la consommation dont relève Nutrition Equine. Ses coordonnées seront publiées ici dès la désignation formelle du médiateur par la société, avant l’ouverture des ventes aux consommateurs.',
          'Le droit français s’applique, sans priver les consommateurs résidant dans un autre État de l’Union européenne des dispositions impératives protectrices de leur pays de résidence. Les juridictions compétentes sont déterminées par les règles légales applicables.',
        ],
      },
    ],
  },

  cgv: {
    slug: 'cgv',
    title: 'Conditions générales de vente',
    updated: UPDATED,
    intro: `Les présentes conditions générales de vente (« CGV ») s’appliquent aux ventes conclues à distance entre ${COMPANY} (« Nutrition Equine », « nous ») et tout client achetant sur le Site. Elles sont disponibles avant toute commande et sont archivables par le client.`,
    sections: [
      {
        heading: '1. Produits, destination et informations précontractuelles',
        paragraphs: [
          'Le Site propose notamment des aliments, compléments et produits liés à la nutrition équine. Les caractéristiques essentielles, formats, précautions d’emploi, prix TTC et informations disponibles au moment de la commande figurent sur les fiches produits.',
          'Les conseils diffusés par Nutrition Equine sont généraux. Le client reste responsable du choix du produit au regard de la situation de l’équidé, de son alimentation et de son état de santé. En cas de doute, il doit demander l’avis d’un professionnel compétent, notamment d’un vétérinaire.',
        ],
      },
      {
        heading: '2. Prix, disponibilité et commande',
        paragraphs: [
          'Les prix sont exprimés en euros TTC, hors frais de livraison éventuellement applicables. Les frais, modalités de livraison et total de la commande sont présentés avant la confirmation. Les offres sont valables tant qu’elles sont visibles sur le Site et dans la limite des stocks disponibles.',
          'Le client vérifie le détail de son panier et renseigne les informations nécessaires à l’exécution de sa commande. La réception de la demande est confirmée par e-mail. Nutrition Equine peut refuser ou annuler une demande en cas d’information manifestement erronée, d’indisponibilité, de défaut de règlement antérieur ou de suspicion de fraude, et en informant le client.',
        ],
      },
      {
        heading: '3. Paiement et formation de la vente',
        paragraphs: [
          'Le règlement est actuellement effectué par virement bancaire. Après l’enregistrement de la commande, les coordonnées bancaires et la référence à indiquer sont adressées par e-mail au client.',
          'La commande est traitée sous réserve de la réception effective du virement correspondant. Le client doit utiliser la référence communiquée afin de permettre le rapprochement du paiement. Aucun numéro de carte bancaire n’est demandé ni conservé par Nutrition Equine dans le cadre du parcours actuel.',
        ],
      },
      {
        heading: '4. Livraison internationale',
        paragraphs: [
          'Nutrition Equine livre les destinations affichées lors du passage de commande. Les délais communiqués sont indicatifs, exprimés en jours ouvrés et courent après confirmation du règlement, sous réserve de l’exactitude de l’adresse et de l’absence de difficulté de transport.',
          'Pour une livraison hors de France ou hors de l’Union européenne, le client est responsable de vérifier les règles applicables à l’importation. Les droits de douane, taxes, formalités et frais éventuellement exigés à destination restent à sa charge, sauf indication contraire écrite de Nutrition Equine.',
        ],
      },
      {
        heading: '5. Réception, transfert des risques et réclamations',
        paragraphs: [
          'Le client doit vérifier l’état apparent du colis à la livraison. En cas d’anomalie, il est invité à émettre des réserves précises auprès du transporteur, à conserver les éléments utiles et à contacter Nutrition Equine sans délai avec des photographies.',
          'Lorsque le client est un consommateur, les risques liés au bien sont transférés lors de sa prise de possession physique ou de celle d’un tiers désigné par lui, conformément aux règles applicables.',
        ],
      },
      {
        heading: '6. Droit de rétractation et retours',
        paragraphs: [
          'Le consommateur dispose en principe d’un délai de quatorze jours à compter de la réception du bien pour exercer son droit de rétractation. Les modalités pratiques, les exceptions liées aux produits scellés et le modèle de formulaire sont présentés sur la page Retour et remboursement.',
          'Les clients professionnels ne bénéficient pas automatiquement du droit de rétractation réservé aux consommateurs ; toute demande éventuelle est étudiée au cas par cas, sans renonciation aux droits de Nutrition Equine.',
        ],
      },
      {
        heading: '7. Garanties légales',
        paragraphs: [
          'Les consommateurs bénéficient de la garantie légale de conformité et de la garantie contre les vices cachés dans les conditions prévues par les textes applicables. Ces garanties s’appliquent indépendamment de toute garantie commerciale éventuelle.',
          `Pour les mettre en œuvre, contactez ${CONTACT} en indiquant la référence de commande, une description précise du problème et, lorsque cela est utile, des photographies.`,
        ],
      },
      {
        heading: '8. Service client, médiation et litiges',
        paragraphs: [
          `Le service client est joignable à ${CONTACT}. Nous nous engageons à examiner les demandes avec diligence et à rechercher une solution amiable.`,
          'Après une réclamation écrite restée sans solution, le consommateur peut saisir gratuitement le médiateur de la consommation dont relève Nutrition Equine. Les coordonnées du médiateur seront ajoutées dès sa désignation formelle, avant l’ouverture des ventes aux consommateurs.',
          'Les présentes CGV sont soumises au droit français sous réserve des dispositions impératives protectrices applicables au consommateur dans son pays de résidence. Aucune clause ne prive le consommateur de son droit de saisir la juridiction compétente selon les règles légales applicables.',
        ],
      },
    ],
  },

  livraison: {
    slug: 'livraison',
    title: 'Livraison',
    updated: UPDATED,
    intro: 'Nous préparons les commandes avec une attention particulière au conditionnement, à la traçabilité et aux contraintes de transport des produits de nutrition équine.',
    sections: [
      {
        heading: 'Destinations desservies',
        paragraphs: [
          'Les options proposées au checkout dépendent de l’adresse de livraison, du poids, du volume et de la nature des produits. La France métropolitaine est prise en charge en standard ; certaines destinations européennes peuvent être ouvertes selon les solutions de transport disponibles.',
          'Pour une livraison hors zone affichée, une commande de volume important, une écurie difficile d’accès ou une demande d’exportation, contactez-nous avant commande afin de recevoir une proposition adaptée.',
        ],
      },
      {
        heading: 'Préparation, frais et délais',
        paragraphs: [
          'Les commandes sont préparées après réception et rapprochement du règlement. Les frais de livraison, le transporteur sélectionné et le délai indicatif sont affichés avant confirmation. La livraison est offerte en France métropolitaine à partir de 155 € de produits, sauf restriction clairement indiquée dans le panier.',
          'Les délais de préparation et de transport sont exprimés en jours ouvrés. Ils peuvent être prolongés en période de forte activité, en cas d’intempérie, de contrôle douanier, de fermeture exceptionnelle ou de circonstances indépendantes de notre volonté.',
        ],
      },
      {
        heading: 'Transport, suivi et réception',
        paragraphs: [
          'Le transporteur est choisi selon les caractéristiques de la commande. Dès l’expédition, le client reçoit les informations disponibles pour suivre l’acheminement. L’absence de suivi immédiat ne signifie pas que le colis n’est pas pris en charge : certains flux sont activés après la première lecture transporteur.',
          'Le client doit s’assurer que l’adresse, le nom sur la boîte aux lettres, le téléphone et les conditions d’accès sont exacts. Des frais peuvent être facturés en cas de réexpédition causée par une adresse erronée, un refus injustifié ou une absence prolongée.',
        ],
      },
      {
        heading: 'Livraison hors de France et douanes',
        paragraphs: [
          'Lorsqu’une destination internationale est acceptée, les délais varient selon le pays et le réseau du transporteur. Le client est invité à vérifier les restrictions d’importation, particulièrement pour les aliments et compléments destinés aux animaux.',
          'Hors Union européenne, les droits de douane, taxes locales, frais de présentation et formalités imposés par les autorités sont dus par le destinataire, sauf indication contraire communiquée avant commande.',
        ],
      },
      {
        heading: 'Colis endommagé, manquant ou retardé',
        paragraphs: [
          `En cas de colis endommagé, de produit manquant ou de retard anormal, contactez ${CONTACT} dès que possible avec le numéro de commande, des photos du colis et de son contenu, ainsi que toute réserve émise à la livraison. Nous ouvrirons les vérifications nécessaires auprès du transporteur.`,
        ],
      },
    ],
  },

  'retours-remboursement': {
    slug: 'retours-remboursement',
    title: 'Retour et remboursement',
    updated: UPDATED,
    intro: 'Notre procédure de retour concilie le droit des consommateurs, la sécurité des produits destinés aux animaux et la traçabilité indispensable à leur commercialisation.',
    sections: [
      {
        heading: 'Droit de rétractation',
        paragraphs: [
          'Lorsque vous êtes consommateur, vous disposez en principe de quatorze jours calendaires à compter de la réception du bien pour nous notifier votre décision de vous rétracter, sans avoir à justifier de motif. Vous devez ensuite renvoyer le bien dans les quatorze jours suivant cette notification.',
          `Pour exercer ce droit, envoyez une déclaration dénuée d’ambiguïté à ${CONTACT}, en indiquant votre nom, votre adresse, votre numéro de commande et les produits concernés.`,
        ],
      },
      {
        heading: 'Produits exclus pour raisons d’hygiène et de protection de la santé',
        paragraphs: [
          'Le droit de rétractation ne s’applique pas aux biens scellés qui ont été descellés après livraison et ne peuvent être renvoyés pour des raisons d’hygiène ou de protection de la santé. Cette exception est notamment susceptible de concerner les aliments et compléments ouverts ou dont le scellement a été retiré.',
          'Les produits non ouverts, dans leur emballage d’origine intact et permettant leur remise en vente, peuvent être examinés dans le cadre de la procédure de retour, sous réserve des conditions légales applicables.',
        ],
      },
      {
        heading: 'Conditions pratiques du retour',
        paragraphs: [
          'Contactez le service client avant tout envoi afin de recevoir les instructions et l’adresse de retour adaptées. Le client doit protéger correctement les produits durant le transport retour et conserver une preuve d’expédition.',
        ],
        list: [
          'Référence de commande et coordonnées du client jointes au colis ;',
          'Produit complet, propre, non ouvert et dans son emballage d’origine lorsque le retour relève de la rétractation ;',
          'Frais de retour à la charge du client, sauf erreur de Nutrition Equine, produit non conforme, défectueux ou endommagé à la réception.',
        ],
      },
      {
        heading: 'Remboursement',
        paragraphs: [
          'En cas de rétractation valable, Nutrition Equine rembourse les sommes dues, y compris les frais de livraison standard initiaux lorsque la commande entière est retournée, au plus tard dans les quatorze jours suivant la notification. Le remboursement peut être différé jusqu’à récupération des biens ou réception d’une preuve d’expédition, selon l’événement intervenant le plus tôt.',
          'Pour un règlement par virement, le remboursement est réalisé par virement sur les coordonnées bancaires communiquées de manière sécurisée par le client. Les frais supplémentaires de livraison choisis volontairement par le client ne sont pas remboursés au-delà du coût de la livraison standard.',
        ],
      },
      {
        heading: 'Produit non conforme, erreur ou dommage',
        paragraphs: [
          `Si vous recevez un produit non conforme, défectueux, incomplet ou endommagé, contactez ${CONTACT} sans tarder avec votre référence de commande et des photos. N’utilisez pas le produit avant nos instructions, sauf nécessité liée à la sécurité de l’animal. Nous organiserons, selon le cas, un remplacement, un retour pris en charge ou un remboursement conformément aux garanties légales.`,
        ],
      },
      {
        heading: 'Modèle de déclaration de rétractation',
        paragraphs: [
          'À l’attention de NUTRITION EQUINE, Lieu-dit La Folie, 28130 Maintenon, France, ou par e-mail à info@equinutrition.fr : « Je vous notifie par la présente ma rétractation du contrat portant sur la vente du ou des produits ci-dessous : [désignation], commandé(s) le [date], reçu(s) le [date], nom du consommateur : [nom], adresse : [adresse], date et signature si envoi postal. »',
        ],
      },
    ],
  },

  paiement: {
    slug: 'paiement',
    title: 'Paiement',
    updated: UPDATED,
    sections: [
      {
        heading: 'Virement bancaire',
        paragraphs: [
          'Le paiement est actuellement réalisé par virement bancaire. Une fois la commande enregistrée, nous transmettons par e-mail les coordonnées de règlement et la référence à reporter impérativement dans le libellé du virement.',
          'La préparation commence après identification du règlement. En cas de virement effectué par un tiers (écurie, club, association ou propriétaire), le client doit nous prévenir afin de faciliter le rapprochement.',
        ],
      },
      {
        heading: 'Sécurité et prévention de la fraude',
        paragraphs: [
          'Les échanges avec le Site utilisent HTTPS. Nutrition Equine ne demande ni ne conserve de données de carte bancaire dans le parcours de commande actuel. Vérifiez toujours l’adresse de l’expéditeur de nos e-mails et la référence de commande avant tout virement.',
          `En cas de doute sur une instruction de paiement, ne procédez pas au règlement et contactez-nous exclusivement à ${CONTACT}.`,
        ],
      },
      {
        heading: 'Justificatifs et facture',
        paragraphs: [
          'L’e-mail de confirmation comporte la référence permettant d’identifier votre commande. Pour une facture ou une correction d’informations de facturation, contactez le service client avant l’expédition lorsque cela est possible.',
        ],
      },
    ],
  },

  'politique-de-confidentialite': {
    slug: 'politique-de-confidentialite',
    title: 'Politique de confidentialité',
    updated: UPDATED,
    intro: `Nutrition Equine s’engage à traiter les données personnelles de façon loyale, transparente et proportionnée. Cette politique décrit les traitements réalisés lorsque vous utilisez le Site, créez un compte, commandez ou contactez notre équipe.`,
    sections: [
      {
        heading: 'Responsable du traitement et contact',
        paragraphs: [
          `${COMPANY}, dont le siège est situé ${ADDRESS}, est responsable des traitements décrits dans cette politique.`,
          `Pour toute question relative à vos données ou pour exercer vos droits : ${CONTACT}. Merci d’indiquer « Données personnelles » dans l’objet de votre message.`,
        ],
      },
      {
        heading: 'Données traitées',
        paragraphs: [
          'Selon votre utilisation du Site, nous pouvons traiter vos données d’identification et de contact, vos informations de compte, de commande, de livraison, de règlement, les échanges avec le service client et les données techniques indispensables à la sécurité et au fonctionnement du Site.',
          'Dans le cadre d’un bilan équin, nous pouvons également traiter les informations que vous choisissez de communiquer sur l’équidé, son alimentation, son activité ou son environnement. Ces informations concernent l’animal ; nous vous demandons de ne pas transmettre de données de santé humaine non nécessaires.',
        ],
      },
      {
        heading: 'Finalités et bases juridiques',
        paragraphs: [
          'Nous traitons vos données pour exécuter la commande, organiser la livraison, répondre à vos demandes, gérer le compte client et assurer le service après-vente. Ces traitements sont nécessaires à l’exécution de mesures précontractuelles ou du contrat.',
          'Nous pouvons aussi traiter certaines données pour respecter nos obligations comptables, fiscales et de sécurité, ainsi que pour prévenir la fraude et défendre nos droits, sur la base de nos obligations légales ou de notre intérêt légitime.',
          'L’envoi de communications commerciales par e-mail repose sur votre consentement lorsque celui-ci est requis. Vous pouvez vous désinscrire à tout moment depuis le lien inclus dans les messages ou en nous contactant.',
        ],
      },
      {
        heading: 'Destinataires et transferts',
        paragraphs: [
          'Vos données sont accessibles uniquement aux personnes habilitées de Nutrition Equine et aux prestataires nécessaires à la fourniture du service : hébergement, WordPress/WooCommerce, messagerie transactionnelle, transport, comptabilité et assistance technique. Ils interviennent dans le cadre de nos instructions et, le cas échéant, d’engagements contractuels appropriés.',
          'Lorsque certains prestataires traitent des données hors de l’Espace économique européen, nous veillons à ce que le transfert soit encadré par un mécanisme reconnu par la réglementation applicable, tel qu’une décision d’adéquation ou des clauses contractuelles types, lorsque cela est nécessaire.',
        ],
      },
      {
        heading: 'Durées de conservation',
        paragraphs: [
          'Les données de compte et de relation client sont conservées pendant la durée nécessaire à la gestion du compte et de la relation commerciale, puis archivées ou supprimées selon les obligations applicables. Les données de prospection sont conservées pendant trois ans à compter du dernier contact ou jusqu’au retrait du consentement, sous réserve de la preuve d’opposition.',
          'Les données de facturation et pièces comptables sont archivées pendant la durée légale applicable, généralement dix ans. Les données techniques de sécurité sont conservées pour une durée limitée et proportionnée à la prévention des incidents.',
        ],
      },
      {
        heading: 'Vos droits',
        paragraphs: [
          'Vous pouvez demander l’accès à vos données, leur rectification, leur effacement, la limitation du traitement, leur portabilité lorsque les conditions sont réunies, ou vous opposer à certains traitements. Vous pouvez retirer votre consentement à tout moment pour les traitements fondés sur celui-ci.',
          'Nous pouvons demander un justificatif d’identité en cas de doute raisonnable afin de protéger vos données. Si vous estimez, après nous avoir contactés, que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la CNIL.',
        ],
      },
      {
        heading: 'Cookies et gestion des préférences',
        paragraphs: [
          'Le Site utilise des traceurs strictement nécessaires, notamment pour le panier, la session de connexion, la sécurité et la mémorisation de votre choix de consentement. Ils ne requièrent pas de consentement lorsqu’ils sont indispensables au service demandé.',
          'Si des outils de mesure d’audience ou des traceurs non essentiels sont activés, ils ne doivent être déposés qu’après votre choix préalable, sauf exception réglementaire. Vous pouvez modifier votre choix à tout moment depuis le lien « Gérer mes cookies » disponible dans le pied de page.',
        ],
      },
      {
        heading: 'Sécurité et mise à jour de la politique',
        paragraphs: [
          'Nous mettons en œuvre des mesures techniques et organisationnelles raisonnables : HTTPS, accès restreints, authentification, sauvegardes et journalisation de sécurité. Aucun système n’offrant une sécurité absolue, nous vous invitons à utiliser un mot de passe unique et à ne jamais transmettre vos identifiants.',
          'Cette politique peut évoluer pour tenir compte d’une modification de nos services, de nos prestataires ou de la réglementation. La date de mise à jour indique la version applicable.',
        ],
      },
    ],
  },
}
