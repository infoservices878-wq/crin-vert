import type { Product } from '../types'

export function ExpertReview({ product }: { product: Product }) {
  const benefit = product.benefits[0]?.toLowerCase() || 'sa formulation adaptée'
  const usage = (product.posologie || 'quelques semaines de cure').split(',')[0].toLowerCase()

  return (
    <div className="border border-hunter-800/10 bg-oat-200/50 p-6">
      <p className="font-display text-lg font-bold text-hunter-900">
        L&apos;avis d&apos;Anaïs, notre conseillère en nutrition équine
      </p>
      <p className="mt-3 text-sm leading-relaxed text-ink-900">
        « {product.name} fait partie des produits que je recommande le plus souvent en cure
        d&apos;entretien. Son principal atout : {benefit}. Comptez {usage} pour voir une vraie
        différence sur le poil et le comportement de votre cheval. »
      </p>
      <p className="mt-3 text-xs text-ink-600">Anaïs — conseillère en nutrition équine</p>
    </div>
  )
}
