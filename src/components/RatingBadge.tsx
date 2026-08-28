import { Star } from 'lucide-react'

export function RatingBadge({ value = 4.8 }: { value?: number }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-oat-50 px-4 py-2 shadow-lg">
      <span className="font-display text-sm font-bold text-hunter-900">{value}</span>
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-straw-500 text-straw-500" />
        ))}
      </div>
      <span className="text-xs text-ink-600">avis clients</span>
    </div>
  )
}
