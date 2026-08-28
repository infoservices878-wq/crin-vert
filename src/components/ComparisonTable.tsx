import { Check, X } from 'lucide-react'

const ROWS = [
  'Facile à donner',
  'Sans mélasse ajoutée',
  'Appétent, sans forcer',
  'Formulé avec un vétérinaire',
]

export function ComparisonTable() {
  return (
    <div className="overflow-hidden rounded-md border border-oat-50/15">
      <div className="grid grid-cols-[1fr_auto_auto]">
        <div className="bg-transparent px-4 py-3" />
        <div className="bg-leather-600 px-6 py-3 text-center font-display text-sm font-bold text-oat-50">
          Nutrition Équine
        </div>
        <div className="px-6 py-3 text-center font-display text-sm font-semibold text-oat-100/60">
          Ailleurs
        </div>

        {ROWS.map((row, i) => (
          <div key={row} className="contents">
            <div
              className={`px-4 py-4 text-sm text-oat-100/90 ${
                i !== ROWS.length - 1 ? 'border-b border-oat-50/10' : ''
              }`}
            >
              {row}
            </div>
            <div
              className={`flex items-center justify-center bg-leather-600/15 px-6 ${
                i !== ROWS.length - 1 ? 'border-b border-oat-50/10' : ''
              }`}
            >
              <Check className="h-5 w-5 text-leather-500" strokeWidth={3} />
            </div>
            <div
              className={`flex items-center justify-center px-6 ${
                i !== ROWS.length - 1 ? 'border-b border-oat-50/10' : ''
              }`}
            >
              <X className="h-5 w-5 text-oat-100/30" strokeWidth={3} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
