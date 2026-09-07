import { useState } from 'react'
import { Building2, Lock } from 'lucide-react'

export function StepPayment({
  total,
  onBack,
  onConfirm,
  error,
}: {
  total: number
  onBack: () => void
  onConfirm: () => Promise<void>
  error?: string
}) {
  const [loading, setLoading] = useState(false)

  const confirmOrder = async () => {
    if (loading) return
    setLoading(true)
    try {
      await onConfirm()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="border border-hunter-800/10 bg-oat-50 p-6 sm:p-8">
      <h2 className="font-display text-lg font-bold text-hunter-900">Paiement</h2>

      <div className="mt-5 border border-hunter-800 bg-oat-200/60 px-4 py-4">
        <div className="flex items-center gap-3">
          <Building2 className="h-5 w-5 text-hunter-800" strokeWidth={1.75} />
          <span className="text-sm font-semibold text-hunter-900">Virement bancaire</span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-ink-600">
          Votre commande sera enregistrée immédiatement. Les coordonnées bancaires et la référence
          à indiquer vous seront envoyées par e-mail.
        </p>
      </div>

      <div className="mt-6 flex items-center gap-2 text-xs text-ink-600">
        <Lock className="h-3.5 w-3.5" />
        Vos données sont transmises de manière chiffrée à notre serveur.
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
          onClick={() => void confirmOrder()}
          disabled={loading}
          className="focus-ring flex-1 bg-hunter-900 py-3 font-display text-sm font-semibold text-oat-50 hover:bg-hunter-800 disabled:cursor-wait disabled:opacity-60"
        >
          {loading ? 'Enregistrement…' : `Confirmer la commande · ${total.toFixed(2)} €`}
        </button>
      </div>
      {error && <p className="mt-4 text-sm text-flag-red" role="alert">{error}</p>}
    </div>
  )
}
