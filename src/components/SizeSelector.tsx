/**
 * Sélecteur de conditionnement — grille de boutons (style e-commerce équin).
 * Affiche toujours le bloc, même s'il n'y a qu'une seule option.
 */
export function SizeSelector({
  sizes,
  selected,
  onSelect,
}: {
  sizes: string[]
  selected: string
  onSelect: (size: string) => void
}) {
  if (!sizes.length) return null

  return (
    <div>
      <p className="font-display text-sm font-semibold text-hunter-900">
        Choix du conditionnement
      </p>
      <div
        className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-2"
        role="listbox"
        aria-label="Conditionnement"
      >
        {sizes.map((size) => {
          const isSelected = selected === size
          return (
            <button
              key={size}
              type="button"
              role="option"
              aria-selected={isSelected}
              onClick={() => onSelect(size)}
              className={`focus-ring border px-3 py-2.5 text-left font-display text-sm font-semibold transition-colors ${
                isSelected
                  ? 'border-hunter-900 bg-hunter-900 text-oat-50'
                  : 'border-hunter-800/20 bg-oat-50 text-hunter-900 hover:border-hunter-800/50'
              }`}
            >
              {size}
            </button>
          )
        })}
      </div>
      {selected && (
        <p className="mt-2 text-xs text-ink-600">
          Sélectionné : <span className="font-semibold text-hunter-900">{selected}</span>
        </p>
      )}
    </div>
  )
}
