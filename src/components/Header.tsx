import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Menu, X, ChevronDown, User, MessageCircle, Search, Heart } from 'lucide-react'
import { MegaMenu } from './MegaMenu'
import { HeaderSearch } from './HeaderSearch'
import { SearchPanel } from './SearchPanel'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useWishlist } from '../context/WishlistContext'
import { CATEGORY_LABELS, CATEGORY_ORDER } from '../types'

function HorseshoeMark() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" aria-hidden="true">
      <path
        d="M16 3C9 3 5 8 5 15c0 5 2.5 9 6 11.5.6.4 1.4-.1 1.3-.8L11 20c-.1-.6.3-1.2.9-1.3.6-.1 1.2.3 1.3.9l1.3 6.6c.1.6.6 1 1.2 1h.6c.6 0 1.1-.4 1.2-1l1.3-6.6c.1-.6.7-1 1.3-.9.6.1 1 .7.9 1.3l-1.3 5.7c-.1.7.7 1.2 1.3.8 3.5-2.5 6-6.5 6-11.5C27 8 23 3 16 3z"
        stroke="currentColor"
        strokeWidth={2.2}
      />
    </svg>
  )
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [categoriesOpen, setCategoriesOpen] = useState(false)
  const { count } = useCart()
  const { isAuthenticated, user } = useAuth()
  const { count: wishCount } = useWishlist()

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-hunter-800/10 bg-oat-50/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6 lg:gap-6">
          <Link
            to="/"
            className="focus-ring flex items-center gap-2.5 text-hunter-900"
            aria-label="Nutrition Équine — Accueil"
          >
            <HorseshoeMark />
            <span className="flex flex-col leading-none">
              <span className="font-display text-lg font-bold tracking-tight sm:text-xl">
                Nutrition
              </span>
              <span className="mt-0.5 flex items-center gap-2">
                <span className="font-display text-lg font-bold tracking-tight sm:text-xl">
                  Équine
                </span>
                <span
                  className="flex h-2.5 w-4 shrink-0 overflow-hidden rounded-[1px] shadow-sm"
                  title="Fabriqué en France"
                  aria-hidden="true"
                >
                  <span className="w-1/3 bg-flag-blue" />
                  <span className="w-1/3 bg-oat-50" />
                  <span className="w-1/3 bg-flag-red" />
                </span>
              </span>
            </span>
          </Link>

          <nav className="hidden shrink-0 items-center gap-1 md:flex">
            <div
              className="relative"
              onMouseEnter={() => setMenuOpen(true)}
              onMouseLeave={() => setMenuOpen(false)}
            >
              <Link
                to="/catalogue"
                className="focus-ring flex items-center gap-1 px-3 py-2 font-display text-sm font-semibold text-hunter-900 hover:text-leather-600"
                aria-expanded={menuOpen}
              >
                Tous les produits
                <ChevronDown className="h-4 w-4" strokeWidth={2} />
              </Link>
              {menuOpen && (
                <div className="absolute left-1/2 top-full w-[380px] -translate-x-1/2 overflow-hidden rounded-lg border border-hunter-800/10 bg-oat-50 shadow-lg">
                  <MegaMenu onNavigate={() => setMenuOpen(false)} />
                </div>
              )}
            </div>
            <Link
              to="/a-propos"
              className="focus-ring px-3 py-2 font-display text-sm font-semibold text-hunter-900 hover:text-leather-600"
            >
              À propos
            </Link>
            <Link
              to="/contact"
              className="focus-ring px-3 py-2 font-display text-sm font-semibold text-hunter-900 hover:text-leather-600"
            >
              Contact
            </Link>
          </nav>

          <HeaderSearch />

          <div className="flex shrink-0 items-center gap-0.5">
            {/* Recherche (icône) — mobile uniquement, la barre étendue prend le relais en desktop */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="focus-ring rounded-sm p-2 text-hunter-900 hover:text-leather-600 md:hidden"
              aria-label="Rechercher un produit"
            >
              <Search className="h-5 w-5" strokeWidth={1.75} />
            </button>

            {/* Favoris */}
            <Link
              to="/favoris"
              className="focus-ring relative rounded-sm p-2 text-hunter-900 hover:text-leather-600"
              aria-label={`Favoris, ${wishCount} produit${wishCount > 1 ? 's' : ''}`}
            >
              <Heart className="h-5 w-5" strokeWidth={1.75} />
              {wishCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-leather-600 font-mono text-[10px] font-semibold text-oat-50">
                  {wishCount}
                </span>
              )}
            </Link>

            {/* Connexion */}
            <Link
              to={isAuthenticated ? '/compte' : '/connexion'}
              className="focus-ring relative rounded-sm p-2 text-hunter-900 hover:text-leather-600"
              aria-label={isAuthenticated ? `Mon compte (${user?.email})` : 'Connexion / Mon compte'}
              title={isAuthenticated ? user?.firstName || user?.email : 'Connexion'}
            >
              <User className="h-5 w-5" strokeWidth={1.75} />
              {isAuthenticated && (
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-leather-600" aria-hidden="true" />
              )}
            </Link>

            {/* Panier */}
            <Link
              to="/panier"
              className="focus-ring relative rounded-sm p-2 text-hunter-900 hover:text-leather-600"
              aria-label={`Panier, ${count} article${count > 1 ? 's' : ''}`}
            >
              <ShoppingCart className="h-5 w-5" strokeWidth={1.75} />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-leather-600 font-mono text-[10px] font-semibold text-oat-50">
                  {count}
                </span>
              )}
            </Link>

            <button
              onClick={() => {
                setMobileOpen((v) => {
                  if (v) setCategoriesOpen(false)
                  return !v
                })
              }}
              className="focus-ring rounded-sm p-2 text-hunter-900 md:hidden"
              aria-label="Ouvrir le menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-ink-900/50"
            onClick={() => {
              setMobileOpen(false)
              setCategoriesOpen(false)
            }}
            aria-hidden="true"
          />
            <div className="absolute inset-y-0 right-0 flex h-full w-[min(100%,20rem)] max-w-[85vw] flex-col overflow-hidden bg-hunter-900 px-5 py-5 sm:max-w-sm">
              <div className="flex shrink-0 items-center justify-between gap-2">
                <Link
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className="focus-ring flex items-center gap-2 text-oat-50"
                >
                  <HorseshoeMark />
                  <span className="flex flex-col leading-none">
                    <span className="font-display text-lg font-bold tracking-tight">Nutrition</span>
                    <span className="mt-0.5 flex items-center gap-2">
                      <span className="font-display text-lg font-bold tracking-tight">Équine</span>
                      <span className="flex h-2.5 w-4 shrink-0 overflow-hidden rounded-[1px]" aria-hidden="true">
                        <span className="w-1/3 bg-flag-blue" />
                        <span className="w-1/3 bg-oat-50" />
                        <span className="w-1/3 bg-flag-red" />
                      </span>
                    </span>
                  </span>
                </Link>
                <button
                  onClick={() => {
                    setMobileOpen(false)
                    setCategoriesOpen(false)
                  }}
                  className="focus-ring rounded-full border border-oat-50/25 p-1.5 text-oat-50"
                  aria-label="Fermer le menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="mt-6 flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto overscroll-contain pb-4">
                <p className="mb-1 font-display text-[11px] font-semibold uppercase tracking-[0.15em] text-oat-100/45">
                  Catalogue
                </p>
                <button
                  type="button"
                  onClick={() => setCategoriesOpen((v) => !v)}
                  className="focus-ring flex w-full items-center justify-between rounded-sm px-1 py-2.5 text-left font-display text-sm font-semibold uppercase tracking-wide text-oat-50"
                  aria-expanded={categoriesOpen}
                >
                  Tous les produits
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 transition-transform ${categoriesOpen ? 'rotate-180' : ''}`}
                    strokeWidth={2}
                  />
                </button>
                {categoriesOpen && (
                  <ul className="mb-4 max-h-[40vh] space-y-0.5 overflow-y-auto overscroll-contain border-l border-oat-50/15 pl-3">
                    <li>
                      <Link
                        to="/catalogue"
                        onClick={() => setMobileOpen(false)}
                        className="focus-ring block truncate rounded-sm px-1 py-2 text-sm font-medium text-oat-50"
                      >
                        Voir tout le catalogue
                      </Link>
                    </li>
                    {CATEGORY_ORDER.map((cat) => (
                      <li key={cat}>
                        <Link
                          to={`/catalogue?categorie=${cat}`}
                          onClick={() => setMobileOpen(false)}
                          className="focus-ring block truncate rounded-sm px-1 py-2 text-sm text-oat-100/80 hover:text-oat-50"
                        >
                          {CATEGORY_LABELS[cat]}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}

                <p className="mb-1 mt-2 font-display text-[11px] font-semibold uppercase tracking-[0.15em] text-oat-100/45">
                  Infos
                </p>
                <Link
                  to="/a-propos"
                  onClick={() => setMobileOpen(false)}
                  className="focus-ring rounded-sm px-1 py-2.5 font-display text-sm font-semibold uppercase tracking-wide text-oat-50"
                >
                  À propos
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="focus-ring rounded-sm px-1 py-2.5 font-display text-sm font-semibold uppercase tracking-wide text-oat-50"
                >
                  Contact
                </Link>
              </nav>

              <div className="mt-auto shrink-0 border-t border-oat-50/15 pt-4">
                <Link
                  to={isAuthenticated ? "/compte" : "/connexion"}
                  onClick={() => setMobileOpen(false)}
                  className="focus-ring flex items-center gap-2.5 font-display text-sm font-semibold uppercase tracking-wide text-oat-100/70 hover:text-oat-50"
                >
                  <User className="h-4 w-4" strokeWidth={1.75} />
                  {isAuthenticated ? 'Mon compte' : 'Connexion'}
                </Link>
                <a
                  href="https://wa.me/33123456789?text=Bonjour%20Nutrition%20%C3%89quine%2C%20j%27ai%20une%20question."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-leather-600 py-3 font-display text-sm font-bold text-oat-50 transition-colors hover:bg-leather-500"
                >
                  <MessageCircle className="h-5 w-5" strokeWidth={2} />
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}

      <SearchPanel open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
