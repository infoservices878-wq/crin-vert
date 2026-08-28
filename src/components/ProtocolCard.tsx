import { ShoppingCart } from 'lucide-react'
import type { Protocol } from '../types'
import { ProductIllustration } from './ProductIllustration'

export function ProtocolCard({ protocol }: { protocol: Protocol }) {
  return (
    <div className="flex flex-col rounded-lg border border-hunter-800/10 bg-oat-50 p-5">
      <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-hunter-900 px-3 py-1 font-display text-xs font-semibold text-oat-50">
        {protocol.duration}
      </span>

      <div className="flex gap-2">
        {protocol.categories.slice(0, 3).map((cat, i) => (
          <div key={i} className="w-1/3">
            <ProductIllustration category={cat} compact />
          </div>
        ))}
      </div>

      <h3 className="mt-4 font-display text-lg font-bold text-hunter-900">{protocol.name}</h3>
      <p className="mt-1 text-sm text-ink-600">{protocol.description}</p>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-baseline gap-2 font-mono">
          <span className="text-sm text-ink-600 line-through">
            {protocol.compareAtPrice.toFixed(2)} €
          </span>
          <span className="text-xl font-semibold text-hunter-900">
            {protocol.price.toFixed(2)} €
          </span>
        </div>
        <button className="focus-ring flex items-center gap-2 bg-leather-600 px-4 py-2 font-display text-sm font-semibold text-oat-50 transition-colors hover:bg-leather-500">
          <ShoppingCart className="h-4 w-4" strokeWidth={2.25} />
          Ajouter
        </button>
      </div>
    </div>
  )
}
