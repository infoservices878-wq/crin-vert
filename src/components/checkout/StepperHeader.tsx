import { Link } from 'react-router-dom'

const STEPS = ['Informations personnelles', 'Adresses', 'Mode de livraison', 'Paiement']

export function StepperHeader({ current }: { current: number }) {
  return (
    <div className="border-b border-hunter-800/10 bg-oat-50">
      <div className="mx-auto flex max-w-5xl items-center gap-6 overflow-x-auto px-4 py-5 sm:px-6">
        <Link to="/" className="focus-ring shrink-0 text-hunter-900" aria-label="Accueil">
          <svg viewBox="0 0 32 32" className="h-8 w-8" fill="none" aria-hidden="true">
            <path
              d="M16 3C9 3 5 8 5 15c0 5 2.5 9 6 11.5.6.4 1.4-.1 1.3-.8L11 20c-.1-.6.3-1.2.9-1.3.6-.1 1.2.3 1.3.9l1.3 6.6c.1.6.6 1 1.2 1h.6c.6 0 1.1-.4 1.2-1l1.3-6.6c.1-.6.7-1 1.3-.9.6.1 1 .7.9 1.3l-1.3 5.7c-.1.7.7 1.2 1.3.8 3.5-2.5 6-6.5 6-11.5C27 8 23 3 16 3z"
              stroke="currentColor"
              strokeWidth={2.2}
            />
          </svg>
        </Link>
        {STEPS.map((label, i) => {
          const stepNum = i + 1
          const isActive = stepNum === current
          const isDone = stepNum < current
          return (
            <div key={label} className="flex shrink-0 items-center gap-2">
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold ${
                  isActive || isDone
                    ? 'bg-hunter-900 text-oat-50'
                    : 'bg-oat-200 text-ink-600'
                }`}
              >
                {stepNum}
              </span>
              <span
                className={`hidden text-sm sm:block ${
                  isActive ? 'font-semibold text-hunter-900' : 'text-ink-600'
                }`}
              >
                {label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
