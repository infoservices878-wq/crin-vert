import { Link, useLocation, Navigate } from 'react-router-dom'
import { Check, Package, Mail } from 'lucide-react'

export type OrderConfirmationState = {
  orderId: string
  email?: string
  total: number
  itemCount: number
}

export function OrderConfirmation() {
  const location = useLocation()
  const state = location.state as OrderConfirmationState | null

  if (!state?.orderId) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center sm:px-6">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-leather-600/15 text-leather-600">
        <Check className="h-8 w-8" strokeWidth={2.5} />
      </div>
      <h1 className="mt-6 font-display text-3xl font-extrabold text-hunter-900">
        Merci pour votre commande
      </h1>
      <p className="mt-2 text-ink-600">
        Votre commande a bien été enregistrée (démonstration — aucun paiement réel).
      </p>

      <div className="mt-8 border border-hunter-800/10 bg-oat-50 px-6 py-5 text-left">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-600">
          Numéro de commande
        </p>
        <p className="mt-1 font-mono text-xl font-bold text-hunter-900">{state.orderId}</p>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-ink-600">Articles</dt>
            <dd className="font-medium text-hunter-900">{state.itemCount}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink-600">Total</dt>
            <dd className="font-mono font-semibold text-hunter-900">
              {state.total.toFixed(2)} €
            </dd>
          </div>
          {state.email && (
            <div className="flex justify-between gap-4">
              <dt className="text-ink-600">Confirmation</dt>
              <dd className="truncate text-right font-medium text-hunter-900">{state.email}</dd>
            </div>
          )}
        </dl>
      </div>

      <ul className="mt-8 space-y-3 text-left text-sm text-ink-600">
        <li className="flex gap-3">
          <Mail className="mt-0.5 h-4 w-4 shrink-0 text-hunter-800" />
          Un e-mail de confirmation serait envoyé en production.
        </li>
        <li className="flex gap-3">
          <Package className="mt-0.5 h-4 w-4 shrink-0 text-hunter-800" />
          Préparation sous 24–48 h ouvrés (délais indicatifs).
        </li>
      </ul>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link to="/catalogue" className="focus-ring btn-primary">
          Continuer mes achats
        </Link>
        <Link to="/compte" className="focus-ring btn-secondary">
          Mon compte
        </Link>
      </div>
    </div>
  )
}
