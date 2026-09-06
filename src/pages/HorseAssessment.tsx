import { useState, type FormEvent } from 'react'
import { Check, ShieldCheck, Stethoscope } from 'lucide-react'
import { sendHorseAssessment } from '../lib/api'
import { usePageMeta } from '../hooks/usePageMeta'

const input = 'focus-ring mt-1.5 w-full rounded-md border border-hunter-800/15 bg-oat-50 px-3 py-2.5 text-sm text-ink-900'

export function HorseAssessment() {
  usePageMeta('Bilan équin offert', 'Recevez des conseils nutritionnels adaptés au profil de votre cheval.')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setLoading(true)
    const values = Object.fromEntries(new FormData(event.currentTarget))
    try {
      await sendHorseAssessment(values)
      setSent(true)
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Impossible d’envoyer votre demande.')
    } finally {
      setLoading(false)
    }
  }

  if (sent) return <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6"><Check className="mx-auto h-12 w-12 text-leather-600" /><h1 className="mt-5 font-display text-3xl font-extrabold text-hunter-900">Votre bilan est bien reçu</h1><p className="mt-3 text-ink-600">Un conseiller nutrition équine vous répondra par e-mail sous 48 h ouvrées.</p></div>

  return <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
    <div className="text-center"><p className="font-display text-xs font-bold uppercase tracking-[.2em] text-leather-600">Conseil personnalisé</p><h1 className="mt-2 font-display text-4xl font-extrabold text-hunter-900">Le bilan équin offert</h1><p className="mx-auto mt-4 max-w-xl text-ink-600">Quelques informations sur votre cheval nous permettent de vous orienter vers une alimentation adaptée. Ce bilan ne remplace pas un avis vétérinaire.</p></div>
    <div className="mt-8 grid gap-4 sm:grid-cols-3"><div className="flex gap-3 border border-hunter-800/10 bg-oat-50 p-4"><Stethoscope className="h-5 w-5 shrink-0 text-leather-600" /><p className="text-sm">Une recommandation basée sur l’âge, l’activité et les besoins.</p></div><div className="flex gap-3 border border-hunter-800/10 bg-oat-50 p-4"><ShieldCheck className="h-5 w-5 shrink-0 text-leather-600" /><p className="text-sm">Vos données restent utilisées uniquement pour répondre.</p></div><div className="flex gap-3 border border-hunter-800/10 bg-oat-50 p-4"><Check className="h-5 w-5 shrink-0 text-leather-600" /><p className="text-sm">Une réponse sous 48 h ouvrées, sans engagement.</p></div></div>
    <form onSubmit={submit} className="mt-8 space-y-5 rounded-lg border border-hunter-800/10 bg-oat-50 p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2"><label><span className="font-display text-sm font-semibold">Votre prénom *</span><input required name="firstName" className={input} /></label><label><span className="font-display text-sm font-semibold">Votre e-mail *</span><input required type="email" name="email" className={input} /></label></div>
      <div className="grid gap-5 sm:grid-cols-2"><label><span className="font-display text-sm font-semibold">Nom du cheval *</span><input required name="horseName" className={input} /></label><label><span className="font-display text-sm font-semibold">Âge</span><input name="age" inputMode="numeric" className={input} placeholder="Ex. 12 ans" /></label></div>
      <div className="grid gap-5 sm:grid-cols-2"><label><span className="font-display text-sm font-semibold">Activité *</span><select required name="activity" className={input}><option value="">Sélectionnez</option><option>Loisir</option><option>Sport / compétition</option><option>Élevage</option><option>Retraité</option></select></label><label><span className="font-display text-sm font-semibold">Besoin principal *</span><select required name="need" className={input}><option value="">Sélectionnez</option><option>Alimentation / état corporel</option><option>Digestion</option><option>Articulations</option><option>Robe, peau ou sabots</option><option>Stress / comportement</option><option>Autre</option></select></label></div>
      <label><span className="font-display text-sm font-semibold">Contexte ou observations</span><textarea name="notes" rows={4} className={`${input} resize-y`} placeholder="Ration actuelle, sensibilité, traitements en cours…" /></label>
      <label className="flex gap-2 text-xs text-ink-600"><input required type="checkbox" className="mt-0.5 accent-hunter-800" />J’accepte que ces informations soient traitées pour recevoir une réponse à ma demande. *</label>
      {error && <p role="alert" className="text-sm text-flag-red">{error}</p>}<button disabled={loading} className="focus-ring btn-primary w-full disabled:opacity-60">{loading ? 'Envoi en cours…' : 'Recevoir mon bilan gratuit'}</button>
    </form>
  </div>
}
