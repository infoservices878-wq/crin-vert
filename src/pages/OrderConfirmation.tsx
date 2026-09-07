import { Link, Navigate, useSearchParams } from 'react-router-dom'
import { Check, FileText, Mail, ShieldCheck } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getOrderConfirmation, type OrderConfirmation as OrderConfirmationData } from '../lib/api'

const money = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })

export function OrderConfirmation() {
  const [params] = useSearchParams()
  const referenceInUrl = params.get('order') || params.get('order_number')
  const token = params.get('token') || ''
  const [order, setOrder] = useState<OrderConfirmationData | null>(null)
  const [detailsRequestFailed, setDetailsRequestFailed] = useState(false)

  useEffect(() => {
    let current = true
    if (!token) {
      return () => { current = false }
    }

    getOrderConfirmation(token)
      .then((data) => { if (current) setOrder(data) })
      .catch(() => { if (current) setDetailsRequestFailed(true) })

    return () => { current = false }
  }, [token])

  if (!referenceInUrl) return <Navigate to="/" replace />

  const reference = order?.reference || referenceInUrl

  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center sm:px-6">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-leather-600/15 text-leather-600">
        <Check className="h-8 w-8" strokeWidth={2.5} />
      </div>
      <p className="mt-6 font-body text-xs font-bold uppercase tracking-[0.18em] text-leather-700">Demande enregistrée</p>
      <h1 className="mt-3 font-display text-3xl font-semibold text-hunter-900">Votre commande est en attente de virement</h1>
      <p className="mt-2 text-ink-600">
        Merci pour votre confiance. Votre demande a bien été enregistrée sous la référence <strong>{reference}</strong>.
      </p>

      <div className="mt-8 border border-hunter-800/10 bg-oat-50 px-6 py-5 text-left">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-600">Référence de commande</p>
        <p className="mt-1 font-mono text-xl font-bold text-hunter-900">{reference}</p>

        {order ? (
          <>
            <div className="mt-5 border-t border-hunter-800/10 pt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-600">Articles commandés</p>
              <ul className="mt-3 space-y-3 text-sm">
                {order.items.map((item, index) => (
                  <li className="flex items-start justify-between gap-4" key={`${item.name}-${index}`}>
                    <span className="text-ink-600"><span className="font-medium text-hunter-900">{item.name}</span><br />Quantité : {item.quantity}</span>
                    <span className="shrink-0 font-mono font-medium text-hunter-900">{money.format(item.total)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <dl className="mt-5 space-y-2 border-t border-hunter-800/10 pt-4 text-sm">
              {order.shipping > 0 && <div className="flex justify-between"><dt className="text-ink-600">Livraison</dt><dd className="font-mono text-hunter-900">{money.format(order.shipping)}</dd></div>}
              <div className="flex justify-between text-base"><dt className="font-semibold text-hunter-900">Total TTC</dt><dd className="font-mono font-bold text-hunter-900">{money.format(order.total)}</dd></div>
            </dl>
          </>
        ) : !(detailsRequestFailed || !token) ? (
          <p className="mt-5 text-sm text-ink-600">Chargement du récapitulatif de commande…</p>
        ) : (
          <p className="mt-5 text-sm text-ink-600">Le récapitulatif détaillé n’est plus disponible sur ce lien. Notre équipe peut vous le transmettre sur demande.</p>
        )}
      </div>

      <div className="mt-8 border border-hunter-800/10 bg-oat-200/60 p-5 text-left">
        <p className="flex items-center gap-2 font-display font-semibold text-hunter-900"><FileText className="h-5 w-5 text-leather-600" /> Prochaine étape : effectuer le virement</p>
        <p className="mt-2 text-sm leading-relaxed text-ink-600">Indiquez la référence <strong>{reference}</strong> dans le libellé du virement. Les coordonnées bancaires et le montant définitif figurent dans l’e-mail de confirmation.</p>
      </div>
      {order && !order.customerEmailSent && <p className="mt-5 text-sm text-leather-700">L’e-mail de confirmation n’a pas pu être envoyé automatiquement. Conservez cette référence et contactez-nous pour recevoir les coordonnées de règlement.</p>}
      <div className="mt-5 flex items-start gap-3 text-left text-sm text-ink-600"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-hunter-800" /><span>Votre commande sera préparée après réception et validation du règlement.</span></div>
      <p className="mt-4 flex items-center justify-center gap-2 text-xs text-ink-600"><Mail className="h-4 w-4" />Conservez cet e-mail pour suivre votre commande.</p>

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link to="/catalogue" className="focus-ring btn-primary">Continuer mes achats</Link>
        <Link to="/compte" className="focus-ring btn-secondary">Mon compte</Link>
      </div>
    </div>
  )
}
