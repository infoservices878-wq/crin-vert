import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { PRODUCTS } from '../data/products'
import { CATEGORY_LABELS } from '../types'
import { sizedUrl } from '../lib/images'

/**
 * Panneau de recherche : suggestions produits en temps réel.
 */
export function SearchPanel({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      setQuery('')
      // Focus après ouverture
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (q.length < 1) return []
    return PRODUCTS.filter((p) => {
      const hay = [
        p.name,
        p.tagline,
        p.description,
        p.sku,
        CATEGORY_LABELS[p.category],
        ...p.benefits,
      ]
        .join(' ')
        .toLowerCase()
      return hay.includes(q)
    }).slice(0, 6)
  }, [query])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-ink-900/40" onClick={onClose} aria-hidden="true" />
      <div className="relative mx-auto mt-0 max-w-xl bg-oat-50 shadow-xl sm:mt-4 sm:rounded-sm">
        <div className="flex items-center gap-2 border-b border-hunter-800/10 px-4 py-3">
          <Search className="h-5 w-5 shrink-0 text-ink-600" strokeWidth={1.75} />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un produit, une catégorie…"
            className="focus-ring w-full bg-transparent py-1.5 font-body text-base text-hunter-900 placeholder:text-ink-600 outline-none"
            aria-label="Recherche produits"
            autoComplete="off"
          />
          <button
            type="button"
            onClick={onClose}
            className="focus-ring rounded-sm p-1.5 text-ink-600 hover:text-hunter-900"
            aria-label="Fermer la recherche"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto">
          {query.trim().length === 0 && (
            <p className="px-4 py-8 text-center text-sm text-ink-600">
              Tapez un nom, une catégorie ou un bénéfice (ex. articulations, CMV…)
            </p>
          )}

          {query.trim().length > 0 && results.length === 0 && (
            <div className="px-4 py-10 text-center">
              <p className="font-display text-sm font-semibold text-hunter-900">
                Aucun résultat pour « {query.trim()} »
              </p>
              <p className="mt-1 text-xs text-ink-600">
                Essayez un autre mot (ex. articulations, CMV, digestion…)
              </p>
              <Link
                to="/catalogue"
                onClick={onClose}
                className="focus-ring mt-4 inline-block text-sm font-semibold text-leather-600 underline"
              >
                Voir tout le catalogue
              </Link>
            </div>
          )}

          {results.length > 0 && (
            <ul className="divide-y divide-hunter-800/10">
              {results.map((p) => (
                <li key={p.id}>
                  <Link
                    to={`/produit/${p.slug}`}
                    onClick={onClose}
                    className="focus-ring flex items-center gap-3 px-4 py-3 transition-colors hover:bg-oat-100"
                  >
                    <img
                      src={sizedUrl(p.image, 80)}
                      alt=""
                      width={56}
                      height={70}
                      className="h-14 w-11 shrink-0 rounded-sm object-cover bg-oat-200"
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-display text-sm font-bold text-hunter-900">
                        {p.name}
                      </p>
                      <p className="truncate text-xs text-ink-600">{p.tagline}</p>
                      <p className="mt-0.5 font-mono text-xs font-semibold text-leather-600">
                        {p.price.toFixed(2)} €
                      </p>
                    </div>
                    <span className="hidden shrink-0 text-[10px] font-semibold uppercase tracking-wide text-ink-600 sm:block">
                      {CATEGORY_LABELS[p.category]}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {results.length > 0 && (
            <div className="border-t border-hunter-800/10 px-4 py-3">
              <Link
                to={`/catalogue`}
                onClick={onClose}
                className="focus-ring text-sm font-semibold text-hunter-900 underline hover:text-leather-600"
              >
                Voir tout le catalogue
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
