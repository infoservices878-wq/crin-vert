import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { CheckoutData } from '../../pages/Checkout'
import { checkoutInfoSchema, parseForm, inputErrorClass, type FieldErrors } from '../../lib/validation'

const base = 'focus-ring w-full border bg-oat-50 px-3 py-2.5 text-sm text-ink-900 placeholder:text-ink-600/60 border-hunter-800/15'

export function StepInfo({ data, onUpdate, onNext }: {
  data: CheckoutData
  onUpdate: (patch: Partial<CheckoutData>) => void
  onNext: () => void
}) {
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
      <h2 className="font-display text-lg font-bold text-hunter-900">Vos coordonnées</h2>
      <p className="mt-2 text-sm text-ink-600">
        Vous avez déjà un compte ? <Link to="/connexion" className="focus-ring font-semibold text-hunter-900 underline">Connectez-vous</Link> depuis l’espace client.
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <input type="text" value={data.firstName} onChange={(e) => onUpdate({ firstName: e.target.value })} placeholder="Prénom*" aria-invalid={!!errors.firstName} className={inputErrorClass(!!errors.firstName, base)} />
          {errors.firstName && <p className="mt-1 text-xs text-flag-red" role="alert">{errors.firstName}</p>}
        </div>
        <div>
          <input type="text" value={data.lastName} onChange={(e) => onUpdate({ lastName: e.target.value })} placeholder="Nom*" aria-invalid={!!errors.lastName} className={inputErrorClass(!!errors.lastName, base)} />
          {errors.lastName && <p className="mt-1 text-xs text-flag-red" role="alert">{errors.lastName}</p>}
        </div>
        <div>
          <input type="email" value={data.email} onChange={(e) => onUpdate({ email: e.target.value })} placeholder="E-mail*" aria-invalid={!!errors.email} className={inputErrorClass(!!errors.email, base)} />
          {errors.email && <p className="mt-1 text-xs text-flag-red" role="alert">{errors.email}</p>}
        </div>

        <label className="flex items-start gap-2.5 text-sm text-ink-900">
          <input type="checkbox" checked={data.dataConsent} onChange={(e) => onUpdate({ dataConsent: e.target.checked })} className="mt-0.5 h-4 w-4 shrink-0 accent-hunter-800" />
          <span>J’ai pris connaissance de la <Link to="/politique-de-confidentialite" className="focus-ring underline">politique de confidentialité</Link>.</span>
        </label>

        <label className="flex items-start gap-2.5 text-sm text-ink-900">
          <input type="checkbox" checked={data.newsletter} onChange={(e) => onUpdate({ newsletter: e.target.checked })} className="mt-0.5 h-4 w-4 shrink-0 accent-hunter-800" />
          <span>Recevoir nos conseils nutritionnels par e-mail <span className="block text-xs italic text-ink-600">Désinscription possible à tout moment.</span></span>
        </label>

        <label className="flex items-start gap-2.5 text-sm text-ink-900">
          <input type="checkbox" checked={data.acceptTerms} onChange={(e) => onUpdate({ acceptTerms: e.target.checked })} className="mt-0.5 h-4 w-4 shrink-0 accent-hunter-800" />
          <span>J’accepte les <Link to="/conditions-generales-de-vente" className="focus-ring underline">conditions générales de vente</Link> et la <Link to="/politique-de-confidentialite" className="focus-ring underline">politique de confidentialité</Link>.*</span>
        </label>
        {errors.acceptTerms && <p className="text-xs text-flag-red" role="alert">{errors.acceptTerms}</p>}

        <div className="flex justify-end pt-2">
          <button onClick={handleNext} className="focus-ring bg-hunter-900 px-8 py-3 font-display font-semibold text-oat-50 hover:bg-hunter-800">Étape suivante</button>
        </div>
      </div>
    </div>
  )
}
