/**
 * Helpers d'optimisation d'images.
 * - Unsplash / Pexels : paramètres CDN natifs
 * - PrestaShop (cheval-energy, etc.) : variante home/medium/large
 * - Autres HTTPS : proxy images.weserv.nl (webp + resize)
 * - srcSet / sizes / LQIP / lazy
 */

export type ImageSize = 'thumb' | 'card' | 'detail' | 'hero'

const WIDTHS: Record<ImageSize, number> = {
  thumb: 200,
  card: 480,
  detail: 800,
  hero: 900,
}

const SRCSET_WIDTHS = [240, 400, 640, 800, 1200] as const
const LQIP_WIDTH = 24

function isUnsplash(url: string): boolean {
  return url.includes('images.unsplash.com')
}

function isPexels(url: string): boolean {
  return url.includes('images.pexels.com')
}

/** PrestaShop / Woo-style sized filenames */
function isPrestaStyle(url: string): boolean {
  return /-(home|medium|large|thickbox|cart|small)_default\./i.test(url)
}

function prestaSizeForWidth(width: number): string {
  if (width <= 220) return 'home_default'
  if (width <= 500) return 'medium_default'
  return 'large_default'
}

function withPrestaSize(url: string, width: number): string {
  const size = prestaSizeForWidth(width)
  return url.replace(
    /-(home|medium|large|thickbox|cart|small)_default/i,
    `-${size}`,
  )
}

/** Proxy resize + webp pour images externes non optimisables nativement */
function viaWeserv(url: string, width: number, quality = 75): string {
  try {
    const clean = url.split('?')[0]
    // weserv : url sans protocole
    const bare = clean.replace(/^https?:\/\//i, '')
    const params = new URLSearchParams({
      url: bare,
      w: String(width),
      q: String(quality),
      output: 'webp',
      fit: 'contain',
      we: '',
    })
    return `https://images.weserv.nl/?${params.toString()}`
  } catch {
    return url
  }
}

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
  if (isPrestaStyle(url)) {
    return withPrestaSize(url, width)
  }
  // HTTPS externe (dont cheval-energy sans suffixe, ou autres CDN)
  if (/^https?:\/\//i.test(url)) {
    return viaWeserv(url, width, quality)
  }
  return url
}

/** Placeholder flou très léger (LQIP) */
export function lqipUrl(url: string): string {
  if (!url) return ''
  return sizedUrl(url, LQIP_WIDTH, 30)
}

/** srcSet responsive (plusieurs largeurs) */
export function buildSrcSet(url: string, quality = 75): string {
  if (!url) return ''
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
    fetchPriority: (priority ? 'high' : 'low') as 'high' | 'low',
  }
}
