import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import {
  loginSchema,
  parseForm,
  inputErrorClass,
  type FieldErrors,
} from '../lib/validation'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { ApiError } from '../lib/woocommerce'

const baseInput =
  'focus-ring w-full border bg-oat-50 px-4 py-3 text-hunter-900 placeholder:text-ink-600 border-hunter-800/20'

export function Login() {
  const { login, isAuthenticated, user, logout } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    setFormError(null)
    const result = parseForm(loginSchema, { email, password })
    if (!result.success) {
      setErrors(result.errors)
      return
    }
    setErrors({})
    setLoading(true)
    try {
      await login(result.data.email, result.data.password)
      toast('Connexion réussie', 'success')
      navigate('/')
    } catch (err) {
      setFormError(
        err instanceof ApiError
          ? err.message
          : 'Impossible de se connecter. Réessayez.',
      )
    } finally {
      setLoading(false)
    }
  }

  if (isAuthenticated && user) {
    return (
      <div className="relative min-h-[50vh]">
        <div className="relative mx-auto max-w-lg px-4 py-16">
          <div className="bg-oat-50 px-6 py-10 text-center shadow-xl sm:px-10">
            <h1 className="font-display text-2xl font-bold text-hunter-900">
              Bonjour {user.firstName || user.email}
            </h1>
            <p className="mt-2 text-sm text-ink-600">
              Connecté en tant que <strong>{user.email}</strong>
              {user.demo && ' (compte démo local)'}
            </p>
            <button
              type="button"
              onClick={() => {
                logout()
              }}
              className="focus-ring mt-8 w-full border border-hunter-900 py-3 font-display font-semibold text-hunter-900 hover:bg-hunter-900 hover:text-oat-50"
            >
              Se déconnecter
            </button>
            <Link
              to="/"
              className="focus-ring mt-4 inline-block text-sm font-semibold text-hunter-900 underline"
            >
              ← Retour à l’accueil
            </Link>
          </div>
        </div>
      </div>
    )
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
      <div className="absolute inset-0 bg-hunter-950/45" aria-hidden="true" />

      <div className="relative mx-auto flex max-w-lg justify-center px-4 py-10 sm:py-16">
        <div className="w-full bg-oat-50 px-6 py-10 shadow-xl sm:px-10">
          <h1 className="text-center font-display text-2xl font-bold text-hunter-900">
            Nouveau client
          </h1>
          <Link
            to="/inscription"
            className="focus-ring mt-6 block w-full bg-hunter-900 py-3.5 text-center font-display font-semibold text-oat-50 transition-colors hover:bg-hunter-800"
          >
            Créer un compte
          </Link>

          <h2 className="mt-10 text-center font-display text-2xl font-bold text-hunter-900">
            Déjà inscrit ?
          </h2>

          <form onSubmit={handleLogin} className="mt-6 space-y-4" noValidate>
            <div>
              <label htmlFor="login-email" className="sr-only">
                E-Mail
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                placeholder="E-Mail*"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (errors.email) setErrors((prev) => {
                    const n = { ...prev }
                    delete n.email
                    return n
                  })
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
                <label htmlFor="login-password" className="sr-only">
                  Mot de passe
                </label>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Mot de passe*"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    if (errors.password) setErrors((prev) => {
                      const n = { ...prev }
                      delete n.password
                      return n
                    })
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

            <div className="text-center">
              <button
                type="button"
                onClick={() =>
                  setFormError(
                    'La récupération de mot de passe sera disponible une fois le site branché sur WordPress.',
                  )
                }
                className="focus-ring text-sm text-hunter-900 underline hover:text-leather-600"
              >
                Mot de passe oublié ?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="focus-ring w-full bg-hunter-900 py-3.5 font-display font-semibold text-oat-50 transition-colors hover:bg-hunter-800 disabled:opacity-60"
            >
              {loading ? 'Connexion…' : 'Connexion'}
            </button>
          </form>

          {formError && (
            <p
              className="mt-5 rounded-sm border border-flag-red/30 bg-flag-red/5 px-3 py-2.5 text-center text-sm text-flag-red"
              role="alert"
            >
              {formError}
            </p>
          )}

          <p className="mt-8 text-center text-sm text-ink-600">
            <Link
              to="/"
              className="focus-ring font-semibold text-hunter-900 underline hover:text-leather-600"
            >
              ← Retour à l’accueil
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
