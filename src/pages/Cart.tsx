import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { PRODUCTS } from '../data/products'
import { useCart } from '../context/CartContext'
import { CartLineItem } from '../components/CartLineItem'
import { ProductCard } from '../components/ProductCard'
import { ShippingEstimator } from '../components/ShippingEstimator'
import { ShareOrderModal } from '../components/ShareOrderModal'
import { EmptyState } from '../components/EmptyState'

export function Cart() {
  const { items, total } = useCart()
  const [promo, setPromo] = useState('')
  const [promoMsg, setPromoMsg] = useState<string | null>(null)
  const [shareMsg, setShareMsg] = useState(false)
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [shippingCost, setShippingCost] = useState<number | null>(null)

  const crossSell = PRODUCTS.filter((p) => !items.some((i) => i.product.id === p.id)).slice(0, 3)

  const applyPromo = () => {
    setPromoMsg(promo.trim() ? 'Code non reconnu — aucun code actif sur ce site de démonstration.' : null)
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav className="text-sm text-ink-600">
        <Link to="/" className="focus-ring hover:text-hunter-900">
          Accueil
        </Link>
        <span className="mx-2">/</span>
        <span className="text-hunter-900">Panier</span>
      </nav>

      <h1 className="mt-3 font-display text-3xl font-extrabold text-hunter-900">Votre panier</h1>

      {items.length === 0 ? (
        <div className="mt-8 border border-hunter-800/10 bg-oat-50">
          <EmptyState
            icon="cart"
            title="Votre panier est vide"
            description="Parcourez le catalogue pour trouver le complément adapté à votre cheval."
            actionLabel="Découvrir le catalogue"
            actionTo="/catalogue"
          />
        </div>
      ) : (
        <div className="mt-8 grid gap-10 md:grid-cols-[1fr_360px]">
          <div>
            <div className="border border-hunter-800/10 bg-oat-50 px-5">
              {items.map(({ product, qty, size }) => (
                <CartLineItem key={`${product.id}-${size}`} product={product} qty={qty} size={size} />
              ))}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
              <Link
                to="/catalogue"
                className="focus-ring text-sm font-semibold text-hunter-900 underline hover:text-leather-600"
              >
                Continuer mes achats
              </Link>
              <button
                onClick={() => setShareMsg(true)}
                className="focus-ring text-sm font-semibold text-hunter-900 underline hover:text-leather-600"
              >
                Envoyer ce panier pour paiement à un tiers
              </button>
            </div>
            {shareMsg && (
              <p className="mt-2 text-xs text-ink-600">
                Fonctionnalité de démonstration — aucun envoi réel n'est effectué.
              </p>
            )}

            {crossSell.length > 0 && (
              <div className="mt-12">
                <h2 className="font-display text-xl font-bold text-hunter-900">
                  Nos best-sellers ce mois-ci
                </h2>
                <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {crossSell.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="h-fit border border-hunter-800/10 bg-oat-50 p-5 md:sticky md:top-24">
            <ShippingEstimator cartTotal={total} onShippingChange={setShippingCost} />

            <div className="border-t border-hunter-800/10 py-4">
              <p className="text-sm font-semibold text-hunter-900">Vous avez un code promo ?</p>
              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  value={promo}
                  onChange={(e) => setPromo(e.target.value)}
                  placeholder="Code Promo"
                  className="focus-ring min-w-0 flex-1 border border-hunter-800/15 bg-oat-50 px-3 py-2.5 text-sm text-ink-900 placeholder:text-ink-600/60"
                />
                <button
                  type="button"
                  onClick={applyPromo}
                  className="focus-ring btn-quiet shrink-0"
                >
                  Appliquer
                </button>
              </div>
              {promoMsg && <p className="mt-2 text-xs text-ink-600">{promoMsg}</p>}
            </div>

            <div className="flex items-center justify-between border-t border-hunter-800/10 py-4">
              <span className="text-sm text-ink-900">Livraison</span>
              <span className="font-mono text-sm font-semibold text-hunter-900">
                {shippingCost === null
                  ? 'Offert'
                  : shippingCost === 0
                    ? 'Offert'
                    : `${shippingCost.toFixed(2)} €`}
              </span>
            </div>

            <div className="flex items-center justify-between border-t border-hunter-800/10 py-4">
              <span className="font-display text-lg font-bold text-hunter-900">Total (TTC)</span>
              <span className="font-mono text-xl font-bold text-hunter-900">
                {(total + (shippingCost ?? 0)).toFixed(2)} €
              </span>
            </div>

            {/* Un seul CTA principal : finaliser */}
            <Link to="/commande" className="focus-ring btn-primary btn-block mt-2">
              Finaliser ma commande
            </Link>
            <button
              type="button"
              onClick={() => setShareModalOpen(true)}
              className="focus-ring btn-ghost mt-4 w-full text-center"
            >
              Faire payer par un tiers
            </button>
          </aside>
        </div>
      )}

      <ShareOrderModal
        open={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        total={total + (shippingCost ?? 0)}
      />

      <div className="mt-16 flex flex-col items-center gap-3 border-t border-hunter-800/10 pt-12 text-center">
        <MessageCircle className="h-7 w-7 text-hunter-800" strokeWidth={1.5} />
        <p className="font-display text-lg font-bold text-hunter-900">Une question avant de commander ?</p>
        <p className="max-w-sm text-sm text-ink-600">
          Notre équipe vous répond par téléphone, e-mail ou message.
        </p>
        <Link
          to="/contact"
          className="focus-ring mt-1 font-display text-sm font-semibold text-leather-600 hover:text-leather-700"
        >
          Nous contacter →
        </Link>
      </div>
    </div>
  )
}
