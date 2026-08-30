import { Star } from 'lucide-react'

/** Affiche 0–5 étoiles selon la note (demi-étoiles via opacité sur la dernière). */
export function Stars({
  value,
  size = 'md',
  className = '',
}: {
  value: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const v = Math.max(0, Math.min(5, Number(value) || 0))
  const full = Math.floor(v)
  const frac = v - full
  const dim =
    size === 'sm' ? 'h-3.5 w-3.5' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'

  return (
    <span
      className={`inline-flex items-center gap-0.5 ${className}`}
      aria-label={`${v.toFixed(1)} sur 5`}
      role="img"
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < full
        const partial = i === full && frac >= 0.25
        return (
          <Star
            key={i}
            className={`${dim} ${
              filled
                ? 'fill-straw-500 text-straw-500'
                : partial
                  ? 'fill-straw-500/50 text-straw-500'
                  : 'fill-transparent text-hunter-800/25'
            }`}
            strokeWidth={1.5}
          />
        )
      })}
    </span>
  )
}
