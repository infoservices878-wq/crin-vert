import { Link } from 'react-router-dom'
import { ArrowRight, Check, Clock3, MapPin, PackageCheck, ShieldCheck, Truck } from 'lucide-react'
import { usePageMeta } from '../hooks/usePageMeta'

const STEPS = [
  ['01', 'Confirmation du règlement', 'Votre commande est réservée, puis préparée après réception et rapprochement de votre virement.'],
  ['02', 'Préparation soignée', 'Nous vérifions les références, conditionnons les produits et sélectionnons le transport adapté au colis.'],
  ['03', 'Expédition et suivi', 'Vous recevez les informations utiles dès que le transporteur prend en charge votre commande.'],
]

const DELIVERY_POINTS = [
  'Frais affichés avant confirmation, selon l’adresse, le poids et le service choisi.',
  'Livraison offerte en France métropolitaine dès 79 € de produits, sauf mention contraire dans le panier.',
  'Délais indicatifs en jours ouvrés : ils varient selon le transporteur, la destination et les contraintes logistiques.',
]

export function Delivery() {
  usePageMeta('Livraison internationale', 'Préparation, transport, suivi, douanes et réception des commandes Nutrition Equine.')

  return (
    <div>
      <section className="bg-hunter-900 text-oat-50">
        <div className="mx-auto flex max-w-6xl items-end justify-between gap-8 px-4 py-16 sm:px-6 sm:py-20">
          <div>
            <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-straw-400">Livraison claire, réception sereine</p>
            <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-6xl">De notre atelier jusqu’à votre écurie.</h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-oat-100/80">Nous vous indiquons le coût, le transporteur et les conditions de livraison avant validation. Pour les commandes volumineuses ou internationales, notre équipe vous accompagne avant expédition.</p>
          </div>
          <Truck className="hidden h-14 w-14 shrink-0 text-straw-400 sm:block" strokeWidth={1.2} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
          <article className="border border-hunter-800/10 bg-oat-50 p-7">
            <PackageCheck className="h-7 w-7 text-leather-600" />
            <p className="mt-6 font-body text-xs font-bold uppercase tracking-[0.16em] text-leather-700">France et Europe</p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-hunter-900">Choisir la réception adaptée à votre commande</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-600">Les options disponibles sont proposées au checkout : point relais, livraison à domicile, livraison sur le lieu de travail, express ou retrait lorsque l’option est ouverte. Elles dépendent du format de vos produits et de l’adresse renseignée.</p>
            <ul className="mt-6 space-y-3 text-sm text-ink-900">
              {DELIVERY_POINTS.map((point) => <li key={point} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-leather-600" />{point}</li>)}
            </ul>
          </article>

          <article className="border border-hunter-800/10 bg-oat-50 p-7">
            <MapPin className="h-7 w-7 text-leather-600" />
            <p className="mt-6 font-body text-xs font-bold uppercase tracking-[0.16em] text-leather-700">Destinations particulières</p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-hunter-900">Avant d’expédier hors zone</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-600">Pour une destination non proposée, un accès d’écurie particulier, une commande sur palette ou une livraison hors Union européenne, contactez-nous avant votre achat. Nous vérifierons la faisabilité et le tarif.</p>
            <p className="mt-4 text-sm leading-relaxed text-ink-600">Hors Union européenne, droits de douane, taxes locales, formalités d’importation et frais demandés par les autorités restent à la charge du destinataire, sauf confirmation écrite contraire.</p>
            <Link to="/contact" className="focus-ring btn-secondary mt-6">Préparer une expédition <ArrowRight className="h-4 w-4" /></Link>
          </article>
        </div>
      </section>

      <section className="border-y border-hunter-800/10 bg-oat-200/60">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <p className="font-body text-xs font-bold uppercase tracking-[0.18em] text-leather-700">Un parcours suivi</p>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {STEPS.map(([number, title, text]) => <div key={number} className="flex gap-4"><span className="font-display text-3xl font-semibold text-leather-600">{number}</span><div><h2 className="font-display text-lg font-semibold text-hunter-900">{title}</h2><p className="mt-2 text-sm leading-relaxed text-ink-600">{text}</p></div></div>)}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-5 px-4 py-14 sm:px-6 md:grid-cols-2">
        <article className="border border-hunter-800/10 bg-oat-50 p-6"><Clock3 className="h-6 w-6 text-leather-600" /><h2 className="mt-4 font-display text-xl font-semibold text-hunter-900">Suivi, retard ou absence de mouvement</h2><p className="mt-2 text-sm leading-relaxed text-ink-600">Le suivi s’active généralement après la première lecture du colis par le transporteur. Si le délai annoncé est dépassé de manière inhabituelle, contactez-nous avec votre référence : nous lancerons les vérifications nécessaires.</p><Link to="/suivi-commande" className="focus-ring btn-ghost mt-4 inline-block text-sm">Suivre une commande</Link></article>
        <article className="border border-hunter-800/10 bg-oat-50 p-6"><ShieldCheck className="h-6 w-6 text-leather-600" /><h2 className="mt-4 font-display text-xl font-semibold text-hunter-900">Colis endommagé ou incomplet</h2><p className="mt-2 text-sm leading-relaxed text-ink-600">Photographiez le colis et son contenu, formulez des réserves précises si possible lors de la livraison et contactez-nous sans tarder. Ne jetez pas l’emballage avant notre retour.</p><Link to="/retours-remboursement" className="focus-ring btn-ghost mt-4 inline-block text-sm">Voir retours et garanties</Link></article>
      </section>
    </div>
  )
}
