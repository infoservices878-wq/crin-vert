import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const STORAGE_KEY = 'crin-vert-cookie-consent'

/**
 * Bandeau RGPD — consentement cookies (essentiels vs mesure d’audience).
 * En production : brancher un CMP ou Google Consent Mode.
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY)
      if (!v) setVisible(true)
    } catch {
      setVisible(true)
    }
  }, [])

  const save = (value: 'accepted' | 'essential') => {
    try {
      localStorage.setItem(STORAGE_KEY, value)
    } catch {
      /* ignore */
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[90] border-t border-hunter-800/15 bg-oat-50/98 p-4 shadow-lg backdrop-blur sm:p-5"
      role="dialog"
      aria-label="Consentement cookies"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl text-sm leading-relaxed text-ink-900">
          Nous utilisons des cookies essentiels au fonctionnement du site. Avec votre accord, des
          cookies de mesure d’audience peuvent être déposés pour améliorer nos services.{' '}
          <Link to="/mentions-legales" className="focus-ring btn-ghost text-sm">
            En savoir plus
          </Link>
        </p>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            type="button"
            onClick={() => save('essential')}
            className="focus-ring btn-secondary text-xs sm:text-sm"
          >
            Essentiels uniquement
          </button>
          <button
            type="button"
            onClick={() => save('accepted')}
            className="focus-ring btn-primary text-xs sm:text-sm"
          >
            Tout accepter
          </button>
        </div>
      </div>
    </div>
  )
}
