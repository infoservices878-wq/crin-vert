import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import {
  registerParticulierSchema,
  registerProfessionnelSchema,
  parseForm,
  inputErrorClass,
  type FieldErrors,
} from '../lib/validation'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { ApiError } from '../lib/woocommerce'

type AccountType = 'particulier' | 'professionnel'

const NAME_HINT =
  'Seules les lettres et le point (.), suivi d’un espace, sont autorisés.'

const baseInput =
  'focus-ring w-full border bg-oat-50 px-4 py-3 text-hunter-900 placeholder:text-ink-600 border-hunter-800/20'

export function Register() {
  const { register } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()
  const [type, setType] = useState<AccountType>('particulier')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [company, setCompany] = useState('')
  const [vat, setVat] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [privacy, setPrivacy] = useState(false)
  const [newsletter, setNewsletter] = useState(false)
  const [terms, setTerms] = useState(false)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const clearFieldError = (key: string) => {
    setErrors((prev) => {
      if (!prev[key]) return prev
      const n = { ...prev }
      delete n[key]
      return n
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setFormError(null)
    const base = {
      firstName,
      lastName,
      email,
      password,
      privacy,
      terms,
      newsletter,
    }
    const schema =
      type === 'professionnel' ? registerProfessionnelSchema : registerParticulierSchema
    const payload = type === 'professionnel' ? { ...base, company, vat } : base

    const result = parseForm(schema, payload)
    if (!result.success) {
      setErrors(result.errors)
      return
    }
    setErrors({})
    setLoading(true)
    try {
      await register({
        email: result.data.email,
        password: result.data.password,
        firstName: result.data.firstName,
        lastName: result.data.lastName,
        accountType: type,
        company: type === 'professionnel' ? company : undefined,
        vat: type === 'professionnel' ? vat : undefined,
        newsletter,
      })
      setSuccess(true)
      toast('Compte créé — vous êtes connecté', 'success')
      setTimeout(() => navigate('/'), 1200)
    } catch (err) {
      const msg =
        err instanceof ApiError
          ? err.message
          : 'Une erreur est survenue. Réessayez plus tard.'
      setFormError(msg)
      if (err instanceof ApiError && err.code === 'email_exists') {
        setErrors({ email: msg })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-[70vh]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1400&q=70')",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-hunter-950/40" aria-hidden="true" />

      <div className="relative mx-auto flex max-w-lg justify-center px-4 py-8 sm:py-12">
        <div className="w-full bg-oat-50 px-5 py-8 shadow-xl sm:px-10 sm:py-10">
          <h1 className="text-center font-display text-2xl font-bold text-hunter-900">
            Inscription
          </h1>

          <div
            className="mt-8 flex border-b border-hunter-800/15"
            role="tablist"
            aria-label="Type de compte"
          >
            {(['particulier', 'professionnel'] as const).map((t) => (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={type === t}
                onClick={() => {
                  setType(t)
                  setErrors({})
                  setFormError(null)
                }}
                className={`focus-ring flex-1 pb-3 text-center font-display text-sm font-semibold transition-colors ${
                  type === t
                    ? 'border-b-2 border-hunter-900 text-hunter-900'
                    : 'text-ink-600 hover:text-hunter-900'
                }`}
              >
                {t === 'particulier' ? 'Particulier' : 'Professionnel'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
            <div>
              <input
                type="text"
                placeholder="Prénom*"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value)
                  clearFieldError('firstName')
                }}
                aria-invalid={!!errors.firstName}
                className={inputErrorClass(!!errors.firstName, baseInput)}
              />
              <p className="mt-1.5 text-xs text-ink-600">{NAME_HINT}</p>
              {errors.firstName && (
                <p className="mt-1 text-xs text-flag-red" role="alert">
                  {errors.firstName}
                </p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="Nom*"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value)
                  clearFieldError('lastName')
                }}
                aria-invalid={!!errors.lastName}
                className={inputErrorClass(!!errors.lastName, baseInput)}
              />
              <p className="mt-1.5 text-xs text-ink-600">{NAME_HINT}</p>
              {errors.lastName && (
                <p className="mt-1 text-xs text-flag-red" role="alert">
                  {errors.lastName}
                </p>
              )}
            </div>

            {type === 'professionnel' && (
              <>
                <div>
                  <input
                    type="text"
                    placeholder="Société*"
                    value={company}
                    onChange={(e) => {
                      setCompany(e.target.value)
                      clearFieldError('company')
                    }}
                    aria-invalid={!!errors.company}
                    className={inputErrorClass(!!errors.company, baseInput)}
                  />
                  {errors.company && (
                    <p className="mt-1.5 text-xs text-flag-red" role="alert">
                      {errors.company}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="TVA Intracommunautaire*"
                    value={vat}
                    onChange={(e) => {
                      setVat(e.target.value)
                      clearFieldError('vat')
                    }}
                    aria-invalid={!!errors.vat}
                    className={inputErrorClass(!!errors.vat, baseInput)}
                  />
                  {errors.vat && (
                    <p className="mt-1.5 text-xs text-flag-red" role="alert">
                      {errors.vat}
                    </p>
                  )}
                </div>
              </>
            )}

            <div>
              <input
                type="email"
                autoComplete="email"
                placeholder="E-Mail*"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  clearFieldError('email')
                }}
                aria-invalid={!!errors.email}
                className={inputErrorClass(!!errors.email, baseInput)}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-flag-red" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <div
                className={`flex border ${errors.password ? 'border-flag-red' : 'border-hunter-800/20'}`}
              >
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Mot de passe*"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    clearFieldError('password')
                  }}
                  aria-invalid={!!errors.password}
                  className="focus-ring min-w-0 flex-1 border-0 bg-oat-50 px-4 py-3 text-hunter-900 placeholder:text-ink-600 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="focus-ring flex items-center justify-center bg-hunter-900 px-3 text-oat-50"
                  aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" strokeWidth={1.75} />
                  ) : (
                    <Eye className="h-5 w-5" strokeWidth={1.75} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-flag-red" role="alert">
                  {errors.password}
                </p>
              )}
            </div>

            <label className="flex cursor-pointer gap-3 text-sm leading-snug text-ink-900">
              <input
                type="checkbox"
                checked={privacy}
                onChange={(e) => {
                  setPrivacy(e.target.checked)
                  clearFieldError('privacy')
                }}
                className="mt-1 h-4 w-4 shrink-0 accent-hunter-900"
              />
              <span>
                <span className="font-semibold">
                  Message concernant la confidentialité des données clients
                </span>
                <br />
                <span className="text-ink-600">
                  Conformément aux dispositions de la loi n°78-17 du 6 janvier 1978, vous
                  disposez d’un droit d’accès, de rectification et d’opposition sur les
                  données nominatives vous concernant.
                </span>
                {errors.privacy && (
                  <span className="mt-1 block text-xs text-flag-red" role="alert">
                    {errors.privacy}
                  </span>
                )}
              </span>
            </label>

            <label className="flex cursor-pointer gap-3 text-sm leading-snug text-ink-900">
              <input
                type="checkbox"
                checked={newsletter}
                onChange={(e) => setNewsletter(e.target.checked)}
                className="mt-1 h-4 w-4 shrink-0 accent-hunter-900"
              />
              <span>
                <span className="font-semibold">Recevoir notre newsletter</span>
                <br />
                <span className="text-ink-600">
                  Je souhaite recevoir les conseils santé Nutrition Équine. 1 newsletter par
                  semaine, désinscription immédiate possible à tout moment.
                </span>
              </span>
            </label>

            <label className="flex cursor-pointer gap-3 text-sm leading-snug text-ink-900">
              <input
                type="checkbox"
                checked={terms}
                onChange={(e) => {
                  setTerms(e.target.checked)
                  clearFieldError('terms')
                }}
                className="mt-1 h-4 w-4 shrink-0 accent-hunter-900"
              />
              <span>
                J’accepte les{' '}
                <Link to="/cgv" className="underline hover:text-leather-600">
                  conditions générales
                </Link>{' '}
                et la{' '}
                <Link to="/mentions-legales" className="underline hover:text-leather-600">
                  politique de confidentialité
                </Link>
                {errors.terms && (
                  <span className="mt-1 block text-xs text-flag-red" role="alert">
                    {errors.terms}
                  </span>
                )}
              </span>
            </label>

            <button
              type="submit"
              disabled={loading || success}
              className="focus-ring w-full bg-hunter-900 py-3.5 font-display font-semibold text-oat-50 transition-colors hover:bg-hunter-800 disabled:opacity-60"
            >
              {loading ? 'Création…' : success ? 'Compte créé ✓' : 'Enregistrer'}
            </button>
          </form>

          {formError && (
            <p className="mt-5 rounded-sm border border-flag-red/30 bg-flag-red/5 px-3 py-2.5 text-center text-sm text-flag-red" role="alert">
              {formError}
            </p>
          )}
          {success && (
            <p className="mt-5 rounded-sm border border-hunter-800/15 bg-oat-100 px-3 py-2.5 text-center text-sm text-hunter-900">
              Compte créé. Vous êtes connecté — redirection…
            </p>
          )}

          <p className="mt-6 text-center text-sm text-ink-600">
            Vous avez déjà un compte ?{' '}
            <Link
              to="/connexion"
              className="focus-ring font-semibold text-hunter-900 underline hover:text-leather-600"
            >
              Connectez-vous
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
