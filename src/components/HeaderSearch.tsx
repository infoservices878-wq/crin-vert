import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { PRODUCTS } from '../data/products'
import { CATEGORY_LABELS } from '../types'
import { sizedUrl } from '../lib/images'

/**
 * Barre de recherche déployée en permanence dans l'en-tête desktop
 * (au lieu d'une icône qui ouvre une modale) — avec suggestions en direct.
 */
export function HeaderSearch() {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setFocused(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (q.length < 1) return []
    return PRODUCTS.filter((p) => {
      const hay = [p.name, p.tagline, p.sku, CATEGORY_LABELS[p.category], ...p.benefits]
        .join(' ')
        .toLowerCase()
      return hay.includes(q)
    }).slice(0, 6)
  }, [query])

  const open = focused && query.trim().length > 0

  return (
    <div ref={wrapRef} className="relative hidden flex-1 max-w-md md:block">
      <div className="flex items-center gap-2 border border-hunter-800/15 bg-oat-100 px-3 py-2">
        <Search className="h-4 w-4 shrink-0 text-ink-600" strokeWidth={1.75} />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder="Saisissez un mot clé ou une référence article…"
          className="focus-ring w-full bg-transparent text-sm text-hunter-900 placeholder:text-ink-600/70 outline-none"
          autoComplete="off"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="focus-ring shrink-0 rounded p-0.5 text-ink-600 hover:text-hunter-900"
            aria-label="Effacer la recherche"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {open && (
        <div className="absolute left-0 top-full z-40 mt-1 w-full border border-hunter-800/10 bg-oat-50 shadow-lg">
          {results.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-ink-600">
              Aucun résultat pour « {query.trim()} »
            </p>
          ) : (
            <ul className="max-h-[70vh] divide-y divide-hunter-800/10 overflow-y-auto">
              {results.map((p) => (
                <li key={p.id}>
                  <Link
                    to={`/produit/${p.slug}`}
                    onClick={() => {
                      setFocused(false)
                      setQuery('')
                    }}
                    className="focus-ring flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-oat-100"
                  >
                    <img
                      src={sizedUrl(p.image, 80)}
                      alt=""
                      width={44}
                      height={55}
                      className="h-11 w-9 shrink-0 rounded-sm bg-oat-200 object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-display text-sm font-semibold text-hunter-900">
                        {p.name}
                      </span>
                      <span className="block text-xs text-ink-600">
                        À partir de <span className="text-leather-600">{p.price.toFixed(2)} €</span>
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <Link
            to="/catalogue"
            onClick={() => setFocused(false)}
            className="focus-ring block border-t border-hunter-800/10 px-4 py-2.5 text-sm font-semibold text-hunter-900 hover:text-leather-600"
          >
            Voir tout le catalogue →
          </Link>
        </div>
      )}
    </div>
  )
}
