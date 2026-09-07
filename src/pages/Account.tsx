import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Package, MapPin, Heart, LogOut, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useWishlist } from '../context/WishlistContext'
import { getOrders, type CustomerOrder } from '../lib/woocommerce'

function formatOrderDate(value: string): string {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '—' : new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium' }).format(date)
}

function orderStatus(status: string): string {
  const labels: Record<string, string> = {
    pending: 'En attente de virement', 'on-hold': 'En attente', processing: 'En préparation', completed: 'Expédiée', cancelled: 'Annulée', refunded: 'Remboursée', failed: 'Échec',
  }
  return labels[status] ?? status
}

export function Account() {
  const { user, isAuthenticated, logout } = useAuth()
  const { count } = useWishlist()
  const [orders, setOrders] = useState<CustomerOrder[]>([])
  const [ordersLoading, setOrdersLoading] = useState(true)
  const [ordersError, setOrdersError] = useState('')

  useEffect(() => {
    let active = true
    void getOrders()
      .then((result) => { if (active) setOrders(result) })
      .catch(() => { if (active) setOrdersError('Impossible de charger votre historique pour le moment.') })
      .finally(() => { if (active) setOrdersLoading(false) })
    return () => { active = false }
  }, [])

  if (!isAuthenticated || !user) return <Navigate to="/connexion" replace />

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-extrabold text-hunter-900">Mon compte</h1>
      <p className="mt-1 text-sm text-ink-600">Connecté en tant que {user.firstName || user.email}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="border border-hunter-800/10 bg-oat-50 p-5">
          <div className="flex items-center gap-2 text-hunter-900"><User className="h-5 w-5" strokeWidth={1.75} /><h2 className="font-display font-bold">Informations</h2></div>
          <dl className="mt-4 space-y-2 text-sm"><div><dt className="text-ink-600">Nom</dt><dd className="font-medium text-hunter-900">{[user.firstName, user.lastName].filter(Boolean).join(' ') || '—'}</dd></div><div><dt className="text-ink-600">E-mail</dt><dd className="font-medium text-hunter-900">{user.email}</dd></div></dl>
        </div>
        <div className="border border-hunter-800/10 bg-oat-50 p-5">
          <div className="flex items-center gap-2 text-hunter-900"><MapPin className="h-5 w-5" strokeWidth={1.75} /><h2 className="font-display font-bold">Adresses</h2></div>
          <p className="mt-4 text-sm text-ink-600">Les adresses sont renseignées au moment de la commande. Pour les modifier, contactez notre équipe avant l’expédition.</p>
        </div>
      </div>

      <div className="mt-6 border border-hunter-800/10 bg-oat-50 p-5">
        <div className="flex items-center gap-2 text-hunter-900"><Package className="h-5 w-5" strokeWidth={1.75} /><h2 className="font-display font-bold">Mes commandes</h2></div>
        {ordersLoading && <p className="mt-4 text-sm text-ink-600">Chargement de votre historique…</p>}
        {ordersError && <p className="mt-4 text-sm text-flag-red" role="alert">{ordersError}</p>}
        {!ordersLoading && !ordersError && orders.length === 0 && <p className="mt-4 text-sm text-ink-600">Vous n’avez pas encore passé de commande.</p>}
        {!ordersLoading && orders.length > 0 && <ul className="mt-4 divide-y divide-hunter-800/10">{orders.map((order) => <li key={order.id} className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm"><div><p className="font-mono font-semibold text-hunter-900">{order.reference}</p><p className="text-ink-600">{formatOrderDate(order.date)}</p></div><div className="text-right"><p className="font-mono font-semibold text-hunter-900">{Number(order.total).toFixed(2)} €</p><p className="text-leather-600">{orderStatus(order.status)}</p></div></li>)}</ul>}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link to="/favoris" className="focus-ring inline-flex items-center gap-2 border border-hunter-900 px-4 py-2.5 font-display text-sm font-semibold text-hunter-900 hover:bg-hunter-900 hover:text-oat-50"><Heart className="h-4 w-4" />Favoris ({count})</Link>
        <button type="button" onClick={logout} className="focus-ring inline-flex items-center gap-2 bg-hunter-900 px-4 py-2.5 font-display text-sm font-semibold text-oat-50 hover:bg-hunter-800"><LogOut className="h-4 w-4" />Déconnexion</button>
      </div>
    </div>
  )
}
