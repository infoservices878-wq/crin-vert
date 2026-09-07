import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import {
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  ChevronRight,
  ClipboardList,
  Heart,
  HelpCircle,
  Leaf,
  LogOut,
  MapPin,
  Package,
  ShoppingBag,
  Sparkles,
  Truck,
  User,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useWishlist } from '../context/WishlistContext'
import { getOrders, type CustomerOrder } from '../lib/woocommerce'
import { usePageMeta } from '../hooks/usePageMeta'
import { countryName } from '../data/countries'

const money = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })

function formatOrderDate(value: string): string {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '—' : new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium' }).format(date)
}

function orderStatus(status: string): { label: string; className: string } {
  const statuses: Record<string, { label: string; className: string }> = {
    pending: { label: 'Virement attendu', className: 'bg-straw-300/30 text-hunter-900 ring-straw-400/50' },
    'on-hold': { label: 'En attente', className: 'bg-straw-300/30 text-hunter-900 ring-straw-400/50' },
    processing: { label: 'En préparation', className: 'bg-sky-100 text-sky-900 ring-sky-200' },
    completed: { label: 'Expédiée', className: 'bg-emerald-100 text-emerald-900 ring-emerald-200' },
    cancelled: { label: 'Annulée', className: 'bg-ink-100 text-ink-700 ring-ink-200' },
    refunded: { label: 'Remboursée', className: 'bg-violet-100 text-violet-900 ring-violet-200' },
    failed: { label: 'À régulariser', className: 'bg-flag-red/10 text-flag-red ring-flag-red/20' },
  }
  return statuses[status] ?? { label: status, className: 'bg-oat-200 text-ink-700 ring-hunter-800/10' }
}

function isOpenOrder(status: string) {
  return !['completed', 'cancelled', 'refunded', 'failed'].includes(status)
}

export function Account() {
  const { user, isAuthenticated, logout } = useAuth()
  const { count } = useWishlist()
  const [orders, setOrders] = useState<CustomerOrder[]>([])
  const [ordersLoading, setOrdersLoading] = useState(true)
  const [ordersError, setOrdersError] = useState('')
  usePageMeta('Mon espace client')

  useEffect(() => {
    let active = true
    if (!isAuthenticated) {
      return () => { active = false }
    }

    void getOrders()
      .then((result) => { if (active) setOrders(result) })
      .catch(() => { if (active) setOrdersError('Impossible de charger votre historique pour le moment.') })
      .finally(() => { if (active) setOrdersLoading(false) })

    return () => { active = false }
  }, [isAuthenticated])

  const firstName = user?.firstName?.trim() || ''
  const displayName = firstName || user?.email?.split('@')[0] || 'Client'
  const initials = [user?.firstName, user?.lastName].filter(Boolean).map((name) => name?.charAt(0).toUpperCase()).join('').slice(0, 2) || 'EN'
  const activeOrders = orders.filter((order) => isOpenOrder(order.status))
  const recentOrders = orders.slice(0, 4)
  const latestOrder = orders[0]
  const savedAddress = user?.address ? [user.address.line1, user.address.line2, [user.address.postalCode, user.address.city].filter(Boolean).join(' '), countryName(user.address.country)].filter(Boolean).join(', ') : 'Aucune adresse enregistrée'

  if (!isAuthenticated || !user) return <Navigate to="/connexion" replace />

  return (
    <div className="bg-[#f7f6f1] py-6 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="overflow-hidden border border-hunter-950/10 bg-hunter-900 text-oat-50 shadow-[0_18px_50px_rgba(16,47,55,0.14)]">
          <div className="relative overflow-hidden px-6 py-7 sm:px-9 sm:py-9">
            <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full border-[28px] border-straw-400/10" aria-hidden="true" />
            <div className="absolute bottom-0 right-20 h-36 w-36 rounded-full bg-leather-500/10 blur-2xl" aria-hidden="true" />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-oat-50/20 bg-oat-50/10 font-display text-xl font-bold tracking-wide text-straw-300">
                  {initials}
                </div>
                <div>
                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-straw-300"><Sparkles className="h-3.5 w-3.5" /> Espace client</p>
                  <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">Bonjour, {displayName}</h1>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-oat-100/75">Retrouvez vos commandes, vos produits favoris et l’accompagnement EquiNutrition au même endroit.</p>
                </div>
              </div>
              <Link to="/catalogue" className="focus-ring inline-flex shrink-0 items-center justify-center gap-2 bg-straw-400 px-5 py-3 font-display text-sm font-bold text-hunter-950 transition hover:bg-straw-300">
                Découvrir la boutique <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="relative grid border-t border-oat-50/10 sm:grid-cols-3">
            <DashboardMetric icon={ClipboardList} label="Commandes" value={ordersLoading ? '—' : String(orders.length)} hint={orders.length === 1 ? 'commande enregistrée' : 'commandes enregistrées'} />
            <DashboardMetric icon={Truck} label="En cours" value={ordersLoading ? '—' : String(activeOrders.length)} hint={activeOrders.length ? 'commande à suivre' : 'aucune commande à suivre'} bordered />
            <DashboardMetric icon={Heart} label="Favoris" value={String(count)} hint={count === 1 ? 'produit enregistré' : 'produits enregistrés'} bordered />
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
          <aside className="h-fit border border-hunter-800/10 bg-oat-50 p-3 lg:sticky lg:top-5">
            <p className="px-3 pb-2 pt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-ink-600">Mon espace</p>
            <div className="space-y-1">
              <DashboardNav icon={User} label="Vue d’ensemble" active />
              <Link to="/suivi-commande" className="focus-ring flex items-center gap-3 px-3 py-3 text-sm font-medium text-ink-700 transition hover:bg-oat-200 hover:text-hunter-900"><Package className="h-4 w-4" />Suivre une commande</Link>
              <Link to="/favoris" className="focus-ring flex items-center justify-between gap-3 px-3 py-3 text-sm font-medium text-ink-700 transition hover:bg-oat-200 hover:text-hunter-900"><span className="flex items-center gap-3"><Heart className="h-4 w-4" />Mes favoris</span><span className="rounded-full bg-oat-200 px-2 py-0.5 text-xs font-bold text-hunter-900">{count}</span></Link>
              <Link to="/bilan-equin" className="focus-ring flex items-center gap-3 px-3 py-3 text-sm font-medium text-ink-700 transition hover:bg-oat-200 hover:text-hunter-900"><Leaf className="h-4 w-4" />Bilan équin</Link>
            </div>
            <div className="mt-4 border-t border-hunter-800/10 pt-3">
              <button type="button" onClick={logout} className="focus-ring flex w-full items-center gap-3 px-3 py-3 text-left text-sm font-medium text-ink-600 transition hover:bg-flag-red/5 hover:text-flag-red"><LogOut className="h-4 w-4" />Déconnexion</button>
            </div>
          </aside>

          <div className="min-w-0 space-y-6">
            <section className="border border-hunter-800/10 bg-oat-50">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-hunter-800/10 px-5 py-5 sm:px-6">
                <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-leather-700">Commandes</p><h2 className="mt-1 font-display text-2xl font-semibold text-hunter-900">Activité récente</h2></div>
                <Link to="/suivi-commande" className="focus-ring inline-flex items-center gap-1 text-sm font-semibold text-hunter-900 underline decoration-straw-400 decoration-2 underline-offset-4 hover:text-leather-700">Suivre une commande <ChevronRight className="h-4 w-4" /></Link>
              </div>

              {ordersLoading && <div className="space-y-3 p-6" aria-label="Chargement des commandes"><div className="h-16 animate-pulse bg-oat-200" /><div className="h-16 animate-pulse bg-oat-200" /></div>}
              {ordersError && <div className="p-6"><p className="border-l-2 border-flag-red bg-flag-red/5 px-4 py-3 text-sm text-flag-red" role="alert">{ordersError}</p></div>}
              {!ordersLoading && !ordersError && orders.length === 0 && <EmptyOrders />}
              {!ordersLoading && !ordersError && recentOrders.length > 0 && <ul className="divide-y divide-hunter-800/10">{recentOrders.map((order) => <OrderRow key={order.id} order={order} />)}</ul>}
              {!ordersLoading && !ordersError && orders.length > 4 && <div className="border-t border-hunter-800/10 px-6 py-4"><Link to="/suivi-commande" className="focus-ring text-sm font-semibold text-hunter-900 hover:text-leather-700">Consulter l’ensemble de mes commandes</Link></div>}
            </section>

            <div className="grid gap-6 xl:grid-cols-2">
              <section className="border border-hunter-800/10 bg-oat-50 p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-leather-700">Mon profil</p><h2 className="mt-1 font-display text-xl font-semibold text-hunter-900">Informations de compte</h2></div><span className="flex h-9 w-9 items-center justify-center rounded-full bg-hunter-900/5 text-hunter-900"><BadgeCheck className="h-5 w-5" /></span></div>
                <dl className="mt-5 divide-y divide-hunter-800/10 text-sm"><InfoRow label="Nom" value={[user.firstName, user.lastName].filter(Boolean).join(' ') || 'Non renseigné'} /><InfoRow label="E-mail" value={user.email} /><InfoRow label="Adresse de livraison" value={savedAddress} /><InfoRow label="Type de compte" value={user.accountType === 'professionnel' ? 'Professionnel' : 'Particulier'} /></dl>
                <p className="mt-5 text-xs leading-relaxed text-ink-600">Besoin de mettre à jour vos informations ou une adresse de livraison ? Notre équipe vous accompagne.</p>
                <Link to="/contact" className="focus-ring mt-4 inline-flex items-center gap-2 text-sm font-semibold text-hunter-900 underline decoration-straw-400 decoration-2 underline-offset-4 hover:text-leather-700">Contacter l’équipe <ArrowUpRight className="h-4 w-4" /></Link>
              </section>

              <section className="relative overflow-hidden bg-leather-700 p-5 text-oat-50 sm:p-6">
                <div className="absolute -bottom-12 -right-12 h-40 w-40 rounded-full border-[18px] border-straw-400/15" aria-hidden="true" />
                <div className="relative"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-straw-400 text-hunter-950"><HelpCircle className="h-5 w-5" /></div><p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-straw-300">Accompagnement</p><h2 className="mt-1 font-display text-xl font-semibold">Une question sur votre cheval ?</h2><p className="mt-3 max-w-sm text-sm leading-relaxed text-oat-100/80">Préparez un bilan équin personnalisé ou échangez avec notre équipe sur l’alimentation adaptée.</p><div className="mt-5 flex flex-wrap gap-3"><Link to="/bilan-equin" className="focus-ring inline-flex items-center gap-2 bg-oat-50 px-4 py-2.5 font-display text-sm font-bold text-hunter-900 transition hover:bg-straw-300">Commencer le bilan <ArrowUpRight className="h-4 w-4" /></Link><Link to="/contact" className="focus-ring inline-flex items-center gap-2 border border-oat-50/35 px-4 py-2.5 font-display text-sm font-bold text-oat-50 transition hover:bg-oat-50/10">Nous écrire</Link></div></div>
              </section>
            </div>

            {latestOrder && <section className="border border-hunter-800/10 bg-oat-100 px-5 py-4 sm:px-6"><div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm"><span className="flex items-center gap-2 font-semibold text-hunter-900"><CalendarDays className="h-4 w-4 text-leather-700" /> Dernière commande</span><span className="font-mono font-semibold text-hunter-900">{latestOrder.reference}</span><span className="text-ink-600">le {formatOrderDate(latestOrder.date)}</span><span className="font-mono font-semibold text-hunter-900">{money.format(Number(latestOrder.total))}</span></div></section>}
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3 border-t border-hunter-800/10 pt-5 text-xs text-ink-600"><MapPin className="h-4 w-4 shrink-0 text-leather-700" />Les coordonnées de livraison sont confirmées lors de chaque commande afin d’assurer une expédition fiable.</div>
      </div>
    </div>
  )
}

function DashboardMetric({ icon: Icon, label, value, hint, bordered = false }: { icon: typeof Package; label: string; value: string; hint: string; bordered?: boolean }) {
  return <div className={`flex items-center gap-3 px-6 py-4 sm:px-9 ${bordered ? 'sm:border-l sm:border-oat-50/10' : ''}`}><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-oat-50/10 text-straw-300"><Icon className="h-4 w-4" /></span><div><p className="text-lg font-bold leading-none text-oat-50">{value}</p><p className="mt-1 text-[11px] font-bold uppercase tracking-[0.12em] text-oat-100/65">{label} <span className="normal-case tracking-normal">· {hint}</span></p></div></div>
}

function DashboardNav({ icon: Icon, label, active = false }: { icon: typeof User; label: string; active?: boolean }) {
  return <div className={`flex items-center gap-3 px-3 py-3 text-sm font-semibold ${active ? 'bg-hunter-900 text-oat-50' : 'text-ink-700'}`}><Icon className="h-4 w-4" />{label}</div>
}

function OrderRow({ order }: { order: CustomerOrder }) {
  const status = orderStatus(order.status)
  return <li className="flex flex-col gap-3 px-5 py-4 transition hover:bg-oat-100 sm:flex-row sm:items-center sm:justify-between sm:px-6"><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><p className="font-mono text-sm font-bold text-hunter-900">{order.reference}</p><span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ${status.className}`}>{status.label}</span></div><p className="mt-1 text-sm text-ink-600">Commandée le {formatOrderDate(order.date)}</p></div><div className="flex items-center justify-between gap-5 sm:block sm:text-right"><p className="text-xs font-semibold uppercase tracking-wide text-ink-600 sm:sr-only">Total</p><p className="font-mono text-sm font-bold text-hunter-900">{money.format(Number(order.total))}</p></div></li>
}

function EmptyOrders() {
  return <div className="px-6 py-10 text-center"><span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-oat-200 text-hunter-900"><ShoppingBag className="h-5 w-5" /></span><h3 className="mt-4 font-display text-xl font-semibold text-hunter-900">Votre sélection vous attend</h3><p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-600">Découvrez des aliments pensés pour le bien-être et la performance de votre cheval.</p><Link to="/catalogue" className="focus-ring mt-5 inline-flex items-center gap-2 bg-hunter-900 px-4 py-2.5 font-display text-sm font-bold text-oat-50 transition hover:bg-hunter-800">Explorer le catalogue <ArrowUpRight className="h-4 w-4" /></Link></div>
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return <div className="flex items-start justify-between gap-4 py-3"><dt className="text-ink-600">{label}</dt><dd className="max-w-[65%] text-right font-medium text-hunter-900">{value}</dd></div>
}
