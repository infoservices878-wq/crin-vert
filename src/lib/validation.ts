import { z } from 'zod'

/** Erreurs par champ (compatible UI) */
export type FieldErrors = Record<string, string>

const NAME_RE = /^[A-Za-zÀ-ÿ]+(?:[.]?\s+[A-Za-zÀ-ÿ]+)*$/
const PHONE_RE = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/
const POSTAL_RE = /^\d{5}$/

const nameField = (label: string) =>
  z
    .string()
    .trim()
    .min(1, { message: `${label} est obligatoire.` })
    .min(2, { message: `${label} est trop court.` })
    .regex(NAME_RE, {
      message: `${label} : seules les lettres et le point (.) suivi d’un espace sont autorisés.`,
    })

const emailField = z
  .string()
  .trim()
  .min(1, { message: 'L’e-mail est obligatoire.' })
  .email({ message: 'Adresse e-mail invalide.' })

const passwordField = z
  .string()
  .min(1, { message: 'Le mot de passe est obligatoire.' })
  .min(8, { message: 'Le mot de passe doit contenir au moins 8 caractères.' })

const phoneOptional = z
  .string()
  .trim()
  .refine((v) => v === '' || PHONE_RE.test(v), {
    message: 'Numéro de téléphone invalide (ex. 06 12 34 56 78).',
  })

const phoneRequired = z
  .string()
  .trim()
  .min(1, { message: 'Le téléphone est obligatoire.' })
  .regex(PHONE_RE, {
    message: 'Numéro de téléphone invalide (ex. 06 12 34 56 78).',
  })

const mustAccept = (message: string) =>
  z.boolean().refine((v) => v === true, { message })

// —— Schemas ————————————————————————————————————————————

export const loginSchema = z.object({
  email: emailField,
  password: passwordField,
})
export type LoginInput = z.infer<typeof loginSchema>

export const registerParticulierSchema = z.object({
  firstName: nameField('Le prénom'),
  lastName: nameField('Le nom'),
  email: emailField,
  password: passwordField,
  privacy: mustAccept('Veuillez accepter le message de confidentialité.'),
  terms: mustAccept('Veuillez accepter les conditions générales.'),
  newsletter: z.boolean().optional().default(false),
})

export const registerProfessionnelSchema = registerParticulierSchema.extend({
  company: z.string().trim().min(1, { message: 'La société est obligatoire.' }),
  vat: z
    .string()
    .trim()
    .min(1, { message: 'La TVA intracommunautaire est obligatoire.' })
    .refine(
      (v) => {
        const cleaned = v.replace(/\s/g, '')
        return cleaned.length >= 8 && cleaned.length <= 14
      },
      { message: 'Numéro de TVA invalide.' },
    ),
})

export const contactSchema = z.object({
  name: z.string().trim().min(1, { message: 'Le nom est obligatoire.' }),
  email: emailField,
  phone: phoneOptional,
  subject: z.string().trim().min(1, { message: 'Le sujet est obligatoire.' }),
  message: z
    .string()
    .trim()
    .min(1, { message: 'Le message est obligatoire.' })
    .min(10, { message: 'Le message doit contenir au moins 10 caractères.' }),
})
export type ContactInput = z.infer<typeof contactSchema>

export const checkoutInfoSchema = z.object({
  firstName: nameField('Le prénom'),
  lastName: nameField('Le nom'),
  email: emailField,
  acceptTerms: mustAccept('Veuillez accepter les conditions générales.'),
})

export const checkoutAddressSchema = z.object({
  line1: z.string().trim().min(1, { message: 'L’adresse est obligatoire.' }),
  line2: z.string().optional(),
  postalCode: z
    .string()
    .trim()
    .min(1, { message: 'Le code postal est obligatoire.' })
    .regex(POSTAL_RE, { message: 'Code postal invalide (5 chiffres).' }),
  city: z.string().trim().min(1, { message: 'La ville est obligatoire.' }),
  country: z.string().min(1),
  phone: phoneRequired,
})

// —— Helpers ————————————————————————————————————————————

export function zodToFieldErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {}
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? '_form')
    if (!out[key]) out[key] = issue.message
  }
  return out
}

export function parseForm<T extends z.ZodTypeAny>(
  schema: T,
  data: unknown,
):
  | { success: true; data: z.infer<T> }
  | { success: false; errors: FieldErrors } {
  const result = schema.safeParse(data)
  if (result.success) return { success: true, data: result.data }
  return { success: false, errors: zodToFieldErrors(result.error) }
}

export function inputErrorClass(hasError: boolean, base: string): string {
  return hasError
    ? `${base} border-flag-red focus:outline-flag-red`
    : base
}
