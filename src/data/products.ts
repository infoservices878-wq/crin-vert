import type { Product } from '../types'

/**
 * Catalogue local — produits gérés dans le code.
 * WooCommerce : connexion et paiement uniquement (pas l’API produits).
 */
export const PRODUCTS: Product[] = [
  {
    id: '1',
    slug: 'cmv-entretien-performance',
    sku: 'CE2012',
    name: 'CMV Entretien & Performance',
    category: 'alimentation',
    categoryLabel: 'Aliments & CMV',
    tagline:
      "Sans fer ajouté — l'équilibre minéral optimal pour votre cheval",
    price: 19.81,
    rating: 4.8,
    reviewCount: 47,
    format: '1 kg',
    sizes: ['1 kg', '3 kg'],
    description:
      "Complément minéral vitaminé granulé à froid, sans fer ajouté, pour équilibrer la ration du cheval à l'entretien ou au travail, quel que soit son niveau d'activité.\n\nPourquoi une formule sans fer ajouté : le foin et l'herbe apportent déjà du fer ; un excès entre en concurrence avec le cuivre et le zinc. Cette formule apporte 2 500 mg de cuivre et 7 500 mg de zinc par kilo, dont une part en chélates de glycine.\n\nElle associe 10 000 mg de lysine et 3 000 mg de méthionine par kilo, 14 vitamines (dont 10 000 mg de vitamine E et 20 mg de biotine), et une granulation à froid qui préserve les vitamines thermosensibles.\n\nPour le cheval nourri au fourrage et/ou céréales simples, loisir, sport ou sénior. Un cheval déjà nourri avec un aliment industriel complet n'a en général pas besoin d'un apport plein.",
    benefits: [
      'Sans fer ajouté — meilleure absorption du cuivre et du zinc',
      'Cuivre 2 500 mg/kg et zinc 7 500 mg/kg (partiellement chélatés)',
      'Lysine 10 000 mg/kg et méthionine 3 000 mg/kg',
      '14 vitamines dont E 10 000 mg/kg et biotine 20 mg/kg',
      'Granulation à froid',
      'Calcium 16,6 %, magnésium 5,3 %, phosphore 2 %',
    ],
    composition: [
      { label: 'Matières premières', value: 'Carbonate de calcium, remoulage de blé, oxyde de magnésium, phosphate dicalcique, lithothamne, dextrine, sucre' },
      { label: 'Calcium', value: '16,6 %' },
      { label: 'Sodium', value: '< 0,1 %' },
      { label: 'Phosphore', value: '2,0 %' },
      { label: 'Magnésium', value: '5,3 %' },
      { label: 'Zinc (total)', value: '7 500 mg/kg' },
      { label: 'Cuivre (total)', value: '2 500 mg/kg' },
      { label: 'Vitamine E', value: '10 000 mg/kg' },
      { label: 'Biotine', value: '20 mg/kg' },
      { label: 'Lysine', value: '10 000 mg/kg' },
      { label: 'Méthionine', value: '3 000 mg/kg' },
    ],
    posologie:
      'À distribuer dans la ration, avec le gobelet fourni.\nCheval : 50 g/jour.\nPoney : 25 g/jour.\n1 kg ≈ 20 jours (cheval) / 40 jours (poney).\nComplément de fond à distribuer en continu.',
    nutritionAnalysis: {
      analytical: [
        { label: 'Calcium', value: '16,6 %' },
        { label: 'Phosphore', value: '2,0 %' },
        { label: 'Magnésium', value: '5,3 %' },
        { label: 'Sodium', value: '< 0,1 %' },
      ],
      minerals: [
        { label: 'Zinc', value: '7 500 mg/kg' },
        { label: 'Cuivre', value: '2 500 mg/kg' },
        { label: 'Vitamine E', value: '10 000 mg/kg' },
        { label: 'Biotine', value: '20 mg/kg' },
      ],
      notes:
        'Sans fer ajouté. Granulation à froid. Ne pas cumuler avec un aliment complet déjà minéralisé à dose pleine.',
    },
    image:
      'https://www.cheval-energy.com/fr/28240-large_default/cheval-energy-cmv-entretien-performance.jpg',
  },
  {
    id: '2',
    slug: 'reverdy-racing-balancer',
    sku: 'RV1031',
    name: 'Reverdy - Racing Balancer',
    category: 'alimentation',
    categoryLabel: 'Aliments & CMV',
    tagline:
      'Aliment en granulés correcteur de céréales — cheval de course et de sport',
    price: 80,
    rating: 4.6,
    reviewCount: 23,
    format: '2 sacs de 20 kg',
    sizes: [
      '2 sacs de 20 kg',
      '4 sacs de 20 kg',
      '6 sacs de 20 kg',
      '8 sacs de 20 kg',
      '10 sacs de 20 kg',
      '25 sacs de 20 kg',
      '35 sacs de 20 kg',
      '1 palette – 50 sacs de 20 kg',
      '2 palettes – 100 sacs de 20 kg',
    ],
    description:
      "Racing Balancer de Reverdy — aliment en granulés avec flocons de maïs, correcteur de céréales pour corriger les déséquilibres des céréales utilisées dans l'alimentation du cheval de course ou de sport soumis à des efforts réguliers.\n\nDistribué en complément d'une base de céréales, il joue le rôle de correcteur de ration. Distribué seul, il devient l'aliment principal, avec des quantités journalières plus élevées.\n\nLa quantité journalière se distribue en trois repas répartis sur la journée. La ration se pèse plutôt qu'elle ne se mesure au volume. Tout changement s'installe par paliers sur une à deux semaines.\n\nPour le cheval de course ou de sport à l'effort régulier. Chez le cheval de course, privilégier l'avoine plutôt que l'orge.",
    benefits: [
      'Aliment en granulés pour chevaux',
      'Correcteur de ration céréalière ou aliment principal',
      'Cheval de course ou de sport à l\'effort régulier',
      'Distribution en trois repas par jour',
      'Transition progressive sur 1 à 2 semaines',
    ],
    composition: [
      { label: 'Composition', value: 'Non communiquée par le fabricant' },
    ],
    posologie:
      "Adapter la quantité selon l'usage (correcteur de céréales ou aliment principal). Fractionner en 3 repas répartis dans la journée. Adapter activité, mode de vie et état de santé. Pour un cheval de course, privilégier des repas à base d'avoine plutôt que d'orge. Stocker dans un local sec et ventilé, à l'abri des rongeurs.",
    image:
      'https://www.cheval-energy.com/fr/26613-large_default/reverdy-racing-balancer-prix-degressif.jpg',
  },
  {
    id: '3',
    slug: 'reverdy-training',
    sku: 'RV1025',
    name: 'Reverdy - Training',
    category: 'alimentation',
    categoryLabel: 'Aliments & CMV',
    tagline:
      'Aliment complet en granulés pour cheval de courses à l\'entraînement (ex-Trotting)',
    price: 74,
    rating: 4.7,
    reviewCount: 31,
    format: '2 sacs de 20 kg',
    sizes: [
      '2 sacs de 20 kg',
      '4 sacs de 20 kg',
      '6 sacs de 20 kg',
      '8 sacs de 20 kg',
      '10 sacs de 20 kg',
      '25 sacs de 20 kg',
      '35 sacs de 20 kg',
      '1 palette – 50 sacs de 20 kg',
      '2 palettes – 100 sacs de 20 kg',
    ],
    description:
      "Training de Reverdy (anciennement Trotting) — aliment sous forme de granulés avec flocons de maïs pour l'alimentation du cheval de courses, apport énergétique élevé et bonne digestibilité.\n\nAliment complet de la période d'entraînement, entre l'aliment d'entretien et les formules réservées aux charges les plus lourdes. Servir à heures fixes, fractionner en plusieurs repas de volume modéré, maintenir une eau propre accessible en permanence. Le fourrage reste la base de la ration.\n\nPour cheval de courses à l'entraînement ou cheval adulte en travail régulier et soutenu. Transition d'un aliment à l'autre sur une à deux semaines.",
    benefits: [
      'Aliment complet en granulés pour cheval à l\'entraînement',
      'Anciennement commercialisé sous le nom Trotting',
      'Plusieurs repas de volume modéré dans la journée',
      'Fourrage maintenu comme base de la ration',
      'Transition progressive sur 1 à 2 semaines',
    ],
    composition: [
      { label: 'Composition', value: 'Non communiquée par le fabricant' },
    ],
    posologie:
      "Adapter les quantités à la charge de travail et à l'apport de fourrage. Fractionner en plusieurs repas de volume modéré, à horaires réguliers. Conduire tout changement d'aliment sur une à deux semaines. Maintenir le fourrage et un abreuvement permanent.",
    image:
      'https://www.cheval-energy.com/fr/26616-large_default/training-reverdy.jpg',
  },
]
