import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Wheat, Leaf, Activity, Wind, Zap, Heart,
  ChevronLeft, ChevronRight, HeartHandshake, Users, Sprout,
} from 'lucide-react'
import { PROTOCOLS } from '../data/protocols'
import { CATEGORY_LABELS, type Category } from '../types'
import { PRODUCTS } from '../data/products'
import { ProductCard } from '../components/ProductCard'
import { ProtocolCard } from '../components/ProtocolCard'
import { CompositionLabel } from '../components/CompositionLabel'
import { RatingBadge } from '../components/RatingBadge'
import { ComparisonTable } from '../components/ComparisonTable'
import { StatCircle } from '../components/StatCircle'
import { FaqSection } from '../components/FaqSection'
import { usePageMeta } from '../hooks/usePageMeta'
import { MadeInFranceBadge } from '../components/MadeInFranceBadge'

const ICONS: Partial<Record<Category, typeof Wheat>> = {
  alimentation: Wheat,
  aliments: Wheat,
  digestion: Leaf,
  articulations: Activity,
  respiration: Wind,
  recuperation: Zap,
  senior: Heart,
}

const HERO_SLIDES = [
  {
    eyebrow: 'CMV Entretien',
    title: 'La base minérale du quotidien',
    text: "Un complément formulé avec des vétérinaires équins pour couvrir les besoins essentiels de votre cheval, jour après jour.",
    cta: 'Découvrir CMV Entretien',
    link: '/produit/cmv-entretien',
  },
  {
    eyebrow: 'Ulcéro+',
    title: 'Le confort digestif retrouvé',
    text: 'Fibres de luzerne et argile verte pour soutenir la muqueuse gastrique dans les moments sensibles.',
    cta: 'Découvrir Ulcéro+',
    link: '/produit/ulcero-plus',
  },
]

const TESTIMONIALS = [
  { author: 'Camille B.', context: 'cavalière de CSO', text: "Résultat visible en une dizaine de jours, mon cheval est bien plus détendu à l'effort." },
  { author: 'Marc T.', context: 'propriétaire de 3 chevaux', text: "Facile à donner, bien mélangé aux granulés, aucun refus même avec ma jument difficile." },
  { author: 'Élise R.', context: "monitrice d'équitation", text: 'Je le recommande à tous mes élèves pour leurs poneys, bon rapport qualité-prix.' },
]

export function Home() {
  usePageMeta()
  const categories = Object.keys(ICONS) as Category[]
  const featured = PRODUCTS.slice(0, 6)
  const [slide, setSlide] = useState(0)
  const [review, setReview] = useState(0)

  const s = HERO_SLIDES[slide]
  const t = TESTIMONIALS[review]

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-hunter-900">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-10 pt-8 sm:px-6 md:grid-cols-2 md:pb-16 md:pt-12">
          <div className="text-oat-50">
            <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-leather-500">
              {s.eyebrow}
            </p>
            <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
              {s.title}
            </h1>
            <p className="mt-5 max-w-md text-oat-100/80">{s.text}</p>
            <div className="mt-4">
              <MadeInFranceBadge />
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {/* CTA principal unique du hero */}
              <Link to={s.link} className="focus-ring btn-primary-inverse">
                {s.cta}
              </Link>
              <Link
                to="/catalogue"
                className="focus-ring text-sm font-semibold text-oat-100/70 underline decoration-oat-100/30 underline-offset-4 hover:text-oat-50"
              >
                Voir le catalogue
              </Link>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setSlide((slide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
                  className="focus-ring rounded-full p-1.5 text-oat-50/60 hover:text-oat-50"
                  aria-label="Précédent"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                {HERO_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlide(i)}
                    aria-label={`Voir le slide ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      i === slide ? 'w-6 bg-oat-50' : 'w-1.5 bg-oat-50/30'
                    }`}
                  />
                ))}
                <button
                  onClick={() => setSlide((slide + 1) % HERO_SLIDES.length)}
                  className="focus-ring rounded-full p-1.5 text-oat-50/60 hover:text-oat-50"
                  aria-label="Suivant"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -top-5 left-1/2 z-10 -translate-x-1/2">
              <RatingBadge />
            </div>
            <div className="rotate-1 overflow-hidden rounded-sm bg-oat-100 p-2 shadow-xl transition-transform hover:rotate-0">
              <img
                src="https://images.pexels.com/photos/7882510/pexels-photo-7882510.jpeg?auto=compress&cs=tinysrgb&w=640"
                srcSet="https://images.pexels.com/photos/7882510/pexels-photo-7882510.jpeg?auto=compress&cs=tinysrgb&w=400 400w, https://images.pexels.com/photos/7882510/pexels-photo-7882510.jpeg?auto=compress&cs=tinysrgb&w=640 640w, https://images.pexels.com/photos/7882510/pexels-photo-7882510.jpeg?auto=compress&cs=tinysrgb&w=900 900w"
                sizes="(max-width: 768px) 90vw, 420px"
                width={640}
                height={800}
                alt="Cheval mangeant dans un seau — nutrition naturelle Nutrition Équine"
                className="aspect-[4/5] w-full object-cover"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
              <div className="bg-oat-50 px-4 py-3">
                <p className="font-display text-lg font-bold text-hunter-900">{s.eyebrow}</p>
                <p className="text-sm text-ink-600">100% naturel · Fabriqué en France</p>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rotate-[-3deg] sm:block">
              <CompositionLabel
                items={[
                  { label: 'Calcium', value: '18,2 %' },
                  { label: 'Vitamine E', value: '4 500 UI/kg' },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category strip */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 className="font-display text-2xl font-bold text-hunter-900">Par besoin</h2>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {categories.map((cat) => {
            const Icon = ICONS[cat] ?? Wheat
            return (
              <Link
                key={cat}
                to={`/catalogue?categorie=${cat}`}
                className="focus-ring flex flex-col items-center gap-2 border border-hunter-800/10 bg-oat-50 px-3 py-6 text-center transition-colors hover:border-leather-600"
              >
                <Icon className="h-6 w-6 text-leather-600" strokeWidth={1.75} />
                <span className="font-display text-sm font-semibold text-hunter-900">
                  {CATEGORY_LABELS[cat]}
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Protocoles */}
      <section id="protocoles" className="bg-oat-200/60 py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-2xl font-bold text-hunter-900">Nos protocoles</h2>
          <p className="mt-1 text-sm text-ink-600">Des cures complètes, pensées par besoin.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {PROTOCOLS.map((p) => (
              <ProtocolCard key={p.id} protocol={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Nos gammes */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <p className="text-center font-display text-xs font-bold uppercase tracking-[0.2em] text-ink-600">
          Aliments complémentaires pour chevaux et poneys
        </p>
        <h2 className="mt-2 text-center font-display text-3xl font-extrabold text-hunter-900">
          Nos Gammes
        </h2>

        <div className="mt-10 flex items-end justify-between">
          <h3 className="font-display text-xl font-bold text-hunter-900">Nos Cures</h3>
          <Link
            to="/catalogue"
            className="focus-ring font-display text-sm font-semibold text-leather-600 hover:text-leather-700"
          >
            Voir tout →
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Mission / lead-gen */}
      <section id="engagement" className="bg-hunter-900 py-16 text-oat-50">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-oat-100/50">
            Notre raison d'être
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
            La mission de Nutrition Équine
          </h2>

          <div className="mx-auto mt-8 max-w-xl border border-oat-50/15 bg-oat-50/5 p-6 text-left sm:p-8">
            <p className="font-display text-xl font-bold">
              Quels sont les vrais besoins de votre cheval ?
            </p>
            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3">
                <HeartHandshake className="mt-0.5 h-5 w-5 shrink-0 text-leather-500" strokeWidth={1.75} />
                <span className="text-oat-100/85">
                  Recommandations sur-mesure selon le profil de votre cheval
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Users className="mt-0.5 h-5 w-5 shrink-0 text-leather-500" strokeWidth={1.75} />
                <span className="text-oat-100/85">Réponse personnalisée d'un expert équin</span>
              </li>
              <li className="flex items-start gap-3">
                <Sprout className="mt-0.5 h-5 w-5 shrink-0 text-leather-500" strokeWidth={1.75} />
                <span className="text-oat-100/85">Sans engagement — entièrement gratuit</span>
              </li>
            </ul>
            <Link to="/contact" className="focus-ring btn-primary-inverse btn-block mt-6">
              Faire le bilan équin offert →
            </Link>
            <p className="mt-3 text-center text-xs text-oat-100/50">
              Moins de 3 minutes · Réponse d'un expert sous 48h
            </p>
          </div>
        </div>
      </section>

      {/* Pourquoi nous choisir */}
      <section className="bg-hunter-950 py-16 text-oat-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-center font-display text-xs font-bold uppercase tracking-[0.2em] text-oat-100/50">
            Pourquoi nous choisir
          </p>
          <h2 className="mt-2 text-center font-display text-3xl font-extrabold">
            La différence Nutrition Équine
          </h2>

          <div className="mt-8">
            <ComparisonTable />
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <StatCircle value="96%" label="Recommandent Nutrition Équine à un autre cavalier" />
            <StatCircle value="89%" label="Constatent une amélioration en moins de 15 jours" />
          </div>
        </div>
      </section>

      {/* Avis */}
      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-ink-600">
          Avis vérifiés
        </p>
        <h2 className="mt-2 font-display text-3xl font-extrabold text-hunter-900">
          Les cavaliers qui nous font confiance
        </h2>

        <div className="mt-8 border border-hunter-800/10 bg-oat-50 p-6 text-left sm:p-8">
          <div className="flex items-center justify-between">
            <RatingBadge />
            <span className="text-xs text-ink-600">143 avis</span>
          </div>
          <p className="mt-6 font-display text-lg font-semibold text-hunter-900">"{t.text}"</p>
          <p className="mt-3 text-sm text-ink-600">
            {t.author}, {t.context}
          </p>
          <div className="mt-6 flex items-center justify-end gap-2">
            <button
              onClick={() => setReview((review - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
              className="focus-ring rounded-full border border-hunter-800/15 p-2 text-hunter-900 hover:bg-oat-200"
              aria-label="Avis précédent"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setReview((review + 1) % TESTIMONIALS.length)}
              className="focus-ring rounded-full border border-hunter-800/15 p-2 text-hunter-900 hover:bg-oat-200"
              aria-label="Avis suivant"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <FaqSection />
    </div>
  )
}
