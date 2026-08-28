import { Truck, Package, MapPin, Zap, Store } from 'lucide-react'
import { CARRIERS } from '../data/carriers'

const ICONS: Record<string, typeof Truck> = {
  'point-relais': MapPin,
  'dpd-travail': Package,
  'dpd-domicile': Package,
  colissimo: Truck,
  chronopost: Zap,
  'click-collect': Store,
}

export function CarrierList({
  freeShippingUnlocked,
  selected,
  onSelect,
}: {
  freeShippingUnlocked: boolean
  selected: string
  onSelect: (id: string, price: number) => void
}) {
  return (
    <div className="space-y-1">
      {CARRIERS.map((carrier) => {
        const Icon = ICONS[carrier.id] ?? Truck
        const isFree = carrier.alwaysFree || freeShippingUnlocked
        return (
          <label
            key={carrier.id}
            className={`flex cursor-pointer items-center gap-3 border px-3 py-3 transition-colors ${
              selected === carrier.id
                ? 'border-hunter-800 bg-oat-200/60'
                : 'border-hunter-800/10 hover:bg-oat-200/30'
            }`}
          >
            <input
              type="radio"
              name="carrier"
              checked={selected === carrier.id}
              onChange={() => onSelect(carrier.id, isFree ? 0 : carrier.price)}
              className="h-4 w-4 shrink-0 accent-hunter-800"
            />
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-oat-200">
              <Icon className="h-4 w-4 text-hunter-800" strokeWidth={1.75} />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-hunter-900">{carrier.name}</p>
              <p className="text-xs text-ink-600">{carrier.description}</p>
            </div>
            <span className="shrink-0 font-mono text-sm font-semibold text-hunter-900">
              {isFree ? 'Offert !' : `${carrier.price.toFixed(2)} €`}
            </span>
          </label>
        )
      })}
    </div>
  )
}
