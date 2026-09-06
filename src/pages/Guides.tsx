import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, ClipboardCheck, Scale } from 'lucide-react'
import { usePageMeta } from '../hooks/usePageMeta'

const GUIDES = [
  { icon: ClipboardCheck, tag: 'Avant de choisir', title: 'Observer avant de compléter', text: 'Foin disponible, état corporel, rythme de travail, dentition et accès à l’eau : les fondations d’une ration se regardent avant tout ajout.', to: '/bilan-equin', cta: 'Faire le bilan' },
  { icon: Scale, tag: 'Méthode', title: 'Introduire un produit avec méthode', text: 'Commencez progressivement, respectez la dose indiquée et ne multipliez pas les nouveautés. Notez ce qui évolue afin d’échanger utilement avec votre vétérinaire.', to: '/catalogue', cta: 'Voir les formules' },
  { icon: BookOpen, tag: 'Transparence', title: 'Lire une fiche produit', text: 'Une décision éclairée repose sur une composition lisible, une analyse nutritionnelle, un mode d’emploi précis, le format et les précautions d’usage.', to: '/catalogue', cta: 'Explorer le catalogue' },
]

export function Guides() {
  usePageMeta('Conseils nutrition équine', 'Des repères concrets pour choisir et utiliser une alimentation complémentaire adaptée à votre cheval.')
  return <div>
    <section className="bg-hunter-950 text-oat-50"><div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24"><p className="text-xs font-bold uppercase tracking-[.2em] text-straw-400">Le carnet Nutrition Équine</p><h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] sm:text-6xl">Faire des choix plus justes pour sa ration.</h1><p className="mt-6 max-w-2xl text-base leading-relaxed text-oat-100/80">Des repères simples, utiles sur le terrain, pour comprendre les besoins de votre cheval sans promettre de solution universelle.</p></div></section>
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6"><div className="grid gap-5 md:grid-cols-3">{GUIDES.map(({ icon: Icon, tag, title, text, to, cta }) => <article key={title} className="group border border-hunter-800/10 bg-oat-50 p-7 transition-shadow hover:shadow-xl"><Icon className="h-6 w-6 text-leather-600" /><p className="mt-8 text-xs font-bold uppercase tracking-[.16em] text-leather-700">{tag}</p><h2 className="mt-3 font-display text-2xl text-hunter-900">{title}</h2><p className="mt-4 text-sm leading-relaxed text-ink-600">{text}</p><Link className="focus-ring mt-7 inline-flex items-center gap-2 text-sm font-bold text-hunter-900" to={to}>{cta}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link></article>)}</div></section>
    <section className="border-y border-hunter-800/10 bg-oat-200/60"><div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6"><p className="font-display text-3xl text-hunter-900">Une question spécifique à votre cheval ?</p><p className="mt-3 text-ink-600">Notre bilan vous aide à préparer une demande claire. En cas de symptômes, de douleur ou de traitement, demandez l’avis de votre vétérinaire.</p><Link to="/bilan-equin" className="focus-ring btn-primary mt-7">Commencer le bilan offert</Link></div></section>
  </div>
}
