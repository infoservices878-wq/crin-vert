import { Star } from 'lucide-react'
import type { Product } from '../types'

/** Avis de démonstration — noms et textes cohérents avec le secteur équin */
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
  const reviews = SAMPLE_REVIEWS.slice(0, Math.min(3, Math.max(1, Math.ceil(product.reviewCount / 50))))

  return (
    <section className="mt-14 border-t border-hunter-800/10 pt-10" aria-labelledby="avis-title">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="avis-title" className="font-display text-2xl font-bold text-hunter-900">
            Avis clients
          </h2>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-600">
            <Star className="h-4 w-4 fill-straw-500 text-straw-500" />
            <span className="font-mono font-semibold text-hunter-900">{product.rating}</span>
            <span>/ 5 — {product.reviewCount} avis</span>
          </p>
        </div>
        <p className="text-xs text-ink-600">Avis de démonstration à des fins d’illustration.</p>
      </div>

      <ul className="mt-6 grid gap-4 sm:grid-cols-3">
        {reviews.map((r) => (
          <li
            key={r.name}
            className="border border-hunter-800/10 bg-oat-50 p-4"
          >
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
                <p className="font-display text-sm font-bold text-hunter-900">{r.name}</p>
                <p className="text-xs text-ink-600">{r.role}</p>
              </div>
            </div>
            <div className="mt-2 flex gap-0.5" aria-label={`${r.rating} sur 5`}>
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${
                    i < r.rating ? 'fill-straw-500 text-straw-500' : 'text-hunter-800/20'
                  }`}
                />
              ))}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink-900">« {r.text} »</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
