import { useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRight, Eye, EyeOff, LockKeyhole, MailCheck, ShieldCheck } from 'lucide-react'
import { usePageMeta } from '../hooks/usePageMeta'
import { requestPasswordReset, resetPassword } from '../lib/api'

const input = 'focus-ring mt-1.5 w-full border border-hunter-800/15 bg-oat-50 px-3 py-2.5 text-hunter-900'

export function ResetPassword() {
  const [params] = useSearchParams()
  const key = params.get('key') || ''
  const login = params.get('login') || ''
  const hasResetLink = Boolean(key && login)
  const hasIncompleteLink = Boolean(key || login) && !hasResetLink
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [requestSent, setRequestSent] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  usePageMeta('Réinitialiser mon mot de passe')

  const requestLink = async (event: FormEvent) => {
    event.preventDefault()
    setError('')
    if (!email.trim()) return setError('Saisissez votre adresse e-mail.')
    setLoading(true)
    try {
      await requestPasswordReset(email.trim())
      setRequestSent(true)
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Impossible d’envoyer l’e-mail de réinitialisation.')
    } finally {
      setLoading(false)
    }
  }

  const submitPassword = async (event: FormEvent) => {
    event.preventDefault()
    setError('')
    if (password.length < 8) return setError('Choisissez au moins 8 caractères.')
    if (password !== confirmation) return setError('Les deux mots de passe ne correspondent pas.')
    setLoading(true)
    try {
      await resetPassword(key, login, password)
      setSubmitted(true)
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Impossible de modifier le mot de passe.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <div className="grid gap-8 md:grid-cols-[1fr_280px]">
        <section className="border border-hunter-800/10 bg-oat-50 p-6 sm:p-8">
          {hasResetLink ? <LockKeyhole className="h-8 w-8 text-leather-600" /> : <MailCheck className="h-8 w-8 text-leather-600" />}
          <p className="mt-6 font-body text-xs font-bold uppercase tracking-[0.18em] text-leather-700">Espace client</p>

          {hasResetLink ? (
            <>
              <h1 className="mt-2 font-display text-3xl font-semibold text-hunter-900">Choisir un nouveau mot de passe</h1>
              {submitted ? (
                <><p className="mt-4 text-sm leading-relaxed text-ink-600">Votre mot de passe a été mis à jour. Vous pouvez maintenant vous connecter.</p><Link to="/connexion" className="focus-ring btn-primary mt-6">Se connecter <ArrowRight className="h-4 w-4" /></Link></>
              ) : (
                <form onSubmit={submitPassword} className="mt-6 space-y-5">
                  <label className="block text-sm font-semibold text-hunter-900">Nouveau mot de passe
                    <span className="mt-1.5 flex border border-hunter-800/15 bg-oat-50">
                      <input required minLength={8} autoComplete="new-password" type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} className="focus-ring min-w-0 flex-1 bg-transparent px-3 py-2.5 text-hunter-900 outline-none" />
                      <button type="button" onClick={() => setShowPassword((visible) => !visible)} className="focus-ring flex w-11 items-center justify-center text-hunter-900 hover:bg-oat-200" aria-label={showPassword ? 'Masquer le nouveau mot de passe' : 'Afficher le nouveau mot de passe'}>{showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button>
                    </span>
                  </label>
                  <label className="block text-sm font-semibold text-hunter-900">Confirmer le mot de passe
                    <span className="mt-1.5 flex border border-hunter-800/15 bg-oat-50">
                      <input required minLength={8} autoComplete="new-password" type={showConfirmation ? 'text' : 'password'} value={confirmation} onChange={(event) => setConfirmation(event.target.value)} className="focus-ring min-w-0 flex-1 bg-transparent px-3 py-2.5 text-hunter-900 outline-none" />
                      <button type="button" onClick={() => setShowConfirmation((visible) => !visible)} className="focus-ring flex w-11 items-center justify-center text-hunter-900 hover:bg-oat-200" aria-label={showConfirmation ? 'Masquer la confirmation du mot de passe' : 'Afficher la confirmation du mot de passe'}>{showConfirmation ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button>
                    </span>
                  </label>
                  {error && <p role="alert" className="text-sm text-flag-red">{error}</p>}
                  <button disabled={loading} className="focus-ring btn-primary w-full disabled:opacity-60">{loading ? 'Mise à jour…' : 'Modifier mon mot de passe'}</button>
                </form>
              )}
            </>
          ) : (
            <>
              <h1 className="mt-2 font-display text-3xl font-semibold text-hunter-900">Mot de passe oublié ?</h1>
              {requestSent ? (
                <div className="mt-5 border-l-2 border-straw-400 bg-oat-100 px-4 py-4 text-sm leading-relaxed text-ink-700"><strong className="block text-hunter-900">Vérifiez votre boîte e-mail.</strong>Si un compte correspond à cette adresse, un lien de réinitialisation vient d’être envoyé. Pensez à consulter vos courriers indésirables.</div>
              ) : (
                <form onSubmit={requestLink} className="mt-5 space-y-5">
                  <p className="text-sm leading-relaxed text-ink-600">Saisissez l’adresse e-mail associée à votre compte. Nous vous enverrons un lien personnel pour choisir un nouveau mot de passe.</p>
                  {hasIncompleteLink && <p className="border-l-2 border-leather-600 bg-leather-600/5 px-4 py-3 text-sm text-ink-700">Le précédent lien est incomplet ou expiré. Demandez-en un nouveau ci-dessous.</p>}
                  <label className="block text-sm font-semibold text-hunter-900">Adresse e-mail<input required autoComplete="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} className={input} /></label>
                  {error && <p role="alert" className="text-sm text-flag-red">{error}</p>}
                  <button disabled={loading} className="focus-ring btn-primary w-full disabled:opacity-60">{loading ? 'Envoi…' : 'Recevoir le lien de réinitialisation'}</button>
                </form>
              )}
            </>
          )}
          <Link to="/connexion" className="focus-ring mt-7 inline-block text-sm font-semibold text-hunter-900 underline hover:text-leather-600">Retour à la connexion</Link>
        </section>

        <aside className="h-fit border border-hunter-800/10 bg-hunter-900 p-6 text-oat-50"><ShieldCheck className="h-6 w-6 text-straw-400" /><h2 className="mt-5 font-display text-xl font-semibold">Un espace protégé</h2><p className="mt-3 text-sm leading-relaxed text-oat-100/75">Le lien reçu par e-mail est personnel. Ne le partagez jamais et privilégiez un mot de passe unique.</p></aside>
      </div>
    </div>
  )
}
