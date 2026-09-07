export const COUNTRIES = [
  'France',
  'Belgique',
  'Suisse',
  'Luxembourg',
  'Allemagne',
  'Espagne',
  'Italie',
  'Pays-Bas',
  'Portugal',
  'Autriche',
  'Irlande',
  'Danemark',
  'Suède',
  'Pologne',
  'République tchèque',
  'Monaco',
  'Royaume-Uni',
  'Canada',
]

const COUNTRY_CODES: Record<string, string> = {
  France: 'FR', Belgique: 'BE', Suisse: 'CH', Luxembourg: 'LU', Allemagne: 'DE', Espagne: 'ES',
  Italie: 'IT', 'Pays-Bas': 'NL', Portugal: 'PT', Autriche: 'AT', Irlande: 'IE', Danemark: 'DK',
  Suède: 'SE', Pologne: 'PL', 'République tchèque': 'CZ', Monaco: 'MC', 'Royaume-Uni': 'GB', Canada: 'CA',
}

export function countryCode(country: string): string {
  return COUNTRY_CODES[country] ?? 'FR'
}
