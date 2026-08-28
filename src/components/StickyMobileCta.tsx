/**
 * Barre d’action sticky en bas d’écran (mobile uniquement).
 * Affiche prix + bouton « Ajouter au panier ».
 */
export function StickyMobileCta({
  price,
  added,
  onAdd,
  productName,
}: {
  price: number
  added: boolean
  onAdd: () => void
  productName: string
}) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-hunter-800/15 bg-oat-50/95 px-4 py-3 backdrop-blur md:hidden"
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
      role="region"
      aria-label="Ajouter au panier"
    >
      <div className="mx-auto flex max-w-lg items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-xs font-semibold text-ink-600">
            {productName}
          </p>
          <p className="font-mono text-lg font-semibold text-hunter-900">
            {price.toFixed(2)} €
          </p>
        </div>
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
