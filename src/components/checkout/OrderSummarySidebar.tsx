export function OrderSummarySidebar({
  subtotal,
  shipping,
}: {
  subtotal: number
  shipping: number | null
}) {
  const total = subtotal + (shipping ?? 0)

  return (
    <aside className="h-fit border border-hunter-800/10 bg-oat-50 p-5 md:sticky md:top-24">
      <div className="flex items-center justify-between py-2">
        <span className="text-sm text-ink-900">Total articles (TTC)</span>
        <span className="font-mono text-sm font-semibold text-hunter-900">
          {subtotal.toFixed(2)} €
        </span>
      </div>
      <div className="flex items-center justify-between border-t border-hunter-800/10 py-2">
        <span className="text-sm text-ink-900">Livraison</span>
        <span className="font-mono text-sm font-semibold text-hunter-900">
          {shipping === null ? '—' : shipping === 0 ? 'Offert' : `${shipping.toFixed(2)} €`}
        </span>
      </div>
      <div className="flex items-center justify-between border-t border-hunter-800/10 pt-3 mt-1">
        <span className="font-display text-base font-bold text-hunter-900">Total TTC</span>
        <span className="font-mono text-lg font-bold text-hunter-900">{total.toFixed(2)} €</span>
      </div>
    </aside>
  )
}
