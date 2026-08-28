import { Link } from 'react-router-dom'
import {
  Wheat,
  Leaf,
  Activity,
  Wind,
  Zap,
  Heart,
  Shield,
  Sparkles,
  Moon,
  Droplets,
} from 'lucide-react'
import { CATEGORY_LABELS, CATEGORY_ORDER, type Category } from '../types'

const ICONS: Record<Category, typeof Wheat> = {
  alimentation: Wheat,
  digestion: Leaf,
  articulations: Activity,
  respiration: Wind,
  recuperation: Zap,
  senior: Heart,
  sabots: Shield,
  'robe-peau': Sparkles,
  stress: Moon,
  electrolytes: Droplets,
  aliments: Wheat,
}

const BLURBS: Record<Category, string> = {
  alimentation: 'CMV et minéraux du quotidien',
  aliments: 'Granulés, floconnés, mash, fibres',
  digestion: 'Confort gastrique et flore',
  articulations: 'Mobilité et souplesse',
  respiration: 'Voies respiratoires dégagées',
  recuperation: "Après l'effort",
  senior: "Pour les chevaux d'âge",
  sabots: 'Cornée et fourchette',
  'robe-peau': 'Brillance et confort cutané',
  stress: 'Calme et transports',
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
