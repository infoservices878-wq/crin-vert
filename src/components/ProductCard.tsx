import { Link } from 'react-router-dom'
import { Star, ShoppingCart } from 'lucide-react'
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
      <div className="flex flex-1 flex-col p-4">
        <Link to={`/produit/${product.slug}`} className="focus-ring">
          <h3 className="font-display text-base font-bold text-hunter-900 group-hover:text-leather-600">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 text-sm text-ink-600">{product.tagline}</p>

        <div className="mt-2 flex items-center gap-1 text-xs text-ink-600">
          <Star className="h-3.5 w-3.5 fill-straw-500 text-straw-500" />
          <span className="font-mono">{product.rating}</span>
          <span>({product.reviewCount})</span>
        </div>

                <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <div className="min-w-0 flex items-baseline gap-1.5 font-mono">
            <span className="truncate text-base font-semibold text-hunter-900 sm:text-lg">
              {product.price.toFixed(2)} €
            </span>
            {product.compareAtPrice && (
              <span className="hidden text-sm text-ink-600 line-through sm:inline">
                {product.compareAtPrice.toFixed(2)} €
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => addItem(product)}
            className="focus-ring flex shrink-0 items-center gap-1.5 rounded-md bg-leather-600 px-3 py-2 font-display text-xs font-semibold text-oat-50 transition-colors hover:bg-leather-500 sm:gap-2 sm:px-4 sm:text-sm"
            aria-label={`Ajouter ${product.name} au panier`}
          >
            <ShoppingCart className="h-4 w-4" strokeWidth={2.25} />
            Ajouter
          </button>
        </div>
      </div>
    </div>
  )
}
