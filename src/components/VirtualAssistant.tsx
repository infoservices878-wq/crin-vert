import { useEffect, useRef, useState } from 'react'
import { Sparkles, X, Send } from 'lucide-react'
import { answerQuestion, ASSISTANT_STARTERS } from '../lib/assistant'

interface Message {
  role: 'user' | 'assistant'
  text: string
  /** Renseigné quand le site n'a pas de réponse — propose une recherche Google */
  googleQuery?: string
}

const GREETING: Message = {
  role: 'assistant',
  text: 'Bonjour ! Je peux répondre à vos questions sur nos produits (dosage, composition…), la livraison, les retours ou le paiement.',
}

// Assistant virtuel du site : recherche automatiquement une réponse dans
// la FAQ et les fiches produits (voir src/lib/assistant.ts). Aucune IA
// externe n'est appelée — les réponses sont entièrement déterministes.
export function VirtualAssistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([GREETING])
  const [input, setInput] = useState('')
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, open])

  const send = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    const { answer, matched } = answerQuestion(trimmed)
    setMessages((prev) => [
      ...prev,
      { role: 'user', text: trimmed },
      { role: 'assistant', text: answer, googleQuery: matched ? undefined : trimmed },
    ])
    setInput('')
  }

  return (
    <div className="fixed bottom-24 right-5 z-40 flex flex-col-reverse items-end gap-3 md:bottom-5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="focus-ring flex h-14 w-14 items-center justify-center rounded-full bg-hunter-900 text-oat-50 shadow-xl transition-transform hover:scale-105"
        aria-label={open ? "Fermer l'assistant virtuel" : "Ouvrir l'assistant virtuel"}
      >
        {open ? (
          <X className="h-6 w-6" strokeWidth={2} />
        ) : (
          <Sparkles className="h-6 w-6" strokeWidth={2} />
        )}
      </button>

      {open && (
        <div className="flex h-[28rem] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-lg border border-hunter-800/10 bg-oat-50 shadow-2xl">
          <div className="flex items-center gap-2 bg-hunter-900 px-4 py-3 text-oat-50">
            <Sparkles className="h-4 w-4 text-straw-400" strokeWidth={2} />
            <p className="font-display text-sm font-bold">Assistant Nutrition Équine</p>
          </div>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed ${
                    m.role === 'user' ? 'bg-leather-600 text-oat-50' : 'bg-oat-200 text-ink-900'
                  }`}
                >
                  <p>{m.text}</p>
                  {m.googleQuery && (
                    <a
                      href={`https://www.google.com/search?q=${encodeURIComponent(m.googleQuery)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-ring mt-1.5 block text-xs font-semibold text-hunter-900 underline hover:text-leather-600"
                    >
                      Rechercher « {m.googleQuery} » sur Google →
                    </a>
                  )}
                </div>
              </div>
            ))}

            {messages.length === 1 && (
              <div className="flex flex-col items-start gap-2 pt-2">
                {ASSISTANT_STARTERS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="focus-ring rounded-full border border-hunter-800/15 bg-oat-50 px-3 py-1.5 text-left text-xs text-hunter-900 hover:bg-oat-200"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
            className="flex items-center gap-2 border-t border-hunter-800/10 p-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Posez votre question…"
              className="focus-ring min-w-0 flex-1 border border-hunter-800/15 bg-oat-50 px-3 py-2 text-sm text-ink-900 placeholder:text-ink-600/60"
            />
            <button
              type="submit"
              className="focus-ring flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-hunter-900 text-oat-50 hover:bg-hunter-800"
              aria-label="Envoyer"
            >
              <Send className="h-4 w-4" strokeWidth={2} />
            </button>
          </form>
          <p className="border-t border-hunter-800/10 px-4 py-2 text-center text-[11px] text-ink-600">
            Cet assistant répond aux questions générales. Pour une question précise, contactez-nous
            par{' '}
            <a
              href="mailto:contact@nutritionequine.com"
              className="focus-ring font-semibold text-leather-600 underline hover:text-leather-700"
            >
              e-mail
            </a>
            .
          </p>
        </div>
      )}
    </div>
  )
}
