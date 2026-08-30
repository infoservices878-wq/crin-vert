import { Stars } from './Stars'
import type { Product } from '../types'

const SAMPLE_REVIEWS = [
  {
    name: 'Camille B.',
    role: 'Cavalière CSO',
    rating: 5,
    text: 'Résultat visible en une dizaine de jours, mon cheval est bien plus détendu à l’effort. Je rachète.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=60',
  },
  {
    name: 'Marc T.',
    role: 'Propriétaire de 3 chevaux',
    rating: 5,
    text: 'Facile à donner, bien mélangé aux granulés, aucun refus même avec ma jument difficile.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=60',
  },
  {
    name: 'Élise R.',
    role: 'Monitrice d’équitation',
    rating: 4,
    text: 'Bon rapport qualité-prix. Je le recommande à mes élèves pour leurs poneys de club.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=60',
  },
]

export function ProductReviews({ product }: { product: Product }) {
  if (!product.reviewCount && !product.rating) {
    return (
      <section className="mt-14 border-t border-hunter-800/10 pt-10" aria-labelledby="avis-title">
        <h2 id="avis-title" className="font-display text-2xl font-bold text-hunter-900">
          Avis clients
        </h2>
        <p className="mt-2 text-sm text-ink-600">Pas encore d’avis pour ce produit.</p>
      </section>
    )
  }

  const reviews = SAMPLE_REVIEWS

  return (
    <section className="mt-14 border-t border-hunter-800/10 pt-10" aria-labelledby="avis-title">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="avis-title" className="font-display text-2xl font-bold text-hunter-900">
            Avis clients
          </h2>
          <p className="mt-1.5 flex flex-wrap items-center gap-2 text-sm text-ink-600">
            <Stars value={product.rating} size="md" />
            <span className="font-mono font-semibold text-hunter-900">
              {product.rating.toFixed(1)}
            </span>
            <span>/ 5 — {product.reviewCount} avis</span>
          </p>
        </div>
      </div>

      <ul className="mt-6 grid gap-4 sm:grid-cols-3">
        {reviews.map((r) => (
          <li key={r.name} className="border border-hunter-800/10 bg-oat-50 p-4">
            <div className="flex items-center gap-3">
              <img
                src={r.avatar}
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div>
                <p className="font-display text-sm font-semibold text-hunter-900">{r.name}</p>
                <p className="text-xs text-ink-600">{r.role}</p>
              </div>
            </div>
            <div className="mt-2">
              <Stars value={r.rating} size="sm" />
            </div>
            <p className="mt-2 text-sm leading-relaxed text-ink-900">{r.text}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
