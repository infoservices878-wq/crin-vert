import { Link } from 'react-router-dom'
import { Minus, Plus } from 'lucide-react'
import type { Product } from '../types'
import { CATEGORY_LABELS } from '../types'
import { ProductIllustration } from './ProductIllustration'
import { useCart } from '../context/CartContext'

export function CartLineItem({
  product,
  qty,
  size,
}: {
  product: Product
  qty: number
  size: string
}) {
  const { updateQty, removeItem } = useCart()

  return (
    <div className="flex gap-4 border-b border-hunter-800/10 py-6 last:border-b-0">
      <Link to={`/produit/${product.slug}`} className="focus-ring w-24 shrink-0 sm:w-28">
        <ProductIllustration product={product} compact />
      </Link>

      <div className="flex flex-1 flex-col">
        <p className="font-mono text-xs uppercase tracking-wide text-ink-600">
          {CATEGORY_LABELS[product.category]}
        </p>
        <Link to={`/produit/${product.slug}`} className="focus-ring">
          <h3 className="mt-0.5 font-display text-base font-bold text-hunter-900">
            {product.name}
          </h3>
        </Link>
        <p className="mt-0.5 text-xs text-ink-600">
          Conditionnement : <span className="font-semibold text-hunter-900">{size}</span>
        </p>

        <p className="mt-2 font-mono text-lg font-semibold text-leather-600">
          {(product.price * qty).toFixed(2)} €
        </p>

        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex items-center border border-hunter-800/20">
            <button
              onClick={() => updateQty(product.id, size, qty - 1)}
              className="focus-ring p-2 text-hunter-900 hover:bg-oat-200"
              aria-label="Diminuer la quantité"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-8 text-center font-mono text-sm">{qty}</span>
            <button
              onClick={() => updateQty(product.id, size, qty + 1)}
              className="focus-ring p-2 text-hunter-900 hover:bg-oat-200"
              aria-label="Augmenter la quantité"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          <button
            onClick={() => removeItem(product.id, size)}
            className="focus-ring text-xs font-semibold uppercase tracking-wide text-ink-600 underline hover:text-leather-600"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  )
}
