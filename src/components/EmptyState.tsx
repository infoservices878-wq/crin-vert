import { Link } from 'react-router-dom'
import { ShoppingBag, Search, PackageOpen, Heart } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const ICONS = {
  cart: ShoppingBag,
  search: Search,
  package: PackageOpen,
  heart: Heart,
} as const

export function EmptyState({
  icon = 'package',
  title,
  description,
  actionLabel = 'Voir le catalogue',
  actionTo = '/catalogue',
  onAction,
}: {
  icon?: keyof typeof ICONS
  title: string
  description?: string
  actionLabel?: string
  actionTo?: string
  onAction?: () => void
}) {
  const Icon: LucideIcon = ICONS[icon]

  return (
    <div className="flex flex-col items-center px-4 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-oat-100 text-hunter-800">
        <Icon className="h-7 w-7" strokeWidth={1.5} />
      </div>
      <h2 className="mt-5 font-display text-xl font-bold text-hunter-900">{title}</h2>
      {description && (
        <p className="mt-2 max-w-sm text-sm text-ink-600">{description}</p>
      )}
      {onAction ? (
        <button
          type="button"
          onClick={onAction}
          className="focus-ring btn-primary mt-6"
        >
          {actionLabel}
        </button>
      ) : (
        <Link
          to={actionTo}
          className="focus-ring btn-primary mt-6"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  )
}
