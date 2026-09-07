/** The checkout currently accepts bank transfer only. Keep the footer aligned with it. */
export function PaymentMethodsRow({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-2 text-sm text-oat-100/80 ${className}`} aria-label="Moyen de paiement accepté">
      <span className="rounded-sm border border-oat-100/30 px-3 py-1.5 font-display font-semibold text-oat-50">Virement bancaire</span>
      <span className="text-xs">Coordonnées envoyées après confirmation</span>
    </div>
  )
}
