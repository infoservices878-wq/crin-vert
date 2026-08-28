export type Category =
  | 'alimentation'
  | 'aliments'
  | 'digestion'
  | 'articulations'
  | 'respiration'
  | 'recuperation'
  | 'senior'
  | 'sabots'
  | 'robe-peau'
  | 'stress'
  | 'electrolytes'

export interface CompositionItem {
  label: string
  value: string
}

/** Analyse nutritionnelle type étiquette aliment équins */
export interface NutritionAnalysis {
  analytical: CompositionItem[]
  energy?: CompositionItem[]
  minerals?: CompositionItem[]
  notes?: string
}

export interface Product {
  id: string
  slug: string
  sku: string
  name: string
  category: Category
  tagline: string
  price: number
  compareAtPrice?: number
  rating: number
  reviewCount: number
  format: string
  sizes: string[]
  description: string
  benefits: string[]
  composition: CompositionItem[]
  posologie: string
  /** Analyse détaillée (aliments, CMV…) */
  nutritionAnalysis?: NutritionAnalysis
  /** URL d'une photo réelle (Unsplash / Pexels / packshot) */
  image: string
  /** Galerie optionnelle (sinon dérivée de `image` + visuels de catégorie) */
  images?: string[]
}

export interface Protocol {
  id: string
  name: string
  description: string
  duration: string
  categories: Category[]
  price: number
  compareAtPrice: number
}

/** Libellés catalogue — alignés sur les gammes habituelles du secteur équin */
export const CATEGORY_LABELS: Record<Category, string> = {
  alimentation: 'Alimentation & CMV',
  aliments: 'Aliments pour chevaux',
  digestion: 'Confort digestif',
  articulations: 'Articulations & mobilité',
  respiration: 'Respiration',
  recuperation: 'Récupération & sport',
  senior: 'Sénior',
  sabots: 'Sabots & fourchette',
  'robe-peau': 'Robe, peau & crin',
  stress: 'Stress & comportement',
  electrolytes: 'Électrolytes & hydratation',
}

/** Ordre d’affichage des filtres catalogue */
export const CATEGORY_ORDER: Category[] = [
  'aliments',
  'alimentation',
  'digestion',
  'articulations',
  'respiration',
  'recuperation',
  'electrolytes',
  'sabots',
  'robe-peau',
  'stress',
  'senior',
]
