import { useState } from 'react'
import { X, Mail, MessageCircle } from 'lucide-react'

export function ShareOrderModal({
  open,
  onClose,
  total,
}: {
  open: boolean
  onClose: () => void
  total: number
}) {
  const [contact, setContact] = useState('')

  if (!open) return null

  const message = `Bonjour, pourriez-vous régler ma commande Nutrition Équine d'un montant de ${total.toFixed(2)} € ? Merci !`
  const mailHref = `mailto:${contact || ''}?subject=${encodeURIComponent(
    'Règlement de ma commande Nutrition Équine'
  )}&body=${encodeURIComponent(message)}`
  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(message)}`

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/50 px-4">
      <div className="relative w-full max-w-sm bg-oat-50 p-6 shadow-xl">
        <button
          onClick={onClose}
          className="focus-ring absolute right-3 top-3 rounded p-1 text-ink-600 hover:text-hunter-900"
          aria-label="Fermer"
        >
          <X className="h-5 w-5" />
        </button>

        <p className="pr-6 text-center font-display text-lg font-bold text-hunter-900">
          J'envoie ma commande à un tiers pour règlement.
        </p>

        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="Email ou numéro de la personne (optionnel)"
          className="focus-ring mt-4 w-full border border-hunter-800/15 bg-oat-50 px-3 py-2.5 text-center text-sm text-ink-900 placeholder:text-ink-600/60"
        />

        <div className="mt-4 grid grid-cols-2 gap-3">
          <a
            href={mailHref}
            className="focus-ring flex items-center justify-center gap-2 bg-hunter-800 py-3 font-display text-sm font-semibold text-oat-50 hover:bg-hunter-900"
          >
            <Mail className="h-4 w-4" /> Mail
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring flex items-center justify-center gap-2 bg-hunter-800 py-3 font-display text-sm font-semibold text-oat-50 hover:bg-hunter-900"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
