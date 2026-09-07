import { Link, useLocation, Navigate } from 'react-router-dom'
import { Check, FileText, Mail, ShieldCheck } from 'lucide-react'

export type OrderConfirmationState = {
  orderId: string
  email?: string
  total: number
  itemCount: number
}

export function OrderConfirmation() {
  const location = useLocation()
  const state = (location.state || { total: 0, itemCount: 0 }) as OrderConfirmationState
  const params = new URLSearchParams(location.search)
  const orderId = state?.orderId || params.get('order') || params.get('order_number')
  const email = state?.email
  const total = state?.total
  const itemCount = state?.itemCount

  if (!orderId) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center sm:px-6">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-leather-600/15 text-leather-600">
        <Check className="h-8 w-8" strokeWidth={2.5} />
      </div>
      <p className="mt-6 font-body text-xs font-bold uppercase tracking-[0.18em] text-leather-700">
        Demande enregistrée
      </p>
      <h1 className="mt-3 font-display text-3xl font-semibold text-hunter-900">
        Votre commande est en attente de virement
      </h1>
      <p className="mt-2 text-ink-600">
        Merci pour votre confiance. Votre demande a bien été enregistrée sous la référence <strong>{orderId}</strong>.
        Un récapitulatif contenant les modalités de règlement sera envoyé à l’adresse utilisée lors de la commande.
      </p>

      <div className="mt-8 border border-hunter-800/10 bg-oat-50 px-6 py-5 text-left">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-600">
            Référence de commande
        </p>
        <p className="mt-1 font-mono text-xl font-bold text-hunter-900">{orderId}</p>
        <dl className="mt-4 space-y-2 text-sm">
          {itemCount !== undefined && <div className="flex justify-between">
            <dt className="text-ink-600">Articles</dt>
            <dd className="font-medium text-hunter-900">{itemCount}</dd>
          </div>}
          {total !== undefined && <div className="flex justify-between">
            <dt className="text-ink-600">Total</dt>
            <dd className="font-mono font-semibold text-hunter-900">
              {total.toFixed(2)} €
            </dd>
          </div>}
          {email && (
            <div className="flex justify-between gap-4">
              <dt className="text-ink-600">Confirmation</dt>
              <dd className="truncate text-right font-medium text-hunter-900">{email}</dd>
            </div>
          )}
        </dl>
      </div>

      <div className="mt-8 border border-hunter-800/10 bg-oat-200/60 p-5 text-left">
        <p className="flex items-center gap-2 font-display font-semibold text-hunter-900"><FileText className="h-5 w-5 text-leather-600" /> Prochaine étape : effectuer le virement</p>
        <p className="mt-2 text-sm leading-relaxed text-ink-600">Indiquez la référence <strong>{orderId}</strong> dans le libellé du virement. Les coordonnées bancaires et le montant définitif figurent dans l’e-mail de confirmation transmis par EquiNutrition.</p>
      </div>
      <div className="mt-5 flex items-start gap-3 text-left text-sm text-ink-600"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-hunter-800" /><span>Votre commande sera préparée après réception et validation du règlement.</span></div>
      <p className="mt-4 flex items-center justify-center gap-2 text-xs text-ink-600"><Mail className="h-4 w-4" />Conservez cet e-mail pour suivre votre commande.</p>

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
