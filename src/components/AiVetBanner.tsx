import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import type { Product } from '../types'

export function AiVetBanner({ product }: { product: Product }) {
  const [answer, setAnswer] = useState<string | null>(null)

  const questions = [
    { q: `À quoi sert ${product.name} ?`, a: `${product.tagline}. ${product.description}` },
    { q: 'Comment le doser ?', a: product.posologie },
  ]

  return (
    <div className="border border-hunter-800/10 bg-hunter-900 p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-straw-400" strokeWidth={1.75} />
        <p className="font-display text-lg font-bold text-oat-50">
          Une question sur ce produit ? Posez-la ci-dessous
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {questions.map((item) => (
          <button
            key={item.q}
            onClick={() => setAnswer(item.a)}
            className="focus-ring rounded-full border border-oat-50/20 bg-oat-50/5 px-4 py-2 text-left text-sm text-oat-100 transition-colors hover:bg-oat-50/15"
          >
            {item.q}
          </button>
        ))}
      </div>

      {answer && (
        <div className="mt-4 border-t border-oat-50/15 pt-4">
          <p className="text-sm text-oat-100/90">{answer}</p>
          <p className="mt-2 text-xs text-oat-100/40">
            Assistant de démonstration — réponses pré-écrites, aucune IA connectée.
          </p>
        </div>
      )}
    </div>
  )
}
