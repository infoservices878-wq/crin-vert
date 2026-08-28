import { useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

interface AccordionItem {
  id: string
  title: string
  content: ReactNode
}

export function Accordion({ items, defaultOpen }: { items: AccordionItem[]; defaultOpen?: string }) {
  const [open, setOpen] = useState<string | null>(defaultOpen ?? null)

  return (
    <div className="divide-y divide-hunter-800/10 border-y border-hunter-800/10">
      {items.map((item) => {
        const isOpen = open === item.id
        return (
          <div key={item.id}>
            <button
              onClick={() => setOpen(isOpen ? null : item.id)}
              className="focus-ring flex w-full items-center justify-between py-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-display text-base font-bold text-hunter-900">
                {item.title}
              </span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-hunter-800 transition-transform ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {isOpen && <div className="pb-5">{item.content}</div>}
          </div>
        )
      })}
    </div>
  )
}
