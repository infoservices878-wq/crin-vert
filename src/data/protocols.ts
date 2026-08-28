import type { Protocol } from '../types'

export const PROTOCOLS: Protocol[] = [
  {
    id: 'p1',
    name: 'Protocole Confort Digestif',
    description: "Tout commence dans le ventre : flore, muqueuse et appétit.",
    duration: '3 mois',
    categories: ['digestion', 'digestion', 'alimentation'],
    price: 99,
    compareAtPrice: 123,
  },
  {
    id: 'p2',
    name: 'Protocole Sport & Récupération',
    description: 'Pour les chevaux au travail : minéraux, tonus, récupération.',
    duration: '3 mois',
    categories: ['alimentation', 'recuperation', 'articulations'],
    price: 129,
    compareAtPrice: 159,
  },
]
