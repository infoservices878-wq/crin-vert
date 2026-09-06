import { useState, type FormEvent } from 'react'
import { ExternalLink, PackageCheck } from 'lucide-react'
import { lookupOrder } from '../lib/api'
import { usePageMeta } from '../hooks/usePageMeta'

export function OrderTracking() {
  usePageMeta('Suivre ma commande')
  const [result, setResult] = useState<{ orderNumber: string; status: string; trackingUrl?: string } | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  async function submit(e: FormEvent<HTMLFormElement>) { e.preventDefault(); setLoading(true); setError(''); setResult(null); const data = new FormData(e.currentTarget); try { setResult(await lookupOrder(String(data.get('orderNumber')), String(data.get('email')))) } catch (reason) { setError(reason instanceof Error ? reason.message : 'Commande introuvable.') } finally { setLoading(false) } }
  return <div className="mx-auto max-w-xl px-4 py-16 sm:px-6"><PackageCheck className="mx-auto h-10 w-10 text-leather-600" /><h1 className="mt-4 text-center font-display text-3xl font-extrabold text-hunter-900">Suivre ma commande</h1><p className="mt-3 text-center text-ink-600">Retrouvez l’avancement de votre livraison avec votre numéro de commande et votre e-mail.</p><form onSubmit={submit} className="mt-8 space-y-5 border border-hunter-800/10 bg-oat-50 p-6"><label className="block text-sm font-semibold">Numéro de commande<input required name="orderNumber" placeholder="Ex. NE-10482" className="focus-ring mt-1.5 w-full border border-hunter-800/15 px-3 py-2.5" /></label><label className="block text-sm font-semibold">E-mail utilisé lors de la commande<input required type="email" name="email" className="focus-ring mt-1.5 w-full border border-hunter-800/15 px-3 py-2.5" /></label>{error && <p role="alert" className="text-sm text-flag-red">{error}</p>}<button disabled={loading} className="focus-ring btn-primary w-full">{loading ? 'Recherche…' : 'Voir le suivi'}</button></form>{result && <div className="mt-5 border border-leather-600/30 bg-leather-600/5 p-5"><p className="font-mono font-bold text-hunter-900">{result.orderNumber}</p><p className="mt-1 text-sm text-ink-600">Statut : {result.status}</p>{result.trackingUrl && <a className="focus-ring mt-4 inline-flex items-center gap-1 font-display text-sm font-bold text-leather-700 underline" href={result.trackingUrl} target="_blank" rel="noreferrer">Suivre le colis <ExternalLink className="h-3.5 w-3.5" /></a>}</div>}</div>
}
