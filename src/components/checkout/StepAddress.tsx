import { useState } from 'react'
import { COUNTRIES } from '../../data/countries'
import type { CheckoutData } from '../../pages/Checkout'
import {
  checkoutAddressSchema,
  parseForm,
  inputErrorClass,
  type FieldErrors,
} from '../../lib/validation'

const base =
  'focus-ring w-full border bg-oat-50 px-3 py-2.5 text-sm text-ink-900 placeholder:text-ink-600/60 border-hunter-800/15'

export function StepAddress({
  data,
  onUpdate,
  onNext,
  onBack,
}: {
  data: CheckoutData
  onUpdate: (patch: Partial<CheckoutData>) => void
  onNext: () => void
  onBack: () => void
}) {
  const [errors, setErrors] = useState<FieldErrors>({})
  const a = data.address

  const update = (patch: Partial<CheckoutData['address']>) =>
    onUpdate({ address: { ...a, ...patch } })

  const handleNext = () => {
    const result = parseForm(checkoutAddressSchema, {
      line1: a.line1,
      line2: a.line2,
      postalCode: a.postalCode,
      city: a.city,
      country: a.country,
      phone: a.phone,
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
      <h2 className="font-display text-lg font-bold text-hunter-900">Adresse de livraison</h2>
      <div className="mt-5 space-y-4">
        <div>
          <input
            type="text"
            value={a.line1}
            onChange={(e) => update({ line1: e.target.value })}
            placeholder="Adresse*"
            aria-invalid={!!errors.line1}
            className={inputErrorClass(!!errors.line1, base)}
          />
          {errors.line1 && (
            <p className="mt-1 text-xs text-flag-red" role="alert">
              {errors.line1}
            </p>
          )}
        </div>
        <input
          type="text"
          value={a.line2}
          onChange={(e) => update({ line2: e.target.value })}
          placeholder="Complément d'adresse (optionnel)"
          className={base}
        />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              value={a.postalCode}
              onChange={(e) => update({ postalCode: e.target.value })}
              placeholder="Code postal*"
              inputMode="numeric"
              maxLength={5}
              aria-invalid={!!errors.postalCode}
              className={inputErrorClass(!!errors.postalCode, base)}
            />
            {errors.postalCode && (
              <p className="mt-1 text-xs text-flag-red" role="alert">
                {errors.postalCode}
              </p>
            )}
          </div>
          <div>
            <input
              type="text"
              value={a.city}
              onChange={(e) => update({ city: e.target.value })}
              placeholder="Ville*"
              aria-invalid={!!errors.city}
              className={inputErrorClass(!!errors.city, base)}
            />
            {errors.city && (
              <p className="mt-1 text-xs text-flag-red" role="alert">
                {errors.city}
              </p>
            )}
          </div>
        </div>
        <select
          value={a.country}
          onChange={(e) => update({ country: e.target.value })}
          className={base}
        >
          {COUNTRIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <div>
          <input
            type="tel"
            value={a.phone}
            onChange={(e) => update({ phone: e.target.value })}
            placeholder="Téléphone*"
            aria-invalid={!!errors.phone}
            className={inputErrorClass(!!errors.phone, base)}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-flag-red" role="alert">
              {errors.phone}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            onClick={onBack}
            className="focus-ring font-display text-sm font-semibold text-hunter-900 underline"
          >
            Étape précédente
          </button>
          <button
            onClick={handleNext}
            className="focus-ring bg-hunter-900 px-8 py-3 font-display font-semibold text-oat-50 hover:bg-hunter-800"
          >
            Étape suivante
          </button>
        </div>
      </div>
    </div>
  )
}
