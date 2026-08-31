/**
 * Utilitaires pour le calcul du prix ajusté selon le conditionnement (taille)
 */

/**
 * Extrait le nombre de sacs de la chaîne de taille.
 * Ex: "6 sacs de 20 kg" → 6
 * Ex: "1 palette – 50 sacs de 20 kg" → 50
 */
export function extractSizeMultiplier(sizeString: string): number {
  // Si c'est une palette, extraire le nombre de sacs après "sacs"
  if (sizeString.includes('palette')) {
    const match = sizeString.match(/(\d+)\s*sacs/)
    if (match) {
      return parseInt(match[1], 10)
    }
  }

  // Sinon, extraire le premier nombre
  const match = sizeString.match(/^(\d+)/)
  return match ? parseInt(match[1], 10) : 1
}

/**
 * Calcule le prix ajusté en fonction de la taille sélectionnée.
 * Compare la taille sélectionnée avec la taille de base du format.
 * Applique une réduction de 35% pour les palettes.
 */
export function calculateAdjustedPrice(
  basePrice: number,
  format: string,
  selectedSize: string,
): number {
  const baseMultiplier = extractSizeMultiplier(format)
  const selectedMultiplier = extractSizeMultiplier(selectedSize)
  let price = (basePrice * selectedMultiplier) / baseMultiplier

  // Appliquer la réduction de 35% si c'est une palette
  if (selectedSize.includes('palette')) {
    price = price * 0.65 // -35% = ×0.65
  }

  return price
}
