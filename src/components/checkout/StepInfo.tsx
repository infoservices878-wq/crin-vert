import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import type { CheckoutData } from '../../pages/Checkout'
import {
  checkoutInfoSchema,
  parseForm,
  inputErrorClass,
  type FieldErrors,
} from '../../lib/validation'

const base =
  'focus-ring w-full border bg-oat-50 px-3 py-2.5 text-sm text-ink-900 placeholder:text-ink-600/60 border-hunter-800/15'

export function StepInfo({
  data,
  onUpdate,
  onNext,
}: {
  data: CheckoutData
  onUpdate: (patch: Partial<CheckoutData>) => void
  onNext: () => void
}) {
  const [mode, setMode] = useState<'guest' | 'login'>('guest')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<FieldErrors>({})

  const handleNext = () => {
    const result = parseForm(checkoutInfoSchema, {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      acceptTerms: data.acceptTerms,
    })
    if (!result.success) {
      setErrors(result.errors)
      return
    }
    setErrors({})
    onNext()
  }

  return (
    <div className="border border-hunter-800/10 bg-oat-50 p-6 sm:p-8">
      <div className="flex border-b border-hunter-800/10">
        <button
          onClick={() => setMode('guest')}
          className={`focus-ring flex-1 py-3 text-center font-display text-sm font-semibold ${
            mode === 'guest' ? 'bg-hunter-800 text-oat-50' : 'text-hunter-900'
          }`}
        >
          Commander en tant qu'invité
        </button>
        <button
          onClick={() => setMode('login')}
          className={`focus-ring flex-1 py-3 text-center font-display text-sm font-semibold ${
            mode === 'login' ? 'bg-hunter-800 text-oat-50' : 'text-hunter-900'
          }`}
        >
          Connexion
        </button>
      </div>

      {mode === 'login' ? (
        <div className="mt-6 space-y-4">
          <input type="email" placeholder="E-Mail" className={base} />
          <input type="password" placeholder="Mot de passe" className={base} />
          <p className="text-xs text-ink-600">
            Compte de démonstration — utilisez plutôt « Commander en tant qu'invité ».
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          <div>
            <input
              type="text"
              value={data.firstName}
              onChange={(e) => onUpdate({ firstName: e.target.value })}
              placeholder="Prénom*"
              aria-invalid={!!errors.firstName}
              className={inputErrorClass(!!errors.firstName, base)}
            />
            {errors.firstName && (
              <p className="mt-1 text-xs text-flag-red" role="alert">
                {errors.firstName}
              </p>
            )}
          </div>
          <div>
            <input
              type="text"
              value={data.lastName}
              onChange={(e) => onUpdate({ lastName: e.target.value })}
              placeholder="Nom*"
              aria-invalid={!!errors.lastName}
              className={inputErrorClass(!!errors.lastName, base)}
            />
            {errors.lastName && (
              <p className="mt-1 text-xs text-flag-red" role="alert">
                {errors.lastName}
              </p>
            )}
          </div>
          <div>
            <input
              type="email"
              value={data.email}
              onChange={(e) => onUpdate({ email: e.target.value })}
              placeholder="E-Mail*"
              aria-invalid={!!errors.email}
              className={inputErrorClass(!!errors.email, base)}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-flag-red" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <p className="font-display text-sm font-bold text-hunter-900">
              Créez votre compte <span className="font-normal text-ink-600">(optionnel)</span>
            </p>
            <p className="text-xs text-ink-600">Et gagnez du temps pour votre prochaine commande !</p>
            <div className="relative mt-2">
              <input
                type={showPassword ? 'text' : 'password'}
                value={data.password}
                onChange={(e) => onUpdate({ password: e.target.value })}
                placeholder="Mot de passe"
                className={`${base} pr-11`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="focus-ring absolute right-2 top-1/2 -translate-y-1/2 rounded p-1.5 text-hunter-900"
                aria-label="Afficher le mot de passe"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <label className="flex items-start gap-2.5 text-sm text-ink-900">
            <input
              type="checkbox"
              checked={data.dataConsent}
              onChange={(e) => onUpdate({ dataConsent: e.target.checked })}
              className="mt-0.5 h-4 w-4 shrink-0 accent-hunter-800"
            />
            <span>
              Message concernant la confidentialité des données clients
              <span className="mt-0.5 block text-xs italic text-ink-600">
                Conformément à la réglementation applicable, vous disposez d'un droit d'accès, de
                rectification et d'opposition sur les données vous concernant.
              </span>
            </span>
          </label>

          <label className="flex items-start gap-2.5 text-sm text-ink-900">
            <input
              type="checkbox"
              checked={data.newsletter}
              onChange={(e) => onUpdate({ newsletter: e.target.checked })}
              className="mt-0.5 h-4 w-4 shrink-0 accent-hunter-800"
            />
            <span>
              Recevoir notre newsletter
              <span className="mt-0.5 block text-xs italic text-ink-600">
                Je souhaite recevoir les conseils de Nutrition Équine — désinscription possible à tout
                moment.
              </span>
            </span>
          </label>

          <label className="flex items-start gap-2.5 text-sm text-ink-900">
            <input
              type="checkbox"
              checked={data.acceptTerms}
              onChange={(e) => onUpdate({ acceptTerms: e.target.checked })}
              className="mt-0.5 h-4 w-4 shrink-0 accent-hunter-800"
            />
            <span>J'accepte les conditions générales et la politique de confidentialité*</span>
          </label>
          {errors.acceptTerms && (
            <p className="text-xs text-flag-red" role="alert">
              {errors.acceptTerms}
            </p>
          )}

          <div className="flex justify-end pt-2">
            <button
              onClick={handleNext}
              className="focus-ring bg-hunter-900 px-8 py-3 font-display font-semibold text-oat-50 hover:bg-hunter-800"
            >
              Étape suivante
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
