import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Lock, Truck, Zap, Check, Clock3, HelpCircle } from 'lucide-react'
import { ContactInfoCard } from '../components/ContactInfoCard'
import {
  contactSchema,
  parseForm,
  inputErrorClass,
  type FieldErrors,
} from '../lib/validation'
import { sendContactMessage } from '../lib/api'

const base =
  'focus-ring mt-1.5 w-full border bg-oat-50 px-3 py-2.5 text-sm text-ink-900 placeholder:text-ink-600/60 border-hunter-800/15'

export function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState('')

  const clear = (key: string) =>
    setErrors((prev) => {
      if (!prev[key]) return prev
      const n = { ...prev }
      delete n[key]
      return n
    })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const result = parseForm(contactSchema, { name, email, phone, subject, message })
    if (!result.success) {
      setErrors(result.errors)
      setSent(false)
      return
    }
    setErrors({})
    setSending(true)
    setSendError('')
    try {
      await sendContactMessage({ name, email, phone, subject, message })
      setSent(true)
    } catch (reason) {
      setSendError(reason instanceof Error ? reason.message : 'Impossible d’envoyer le message.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <div className="max-w-2xl">
        <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-leather-700">
          Une équipe à votre écoute
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-hunter-900 sm:text-5xl">
          Parlons de votre cheval.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-ink-600">
          Besoin d’aide pour choisir une formule, comprendre une fiche ou suivre une commande ?
          Donnez-nous le contexte utile et nous vous répondrons avec des repères concrets, sans
          remplacer l’avis de votre vétérinaire.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <ContactInfoCard icon={Mail} title="Par e-mail" detail="contact@nutrition-equine.com" />
        <ContactInfoCard icon={Phone} title="Par téléphone" detail="+33 1 23 45 67 89" />
        <ContactInfoCard icon={Clock3} title="Notre délai" detail="Réponse sous 48 h ouvrées" />
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_300px] lg:items-start">
        <div>
          <div className="border border-leather-600/20 bg-leather-600/5 p-5">
            <p className="font-display text-lg font-semibold text-hunter-900">Préparer votre message</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">
              Pour une réponse plus précise, indiquez l’âge de votre cheval, son activité, sa ration
              actuelle et la question que vous vous posez.
            </p>
            <Link to="/bilan-equin" className="focus-ring mt-4 inline-flex font-display text-sm font-semibold text-leather-700 underline">
              Faire le bilan nutritionnel offert
            </Link>
          </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-10 space-y-5 border border-hunter-800/10 bg-oat-50 p-6 sm:p-8"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="font-display text-sm font-semibold text-hunter-900">Nom</span>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                clear('name')
              }}
              placeholder="Votre nom"
              aria-invalid={!!errors.name}
              className={inputErrorClass(!!errors.name, base)}
            />
            {errors.name && (
              <span className="mt-1 block text-xs text-flag-red" role="alert">
                {errors.name}
              </span>
            )}
          </label>
          <label className="block">
            <span className="font-display text-sm font-semibold text-hunter-900">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                clear('email')
              }}
              placeholder="votre@email.com"
              aria-invalid={!!errors.email}
              className={inputErrorClass(!!errors.email, base)}
            />
            {errors.email && (
              <span className="mt-1 block text-xs text-flag-red" role="alert">
                {errors.email}
              </span>
            )}
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="font-display text-sm font-semibold text-hunter-900">Téléphone</span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value)
                clear('phone')
              }}
              placeholder="06 XX XX XX XX"
              aria-invalid={!!errors.phone}
              className={inputErrorClass(!!errors.phone, base)}
            />
            {errors.phone && (
              <span className="mt-1 block text-xs text-flag-red" role="alert">
                {errors.phone}
              </span>
            )}
          </label>
          <label className="block">
            <span className="font-display text-sm font-semibold text-hunter-900">Sujet</span>
            <input
              type="text"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value)
                clear('subject')
              }}
              placeholder="Sujet de votre message"
              aria-invalid={!!errors.subject}
              className={inputErrorClass(!!errors.subject, base)}
            />
            {errors.subject && (
              <span className="mt-1 block text-xs text-flag-red" role="alert">
                {errors.subject}
              </span>
            )}
          </label>
        </div>

        <label className="block">
          <span className="font-display text-sm font-semibold text-hunter-900">Message</span>
          <textarea
            rows={6}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value)
              clear('message')
            }}
            placeholder="Votre message..."
            aria-invalid={!!errors.message}
            className={inputErrorClass(!!errors.message, `${base} resize-none`)}
          />
          {errors.message && (
            <span className="mt-1 block text-xs text-flag-red" role="alert">
              {errors.message}
            </span>
          )}
        </label>

        <button
          type="submit"
          className="focus-ring btn-primary btn-block uppercase tracking-wide"
        >
          {sending ? 'Envoi en cours…' : sent ? (
            <>
              <Check className="h-4 w-4" strokeWidth={2.5} /> Message envoyé
            </>
          ) : (
            'Envoyer le message'
          )}
        </button>
        {sent && (
          <p className="text-center text-xs text-ink-600">
            Merci, votre message a bien été transmis à notre équipe.
          </p>
        )}
        {!sent && Object.keys(errors).length > 0 && (
          <p className="text-center text-xs text-flag-red" role="alert">
            Merci de corriger les champs indiqués.
          </p>
        )}
        {sendError && <p className="text-center text-xs text-flag-red" role="alert">{sendError}</p>}
      </form>

        </div>

        <aside className="space-y-4">
          <div className="border border-hunter-800/10 bg-oat-50 p-5">
            <p className="flex items-center gap-2 font-display font-semibold text-hunter-900"><HelpCircle className="h-5 w-5 text-leather-600" /> Les demandes fréquentes</p>
            <div className="mt-4 space-y-3 text-sm">
              <Link to="/faq" className="focus-ring block text-ink-600 underline underline-offset-4 hover:text-hunter-900">Consulter les questions fréquentes</Link>
              <Link to="/suivi-commande" className="focus-ring block text-ink-600 underline underline-offset-4 hover:text-hunter-900">Suivre une commande</Link>
              <Link to="/livraison" className="focus-ring block text-ink-600 underline underline-offset-4 hover:text-hunter-900">Voir les délais de livraison</Link>
            </div>
          </div>
          <div className="border border-hunter-800/10 bg-hunter-900 p-5 text-oat-50">
            <MapPin className="h-5 w-5 text-straw-400" />
            <p className="mt-4 font-display font-semibold">Nutrition Équine</p>
            <p className="mt-1 text-sm text-oat-100/75">La Folie<br />28130 Maintenon, France</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <ContactInfoCard icon={Lock} title="Paiement sécurisé" detail="Visa, Mastercard et PayPal" />
            <ContactInfoCard icon={Truck} title="Livraison suivie" detail="France et Europe" />
            <ContactInfoCard icon={Zap} title="Conseil humain" detail="Une réponse adaptée au contexte" />
          </div>
        </aside>
      </div>
    </div>
  )
}
