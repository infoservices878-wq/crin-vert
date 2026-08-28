import { Link, Navigate } from 'react-router-dom'
import { Package, MapPin, Heart, LogOut, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useWishlist } from '../context/WishlistContext'

const DEMO_ORDERS = [
  {
    id: 'CV-10482',
    date: '12 mars 2026',
    total: 87.4,
    status: 'Livrée',
  },
  {
    id: 'CV-10391',
    date: '28 janv. 2026',
    total: 42.0,
    status: 'Livrée',
  },
]

export function Account() {
  const { user, isAuthenticated, logout } = useAuth()
  const { count } = useWishlist()

  if (!isAuthenticated || !user) {
    return <Navigate to="/connexion" replace />
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-extrabold text-hunter-900">Mon compte</h1>
      <p className="mt-1 text-sm text-ink-600">
        Connecté en tant que {user.firstName || user.email}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="border border-hunter-800/10 bg-oat-50 p-5">
          <div className="flex items-center gap-2 text-hunter-900">
            <User className="h-5 w-5" strokeWidth={1.75} />
            <h2 className="font-display font-bold">Informations</h2>
          </div>
          <dl className="mt-4 space-y-2 text-sm">
            <div>
              <dt className="text-ink-600">Nom</dt>
              <dd className="font-medium text-hunter-900">
                {[user.firstName, user.lastName].filter(Boolean).join(' ') || '—'}
              </dd>
            </div>
            <div>
              <dt className="text-ink-600">Email</dt>
              <dd className="font-medium text-hunter-900">{user.email}</dd>
            </div>
          </dl>
        </div>

        <div className="border border-hunter-800/10 bg-oat-50 p-5">
          <div className="flex items-center gap-2 text-hunter-900">
            <MapPin className="h-5 w-5" strokeWidth={1.75} />
            <h2 className="font-display font-bold">Adresses</h2>
          </div>
          <p className="mt-4 text-sm text-ink-600">
            Les adresses de livraison seront synchronisées avec WooCommerce en production.
          </p>
          <p className="mt-2 text-sm text-ink-600">Aucune adresse enregistrée (démo).</p>
        </div>
      </div>

      <div className="mt-6 border border-hunter-800/10 bg-oat-50 p-5">
        <div className="flex items-center gap-2 text-hunter-900">
          <Package className="h-5 w-5" strokeWidth={1.75} />
          <h2 className="font-display font-bold">Mes commandes</h2>
        </div>
        <ul className="mt-4 divide-y divide-hunter-800/10">
          {DEMO_ORDERS.map((o) => (
            <li key={o.id} className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm">
              <div>
                <p className="font-mono font-semibold text-hunter-900">{o.id}</p>
                <p className="text-ink-600">{o.date}</p>
              </div>
              <div className="text-right">
                <p className="font-mono font-semibold text-hunter-900">{o.total.toFixed(2)} €</p>
                <p className="text-leather-600">{o.status}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-xs text-ink-600">Historique de démonstration.</p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          to="/favoris"
          className="focus-ring inline-flex items-center gap-2 border border-hunter-900 px-4 py-2.5 font-display text-sm font-semibold text-hunter-900 hover:bg-hunter-900 hover:text-oat-50"
        >
          <Heart className="h-4 w-4" />
          Favoris ({count})
        </Link>
        <button
          type="button"
          onClick={logout}
          className="focus-ring inline-flex items-center gap-2 bg-hunter-900 px-4 py-2.5 font-display text-sm font-semibold text-oat-50 hover:bg-hunter-800"
        >
          <LogOut className="h-4 w-4" />
          Déconnexion
        </button>
      </div>
    </div>
  )
}
