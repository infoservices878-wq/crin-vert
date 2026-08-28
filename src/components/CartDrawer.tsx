import { Link } from 'react-router-dom'
import { X, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'

export function CartDrawer() {
  const { items, isOpen, total, removeItem, setOpen } = useCart()

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-ink-900/40 transition-opacity ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-sm bg-oat-50 shadow-xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-label="Panier"
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between border-b border-hunter-800/15 px-5 py-4">
          <h2 className="font-display text-lg font-bold text-hunter-900">Votre panier</h2>
          <button
            onClick={() => setOpen(false)}
            className="focus-ring rounded p-1 text-ink-600 hover:text-hunter-900"
            aria-label="Fermer le panier"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
            <ShoppingBag className="h-8 w-8 text-ink-600" strokeWidth={1.5} />
            <p className="font-display text-sm font-semibold text-hunter-900">
              Votre panier est vide
            </p>
            <p className="text-sm text-ink-600">Ajoutez un complément pour commencer.</p>
            <Link
              to="/catalogue"
              onClick={() => setOpen(false)}
              className="focus-ring mt-2 bg-hunter-900 px-5 py-2.5 font-display text-sm font-semibold text-oat-50 hover:bg-hunter-800"
            >
              Voir le catalogue
            </Link>
          </div>
        ) : (
          <div className="flex h-[calc(100%-4.5rem)] flex-col">
            <ul className="flex-1 divide-y divide-hunter-800/10 overflow-y-auto px-5">
              {items.map(({ product, qty, size }) => (
                <li key={`${product.id}-${size}`} className="flex items-center justify-between gap-3 py-4">
                  <div>
                    <p className="font-display font-semibold text-hunter-900">{product.name}</p>
                    <p className="text-xs text-ink-600">{size}</p>
                    <p className="font-mono text-xs text-ink-600">
                      Qté {qty} · {product.price.toFixed(2)} €
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(product.id, size)}
                    className="focus-ring text-xs font-semibold uppercase tracking-wide text-leather-600 hover:text-leather-700"
                  >
                    Retirer
                  </button>
                </li>
              ))}
            </ul>
            <div className="border-t border-hunter-800/15 px-5 py-4">
              <div className="flex items-center justify-between font-display text-base font-bold text-hunter-900">
                <span>Total</span>
                <span className="font-mono">{total.toFixed(2)} €</span>
              </div>
              <Link
                to="/panier"
                onClick={() => setOpen(false)}
                className="focus-ring btn-primary btn-block mt-4"
              >
                Voir mon panier
              </Link>
              {/*<p className="mt-2 text-center text-xs text-ink-600">
                Site de démonstration — aucune commande réelle n'est passée.
              </p>*/}
            </div>
          </div>
        )}
      </aside>
    </>
  )
}
