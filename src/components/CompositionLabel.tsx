import type { CompositionItem } from '../types'

// Élément signature du site : reprend la structure d'une étiquette
// nutritionnelle de sac d'aliment — filets épais, capitales, chiffres
// en monospace — plutôt qu'un tableau générique.
export function CompositionLabel({
  items,
  posologie,
}: {
  items: CompositionItem[]
  posologie?: string
}) {
  return (
    <div className="max-w-md border-2 border-ink-900 bg-oat-50 p-5 font-body">
      <p className="font-display text-lg font-bold uppercase tracking-tight border-b-4 border-ink-900 pb-2">
        Composition
      </p>
      <ul className="mt-2 divide-y divide-ink-900/15">
        {items.map((item, idx) => (
          <li key={`${item.label}-${idx}`} className="flex items-baseline justify-between py-2 text-sm">
            <span className="text-ink-900">{item.label}</span>
            <span className="font-mono text-hunter-800 font-medium">{item.value}</span>
          </li>
        ))}
      </ul>
      {posologie && (
        <div className="mt-3 border-t-4 border-ink-900 pt-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-600">Posologie</p>
          <p className="mt-1 text-sm font-mono text-ink-900">{posologie}</p>
        </div>
      )}
    </div>
  )
}
