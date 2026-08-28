/**
 * Helpers d'optimisation d'images (Unsplash + Pexels + générique).
 * - URLs redimensionnées côté CDN
 * - srcSet / sizes responsive
 * - lazy-load + fetchPriority
 * - placeholder LQIP (très petite image floue)
 */

export type ImageSize = 'thumb' | 'card' | 'detail' | 'hero'

const WIDTHS: Record<ImageSize, number> = {
  thumb: 200,
  card: 480,
  detail: 800,
  hero: 900,
}

/** Largeurs pour srcSet (responsive) */
const SRCSET_WIDTHS = [240, 400, 640, 800, 1200] as const

/** Largeur du placeholder LQIP (très léger) */
const LQIP_WIDTH = 24

function isUnsplash(url: string): boolean {
  return url.includes('images.unsplash.com')
}

function isPexels(url: string): boolean {
  return url.includes('images.pexels.com')
}

/** Extrait l'URL de base sans paramètres de taille */
function baseUrl(url: string): string {
  try {
    const u = new URL(url)
    if (isUnsplash(url) || isPexels(url)) {
      return `${u.origin}${u.pathname}`
    }
    return url.split('?')[0]
  } catch {
    return url
  }
}

/** Construit une URL optimisée pour une largeur donnée */
export function sizedUrl(url: string, width: number, quality = 75): string {
  if (!url) return ''
  const base = baseUrl(url)

  if (isUnsplash(url)) {
    return `${base}?auto=format&fit=crop&w=${width}&q=${quality}`
  }
  if (isPexels(url)) {
    return `${base}?auto=compress&cs=tinysrgb&w=${width}`
  }
  // WooCommerce / autre CDN : URL telle quelle
  return url
}

/** Placeholder flou très léger (LQIP) */
export function lqipUrl(url: string): string {
  if (!url) return ''
  if (isUnsplash(url) || isPexels(url)) {
    return sizedUrl(url, LQIP_WIDTH, 30)
  }
  return url
}

/** srcSet responsive (plusieurs largeurs) */
export function buildSrcSet(url: string, quality = 75): string {
  if (!url) return ''
  if (!isUnsplash(url) && !isPexels(url)) return ''

  return SRCSET_WIDTHS.map((w) => `${sizedUrl(url, w, quality)} ${w}w`).join(', ')
}

/** sizes CSS selon le contexte d'affichage */
export function sizesFor(context: ImageSize | 'compact' | 'gallery'): string {
  switch (context) {
    case 'thumb':
    case 'compact':
      return '112px'
    case 'card':
      return '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px'
    case 'detail':
    case 'gallery':
      return '(max-width: 768px) 100vw, 480px'
    case 'hero':
      return '(max-width: 768px) 90vw, 420px'
    default:
      return '100vw'
  }
}

/** Largeur par défaut selon le contexte */
export function defaultWidth(context: ImageSize | 'compact' | 'gallery'): number {
  if (context === 'compact') return WIDTHS.thumb
  if (context === 'gallery') return WIDTHS.detail
  return WIDTHS[context]
}

export type OptimizedImgOptions = {
  /** true = LCP / above-the-fold : eager + fetchPriority high */
  priority?: boolean
  /** ratio hauteur/largeur pour attribut height (défaut 1.25 = 4/5) */
  aspectRatio?: number
}

/**
 * Props optimisées pour une balise <img>.
 *
 * @example
 * <img {...optimizedImageProps(url, 'card', alt)} />
 * <img {...optimizedImageProps(url, 'detail', alt, { priority: true })} />
 */
export function optimizedImageProps(
  url: string,
  context: ImageSize | 'compact' | 'gallery',
  alt: string,
  options?: OptimizedImgOptions,
) {
  const w = defaultWidth(context)
  const ratio = options?.aspectRatio ?? 1.25
  const src = sizedUrl(url, w)
  const srcSet = buildSrcSet(url)
  const sizes = sizesFor(context)
  const priority = options?.priority ?? false

  return {
    src,
    alt,
    ...(srcSet ? { srcSet, sizes } : {}),
    width: w,
    height: Math.round(w * ratio),
    loading: (priority ? 'eager' : 'lazy') as 'eager' | 'lazy',
    decoding: 'async' as const,
    // high uniquement pour LCP ; low pour le reste aide le navigateur à prioriser
    fetchPriority: (priority ? 'high' : 'low') as 'high' | 'low',
  }
}
