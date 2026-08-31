import { useState } from 'react'
import type { Product } from '../types'
import { OptimizedImage } from './OptimizedImage'
import { sizedUrl } from '../lib/images'

/** Visuels secondaires par catégorie (démo — à remplacer par packshots) */
const CATEGORY_EXTRAS: Record<string, string[]> = {
  alimentation: [
    'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=900&q=75',
    'https://images.pexels.com/photos/1996333/pexels-photo-1996333.jpeg?auto=compress&cs=tinysrgb&w=900',
  ],
  digestion: [
    'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=900&q=75',
    'https://images.pexels.com/photos/7882510/pexels-photo-7882510.jpeg?auto=compress&cs=tinysrgb&w=900',
  ],
  articulations: [
    'https://images.unsplash.com/photo-1598974357801-cbca100e65d3?auto=format&fit=crop&w=900&q=75',
    'https://images.unsplash.com/photo-1551884831-bbf3fda6379b?auto=format&fit=crop&w=900&q=75',
  ],
  respiration: [
    'https://images.pexels.com/photos/52500/horse-herd-fog-nature-52500.jpeg?auto=compress&cs=tinysrgb&w=900',
    'https://images.unsplash.com/photo-1534773728080-3b1205b1d1c2?auto=format&fit=crop&w=900&q=75',
  ],
  recuperation: [
    'https://images.pexels.com/photos/633767/pexels-photo-633767.jpeg?auto=compress&cs=tinysrgb&w=900',
    'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=900&q=75',
  ],
  senior: [
    'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=900&q=75',
    'https://images.pexels.com/photos/1996333/pexels-photo-1996333.jpeg?auto=compress&cs=tinysrgb&w=900',
  ],
}

/** Construit la liste d’images de la galerie (max 4). */
export function getGalleryImages(product: Product): string[] {
  if (product.images && product.images.length > 0) {
    return product.images.slice(0, 4)
  }
  const extras = CATEGORY_EXTRAS[product.category] ?? []
  const list = [product.image, ...extras.filter((u) => u !== product.image)]
  return list.slice(0, 4)
}

/**
 * Galerie produit : image principale + miniatures lazy.
 * Seule l’image active en priority si demandée (LCP fiche produit).
 */
export function ProductGallery({
  product,
  priority = false,
}: {
  product: Product
  priority?: boolean
}) {
  const images = getGalleryImages(product)
  const [active, setActive] = useState(0)
  const current = images[active] ?? images[0]

  return (
    <div className="w-full max-w-md">
      <div className="group relative aspect-square overflow-hidden border border-hunter-800/10 bg-oat-100">
        <OptimizedImage
          key={current}
          src={current}
          alt={`${product.name} — vue ${active + 1}`}
          context="gallery"
          priority={priority && active === 0}
          aspectRatio={1}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {images.length > 1 && (
          <span className="absolute bottom-2 right-2 rounded-sm bg-hunter-900/70 px-2 py-0.5 font-mono text-[10px] text-oat-50">
            {active + 1} / {images.length}
          </span>
        )}
      </div>

      {images.length > 1 && (
        <ul className="mt-3 grid grid-cols-4 gap-2" role="list">
          {images.map((src, i) => (
            <li key={`${src}-${i}`}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Voir l’image ${i + 1}`}
                aria-current={i === active ? 'true' : undefined}
                className={`focus-ring relative aspect-square w-full overflow-hidden border-2 bg-oat-100 transition-colors ${
                  i === active
                    ? 'border-hunter-900'
                    : 'border-transparent hover:border-hunter-800/30'
                }`}
              >
                {/* Miniatures toujours en lazy — jamais priority */}
                <img
                  src={sizedUrl(src, 160)}
                  alt=""
                  width={160}
                  height={160}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
