import { Link } from 'react-router-dom'
import { MessageCircle, ShieldCheck, Truck } from 'lucide-react'
import { FaqSection } from '../components/FaqSection'
import { usePageMeta } from '../hooks/usePageMeta'

export function Faq() {
  usePageMeta('Questions fréquentes', 'Les réponses essentielles sur la nutrition équine, la livraison, les commandes et l’utilisation des compléments.')

  return (
    <div>
      <section className="bg-hunter-900 text-oat-50">
        <div className="mx-auto flex max-w-6xl items-end justify-between gap-8 px-4 py-16 sm:px-6 sm:py-20">
          <div>
            <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-straw-400">Centre d’aide</p>
            <h1 className="mt-3 max-w-2xl font-display text-4xl font-semibold leading-tight sm:text-6xl">Les réponses avant de choisir.</h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-oat-100/80">Nutrition, commandes, livraison et utilisation: retrouvez les repères essentiels pour avancer avec confiance.</p>
          </div>
          <MessageCircle className="hidden h-14 w-14 shrink-0 text-straw-400 sm:block" strokeWidth={1.2} />
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="border border-hunter-800/10 bg-oat-50 p-5"><ShieldCheck className="h-6 w-6 text-leather-600" /><h2 className="mt-4 font-display text-lg font-semibold text-hunter-900">Choix responsable</h2><p className="mt-2 text-sm leading-relaxed text-ink-600">Une formule complémentaire ne remplace ni le fourrage ni le conseil vétérinaire.</p></div>
          <div className="border border-hunter-800/10 bg-oat-50 p-5"><Truck className="h-6 w-6 text-leather-600" /><h2 className="mt-4 font-display text-lg font-semibold text-hunter-900">Commande suivie</h2><p className="mt-2 text-sm leading-relaxed text-ink-600">Délais, transport et suivi sont détaillés avant et après votre commande.</p></div>
          <div className="border border-hunter-800/10 bg-oat-50 p-5"><MessageCircle className="h-6 w-6 text-leather-600" /><h2 className="mt-4 font-display text-lg font-semibold text-hunter-900">Une équipe disponible</h2><p className="mt-2 text-sm leading-relaxed text-ink-600">Une question liée à votre cheval? Écrivez-nous avec le contexte utile.</p></div>
        </div>
        <div className="mt-14"><FaqSection /></div>
      </section>
      <section className="border-t border-hunter-800/10 bg-oat-200/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-6"><div><p className="font-body text-xs font-bold uppercase tracking-[0.18em] text-leather-700">Besoin d’un avis concret?</p><h2 className="mt-2 font-display text-2xl font-semibold text-hunter-900">Parlons de votre cheval.</h2></div><Link to="/contact" className="focus-ring btn-primary">Nous contacter</Link></div>
      </section>
    </div>
  )
}
