import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CheckCircle2, MailCheck, ShieldCheck } from 'lucide-react'
import { usePageMeta } from '../hooks/usePageMeta'
import { verifyEmail } from '../lib/api'

export function VerifyEmail() {
  const [params] = useSearchParams()
  const [status, setStatus] = useState<'pending' | 'verified' | 'invalid'>('pending')
  usePageMeta('Vérifier mon adresse e-mail')
  useEffect(() => {
    const key = params.get('key')
    const email = params.get('email')
    if (!key || !email) { setStatus('invalid'); return }
    let active = true
    verifyEmail(key, email).then(() => active && setStatus('verified')).catch(() => active && setStatus('invalid'))
    return () => { active = false }
  }, [params])
  return <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6"><div className="grid gap-8 md:grid-cols-[1fr_280px]"><div className="border border-hunter-800/10 bg-oat-50 p-6 sm:p-8"><MailCheck className="h-8 w-8 text-leather-600" /><p className="mt-6 font-body text-xs font-bold uppercase tracking-[0.18em] text-leather-700">Espace client</p>{status === 'pending' && <><h1 className="mt-2 font-display text-3xl font-semibold text-hunter-900">Vérification en cours</h1><p className="mt-4 text-sm text-ink-600">Nous confirmons votre adresse e-mail.</p></>}{status === 'verified' && <><CheckCircle2 className="mt-6 h-8 w-8 text-leather-600" /><h1 className="mt-3 font-display text-3xl font-semibold text-hunter-900">Votre adresse est confirmée</h1><p className="mt-4 text-sm text-ink-600">Votre compte est prêt. Vous pouvez maintenant vous connecter.</p><Link to="/connexion" className="focus-ring btn-primary mt-6">Se connecter</Link></>}{status === 'invalid' && <><h1 className="mt-2 font-display text-3xl font-semibold text-hunter-900">Lien indisponible</h1><p className="mt-4 text-sm text-ink-600">Ce lien est invalide ou a expiré. Vous pouvez créer un nouveau compte.</p><Link to="/inscription" className="focus-ring btn-primary mt-6">Créer un compte</Link></>}</div><aside className="h-fit border border-hunter-800/10 bg-hunter-900 p-6 text-oat-50"><ShieldCheck className="h-6 w-6 text-straw-400" /><h2 className="mt-5 font-display text-xl font-semibold">Une adresse fiable</h2><p className="mt-3 text-sm leading-relaxed text-oat-100/75">La vérification protège votre espace client et sécurise les informations de commande.</p></aside></div></div>
}
