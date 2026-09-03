import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X } from 'lucide-react'
import { PRODUCTS } from '../data/products'
import { CATEGORY_LABELS, CATEGORY_ORDER, type Category } from '../types'
import { ProductCard } from '../components/ProductCard'
import { EmptyState } from '../components/EmptyState'
import { Breadcrumb } from '../components/Breadcrumb'
import { usePageMeta } from '../hooks/usePageMeta'

type SortKey = 'populaire' | 'prix-asc' | 'prix-desc'

const PAGE_SIZE = 12

function CategoryList({
  categories,
  activeCategory,
  selectCategory,
  onPicked,
}: {
  categories: Category[]
  activeCategory: Category | null
  selectCategory: (cat: Category | null) => void
  onPicked?: () => void
}) {
  return (
    <ul className="space-y-1.5">
      <li>
        <button
          type="button"
          onClick={() => {
            selectCategory(null)
            onPicked?.()
          }}
          className={`focus-ring w-full border-l-4 px-3 py-2 text-left font-display text-sm font-semibold transition-colors ${
            !activeCategory
              ? 'border-leather-600 bg-oat-200 text-hunter-900'
              : 'border-transparent text-ink-600 hover:bg-oat-200/60'
          }`}
        >
          Tous les produits
        </button>
      </li>
      {categories.map((cat) => (
        <li key={cat}>
          <button
            type="button"
            onClick={() => {
              selectCategory(cat)
              onPicked?.()
            }}
            className={`focus-ring w-full border-l-4 px-3 py-2 text-left font-display text-sm font-semibold transition-colors ${
              activeCategory === cat
                ? 'border-leather-600 bg-oat-200 text-hunter-900'
                : 'border-transparent text-ink-600 hover:bg-oat-200/60'
            }`}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        </li>
      ))}
    </ul>
  )
}

export function Catalogue() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('categorie') as Category | null
  const [sort, setSort] = useState<SortKey>('populaire')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [page, setPage] = useState(1)
  usePageMeta(
    activeCategory ? CATEGORY_LABELS[activeCategory] : 'Catalogue',
    'Parcourez nos compléments et aliments pour chevaux : CMV, digestion, articulations, sabots, stress…',
  )

  const categories = CATEGORY_ORDER

  const products = useMemo(() => {
    let list = activeCategory ? PRODUCTS.filter((p) => p.category === activeCategory) : PRODUCTS
    list = [...list].sort((a, b) => {
      if (sort === 'prix-asc') return a.price - b.price
      if (sort === 'prix-desc') return b.price - a.price
      return b.reviewCount - a.reviewCount
    })
    return list
  }, [activeCategory, sort])

  const selectCategory = (cat: Category | null) => {
    setPage(1)
    if (cat) setSearchParams({ categorie: cat })
    else setSearchParams({})
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Breadcrumb
        items={[
          { label: 'Accueil', to: '/' },
          { label: 'Catalogue', to: activeCategory ? '/catalogue' : undefined },
          ...(activeCategory ? [{ label: CATEGORY_LABELS[activeCategory] }] : []),
        ]}
      />
      <h1 className="mt-3 font-display text-3xl font-bold text-hunter-900">
        {activeCategory ? CATEGORY_LABELS[activeCategory] : 'Tout le catalogue'}
      </h1>
      <p className="mt-1 text-sm text-ink-600">{products.length} produit(s)</p>

      {/* Barre mobile : filtres + tri */}
      <div className="mt-6 flex items-center gap-2 md:hidden">
        <button
          type="button"
          onClick={() => setFiltersOpen(true)}
          className="focus-ring flex flex-1 items-center justify-center gap-2 border border-hunter-800/20 bg-oat-50 py-2.5 font-display text-sm font-semibold text-hunter-900"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Catégories
          {activeCategory && (
            <span className="rounded-full bg-leather-600 px-1.5 py-0.5 text-[10px] text-oat-50">
              1
            </span>
          )}
        </button>
        <select
          value={sort}
          onChange={(e) => { setSort(e.target.value as SortKey); setPage(1) }}
          className="focus-ring border border-hunter-800/20 bg-oat-50 px-2 py-2.5 font-body text-sm text-hunter-900"
          aria-label="Trier par"
        >
          <option value="populaire">Popularité</option>
          <option value="prix-asc">Prix ↑</option>
          <option value="prix-desc">Prix ↓</option>
        </select>
      </div>

      {/* Bottom sheet filtres mobile */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-ink-900/50"
            onClick={() => setFiltersOpen(false)}
            aria-hidden="true"
          />
          <div
            className="absolute inset-x-0 bottom-0 max-h-[75vh] overflow-y-auto rounded-t-lg border-t border-hunter-800/10 bg-oat-50 px-4 pb-8 pt-4 shadow-xl"
            role="dialog"
            aria-label="Filtres catégories"
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="font-display text-lg font-bold text-hunter-900">Catégories</p>
              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                className="focus-ring rounded p-1 text-ink-600"
                aria-label="Fermer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <CategoryList
              categories={categories}
              activeCategory={activeCategory}
              selectCategory={selectCategory}
              onPicked={() => setFiltersOpen(false)}
            />
          </div>
        </div>
      )}

      <div className="mt-8 grid gap-8 md:grid-cols-[220px_1fr]">
        <aside className="hidden md:block">
          <p className="font-display text-xs font-semibold uppercase tracking-wide text-ink-600">
            Catégories
          </p>
          <div className="mt-3">
            <CategoryList
              categories={categories}
              activeCategory={activeCategory}
              selectCategory={selectCategory}
            />
          </div>
        </aside>

        <div>
          <div className="mb-4 hidden justify-end md:flex">
            <label className="flex items-center gap-2 text-sm text-ink-600">
              Trier par
              <select
                value={sort}
                onChange={(e) => { setSort(e.target.value as SortKey); setPage(1) }}
                className="focus-ring border border-hunter-800/20 bg-oat-50 px-2 py-1 font-body text-sm text-hunter-900"
              >
                <option value="populaire">Popularité</option>
                <option value="prix-asc">Prix croissant</option>
                <option value="prix-desc">Prix décroissant</option>
              </select>
            </label>
          </div>

          {products.length === 0 ? (
            <EmptyState
              icon="search"
              title="Aucun produit dans cette catégorie"
              description="Essayez une autre catégorie ou parcourez tout le catalogue."
              actionLabel="Voir tout le catalogue"
              onAction={() => selectCategory(null)}
            />
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {products
                  .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
                  .map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
              </div>
              {products.length > PAGE_SIZE && (
                <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                  <button
                    type="button"
                    disabled={page <= 1}
                    onClick={() => setPage((n) => Math.max(1, n - 1))}
                    className="focus-ring rounded-full border border-hunter-800/20 px-4 py-2 text-sm font-medium text-hunter-900 disabled:opacity-40"
                  >
                    Précédent
                  </button>
                  <span className="px-2 text-sm text-ink-600">
                    Page {page} / {Math.max(1, Math.ceil(products.length / PAGE_SIZE))}
                  </span>
                  <button
                    type="button"
                    disabled={page >= Math.ceil(products.length / PAGE_SIZE)}
                    onClick={() =>
                      setPage((n) =>
                        Math.min(Math.ceil(products.length / PAGE_SIZE), n + 1),
                      )
                    }
                    className="focus-ring rounded-full border border-hunter-800/20 px-4 py-2 text-sm font-medium text-hunter-900 disabled:opacity-40"
                  >
                    Suivant
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
