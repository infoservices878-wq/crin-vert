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
    categoryLabel: 'Alimentation & CMV',
    tagline:
      "Sans fer ajouté — l'équilibre minéral optimal pour votre cheval",
    price: 19.81,
    rating: 0,
    reviewCount: 0,
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
]
