import { useState, type ReactNode } from 'react'

interface Tab {
  id: string
  label: string
  content: ReactNode
}

export function Tabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0]?.id)

  return (
    <div>
      <div role="tablist" className="flex gap-1 border-b border-hunter-800/15 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={active === tab.id}
            onClick={() => setActive(tab.id)}
            className={`focus-ring shrink-0 px-4 py-3 font-display text-sm sm:text-base font-semibold tracking-wide border-b-2 transition-colors ${
              active === tab.id
                ? 'border-leather-600 text-hunter-900'
                : 'border-transparent text-ink-600 hover:text-hunter-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="pt-6">
        {tabs.map((tab) => (
          <div key={tab.id} role="tabpanel" hidden={active !== tab.id}>
            {active === tab.id && tab.content}
          </div>
        ))}
      </div>
    </div>
  )
}
