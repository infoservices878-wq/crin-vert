import { Link } from 'react-router-dom'
import { LEGAL_PAGES } from '../data/legalContent'

export function LegalPage({ slug }: { slug: string }) {
  const page = LEGAL_PAGES[slug]

  if (!page) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <p className="font-display text-xl font-bold text-hunter-900">Page introuvable</p>
        <Link to="/" className="focus-ring mt-3 inline-block text-leather-600">
          ← Retour à l'accueil
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <nav className="text-sm text-ink-600">
        <Link to="/" className="focus-ring hover:text-hunter-900">
          Accueil
        </Link>
        <span className="mx-2">/</span>
        <span className="text-hunter-900">{page.title}</span>
      </nav>

      <h1 className="mt-3 font-display text-3xl font-extrabold text-hunter-900 sm:text-4xl">
        {page.title}
      </h1>
      <p className="mt-2 text-xs text-ink-600">{page.updated}</p>

      {page.intro && <p className="mt-6 text-sm leading-relaxed text-ink-900">{page.intro}</p>}

      <div className="mt-10 space-y-10">
        {page.sections.map((section) => (
          <div key={section.heading}>
            <h2 className="font-display text-lg font-bold text-hunter-900">{section.heading}</h2>
            <div className="mt-3 space-y-3">
              {section.paragraphs.map((p, i) => (
                <p key={i} className="text-sm leading-relaxed text-ink-900">
                  {p}
                </p>
              ))}
              {section.list && (
                <ul className="ml-1 space-y-1.5">
                  {section.list.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-ink-900">
                      <span className="text-leather-600">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
