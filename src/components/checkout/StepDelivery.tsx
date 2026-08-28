import { CarrierList } from '../CarrierList'

export function StepDelivery({
  freeShippingUnlocked,
  selected,
  onSelect,
  onNext,
  onBack,
}: {
  freeShippingUnlocked: boolean
  selected: string
  onSelect: (id: string, price: number) => void
  onNext: () => void
  onBack: () => void
}) {
  return (
    <div className="border border-hunter-800/10 bg-oat-50 p-6 sm:p-8">
      <h2 className="font-display text-lg font-bold text-hunter-900">Mode de livraison</h2>
      <div className="mt-5">
        <CarrierList
          freeShippingUnlocked={freeShippingUnlocked}
          selected={selected}
          onSelect={onSelect}
        />
      </div>

      <div className="flex items-center justify-between pt-6">
        <button
          onClick={onBack}
          className="focus-ring font-display text-sm font-semibold text-hunter-900 underline"
        >
          Étape précédente
        </button>
        <button
          onClick={onNext}
          disabled={!selected}
          className="focus-ring bg-hunter-900 px-8 py-3 font-display font-semibold text-oat-50 hover:bg-hunter-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Étape suivante
        </button>
      </div>
    </div>
  )
}
