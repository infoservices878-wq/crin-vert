import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

/**
 * Barre sticky mobile : total panier (réactif) + CTA ajouter au panier.
 */
export function StickyMobileCta({
  added,
  onAdd,
}: {
  added: boolean
  onAdd: () => void
}) {
  const { total, count } = useCart()

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-hunter-800/15 bg-oat-50/95 px-4 py-3 backdrop-blur md:hidden"
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      role="region"
      aria-label="Votre panier"
    >
      <div className="mx-auto flex max-w-lg items-center gap-3">
        <Link to="/panier" className="focus-ring min-w-0 flex-1">
          <p className="font-display text-xs font-semibold text-ink-600">
            Votre panier
            {count > 0 ? (
              <span className="ml-1 font-mono text-ink-600/80">({count})</span>
            ) : null}
          </p>
          <p className="font-mono text-lg font-semibold text-hunter-900">
            {total.toFixed(2)} €
          </p>
        </Link>
        <button
          type="button"
          onClick={onAdd}
          className="focus-ring btn-primary shrink-0 active:scale-[0.98]"
        >
          {added ? 'Ajouté ✓' : 'Ajouter au panier'}
        </button>
      </div>
    </div>
  )
}
