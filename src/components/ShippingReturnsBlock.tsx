import { Link } from 'react-router-dom'
import { Truck, RotateCcw, ShieldCheck } from 'lucide-react'

const FREE_SHIPPING = 79

/**
 * Bloc confiance livraison / retours — fiche produit.
 */
export function ShippingReturnsBlock({ price }: { price: number }) {
  const remaining = Math.max(0, FREE_SHIPPING - price)

  return (
    <div className="mt-6 space-y-3 border border-hunter-800/10 bg-oat-100/80 px-4 py-4 text-sm">
      <div className="flex gap-3">
        <Truck className="mt-0.5 h-4 w-4 shrink-0 text-hunter-800" strokeWidth={1.75} />
        <div>
          <p className="font-display font-semibold text-hunter-900">Livraison</p>
          <p className="mt-0.5 text-ink-600">
            Expédition sous 24–48 h ouvrés · suivi colis.
            {remaining > 0 ? (
              <>
                {' '}
                Plus que{' '}
                <span className="font-mono font-semibold text-leather-600">
                  {remaining.toFixed(2)} €
                </span>{' '}
                pour la livraison offerte.
              </>
            ) : (
              <>
                {' '}
                <span className="font-semibold text-leather-600">Livraison offerte</span> sur cet
                article (seuil {FREE_SHIPPING} € atteint avec ce produit seul ou en panier).
              </>
            )}
          </p>
          <Link to="/livraison" className="focus-ring btn-ghost mt-1 inline-block text-xs">
            Détails livraison
          </Link>
        </div>
      </div>
      <div className="flex gap-3 border-t border-hunter-800/10 pt-3">
        <RotateCcw className="mt-0.5 h-4 w-4 shrink-0 text-hunter-800" strokeWidth={1.75} />
        <div>
          <p className="font-display font-semibold text-hunter-900">Retours</p>
          <p className="mt-0.5 text-ink-600">
            14 jours pour changer d’avis sur les produits non ouverts (hors denrées périssables selon
            CGV).
          </p>
          <Link
            to="/retours-remboursement"
            className="focus-ring btn-ghost mt-1 inline-block text-xs"
          >
            Politique de retours
          </Link>
        </div>
      </div>
      <div className="flex gap-3 border-t border-hunter-800/10 pt-3">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-leather-600" strokeWidth={1.75} />
        <div>
          <p className="font-display font-semibold text-hunter-900">Paiement sécurisé</p>
          <p className="mt-0.5 text-ink-600">CB, PayPal · transaction chiffrée.</p>
        </div>
      </div>
    </div>
  )
}
