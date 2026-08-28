import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Menu, X, ChevronDown, User, MessageCircle, Search, Heart } from 'lucide-react'
import { MegaMenu } from './MegaMenu'
import { HeaderSearch } from './HeaderSearch'
import { SearchPanel } from './SearchPanel'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useWishlist } from '../context/WishlistContext'

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
  const { count } = useCart()
  const { isAuthenticated, user } = useAuth()
  const { count: wishCount } = useWishlist()

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-hunter-800/10 bg-oat-50/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6 lg:gap-6">
          <Link to="/" className="focus-ring flex items-center gap-2 text-hunter-900">
            <HorseshoeMark />
            <span>
              <span className="block font-display text-xl font-bold leading-none tracking-tight">
                Nutrition Équine
              </span>
              <span className="mt-1 flex items-center gap-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-ink-600">
                  Compléments naturels
                </span>
                <span className="flex h-[3px] w-6 overflow-hidden rounded-full">
                  <span className="w-1/3 bg-flag-blue" />
                  <span className="w-1/3 bg-oat-300" />
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
                <div className="absolute left-1/2 top-full w-[380px] -translate-x-1/2 border border-hunter-800/10 bg-oat-50 shadow-lg">
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
              <ShoppingBag className="h-5 w-5" strokeWidth={1.75} />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-leather-600 font-mono text-[10px] font-semibold text-oat-50">
                  {count}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="focus-ring rounded-sm p-2 text-hunter-900 md:hidden"
              aria-label="Ouvrir le menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div
              className="absolute inset-0 bg-ink-900/50"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <div className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col overflow-y-auto bg-hunter-900 px-6 py-5">
              <div className="flex items-center justify-between">
                <Link
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className="focus-ring flex items-center gap-2 text-oat-50"
                >
                  <HorseshoeMark />
                  <span className="font-display text-xl font-bold tracking-tight">Nutrition Équine</span>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="focus-ring rounded-full border border-oat-50/25 p-1.5 text-oat-50"
                  aria-label="Fermer le menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="mt-10 flex flex-col gap-7">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false)
                    setSearchOpen(true)
                  }}
                  className="focus-ring flex items-center gap-2 text-left font-display text-lg font-bold uppercase tracking-wide text-oat-50"
                >
                  <Search className="h-5 w-5" strokeWidth={1.75} />
                  Rechercher
                </button>
                <Link
                  to="/catalogue"
                  onClick={() => setMobileOpen(false)}
                  className="focus-ring font-display text-lg font-bold uppercase tracking-wide text-oat-50"
                >
                  Catalogue
                </Link>
                <Link
                  to="/favoris"
                  onClick={() => setMobileOpen(false)}
                  className="focus-ring font-display text-lg font-bold uppercase tracking-wide text-oat-50"
                >
                  Favoris
                </Link>
                <Link
                  to="/#protocoles"
                  onClick={() => setMobileOpen(false)}
                  className="focus-ring font-display text-lg font-bold uppercase tracking-wide text-oat-50"
                >
                  Nos protocoles
                </Link>
                <Link
                  to="/a-propos"
                  onClick={() => setMobileOpen(false)}
                  className="focus-ring font-display text-lg font-bold uppercase tracking-wide text-oat-50"
                >
                  À propos
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="focus-ring font-display text-lg font-bold uppercase tracking-wide text-oat-50"
                >
                  Contact
                </Link>
              </nav>

              <div className="mt-10 border-t border-oat-50/15 pt-6">
                <Link
                  to={isAuthenticated ? "/compte" : "/connexion"}
                  onClick={() => setMobileOpen(false)}
                  className="focus-ring flex items-center gap-2.5 font-display text-sm font-bold uppercase tracking-wide text-oat-100/70 hover:text-oat-50"
                >
                  <User className="h-4 w-4" strokeWidth={1.75} />
                  Connexion / Mon compte
                </Link>
              </div>

              <a
                href="https://wa.me/33123456789?text=Bonjour%20Crin%20Vert%2C%20j%27ai%20une%20question."
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring mt-8 flex items-center justify-center gap-2 bg-leather-600 py-3.5 font-display font-bold text-oat-50 transition-colors hover:bg-leather-500"
              >
                <MessageCircle className="h-5 w-5" strokeWidth={2} />
                WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>

      <SearchPanel open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
