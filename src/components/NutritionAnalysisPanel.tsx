import type { CompositionItem, NutritionAnalysis } from '../types'

function Section({
  title,
  items,
}: {
  title: string
  items: CompositionItem[]
}) {
  if (!items.length) return null
  return (
    <div>
      <p className="border-b-2 border-ink-900 pb-1 font-display text-xs font-bold uppercase tracking-wide text-ink-900">
        {title}
      </p>
      <ul className="mt-1 divide-y divide-ink-900/10">
        {items.map((item) => (
          <li key={item.label} className="flex items-baseline justify-between gap-4 py-1.5 text-sm">
            <span className="text-ink-900">{item.label}</span>
            <span className="shrink-0 font-mono font-medium text-hunter-800">{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * Panneau d’analyse nutritionnelle détaillée (style étiquette de sac).
 */
export function NutritionAnalysisPanel({
  analysis,
  posologie,
}: {
  analysis: NutritionAnalysis
  posologie?: string
}) {
  return (
    <div className="max-w-lg border-2 border-ink-900 bg-oat-50 p-5">
      <p className="border-b-4 border-ink-900 pb-2 font-display text-lg font-bold uppercase tracking-tight text-ink-900">
        Analyse nutritionnelle
      </p>
      <p className="mt-2 text-xs text-ink-600">
        Valeurs indicatives sur produit brut, alignées sur les étiquetages d’aliments pour équidés
        (UE). Toujours vérifier le sac et adapter avec votre vétérinaire / nutritionniste.
      </p>

      <div className="mt-5 space-y-5">
        <Section title="Constituants analytiques" items={analysis.analytical} />
        {analysis.energy && analysis.energy.length > 0 && (
          <Section title="Valeur énergétique & azotée" items={analysis.energy} />
        )}
        {analysis.minerals && analysis.minerals.length > 0 && (
          <Section title="Minéraux (indicatifs)" items={analysis.minerals} />
        )}
      </div>

      {analysis.notes && (
        <p className="mt-4 border-t border-ink-900/20 pt-3 text-xs leading-relaxed text-ink-600">
          {analysis.notes}
        </p>
      )}

      {posologie && (
        <div className="mt-4 border-t-4 border-ink-900 pt-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-600">
            Mode d’emploi
          </p>
          <p className="mt-1 text-sm text-ink-900">{posologie}</p>
        </div>
      )}
    </div>
  )
}
