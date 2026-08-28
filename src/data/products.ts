import type { Product } from '../types'

/**
 * Images : photos libres (Pexels / Unsplash), une par produit pour un rendu distinct.
 * En production, remplacer par vos packshots (seaux / pots).
 */
export const PRODUCTS: Product[] = [
  {
    id: '1',
    slug: 'cmv-entretien',
    sku: 'CV-1001',
    name: 'CMV Entretien',
    category: 'alimentation',
    tagline: 'La base minérale et vitaminée du quotidien',
    price: 42,
    rating: 4.8,
    reviewCount: 126,
    format: 'Seau 3 kg — 60 jours',
    sizes: ['Seau 3 kg', 'Seau 5 kg', 'Lot 2 × 3 kg'],
    description:
      "Un complément minéral vitaminé formulé pour couvrir les besoins d'un cheval au repos ou en travail modéré. Équilibre le rapport phospho-calcique souvent déficient dans les fourrages et rations classiques.",
    benefits: ['Équilibre phospho-calcique', 'Oligo-éléments chélatés', 'Vitamines A, D3, E'],
    composition: [
      { label: 'Calcium', value: '18,2 %' },
      { label: 'Phosphore', value: '6,4 %' },
      { label: 'Magnésium', value: '3,1 %' },
      { label: 'Vitamine E', value: '4 500 UI/kg' },
      { label: 'Zinc chélaté', value: '2 800 mg/kg' },
    ],
    posologie: '50 g par jour pour 500 kg, à mélanger à la ration.',
    // Cheval mangeant dans un seau — idéal pour CMV quotidien
    nutritionAnalysis: {
      analytical: [
        { label: 'Calcium', value: '18,2 %' },
        { label: 'Phosphore', value: '6,4 %' },
        { label: 'Magnésium', value: '3,1 %' },
      ],
      minerals: [
        { label: 'Zinc chélaté', value: '2 800 mg/kg' },
        { label: 'Vitamine E', value: '4 500 UI/kg' },
        { label: 'Vitamines A, D3', value: 'apportées' },
      ],
      notes:
        'Complément minéral vitaminé (CMV) — ne remplace pas le fourrage. Respecter la posologie selon le poids et le travail.',
    },
    image:
      'https://images.pexels.com/photos/7882510/pexels-photo-7882510.jpeg',
  },
  {
    id: '2',
    slug: 'cmv-sport-performance',
    sku: 'CV-1002',
    name: 'CMV Sport & Performance',
    category: 'alimentation',
    tagline: 'Renfort minéral pour chevaux au travail intensif',
    price: 54,
    compareAtPrice: 61,
    rating: 4.7,
    reviewCount: 89,
    format: 'Seau 4 kg — 40 jours',
    sizes: ['Seau 4 kg', 'Seau 8 kg', 'Lot 2 × 4 kg'],
    description:
      "Conçu pour les chevaux d'effort : compétition, saut d'obstacles, endurance. Renforce les apports en électrolytes et antioxydants pour soutenir la récupération musculaire.",
    benefits: ['Électrolytes renforcés', 'Antioxydants naturels', 'Soutien musculaire'],
    composition: [
      { label: 'Sodium', value: '4,8 %' },
      { label: 'Potassium', value: '2,2 %' },
      { label: 'Vitamine E', value: '8 000 UI/kg' },
      { label: 'Sélénium', value: '12 mg/kg' },
    ],
    posologie: "100 g par jour les jours d'effort, 50 g les jours de repos.",
    // Cheval à l'effort / portrait dynamique
    image:
      'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a',
  },
  {
    id: '3',
    slug: 'ulcero-plus',
    sku: 'CV-1003',
    name: 'Ulcéro+',
    category: 'digestion',
    tagline: 'Confort gastrique et flore intestinale',
    price: 39,
    rating: 4.9,
    reviewCount: 214,
    format: 'Pot 1 kg — 30 jours',
    sizes: ['Pot 1 kg', 'Pot 2 kg', 'Lot 3 × 1 kg'],
    description:
      "Une formule à base de fibres de luzerne et d'argile verte pour tamponner l'acidité gastrique et soutenir la muqueuse digestive lors des périodes sensibles (transport, compétition, changement de ration).",
    benefits: ['Tampon digestif naturel', 'Soutien de la muqueuse', 'Sans interdit FEI'],
    composition: [
      { label: 'Fibres de luzerne', value: '35 %' },
      { label: 'Argile montmorillonite', value: '20 %' },
      { label: 'Réglisse (extrait)', value: '8 %' },
    ],
    posologie: '30 g matin et soir, mélangés à la ration, pendant 3 semaines.',
    // Portrait calme / confort
    image:
      'https://images.unsplash.com/photo-1598974357801-cbca100e65d3',
  },
  {
    id: '4',
    slug: 'articulo-plus',
    sku: 'CV-1004',
    name: 'Articulo+',
    category: 'articulations',
    tagline: 'Souplesse et confort articulaire',
    price: 58,
    rating: 4.6,
    reviewCount: 97,
    format: 'Seau 2 kg — 33 jours',
    sizes: ['Seau 2 kg', 'Seau 4 kg', 'Lot 2 × 2 kg'],
    description:
      "Glucosamine, chondroïtine et harpagophytum réunis pour accompagner les chevaux à l'entraînement soutenu ou avançant en âge. Soutient la mobilité au quotidien.",
    benefits: ['Glucosamine & chondroïtine', 'Harpagophytum', 'MSM'],
    composition: [
      { label: 'Glucosamine HCl', value: '15 000 mg/kg' },
      { label: 'Chondroïtine', value: '5 000 mg/kg' },
      { label: 'MSM', value: '10 000 mg/kg' },
    ],
    posologie: '60 g par jour en cure de 6 semaines, renouvelable.',
    // Cheval au pré — mobilité
    image:
      'https://images.unsplash.com/photo-1534773728080-3b1205b1d1c2',
  },
  {
    id: '5',
    slug: 'equirespiro-plus',
    sku: 'CV-1005',
    name: 'EquiRespiro+',
    category: 'respiration',
    tagline: 'Voies respiratoires dégagées',
    price: 45,
    rating: 4.7,
    reviewCount: 152,
    format: 'Pot 900 g — 30 jours',
    sizes: ['Pot 900 g', 'Pot 1,8 kg', 'Lot 2 × 900 g'],
    description:
      'Un complexe de plantes expectorantes (thym, eucalyptus, réglisse) pour soutenir la fonction respiratoire des chevaux exposés à un air poussiéreux ou sujets aux irritations saisonnières.',
    benefits: ['Thym & eucalyptus', 'Voies respiratoires dégagées', 'Format appétent'],
    composition: [
      { label: 'Thym (extrait)', value: '6 %' },
      { label: 'Eucalyptus', value: '4 %' },
      { label: 'Propolis', value: '2 %' },
    ],
    posologie: '30 g par jour, cure de 10 à 15 jours au changement de saison.',
    // Gros plan tête — respiration / naseaux
    image:
      'https://images.unsplash.com/photo-1445116572660-236099ec97a0',
  },
  {
    id: '6',
    slug: 'recup-plus',
    sku: 'CV-1006',
    name: 'Récup+',
    category: 'recuperation',
    tagline: "Après l'effort, la récupération",
    price: 36,
    rating: 4.5,
    reviewCount: 61,
    format: 'Pot 800 g — 27 jours',
    sizes: ['Pot 800 g', 'Pot 1,6 kg', 'Lot 2 × 800 g'],
    description:
      "Une association d'acides aminés et de vitamine E pour limiter la fatigue musculaire après une séance intense et raccourcir le temps de récupération avant la prochaine sortie.",
    benefits: ['Acides aminés essentiels', 'Vitamine E naturelle', 'Goût pomme'],
    composition: [
      { label: 'L-Lysine', value: '8 000 mg/kg' },
      { label: 'Vitamine E', value: '6 000 UI/kg' },
      { label: 'Taurine', value: '3 000 mg/kg' },
    ],
    posologie: "30 g dans les 2 heures suivant l'effort.",
    // Cheval sport / saut
    image:
      'https://images.unsplash.com/photo-1551884831-bbf3fda6379b',
  },
  {
    id: '7',
    slug: 'pack-senior',
    sku: 'CV-1007',
    name: 'Pack Sénior',
    category: 'senior',
    tagline: 'Accompagner les belles années',
    price: 64,
    compareAtPrice: 72,
    rating: 4.9,
    reviewCount: 74,
    format: 'Coffret 3 x 500 g — 30 jours',
    sizes: ['Coffret 30 jours', 'Coffret 60 jours'],
    description:
      'Trois formules complémentaires — articulations, immunité et confort digestif — pensées pour les chevaux séniors. Moins de raideurs, une meilleure vitalité au quotidien.',
    benefits: ['3 formules complémentaires', 'Immunité renforcée', 'Faciles à mâcher'],
    composition: [
      { label: 'Glucosamine', value: '12 000 mg/kg' },
      { label: 'Vitamine C', value: '5 000 mg/kg' },
      { label: 'Levures vivantes', value: '4 x 10⁹ UFC/kg' },
    ],
    posologie: 'Une dose de chaque formule par jour, à répartir sur la ration.',
    // Portrait doux / sénior
    image:
      'https://images.pexels.com/photos/633767/pexels-photo-633767.jpeg',
  },
  {
    id: '8',
    slug: 'immuno-plus',
    sku: 'CV-1008',
    name: 'Immuno+',
    category: 'digestion',
    tagline: 'Renforcer les défenses naturelles',
    price: 41,
    rating: 4.6,
    reviewCount: 58,
    format: 'Pot 1 kg — 33 jours',
    sizes: ['Pot 1 kg', 'Pot 2 kg', 'Lot 3 × 1 kg'],
    description:
      "Levures vivantes et prébiotiques pour soutenir l'équilibre de la flore intestinale, particulièrement utile lors des périodes de stress, transport ou changement d'environnement.",
    benefits: ['Levures vivantes', 'Prébiotiques', 'Stabilité digestive'],
    composition: [
      { label: 'Levures S. cerevisiae', value: '6 x 10⁹ UFC/kg' },
      { label: 'FOS (prébiotiques)', value: '5 %' },
      { label: 'Vitamine C', value: '3 000 mg/kg' },
    ],
    posologie: '30 g par jour, en continu ou en cure de 3 semaines.',
    // Cheval au pré calme
    image:
      'https://images.pexels.com/photos/1996333/pexels-photo-1996333.jpeg',
  },
  {
    id: '9',
    slug: 'equi-booster',
    sku: 'CV-1009',
    name: 'Équi Booster',
    category: 'recuperation',
    tagline: "Regain de tonus et d'appétit",
    price: 33,
    rating: 4.8,
    reviewCount: 143,
    format: 'Pot 750 g — 25 jours',
    sizes: ['Pot 750 g', 'Pot 1,5 kg', 'Lot 2 × 750 g'],
    description:
      "Un complexe de vitamines B et de plantes toniques pour redonner de l'appétit et de l'entrain aux chevaux fatigués, convalescents ou en fin d'hiver.",
    benefits: ['Vitamines B complexes', 'Plantes toniques', "Stimule l'appétit"],
    composition: [
      { label: 'Vitamine B1', value: '400 mg/kg' },
      { label: 'Vitamine B12', value: '2 mg/kg' },
      { label: 'Ginseng', value: '2 %' },
    ],
    posologie: '30 g par jour pendant 15 jours, à renouveler selon besoin.',
    // Cheval vif / tonus
    image:
      'https://images.pexels.com/photos/52500/horse-herd-fog-nature-52500.jpeg',
  },
  {
    id: '10',
    slug: 'sabot-fort',
    sku: 'CV-1010',
    name: 'Sabot Fort',
    category: 'sabots',
    tagline: 'Cornée plus dense, fourchette assainie',
    price: 38,
    rating: 4.7,
    reviewCount: 89,
    format: 'Pot 1,2 kg — 40 jours',
    sizes: ['Pot 1,2 kg', 'Pot 2,4 kg', 'Lot 2 × 1,2 kg'],
    description:
      'Apport ciblé de biotine, méthionine et zinc pour renforcer la corne, limiter les seimes et soutenir une fourchette saine. Idéal en saison humide ou pour les chevaux à sabots fragiles.',
    benefits: ['Biotine haute dose', 'Zinc & méthionine', 'Cornée plus résistante'],
    composition: [
      { label: 'Biotine', value: '20 mg/jour*' },
      { label: 'Méthionine', value: '3 000 mg/kg' },
      { label: 'Zinc', value: '2 500 mg/kg' },
    ],
    posologie: '30 g par jour pour 500 kg, en cure de 6 à 8 semaines minimum.',
    image:
      'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=900&q=75',
  },
  {
    id: '11',
    slug: 'brillance-crin',
    sku: 'CV-1011',
    name: 'Brillance Crin',
    category: 'robe-peau',
    tagline: 'Robe luisante, peau apaisée',
    price: 35,
    rating: 4.6,
    reviewCount: 112,
    format: 'Pot 1 kg — 30 jours',
    sizes: ['Pot 1 kg', 'Pot 2 kg', 'Lot 2 × 1 kg'],
    description:
      'Huiles et oméga-3, zinc et levure de bière pour une robe brillante, un crin fortifié et une peau moins sujette aux démangeaisons saisonnières.',
    benefits: ['Oméga-3', 'Zinc organique', 'Anti-démangeaisons'],
    composition: [
      { label: 'Oméga-3', value: '8 %' },
      { label: 'Zinc', value: '1 800 mg/kg' },
      { label: 'Levure de bière', value: '15 %' },
    ],
    posologie: '35 g par jour pour 500 kg, à mélanger à la ration.',
    image:
      'https://images.pexels.com/photos/1996333/pexels-photo-1996333.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    id: '12',
    slug: 'zen-equin',
    sku: 'CV-1012',
    name: 'Zen Équin',
    category: 'stress',
    tagline: 'Calme sans endormir',
    price: 41,
    rating: 4.8,
    reviewCount: 156,
    format: 'Pot 900 g — 30 jours',
    sizes: ['Pot 900 g', 'Pot 1,8 kg', 'Seringue 60 ml'],
    description:
      'Magnésium, tryptophane et plantes (passiflore, aubépine) pour aider le cheval stressé, sensible aux transports ou aux changements d’environnement — sans effet dopage aux dosages recommandés.',
    benefits: ['Magnésium biodisponible', 'Plantes calmantes', 'Conforme FEI aux doses'],
    composition: [
      { label: 'Magnésium', value: '12 %' },
      { label: 'L-Tryptophane', value: '5 000 mg/kg' },
      { label: 'Passiflore', value: '4 %' },
    ],
    posologie: '30 g par jour, ou 1 seringue 2 h avant un événement stressant.',
    image:
      'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=900&q=75',
  },
  {
    id: '13',
    slug: 'hydro-lytes',
    sku: 'CV-1013',
    name: 'Hydro-Lytes',
    category: 'electrolytes',
    tagline: 'Réhydratation après l’effort',
    price: 28,
    rating: 4.9,
    reviewCount: 201,
    format: 'Seau 2 kg — 40 doses',
    sizes: ['Seau 2 kg', 'Seau 5 kg', 'Boîte 20 sachets'],
    description:
      'Électrolytes complets (sodium, potassium, chlorure, magnésium) pour compenser les pertes liées à la transpiration. À utiliser après le travail, en concours ou par fortes chaleurs.',
    benefits: ['Formule isotonique', 'Goût appétent', 'Récupération hydrique'],
    composition: [
      { label: 'Sodium', value: '18 %' },
      { label: 'Potassium', value: '8 %' },
      { label: 'Chlorure', value: '22 %' },
    ],
    posologie: '50 g dans l’eau ou la ration après l’effort, selon intensité et température.',
    image:
      'https://images.pexels.com/photos/7882510/pexels-photo-7882510.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    id: '14',
    slug: 'corne-soin',
    sku: 'CV-1014',
    name: 'Corne & Soin',
    category: 'sabots',
    tagline: 'Entretien quotidien de la sole',
    price: 24,
    rating: 4.5,
    reviewCount: 67,
    format: 'Gel 500 ml',
    sizes: ['Gel 500 ml', 'Gel 1 L', 'Lot 2 × 500 ml'],
    description:
      'Gel de soin à appliquer sur la sole et la fourchette pour assainir et protéger en conditions humides. Complément idéal d’une cure orale de biotine.',
    benefits: ['Application locale', 'Assainit la fourchette', 'Sans parfum agressif'],
    composition: [
      { label: 'Base aqueuse', value: '—' },
      { label: 'Agents assainissants', value: 'formule propriétaire' },
    ],
    posologie: 'Appliquer 2 à 3 fois par semaine sur sole propre et sèche.',
    image:
      'https://images.unsplash.com/photo-1598974357801-cbca100e65d3?auto=format&fit=crop&w=900&q=75',
  },
  {
    id: '15',
    slug: 'calm-transport',
    sku: 'CV-1015',
    name: 'Calm Transport',
    category: 'stress',
    tagline: 'Pour les trajets et les concours',
    price: 19,
    rating: 4.7,
    reviewCount: 94,
    format: 'Seringue 60 ml',
    sizes: ['Seringue 60 ml', 'Lot 3 seringues', 'Lot 6 seringues'],
    description:
      'Seringue prête à l’emploi à base de magnésium et d’extraits végétaux, conçue pour les chevaux anxieux avant un transport ou une épreuve.',
    benefits: ['Prêt à l’emploi', 'Action ciblée', 'Facile en déplacement'],
    composition: [
      { label: 'Magnésium', value: '—' },
      { label: 'Extraits végétaux', value: 'complexe apaisant' },
    ],
    posologie: '1 seringue 1 à 2 h avant le départ, selon sensibilité du cheval.',
    image:
      'https://images.pexels.com/photos/633767/pexels-photo-633767.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  // ——— Aliments pour chevaux (concentrés / fourrages transformés) ———
  // Prix indicatifs marché FR 2024–2026 (~0,50 à 1,50 €/kg selon type)
  {
    id: '16',
    slug: 'granules-entretien-25kg',
    sku: 'CV-2001',
    name: 'Granulés Entretien',
    category: 'aliments',
    tagline: 'Ration granulée pour cheval de loisir',
    price: 18.5,
    rating: 4.6,
    reviewCount: 88,
    format: 'Sac 25 kg',
    sizes: ['Sac 25 kg', 'Palette 40 sacs'],
    description:
      'Aliment granulé complémentaire de fourrages, destiné aux chevaux et poneys adultes au travail léger ou à l’entretien. Formule équilibrée (protéines ~12 %, fibres structurées) pour sécuriser la ration sans excès d’amidon. À distribuer en 2 à 3 repas, toujours en complément de foin ou d’herbe.',
    benefits: ['Sans poussière', 'Appétence régulière', 'Complément de fourrage'],
    composition: [
      { label: 'Protéines brutes', value: '12 %' },
      { label: 'Matières grasses', value: '2,5 %' },
      { label: 'Cellulose brute', value: '11 %' },
      { label: 'UFC / kg', value: '~0,85' },
    ],
    posologie:
      'Cheval 500 kg : 1,5 à 3 kg/jour selon travail et qualité du fourrage, en 2–3 repas. Eau et pierre à sel à volonté.',
    nutritionAnalysis: {
      analytical: [
        { label: 'Protéines brutes', value: '12,0 %' },
        { label: 'Matières grasses brutes', value: '2,5 %' },
        { label: 'Cellulose brute', value: '11,0 %' },
        { label: 'Cendres brutes', value: '7,0 %' },
        { label: 'Humidité', value: '12,0 %' },
        { label: 'Amidon (indic.)', value: '22–28 %' },
      ],
      energy: [
        { label: 'UFC / kg brut', value: '0,85' },
        { label: 'MADC', value: '85 g/kg' },
      ],
      minerals: [
        { label: 'Calcium', value: '10 g/kg' },
        { label: 'Phosphore', value: '4,5 g/kg' },
        { label: 'Rapport Ca/P', value: '~2,2' },
      ],
      notes:
        'Aliment complémentaire de fourrages. Distribuer en plusieurs repas ; ne pas dépasser ~0,5 % du poids vif en concentrés par repas.',
    },
    image:
      'https://images.pexels.com/photos/162240/fish-food-pellets-162240.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    id: '17',
    slug: 'floconne-loisir-sport-20kg',
    sku: 'CV-2002',
    name: 'Floconné Loisir & Sport',
    category: 'aliments',
    tagline: 'Céréales floconnées + granulés, travail jusqu’à 2 h/jour',
    price: 19.5,
    rating: 4.7,
    reviewCount: 124,
    format: 'Sac 20 kg',
    sizes: ['Sac 20 kg', 'Sac 25 kg', 'Palette'],
    description:
      'Aliment floconné (orge, maïs) associé à un granulé minéral-vitaminé. Idéal pour chevaux montés en loisir ou sport occasionnel (environ 1 à 2 h/jour). Les flocons cuits à la vapeur améliorent la digestibilité de l’amidon. Disponible aussi en version sans avoine selon les lots.',
    benefits: ['Flocons précuits', 'Prébiotiques (MOS)', 'Hygiène digestive'],
    composition: [
      { label: 'Protéines brutes', value: '11–12 %' },
      { label: 'Flocons', value: 'orge, maïs' },
      { label: 'Vitamine E', value: 'supplémentée' },
    ],
    posologie:
      'Cheval 500 kg : 2 à 5 kg/jour selon intensité, en complément d’au moins 5–8 kg de foin. Fractionner en 2–3 repas.',
    nutritionAnalysis: {
      analytical: [
        { label: 'Protéines brutes', value: '11,5 %' },
        { label: 'Matières grasses brutes', value: '3,0 %' },
        { label: 'Cellulose brute', value: '10,0 %' },
        { label: 'Cendres brutes', value: '6,5 %' },
        { label: 'Humidité', value: '12,0 %' },
      ],
      energy: [
        { label: 'UFC / kg brut', value: '0,88–0,92' },
        { label: 'MADC', value: '80–90 g/kg' },
      ],
      minerals: [
        { label: 'Calcium', value: '8–12 g/kg' },
        { label: 'Phosphore', value: '4–6 g/kg' },
        { label: 'Vitamine E', value: 'supplémentée' },
      ],
      notes:
        'Flocons d’orge et de maïs cuits à la vapeur + granulé minéral-vitaminé. Prébiotiques (MOS) selon formule. Version sans avoine disponible selon lots.',
    },
    image:
      'https://images.unsplash.com/photo-1574323346680-bf9bfa4ad39f?auto=format&fit=crop&w=900&q=75',
  },
  {
    id: '18',
    slug: 'flocons-avoine-25kg',
    sku: 'CV-2003',
    name: 'Flocons d’avoine',
    category: 'aliments',
    tagline: 'Énergie traditionnelle, amidon précuit',
    price: 22.9,
    rating: 4.8,
    reviewCount: 156,
    format: 'Sac 25 kg',
    sizes: ['Sac 20 kg', 'Sac 25 kg'],
    description:
      'Céréale floconnée 100 % avoine, cuite à la vapeur pour une meilleure digestibilité. Source d’énergie rapidement mobilisable, très appétente, base classique des rations sport et élevage. À utiliser en complément de fourrages et d’un correcteur minéral si besoin.',
    benefits: ['Amidon précuit', 'Très appétente', 'Énergie à l’effort'],
    composition: [
      { label: 'Protéine brute', value: '~11 %' },
      { label: 'Matière grasse', value: '~5 %' },
      { label: 'Cellulose brute', value: '~10 %' },
      { label: 'Composition', value: 'Flocons d’avoine 100 %' },
    ],
    posologie:
      'Travail léger : 1–2 kg/jour ; travail soutenu : 2–4 kg/jour (cheval 500 kg), avec au minimum 8 kg de foin.',
    nutritionAnalysis: {
      analytical: [
        { label: 'Protéines brutes', value: '11,2 %' },
        { label: 'Matières grasses brutes', value: '5,0 %' },
        { label: 'Cellulose brute', value: '9,7 %' },
        { label: 'Cendres brutes', value: '3,2 %' },
        { label: 'Sodium', value: '0,07 %' },
      ],
      energy: [
        { label: 'Énergie', value: 'rapide à l’effort' },
        { label: 'Composition', value: 'Flocons d’avoine 100 %' },
      ],
      minerals: [
        { label: 'Profil', value: 'céréale pure — CMV recommandé en plus' },
      ],
      notes:
        'Matière première, non équilibrée seule en minéraux/vitamines. Toujours associer fourrage long et pierre à sel ; correcteur minéral si ration simple.',
    },
    image:
      'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?auto=format&fit=crop&w=900&q=75',
  },
  {
    id: '19',
    slug: 'flocons-orge-25kg',
    sku: 'CV-2004',
    name: 'Flocons d’orge',
    category: 'aliments',
    tagline: 'Énergie plus stable que l’avoine',
    price: 14.9,
    rating: 4.5,
    reviewCount: 71,
    format: 'Sac 25 kg',
    sizes: ['Sac 25 kg'],
    description:
      'Orge floconnée pure : index glycémique plus modéré que l’avoine, énergie plus régulière, excellente digestibilité. Convient aux chevaux au travail modéré à intense, aux sujets sensibles à l’avoine ou en reprise d’état.',
    benefits: ['Sans pic glycémique excessif', 'Digestible', 'Pure céréale'],
    composition: [
      { label: 'Composition', value: 'Flocons d’orge 100 %' },
      { label: 'Énergie', value: 'amidon lent' },
    ],
    posologie:
      'Intégrer progressivement à la ration, 1 à 3 kg/jour selon besoin énergétique, toujours avec du fourrage long.',
    nutritionAnalysis: {
      analytical: [
        { label: 'Protéines brutes', value: '~10–12 %' },
        { label: 'Amidon', value: 'index glycémique < avoine' },
        { label: 'Composition', value: 'Flocons d’orge 100 %' },
      ],
      energy: [
        { label: 'Énergie', value: 'plus stable que l’avoine' },
      ],
      notes:
        'Céréale pure floconnée. Introduire progressivement. Compléter en minéraux/vitamines selon le reste de la ration.',
    },
    image:
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=75',
  },
  {
    id: '20',
    slug: 'mash-rehydratable-15kg',
    sku: 'CV-2005',
    name: 'Mash Réhydratable',
    category: 'aliments',
    tagline: 'Bouillie chaude, convalescence & appétit',
    price: 29.9,
    rating: 4.9,
    reviewCount: 203,
    format: 'Sac 15 kg',
    sizes: ['Sac 12,5 kg', 'Sac 15 kg'],
    description:
      'Aliment à réhydrater (mash) à base de fibres et céréales transformées. Très appétent, facile à mastiquer : idéal après l’effort, en convalescence, pour les chevaux âgés ou au transit délicat. Se prépare avec de l’eau tiède en quelques minutes.',
    benefits: ['Réhydratation', 'Très digeste', 'Confort après effort'],
    composition: [
      { label: 'Base', value: 'fibres + céréales transformées' },
      { label: 'Préparation', value: 'eau tiède 10–15 min' },
    ],
    posologie:
      '1 à 2 kg de mash sec réhydraté, 1 à 3 fois par semaine ou selon conseil, en plus de la ration habituelle.',
    nutritionAnalysis: {
      analytical: [
        { label: 'Protéines brutes', value: '10–12 %' },
        { label: 'Cellulose / fibres', value: 'élevées' },
        { label: 'Matières grasses', value: 'modérées' },
        { label: 'Humidité (après réhydr.)', value: 'selon dilution' },
      ],
      energy: [
        { label: 'Usage', value: 'apport digeste, non « boost » intense' },
      ],
      notes:
        'Préparer avec de l’eau tiède (10–15 min). Idéal post-effort, convalescence ou dentition fragile. Ne remplace pas le fourrage long au quotidien.',
    },
    image:
      'https://images.pexels.com/photos/235725/pexels-photo-235725.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    id: '21',
    slug: 'fibre-complete-25kg',
    sku: 'CV-2006',
    name: 'Fibre Complète Floconné',
    category: 'aliments',
    tagline: '50 % fibres — ration flexible',
    price: 26.5,
    rating: 4.6,
    reviewCount: 95,
    format: 'Sac 25 kg',
    sizes: ['Sac 25 kg'],
    description:
      'Aliment complet fibreux (foin, luzerne, céréales floconnées, noyau cellulosique, CMV). Environ 50 % de fibres pour favoriser la mastication et le transit. Utilisable seul ou en complément selon les besoins et le mode d’alimentation.',
    benefits: ['Riche en fibres', 'Mastication prolongée', 'Flexible'],
    composition: [
      { label: 'Fibres', value: '~50 %' },
      { label: 'Ingrédients', value: 'foin, luzerne, flocons, mélasse, CMV' },
    ],
    posologie:
      '3 à 10 kg/jour en 2 repas selon état et activité ; ajuster selon le fourrage disponible.',
    nutritionAnalysis: {
      analytical: [
        { label: 'Fibres (indic.)', value: '~50 %' },
        { label: 'Protéines brutes', value: '10–13 %' },
        { label: 'Matières grasses', value: '2–4 %' },
        { label: 'Cendres brutes', value: '6–9 %' },
      ],
      energy: [
        { label: 'Profil', value: 'énergie fibre + flocons' },
      ],
      minerals: [
        { label: 'CMV', value: 'intégré (formule complète)' },
      ],
      notes:
        'Foin / luzerne / céréales floconnées / noyau cellulosique / mélasse / complexe minéral-vitaminé. Flexible : seul ou en complément.',
    },
    image:
      'https://images.pexels.com/photos/144248/pexels-photo-144248.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    id: '22',
    slug: 'granules-sport-25kg',
    sku: 'CV-2007',
    name: 'Granulés Sport',
    category: 'aliments',
    tagline: 'Énergie pour chevaux au travail',
    price: 24.5,
    rating: 4.7,
    reviewCount: 110,
    format: 'Sac 25 kg',
    sizes: ['Sac 20 kg', 'Sac 25 kg'],
    description:
      'Granulé énergétique pour chevaux au travail régulier ou intensif. Apports en protéines et lipides contrôlés, vitamine E renforcée pour le stress oxydatif lié à l’effort. Sans avoine sur certaines formules pour les sujets sensibles.',
    benefits: ['Énergie effort', 'Vitamine E', 'Granulé homogène'],
    composition: [
      { label: 'Protéines', value: '12–14 %' },
      { label: 'Vitamine E', value: 'haute teneur' },
    ],
    posologie:
      'Selon intensité : 0,7 à 1,2 kg / 100 kg de poids vif, fractionné, toujours avec du fourrage long.',
    nutritionAnalysis: {
      analytical: [
        { label: 'Protéines brutes', value: '12–14 %' },
        { label: 'Matières grasses brutes', value: '3–5 %' },
        { label: 'Cellulose brute', value: '8–12 %' },
        { label: 'Cendres brutes', value: '6–8 %' },
      ],
      energy: [
        { label: 'UFC / kg', value: '0,90–0,95' },
        { label: 'MADC', value: '90–110 g/kg' },
      ],
      minerals: [
        { label: 'Vitamine E', value: 'haute teneur' },
        { label: 'Calcium / Phosphore', value: 'équilibrés effort' },
      ],
      notes:
        'Destiné au travail régulier ou intensif. Fractionner les repas ; respecter la limite de concentrés par repas pour limiter les risques digestifs.',
    },
    image:
      'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=900&q=75',
  },
  {
    id: '23',
    slug: 'elevage-floc-25kg',
    sku: 'CV-2008',
    name: 'Élevage Floc',
    category: 'aliments',
    tagline: 'Poulinières, poulains & étalons',
    price: 32.9,
    rating: 4.8,
    reviewCount: 64,
    format: 'Sac 25 kg',
    sizes: ['Sac 25 kg'],
    description:
      'Floconné enrichi pour jeunes chevaux, poulinières et étalons. Céréales cuites à la vapeur, FOS, équilibre protéines / énergie pour la lactation et la croissance. Soutient aussi la qualité des phanères (biotine, oligo-éléments).',
    benefits: ['Croissance & lactation', 'Flocons digests', 'Phanères'],
    composition: [
      { label: 'Flocons', value: 'orge, maïs, avoine, lin…' },
      { label: 'Cible', value: 'élevage & croissance' },
    ],
    posologie:
      'Poulinière fin de gestation / lactation : 2 à 6 kg/jour ; poulain selon âge — toujours en plus du fourrage.',
    nutritionAnalysis: {
      analytical: [
        { label: 'Protéines brutes', value: '14–16 %' },
        { label: 'Matières grasses brutes', value: '3–5 %' },
        { label: 'Cellulose brute', value: '10–14 %' },
        { label: 'Cendres brutes', value: '7–9 %' },
      ],
      energy: [
        { label: 'Profil', value: 'croissance & lactation' },
        { label: 'Acides aminés', value: 'équilibre élevé' },
      ],
      minerals: [
        { label: 'Biotine', value: 'renforcée' },
        { label: 'Oligo-éléments', value: 'dont formes organiques (selon formule)' },
        { label: 'Zinc / Cuivre', value: 'rapport soigné' },
      ],
      notes:
        'Flocons cuits + FOS possibles. Pour poulinières, poulains et étalons — ajuster avec le fourrage et le stade physiologique.',
    },
    image:
      'https://images.pexels.com/photos/1996333/pexels-photo-1996333.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    id: '24',
    slug: 'senior-fibres-20kg',
    sku: 'CV-2009',
    name: 'Senior Fibres',
    category: 'aliments',
    tagline: 'Chevaux âgés, dentition fragile',
    price: 27.9,
    rating: 4.8,
    reviewCount: 142,
    format: 'Sac 20 kg',
    sizes: ['Sac 20 kg', 'Sac 25 kg'],
    description:
      'Aliment fibreux et digeste pour chevaux et poneys âgés. Textures adaptées (flocons / granulés tendres) pour faciliter la prise alimentaire lorsque la dentition est usée. Soutient l’état corporel et le confort digestif.',
    benefits: ['Facile à mâcher', 'Maintien de l’état', 'Confort sénior'],
    composition: [
      { label: 'Fibres', value: 'élevées' },
      { label: 'Texture', value: 'flocons + granulés tendres' },
    ],
    posologie:
      'Adapter 2 à 6 kg/jour selon poids et fourrage ; humidifier si besoin pour les dentitions difficiles.',
    nutritionAnalysis: {
      analytical: [
        { label: 'Protéines brutes', value: '11–13 %' },
        { label: 'Fibres', value: 'élevées' },
        { label: 'Matières grasses', value: '3–4 %' },
        { label: 'Texture', value: 'flocons + granulés tendres' },
      ],
      energy: [
        { label: 'Objectif', value: 'maintien de l’état corporel' },
      ],
      notes:
        'Formulé pour dentition usée : humidification possible. Surveiller le poids et adapter fourrage / dentiste équin.',
    },
    image:
      'https://images.pexels.com/photos/52500/horse-herd-fog-nature-52500.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    id: '25',
    slug: 'luzerne-granulee-20kg',
    sku: 'CV-2010',
    name: 'Luzerne Granulée',
    category: 'aliments',
    tagline: 'Protéines & fibres — fourrage complémentaire',
    price: 16.95,
    rating: 4.6,
    reviewCount: 79,
    format: 'Sac 20 kg',
    sizes: ['Sac 20 kg', 'Sac 25 kg'],
    description:
      'Granulés de luzerne (et fibres associées) riches en protéines de qualité et en carotène naturel. Complément de ration pour chevaux au travail, poulinières ou sujets ayant besoin de renforcer l’apport azoté et fibreux sans grain excessif.',
    benefits: ['Protéines de luzerne', 'Fibres', 'Peu de poussière'],
    composition: [
      { label: 'Base', value: 'luzerne déshydratée' },
      { label: 'Fibres brutes', value: 'élevées (~25–30 %)' },
    ],
    posologie:
      '0,5 à 2 kg/jour selon besoin, mélangés à la ration ou en complément du foin.',
    nutritionAnalysis: {
      analytical: [
        { label: 'Protéines brutes', value: '14–18 %' },
        { label: 'Cellulose brute', value: '25–30 %' },
        { label: 'Matières grasses', value: '1,5–3 %' },
        { label: 'Carotène', value: 'naturel (luzerne)' },
      ],
      energy: [
        { label: 'Rôle', value: 'fourrage complémentaire protéiné' },
      ],
      minerals: [
        { label: 'Calcium', value: 'élevé (luzerne)' },
      ],
      notes:
        'Granulés de luzerne : peu de poussière, protéines de qualité. Complément de ration, pas un substitut total au foin long pour la plupart des chevaux.',
    },
    image:
      'https://images.pexels.com/photos/235725/pexels-photo-235725.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
]

