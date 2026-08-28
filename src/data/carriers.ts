export interface Carrier {
  id: string
  name: string
  description: string
  price: number
  alwaysFree?: boolean
}

export const CARRIERS: Carrier[] = [
  {
    id: 'point-relais',
    name: 'Point Relais',
    description: 'Votre commande livrée dans votre point relais en 3 à 5 jours ouvrés',
    price: 4.9,
  },
  {
    id: 'dpd-travail',
    name: 'DPD',
    description: 'Votre commande livrée sur votre lieu de travail en 2-3 j ouvrés',
    price: 6.5,
  },
  {
    id: 'dpd-domicile',
    name: 'DPD',
    description: 'Votre commande livrée chez vous en 2-3 j ouvrés',
    price: 7.9,
  },
  {
    id: 'colissimo',
    name: 'Colissimo',
    description: 'Votre commande livrée chez vous en 2-3 j ouvrés',
    price: 6.9,
  },
  {
    id: 'chronopost',
    name: 'Chronopost',
    description:
      'Votre commande livrée chez vous en 24 à 48h ouvrées (hors week-end et jours fériés, si commande passée avant 13h)',
    price: 12.9,
  },
  {
    id: 'click-collect',
    name: 'Click & Collect',
    description:
      "Votre commande est prête à être retirée à notre atelier, dès le lendemain à partir de 13h (hors week-ends et jours fériés)",
    price: 0,
    alwaysFree: true,
  },
]
