import { MessageCircle, Timer, Star, CreditCard } from 'lucide-react'
import { Link } from 'react-router-dom'

const ITEMS = [
  {
    icon: MessageCircle,
    title: 'Une question ?',
    text: 'Notre équipe vous répond par téléphone, e-mail ou message.',
    to: '/contact',
  },
  {
    icon: Timer,
    title: 'Livraison express',
    text: 'Livraison en 24h ou 48h. Frais de port offerts dès 79 €.',
    to: '/livraison',
  },
  {
    icon: Star,
    title: 'Fidélité',
    text: 'Des points fidélité à transformer en récompenses.',
  },
  {
    icon: CreditCard,
    title: 'Paiement sécurisé',
    text: 'Paiement 100% sécurisé. Rapide, sûr et pratique.',
    to: '/paiement',
  },
]

export function TrustBadges() {
  return (
    <div className="border-t border-hunter-800/10 bg-oat-100">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-4">
        {ITEMS.map(({ icon: Icon, title, text, to }) => {
          const content = (
            <div className="flex flex-col items-center text-center">
              <Icon className="h-7 w-7 text-hunter-800" strokeWidth={1.5} />
              <p className="mt-3 font-display text-sm font-bold text-hunter-900">{title}</p>
              <p className="mt-1.5 text-xs text-ink-600">{text}</p>
            </div>
          )
          return to ? (
            <Link key={title} to={to} className="focus-ring">
              {content}
            </Link>
          ) : (
            <div key={title}>{content}</div>
          )
        })}
      </div>
    </div>
  )
}
