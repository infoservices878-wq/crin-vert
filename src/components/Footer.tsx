import { Link } from 'react-router-dom'
import { FacebookIcon, YoutubeIcon, InstagramIcon } from './SocialIcons'
import { CATEGORY_LABELS, type Category } from '../types'
import { TrustBadges } from './TrustBadges'
import { PaymentMethodsRow } from './PaymentBadge'

export function Footer() {
  const categories = Object.keys(CATEGORY_LABELS) as Category[]

  return (
    <>
      <TrustBadges />
      <footer className="border-t border-hunter-800/15 bg-hunter-900 text-oat-100">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="font-display text-lg font-bold text-oat-50">Nutrition Équine</span>
            <p className="mt-3 max-w-xs text-sm text-oat-100/70">
              Compléments alimentaires naturels formulés en France, pensés pour accompagner le
              cheval à chaque étape de sa vie.
            </p>
          </div>
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-wide text-oat-50">
              Catégories
            </p>
            <ul className="mt-3 space-y-2 text-sm text-oat-100/80">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link to={`/catalogue?categorie=${cat}`} className="focus-ring hover:text-oat-50">
                    {CATEGORY_LABELS[cat]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-wide text-oat-50">
              Le nécessaire
            </p>
            <ul className="mt-3 space-y-2 text-sm text-oat-100/80">
              <li>Fabriqué en France</li>
              <li>Formules non-dopantes, conformes FEI</li>
              <li>Expédition sous 48h</li>
              <li>service.clients@nutrition-equine.example</li>
            </ul>
          </div>
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-wide text-oat-50">
              Informations légales
            </p>
            <ul className="mt-3 space-y-2 text-sm text-oat-100/80">
              <li>
                <Link to="/a-propos" className="focus-ring hover:text-oat-50">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/mentions-legales" className="focus-ring hover:text-oat-50">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link to="/cgv" className="focus-ring hover:text-oat-50">
                  Conditions générales de vente
                </Link>
              </li>
              <li>
                <Link to="/livraison" className="focus-ring hover:text-oat-50">
                  Livraison
                </Link>
              </li>
              <li>
                <Link to="/retours-remboursement" className="focus-ring hover:text-oat-50">
                  Retour et remboursement
                </Link>
              </li>
              <li>
                <Link to="/paiement" className="focus-ring hover:text-oat-50">
                  Paiement
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 grid w-fit grid-cols-3 border border-oat-100/20">
          {[
            { Icon: FacebookIcon, label: 'Facebook', href: 'https://facebook.com' },
            { Icon: YoutubeIcon, label: 'YouTube', href: 'https://youtube.com' },
            { Icon: InstagramIcon, label: 'Instagram', href: 'https://instagram.com' },
          ].map(({ Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="focus-ring flex h-11 w-14 items-center justify-center border-r border-oat-100/20 text-oat-50 last:border-r-0 hover:bg-oat-50/10"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>

        <PaymentMethodsRow className="mt-8" />

        <p className="mt-8 text-center text-sm text-oat-100/70">
          © {new Date().getFullYear()} Nutrition Équine — Tous droits réservés
        </p>

        <p className="mt-10 border-t border-oat-100/10 pt-6 text-center text-xs text-oat-100/50">
          Site de démonstration généré à titre d'exemple — aucune donnée réelle, aucune commande
          réelle.
        </p>
      </div>
    </footer>
    </>
  )
}
