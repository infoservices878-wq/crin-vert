import {
  Wheat,
  Leaf,
  Activity,
  Heart,
  Shield,
  Droplets,
  type LucideIcon,
} from 'lucide-react'
import type { Category, Product } from '../types'
import { CATEGORY_LABELS } from '../types'
import { OptimizedImage } from './OptimizedImage'

const CATEGORY_STYLE: Record<
  Category,
  { icon: LucideIcon; badge: string; accent: string; label: string }
> = {
  alimentation: { icon: Wheat, badge: '#f2a733', accent: '#2c5690', label: 'CMV' },
  digestion: { icon: Leaf, badge: '#24a45c', accent: '#145c34', label: 'Digestion' },
  articulations: { icon: Activity, badge: '#e0568c', accent: '#163254', label: 'Articulations' },
  senior: { icon: Heart, badge: '#e0568c', accent: '#1e4270', label: 'Sénior' },
  sabots: { icon: Shield, badge: '#8b6914', accent: '#5c4a1a', label: 'Sabots' },
  electrolytes: { icon: Droplets, badge: '#2fb6c4', accent: '#0e5c66', label: 'Électrolytes' },
}

/** Images de secours par catégorie (photos libres) */
const CATEGORY_FALLBACK: Record<Category, string> = {
  alimentation: '/images/site/horses-field.jpg',
  digestion: '/images/site/horse-calm.jpg',
  articulations: '/images/site/horses-pasture.jpg',
  senior: '/images/site/horses-pasture.jpg',
  sabots: '/images/site/horses-field.jpg',
  electrolytes: '/images/site/horses-field.jpg',
}

type Props =
  | { category: Category; product?: never; compact?: boolean; priority?: boolean }
  | { product: Product; category?: never; compact?: boolean; priority?: boolean }

/**
 * Visuel produit optimisé :
 * - srcSet + sizes (responsive)
 * - lazy-load (sauf priority)
 * - largeur/hauteur pour limiter le CLS
 * - URLs redimensionnées côté CDN (Unsplash / Pexels)
 */
export function ProductIllustration({
  category,
  product,
  compact = false,
  priority = false,
}: Props) {
  const cat = product?.category ?? category!
  const style = CATEGORY_STYLE[cat]
  const Icon = style.icon
  const productImage = product?.image
  const hasUsableProductImage = productImage && !productImage.includes('drive.google.com/drive/folders/')
  const rawSrc = hasUsableProductImage ? productImage : CATEGORY_FALLBACK[cat]
  const alt = product ? product.name : `Illustration ${CATEGORY_LABELS[cat]}`
  const context = compact ? 'compact' : priority ? 'detail' : 'card'

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-md bg-oat-200">
      <OptimizedImage
        src={rawSrc}
        alt={alt}
        context={context}
        priority={priority}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Dégradé pour lisibilité du bandeau */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-hunter-950/85 via-hunter-950/20 to-transparent" />

      {!compact && (
        <span className="absolute left-3 top-3 rounded-full bg-oat-50/95 px-2.5 py-1 font-display text-[10px] font-bold uppercase tracking-wide text-hunter-900 shadow-sm">
          100 % naturel
        </span>
      )}

      {!compact && (
        <div
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full shadow-md ring-2 ring-oat-50/80"
          style={{ backgroundColor: style.badge }}
          title={CATEGORY_LABELS[cat]}
        >
          <Icon className="h-5 w-5 text-oat-50" strokeWidth={2.25} />
        </div>
      )}

      {product && !compact && (
        <div className="absolute inset-x-0 bottom-0 px-3 pb-3 pt-8">
          <div
            className="rounded-sm px-3 py-2 shadow-lg"
            style={{ backgroundColor: style.accent }}
          >
            <p className="font-display text-sm font-bold leading-tight text-oat-50">{product.name}</p>
            <p className="mt-0.5 font-mono text-[11px] text-oat-100/80">{product.format}</p>
          </div>
        </div>
      )}

      {product && compact && (
        <div className="absolute inset-x-0 bottom-0 bg-hunter-900/75 px-1.5 py-1">
          <p className="truncate text-center font-display text-[10px] font-semibold text-oat-50">
            {product.name}
          </p>
        </div>
      )}

      {!product && !compact && (
        <div className="absolute inset-x-0 bottom-0 px-3 pb-3">
          <p className="font-display text-sm font-bold text-oat-50 drop-shadow">
            {CATEGORY_LABELS[cat]}
          </p>
        </div>
      )}
    </div>
  )
}
