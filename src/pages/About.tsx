import { Link } from 'react-router-dom'
import { Leaf, FlaskConical, ShieldCheck, MapPin, HeartHandshake } from 'lucide-react'
import { usePageMeta } from '../hooks/usePageMeta'

const PILLARS = [
  {
    icon: Leaf,
    title: 'Nature & science',
    text: 'Des formules basées sur des actifs naturels, dosés avec rigueur pour répondre aux besoins réels du cheval de sport, de loisir ou sénior.',
  },
  {
    icon: FlaskConical,
    title: 'Fabriqué en France',
    text: 'Conception et production sur le territoire français, avec une traçabilité des matières premières et des contrôles qualité à chaque lot.',
  },
  {
    icon: ShieldCheck,
    title: 'Non dopant & FEI',
    text: 'Nos produits sont formulés pour respecter les règlements anti-dopage aux posologies recommandées. Lisez toujours l’étiquette avant une compétition.',
  },
  {
    icon: HeartHandshake,
    title: 'À l’écoute des soigneurs',
    text: 'Cavaliers, vétérinaires et ostéopathes nourrissent nos protocoles. Votre retour terrain guide l’évolution de la gamme.',
  },
]

export function About() {
  usePageMeta(
    'À propos',
    'Nutrition Équine conçoit des compléments alimentaires naturels pour chevaux, formulés en France avec transparence et exigence.',
  )
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-hunter-900 text-oat-50">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1400&q=70')",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-straw-400">
            À propos
          </p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-extrabold leading-tight sm:text-5xl">
            Nutrition Équine, l'équilibre naturel au service du cheval
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-oat-100/85">
            Nous concevons des compléments alimentaires clairs, efficaces et respectueux de
            l’animal — pour accompagner l’entretien, la performance et le bien-être au quotidien.
          </p>
        </div>
      </section>

      {/* Histoire */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="font-display text-2xl font-bold text-hunter-900 sm:text-3xl">
              Notre histoire
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-900">
              Nutrition Équine est née d’un constat simple : trop de gammes opaques, des compositions
              difficiles à lire, et peu de lien entre le terrain et le laboratoire. Nous avons
              choisi de bâtir une offre lisible — CMV, digestion, articulations, respiration,
              sabots, robe, stress, électrolytes — avec des posologies nettes et des actifs
              choisis pour leur pertinence.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-900">
              Chaque formule est pensée pour s’intégrer à la ration sans la complexifier, et pour
              s’adapter au cheval de club comme au cheval de sport.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden border border-hunter-800/10 bg-oat-200">
            <img
              src="https://images.pexels.com/photos/1996333/pexels-photo-1996333.jpeg?auto=compress&cs=tinysrgb&w=900"
              alt="Chevaux au pré"
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* Piliers */}
      <section className="border-y border-hunter-800/10 bg-oat-50">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="text-center font-display text-2xl font-bold text-hunter-900 sm:text-3xl">
            Ce qui nous guide
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="border border-hunter-800/10 bg-oat-100/50 p-5"
              >
                <div className="flex h-10 w-10 items-center justify-center bg-hunter-900 text-oat-50">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="mt-4 font-display text-base font-bold text-hunter-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement qualité */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-start">
          <div>
            <h2 className="font-display text-2xl font-bold text-hunter-900 sm:text-3xl">
              Qualité & transparence
            </h2>
            <ul className="mt-5 space-y-3 text-sm text-ink-900">
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-leather-600" />
                Ingrédients sélectionnés et dosages indiqués sur chaque fiche produit
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-leather-600" />
                Lots tracés ; conservation et modes d’emploi clairement décrits
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-leather-600" />
                Gamme structurée comme chez les spécialistes du secteur : entretien, effort,
                confort, soin externe
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-leather-600" />
                Service client joignable pour affiner un protocole avec votre vétérinaire
              </li>
            </ul>
          </div>
          <div className="border border-hunter-800/10 bg-hunter-900 p-6 text-oat-50">
            <MapPin className="h-6 w-6 text-straw-400" strokeWidth={1.75} />
            <p className="mt-3 font-display text-lg font-bold">Ancrage français</p>
            <p className="mt-2 text-sm leading-relaxed text-oat-100/80">
              Siège et coordination des formules en France. Nous travaillons avec des partenaires
              de confiance pour la fabrication et le conditionnement, dans le respect des normes
              applicables aux compléments pour équidés.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-hunter-800/10 bg-oat-50">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 px-4 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <h2 className="font-display text-xl font-bold text-hunter-900">
              Découvrez la gamme
            </h2>
            <p className="mt-1 text-sm text-ink-600">
              CMV, digestion, articulations, sabots, stress, électrolytes…
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/catalogue" className="focus-ring btn-primary">
              Voir le catalogue
            </Link>
            <Link to="/contact" className="focus-ring btn-secondary">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
