import { Link } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'
import { ProductCard } from '../components/ProductCard'
import { EmptyState } from '../components/EmptyState'

export function Wishlist() {
  const { products, count, remove } = useWishlist()

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav className="text-sm text-ink-600">
        <Link to="/" className="focus-ring hover:text-hunter-900">
          Accueil
        </Link>
        <span className="mx-2">/</span>
        <span className="text-hunter-900">Favoris</span>
      </nav>

      <h1 className="mt-3 font-display text-3xl font-extrabold text-hunter-900">Mes favoris</h1>
      <p className="mt-1 text-sm text-ink-600">
        {count} produit{count !== 1 ? 's' : ''} enregistré{count !== 1 ? 's' : ''}
      </p>

      {products.length === 0 ? (
        <div className="mt-8 border border-hunter-800/10 bg-oat-50">
          <EmptyState
            icon="heart"
            title="Aucun favori pour le moment"
            description="Ajoutez des produits avec le cœur sur la fiche pour les retrouver ici."
            actionLabel="Parcourir le catalogue"
            actionTo="/catalogue"
          />
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {products.map((p) => (
            <div key={p.id} className="relative">
              <ProductCard product={p} />
              <button
                type="button"
                onClick={() => remove(p.id)}
                className="focus-ring absolute right-2 top-2 z-10 rounded-full bg-oat-50/95 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-hunter-900 shadow"
              >
                Retirer
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
