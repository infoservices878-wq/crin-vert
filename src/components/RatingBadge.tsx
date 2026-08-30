import { Stars } from './Stars'

export function RatingBadge({ value = 4.8, count }: { value?: number; count?: number }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-oat-50 px-4 py-2 shadow-lg">
      <span className="font-display text-sm font-bold text-hunter-900">{value.toFixed(1)}</span>
      <Stars value={value} size="sm" />
      <span className="text-xs text-ink-600">
        {count != null ? `${count} avis clients` : 'avis clients'}
      </span>
    </div>
  )
}
