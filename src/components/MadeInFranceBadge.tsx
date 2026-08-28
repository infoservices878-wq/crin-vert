/**
 * Badge « Fabriqué en France » — confiance locale / réglementaire.
 */
export function MadeInFranceBadge({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-sm border border-hunter-800/15 bg-oat-50 px-2.5 py-1 ${className}`}
      title="Conçu et conditionné en France"
    >
      <span className="flex h-3 w-5 overflow-hidden rounded-[1px]" aria-hidden="true">
        <span className="w-1/3 bg-flag-blue" />
        <span className="w-1/3 bg-oat-50" />
        <span className="w-1/3 bg-flag-red" />
      </span>
      <span className="font-display text-[11px] font-bold uppercase tracking-wide text-hunter-900">
        Fabriqué en France
      </span>
    </span>
  )
}
