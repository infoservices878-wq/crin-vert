import { useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRight, LockKeyhole, ShieldCheck } from 'lucide-react'
import { usePageMeta } from '../hooks/usePageMeta'

export function ResetPassword() {
  const [params] = useSearchParams()
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  usePageMeta('Réinitialiser mon mot de passe')
  const hasLink = Boolean(params.get('key') && params.get('login'))
  const submit = (event: FormEvent) => { event.preventDefault(); setError(''); if (password.length < 8) return setError('Choisissez au moins 8 caractères.'); if (password !== confirmation) return setError('Les deux mots de passe ne correspondent pas.'); setSubmitted(true) }
  return <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6"><div className="grid gap-8 md:grid-cols-[1fr_280px]"><form onSubmit={submit} className="border border-hunter-800/10 bg-oat-50 p-6 sm:p-8"><LockKeyhole className="h-8 w-8 text-leather-600" /><p className="mt-6 font-body text-xs font-bold uppercase tracking-[0.18em] text-leather-700">Espace client</p><h1 className="mt-2 font-display text-3xl font-semibold text-hunter-900">Choisir un nouveau mot de passe</h1>{submitted ? <><p className="mt-4 text-sm leading-relaxed text-ink-600">Votre mot de passe a été mis à jour dans cette démonstration. Vous pouvez maintenant vous connecter.</p><Link to="/connexion" className="focus-ring btn-primary mt-6">Se connecter <ArrowRight className="h-4 w-4" /></Link></> : !hasLink ? <><p className="mt-4 text-sm leading-relaxed text-ink-600">Ce lien est incomplet ou expiré. Retournez à la connexion pour demander un nouvel e-mail.</p><Link to="/connexion" className="focus-ring btn-primary mt-6">Retour à la connexion</Link></> : <div className="mt-6 space-y-5"><label className="block text-sm font-semibold text-hunter-900">Nouveau mot de passe<input required minLength={8} type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="focus-ring mt-1.5 w-full border border-hunter-800/15 bg-oat-50 px-3 py-2.5" /></label><label className="block text-sm font-semibold text-hunter-900">Confirmer le mot de passe<input required minLength={8} type="password" value={confirmation} onChange={(e) => setConfirmation(e.target.value)} className="focus-ring mt-1.5 w-full border border-hunter-800/15 bg-oat-50 px-3 py-2.5" /></label>{error && <p role="alert" className="text-sm text-flag-red">{error}</p>}<button className="focus-ring btn-primary w-full">Modifier mon mot de passe</button></div>}</form><aside className="h-fit border border-hunter-800/10 bg-hunter-900 p-6 text-oat-50"><ShieldCheck className="h-6 w-6 text-straw-400" /><h2 className="mt-5 font-display text-xl font-semibold">Un espace protégé</h2><p className="mt-3 text-sm leading-relaxed text-oat-100/75">Le lien reçu par e-mail est personnel. Ne le partagez jamais et privilégiez un mot de passe unique.</p></aside></div></div>
}
