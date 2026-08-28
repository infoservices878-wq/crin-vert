import { useState } from 'react'
import { CreditCard, Lock } from 'lucide-react'

const METHODS = [
  { id: 'cb', label: 'Carte bancaire' },
  { id: 'paypal', label: 'PayPal' },
  { id: 'virement', label: 'Virement bancaire' },
]

export function StepPayment({
  total,
  onBack,
  onConfirm,
}: {
  total: number
  onBack: () => void
  onConfirm: () => void
}) {
  const [method, setMethod] = useState('cb')
  const [loading, setLoading] = useState(false)

  const handlePay = () => {
    setLoading(true)
    // Simulation délai paiement
    window.setTimeout(() => {
      setLoading(false)
      onConfirm()
    }, 600)
  }

  return (
    <div className="border border-hunter-800/10 bg-oat-50 p-6 sm:p-8">
      <h2 className="font-display text-lg font-bold text-hunter-900">Paiement</h2>

      <div className="mt-5 space-y-2">
        {METHODS.map((m) => (
          <label
            key={m.id}
            className={`flex cursor-pointer items-center gap-3 border px-4 py-3 ${
              method === m.id ? 'border-hunter-800 bg-oat-200/60' : 'border-hunter-800/10'
            }`}
          >
            <input
              type="radio"
              name="payment"
              checked={method === m.id}
              onChange={() => setMethod(m.id)}
              className="h-4 w-4 accent-hunter-800"
            />
            <CreditCard className="h-4 w-4 text-hunter-800" strokeWidth={1.75} />
            <span className="text-sm font-semibold text-hunter-900">{m.label}</span>
          </label>
        ))}
      </div>

      {method === 'cb' && (
        <div className="mt-5 space-y-4">
          <input
            type="text"
            placeholder="Numéro de carte"
            maxLength={19}
            className="focus-ring w-full border border-hunter-800/15 bg-oat-50 px-3 py-2.5 text-sm text-ink-900 placeholder:text-ink-600/60"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="MM / AA"
              maxLength={7}
              className="focus-ring w-full border border-hunter-800/15 bg-oat-50 px-3 py-2.5 text-sm text-ink-900 placeholder:text-ink-600/60"
            />
            <input
              type="text"
              placeholder="CVV"
              maxLength={3}
              className="focus-ring w-full border border-hunter-800/15 bg-oat-50 px-3 py-2.5 text-sm text-ink-900 placeholder:text-ink-600/60"
            />
          </div>
        </div>
      )}

      {method === 'virement' && (
        <p className="mt-4 text-sm text-ink-600">
          Les coordonnées bancaires seront communiquées par e-mail après validation (démo).
        </p>
      )}

      <div className="mt-6 flex items-center gap-2 text-xs text-ink-600">
        <Lock className="h-3.5 w-3.5" />
        Paiement sécurisé — démonstration uniquement
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onBack}
          className="focus-ring border border-hunter-800/20 px-5 py-3 font-display text-sm font-semibold text-hunter-900"
        >
          Retour
        </button>
        <button
          type="button"
          onClick={handlePay}
          disabled={loading}
          className="focus-ring flex-1 bg-hunter-900 py-3 font-display text-sm font-semibold text-oat-50 hover:bg-hunter-800 disabled:opacity-60"
        >
          {loading ? 'Traitement…' : `Payer ${total.toFixed(2)} €`}
        </button>
      </div>
    </div>
  )
}
