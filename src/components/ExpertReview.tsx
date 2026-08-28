import type { Product } from '../types'

// Avis d'experte maison, dans l'esprit du contenu de confiance vu sur le
// site de référence — à remplacer par un vrai avis rédigé si le site est
// mis en production.
export function ExpertReview({ product }: { product: Product }) {
  return (
    <div className="border border-hunter-800/10 bg-oat-200/50 p-6">
      <p className="font-display text-lg font-bold text-hunter-900">
        L'avis d'Anaïs, notre conseillère en nutrition équine
      </p>
      <p className="mt-3 text-sm leading-relaxed text-ink-900">
        « {product.name} fait partie des produits que je recommande le plus souvent en cure
        d'entretien. Son principal atout : {product.benefits[0]?.toLowerCase()}. Comptez{' '}
        {product.posologie.split(',')[0].toLowerCase()} pour voir une vraie différence sur le
        poil et le comportement de votre cheval. »
      </p>
      <p className="mt-3 text-xs text-ink-600">Anaïs — conseillère en nutrition équine</p>
    </div>
  )
}
