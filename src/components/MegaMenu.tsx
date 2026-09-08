import { Link } from 'react-router-dom'
import {
  Wheat,
  Leaf,
  Activity,
  Heart,
  Shield,
  Droplets,
} from 'lucide-react'
import { CATEGORY_LABELS, CATEGORY_ORDER, type Category } from '../types'

const ICONS: Record<Category, typeof Wheat> = {
  alimentation: Wheat,
  digestion: Leaf,
  articulations: Activity,
  senior: Heart,
  sabots: Shield,
  electrolytes: Droplets,
}

const BLURBS: Record<Category, string> = {
  alimentation: 'CMV et minéraux du quotidien',
  digestion: 'Confort gastrique et flore',
  articulations: 'Mobilité et souplesse',
  senior: "Pour les chevaux d'âge",
  sabots: 'Cornée et fourchette',
  electrolytes: 'Réhydratation',
}

export function MegaMenu({ onNavigate }: { onNavigate?: () => void }) {
  const categories = CATEGORY_ORDER

  return (
    <div className="grid grid-cols-2 gap-1 p-3 sm:grid-cols-3 sm:gap-2 sm:p-4">
      {categories.map((cat) => {
        const Icon = ICONS[cat]
        return (
          <Link
            key={cat}
            to={`/catalogue?categorie=${cat}`}
            onClick={onNavigate}
            className="focus-ring flex items-start gap-3 rounded-sm p-3 transition-colors hover:bg-oat-200"
          >
            <Icon className="mt-0.5 h-5 w-5 shrink-0 text-leather-600" strokeWidth={1.75} />
            <span>
              <span className="block font-display text-sm font-semibold text-hunter-900">
                {CATEGORY_LABELS[cat]}
              </span>
              <span className="block text-xs text-ink-600">{BLURBS[cat]}</span>
            </span>
          </Link>
        )
      })}
    </div>
  )
}
