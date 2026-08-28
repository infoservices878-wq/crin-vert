import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 py-20 text-center">
      <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-ink-600">
        Erreur 404
      </p>
      <h1 className="mt-3 font-display text-5xl font-extrabold text-hunter-900 sm:text-6xl">
        Page introuvable
      </h1>
      <p className="mt-4 text-ink-600">
        Cette page n’existe pas ou a été déplacée. Revenez au catalogue ou à l’accueil pour
        continuer votre navigation.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link to="/" className="focus-ring btn-primary">
          Accueil
        </Link>
        <Link to="/catalogue" className="focus-ring btn-secondary">
          Catalogue
        </Link>
      </div>
    </div>
  )
}
