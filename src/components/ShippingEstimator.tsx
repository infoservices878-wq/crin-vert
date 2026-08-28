import { useState } from 'react'
import { COUNTRIES } from '../data/countries'
import { CarrierList } from './CarrierList'

const FREE_SHIPPING_THRESHOLD = 79

export function ShippingEstimator({
  cartTotal,
  onShippingChange,
}: {
  cartTotal: number
  onShippingChange: (cost: number) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const [country, setCountry] = useState('France')
  const [postalCode, setPostalCode] = useState('')
  const [selectedCarrier, setSelectedCarrier] = useState('')

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - cartTotal)
  const freeShippingUnlocked = remaining === 0
  const showCarriers = postalCode.trim().length >= 4

  return (
    <div className="border-t border-hunter-800/10 py-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-ink-900">Estimez vos frais de port</p>
          {remaining > 0 ? (
            <p className="mt-0.5 text-xs text-leather-600">
              Plus que {remaining.toFixed(2)} € pour la livraison offerte !
            </p>
          ) : (
            <p className="mt-0.5 text-xs text-leather-600">Livraison offerte débloquée !</p>
          )}
        </div>
        <button
          onClick={() => setExpanded((v) => !v)}
          className="focus-ring border border-hunter-800/20 px-4 py-2 font-display text-sm font-semibold text-hunter-900 hover:bg-oat-200"
        >
          Estimer
        </button>
      </div>

      {expanded && (
        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="focus-ring border border-hunter-800/15 bg-oat-50 px-3 py-2.5 text-sm text-ink-900"
            >
              {COUNTRIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <input
              type="text"
              inputMode="numeric"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="Code postal"
              className="focus-ring border border-hunter-800/15 bg-oat-50 px-3 py-2.5 text-sm text-ink-900 placeholder:text-ink-600/60"
            />
          </div>

          {showCarriers && (
            <CarrierList
              freeShippingUnlocked={freeShippingUnlocked}
              selected={selectedCarrier}
              onSelect={(id, price) => {
                setSelectedCarrier(id)
                onShippingChange(price)
              }}
            />
          )}

          <button className="focus-ring w-full border border-hunter-800/20 py-2.5 font-display text-sm font-semibold text-hunter-900 hover:bg-oat-200">
            Mettre à jour le panier
          </button>
          <button
            onClick={() => setExpanded(true)}
            className="focus-ring w-full bg-hunter-800 py-2.5 font-display text-sm font-semibold text-oat-50 hover:bg-hunter-900"
          >
            Estimer la livraison
          </button>
        </div>
      )}
    </div>
  )
}
