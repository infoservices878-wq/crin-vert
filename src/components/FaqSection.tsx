import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { FAQ_ITEMS } from '../data/faq'

export function FaqSection() {
  // Plusieurs questions peuvent être ouvertes en même temps.
  const [openIds, setOpenIds] = useState<Set<string>>(new Set())

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h2 className="font-display text-3xl font-extrabold text-hunter-900">
        Questions fréquemment posées
      </h2>

      <div className="mt-8 divide-y divide-hunter-800/10 border-y border-hunter-800/10">
        {FAQ_ITEMS.map((item) => {
          const isOpen = openIds.has(item.id)
          return (
            <div key={item.id}>
              <button
                onClick={() => toggle(item.id)}
                className="focus-ring flex w-full items-center justify-between gap-4 py-5 text-left"
                aria-expanded={isOpen}
              >
                <span className="font-display text-base font-bold text-hunter-900 sm:text-lg">
                  {item.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-hunter-800 transition-transform ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="space-y-3 pb-6">
                  {item.answers.map((a, i) => (
                    <p key={i} className="text-sm leading-relaxed text-ink-900">
                      {a}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
