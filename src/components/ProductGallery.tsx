import { useState } from 'react'
import type { Product } from '../types'
import { OptimizedImage } from './OptimizedImage'

/** Uses only the packshots associated with the product: no decorative external photos. */
export function getGalleryImages(product: Product): string[] {
  if (product.images && product.images.length > 0) return product.images.slice(0, 4)
  return product.image ? [product.image] : []
}

export function ProductGallery({ product, priority = false }: { product: Product; priority?: boolean }) {
  const images = getGalleryImages(product)
  const [active, setActive] = useState(0)
  const current = images[active] ?? images[0]

  if (!current) return null

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
          {images.map((src, index) => (
            <li key={`${src}-${index}`}>
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Voir l’image ${index + 1}`}
                aria-current={index === active ? 'true' : undefined}
                className={`focus-ring relative aspect-square w-full overflow-hidden border-2 bg-oat-100 transition-colors ${
                  index === active ? 'border-hunter-900' : 'border-transparent hover:border-hunter-800/30'
                }`}
              >
                <OptimizedImage src={src} alt="" context="thumb" className="h-full w-full object-cover" blurPlaceholder={false} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
