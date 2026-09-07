/** Responsive image helpers. Product packshots use their native image CDN; no proxy is required. */
export type ImageSize = 'thumb' | 'card' | 'detail' | 'hero'

const WIDTHS: Record<ImageSize, number> = { thumb: 200, card: 480, detail: 800, hero: 900 }
const SRCSET_WIDTHS = [240, 400, 640, 800, 1200] as const
const LQIP_WIDTH = 24

function isUnsplash(url: string) { return url.includes('images.unsplash.com') }
function isPexels(url: string) { return url.includes('images.pexels.com') }
function isPrestaStyle(url: string) { return /-(home|medium|large|thickbox|cart|small)_default\./i.test(url) }
function isResizable(url: string) { return isUnsplash(url) || isPexels(url) || isPrestaStyle(url) }

function prestaSizeForWidth(width: number): string {
  if (width <= 220) return 'home_default'
  if (width <= 500) return 'medium_default'
  return 'large_default'
}

function baseUrl(url: string): string {
  try {
    const parsed = new URL(url)
    return (isUnsplash(url) || isPexels(url)) ? `${parsed.origin}${parsed.pathname}` : url.split('?')[0]
  } catch {
    return url
  }
}

export function sizedUrl(url: string, width: number, quality = 75): string {
  if (!url) return ''
  const base = baseUrl(url)
  if (isUnsplash(url)) return `${base}?auto=format&fit=crop&w=${width}&q=${quality}`
  if (isPexels(url)) return `${base}?auto=compress&cs=tinysrgb&w=${width}`
  if (isPrestaStyle(url)) return base.replace(/-(home|medium|large|thickbox|cart|small)_default/i, `-${prestaSizeForWidth(width)}`)
  return url
}

export function lqipUrl(url: string): string {
  return isResizable(url) ? sizedUrl(url, LQIP_WIDTH, 30) : ''
}

export function buildSrcSet(url: string, quality = 75): string {
  if (!url || !isResizable(url)) return ''
  return SRCSET_WIDTHS.map((width) => `${sizedUrl(url, width, quality)} ${width}w`).join(', ')
}

export function sizesFor(context: ImageSize | 'compact' | 'gallery'): string {
  switch (context) {
    case 'thumb':
    case 'compact': return '112px'
    case 'card': return '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px'
    case 'detail':
    case 'gallery': return '(max-width: 768px) 100vw, 480px'
    case 'hero': return '(max-width: 768px) 90vw, 420px'
    default: return '100vw'
  }
}

export function defaultWidth(context: ImageSize | 'compact' | 'gallery'): number {
  if (context === 'compact') return WIDTHS.thumb
  if (context === 'gallery') return WIDTHS.detail
  return WIDTHS[context]
}

export type OptimizedImgOptions = { priority?: boolean; aspectRatio?: number }

export function optimizedImageProps(
  url: string,
  context: ImageSize | 'compact' | 'gallery',
  alt: string,
  options?: OptimizedImgOptions,
) {
  const width = defaultWidth(context)
  const ratio = options?.aspectRatio ?? 1.25
  const srcSet = buildSrcSet(url)
  const priority = options?.priority ?? false

  return {
    src: sizedUrl(url, width),
    alt,
    ...(srcSet ? { srcSet, sizes: sizesFor(context) } : {}),
    width,
    height: Math.round(width * ratio),
    loading: (priority ? 'eager' : 'lazy') as 'eager' | 'lazy',
    decoding: 'async' as const,
    fetchPriority: (priority ? 'high' : 'low') as 'high' | 'low',
  }
}
