import { Link } from 'react-router-dom'
import { Star, Plus } from 'lucide-react'
import type { Product } from '../types'
import { ProductIllustration } from './ProductIllustration'
import { useCart } from '../context/CartContext'

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()

  return (
    <div className="group flex flex-col border border-hunter-800/10 bg-oat-50 transition-shadow hover:shadow-md">
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

        <div className="mt-auto flex items-center justify-between pt-4">
          <div className="flex items-baseline gap-2 font-mono">
            <span className="text-lg font-semibold text-hunter-900">
              {product.price.toFixed(2)} €
            </span>
            {product.compareAtPrice && (
              <span className="text-sm text-ink-600 line-through">
                {product.compareAtPrice.toFixed(2)} €
              </span>
            )}
          </div>
          {/* Secondaire : le clic carte / titre reste l’action principale */}
          <button
            type="button"
            onClick={() => addItem(product)}
            className="focus-ring btn-quiet gap-1 px-2.5 py-1.5 text-xs"
            aria-label={`Ajouter ${product.name} au panier`}
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
            Ajouter
          </button>
        </div>
      </div>
    </div>
  )
}
