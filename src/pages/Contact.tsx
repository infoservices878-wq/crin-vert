import { useState, type FormEvent } from 'react'
import { Mail, Phone, MapPin, Lock, Truck, Zap, Check } from 'lucide-react'
import { ContactInfoCard } from '../components/ContactInfoCard'
import {
  contactSchema,
  parseForm,
  inputErrorClass,
  type FieldErrors,
} from '../lib/validation'

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

  const clear = (key: string) =>
    setErrors((prev) => {
      if (!prev[key]) return prev
      const n = { ...prev }
      delete n[key]
      return n
    })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const result = parseForm(contactSchema, { name, email, phone, subject, message })
    if (!result.success) {
      setErrors(result.errors)
      setSent(false)
      return
    }
    setErrors({})
    setSent(true)
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6">
      <p className="text-center font-display text-xs font-bold uppercase tracking-[0.2em] text-ink-600">
        Contact
      </p>
      <h1 className="mt-2 text-center font-display text-4xl font-extrabold text-hunter-900">
        Nous contacter
      </h1>
      <p className="mt-4 text-center text-ink-600">
        Une question sur nos produits, un conseil personnalisé pour votre cheval ? Notre équipe est
        à votre écoute.
      </p>

      <div className="mt-10 space-y-4">
        <ContactInfoCard icon={Mail} title="Email" detail="service.clients@nutrition-equine.example" />
        <ContactInfoCard icon={Phone} title="Téléphone" detail="+33 1 23 45 67 89" />
        <ContactInfoCard icon={MapPin} title="Adresse" detail="France" />
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
          {sent ? (
            <>
              <Check className="h-4 w-4" strokeWidth={2.5} /> Message envoyé
            </>
          ) : (
            'Envoyer le message'
          )}
        </button>
        {sent && (
          <p className="text-center text-xs text-ink-600">
            Formulaire de démonstration — aucun message n’est réellement envoyé.
          </p>
        )}
        {!sent && Object.keys(errors).length > 0 && (
          <p className="text-center text-xs text-flag-red" role="alert">
            Merci de corriger les champs indiqués.
          </p>
        )}
      </form>

      <div className="mt-10 space-y-4">
        <ContactInfoCard
          icon={Lock}
          title="Paiement sécurisé"
          detail="Visa, Mastercard, Amex, Paypal, Maestro"
        />
        <ContactInfoCard
          icon={Truck}
          title="Livraison offerte"
          detail="À partir de 79 € d'achat en France métropolitaine"
        />
        <ContactInfoCard icon={Zap} title="Livraison rapide" detail="Partout en France et en Europe" />
      </div>
    </div>
  )
}
