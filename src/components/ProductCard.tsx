import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { Stars } from './Stars'
import type { Product } from '../types'
import { ProductIllustration } from './ProductIllustration'
import { useCart } from '../context/CartContext'

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()

  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-hunter-800/10 bg-oat-50 transition-shadow hover:shadow-md">
      <Link to={`/produit/${product.slug}`} className="focus-ring">
        <ProductIllustration product={product} />
      </Link>
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <Link to={`/produit/${product.slug}`} className="focus-ring">
          <h3 className="font-display text-sm font-bold leading-snug text-hunter-900 group-hover:text-leather-600 sm:text-base">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 line-clamp-2 text-xs text-ink-600 sm:text-sm">{product.tagline}</p>

        <div className="mt-2 flex items-center gap-1.5 text-xs text-ink-600">
          <Stars value={product.rating} size="sm" />
          <span className="font-mono tabular-nums">{product.rating.toFixed(1)}</span>
          <span className="tabular-nums">({product.reviewCount} avis)</span>
        </div>

        <div className="mt-auto flex flex-col gap-2 pt-3 sm:flex-row sm:items-center sm:justify-between sm:gap-2 sm:pt-4">
          <div className="flex items-baseline gap-1.5 font-mono">
            <span className="whitespace-nowrap text-base font-semibold tabular-nums text-hunter-900 sm:text-lg">
              {product.price.toFixed(2)} €
            </span>
            {product.compareAtPrice && (
              <span className="whitespace-nowrap text-xs text-ink-600 line-through sm:text-sm">
                {product.compareAtPrice.toFixed(2)} €
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => addItem(product)}
            className="focus-ring flex w-full shrink-0 items-center justify-center gap-1.5 rounded-md bg-leather-600 px-2.5 py-2 font-display text-xs font-semibold text-oat-50 transition-colors hover:bg-leather-500 sm:w-auto sm:gap-2 sm:px-3 sm:text-sm"
            aria-label={`Ajouter ${product.name} au panier`}
          >
            <ShoppingCart className="h-4 w-4 shrink-0" strokeWidth={2.25} />
            Ajouter
          </button>
        </div>
      </div>
    </div>
  )
}
