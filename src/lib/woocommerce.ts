import type { Product, Category } from '../types'
import { PRODUCTS } from '../data/products'

// --- Connexion à un backend WooCommerce (optionnel) -----------------------
// Renseigne ces variables dans .env (voir .env.example).
// Sans elles : mode démo (localStorage pour les comptes).

const WC_URL = import.meta.env.VITE_WC_URL as string | undefined
const WC_KEY = import.meta.env.VITE_WC_CONSUMER_KEY as string | undefined
const WC_SECRET = import.meta.env.VITE_WC_CONSUMER_SECRET as string | undefined
/** Optionnel — endpoint JWT (plugin JWT Authentication for WP-API) */
const JWT_ENDPOINT =
  (import.meta.env.VITE_WC_JWT_ENDPOINT as string | undefined) ||
  (WC_URL ? `${WC_URL}/wp-json/jwt-auth/v1/token` : undefined)

const isConfigured = Boolean(WC_URL && WC_KEY && WC_SECRET)

function authHeader(): HeadersInit {
  return { Authorization: `Basic ${btoa(`${WC_KEY}:${WC_SECRET}`)}` }
}

function mapCategory(wcCategorySlug: string | undefined): Category {
  const known: Category[] = [
    'alimentation',
    'digestion',
    'articulations',
    'respiration',
    'recuperation',
    'senior',
    'sabots',
    'robe-peau',
    'stress',
    'electrolytes',
    'aliments',
  ]
  if (wcCategorySlug && known.includes(wcCategorySlug as Category)) {
    return wcCategorySlug as Category
  }
  return (wcCategorySlug || 'alimentation') as Category
}

function htmlToText(html: string | undefined): string {
  if (!html) return ''
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<li[^>]*>/gi, '• ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&eacute;/g, 'é')
    .replace(/&Eacute;/g, 'É')
    .replace(/&egrave;/g, 'è')
    .replace(/&agrave;/g, 'à')
    .replace(/&acirc;/g, 'â')
    .replace(/&ocirc;/g, 'ô')
    .replace(/&ucirc;/g, 'û')
    .replace(/&ccedil;/g, 'ç')
    .replace(/&euro;/g, '€')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function attrOptions(wc: any, ...nameParts: string[]): string[] {
  const attrs: any[] = wc.attributes || []
  const found = attrs.find((a) => {
    const n = `${a.name || ''} ${a.slug || ''}`.toLowerCase()
    return nameParts.some((part) => n.includes(part.toLowerCase()))
  })
  if (!found) return []
  const opts = found.options
  if (Array.isArray(opts)) return opts.map(String).filter(Boolean)
  if (typeof opts === 'string') return opts.split('|').map((s: string) => s.trim()).filter(Boolean)
  return []
}

function attrOrMeta(wc: any, meta: (k: string) => any, ...keys: string[]): string {
  for (const k of keys) {
    const fromAttr = attrOptions(wc, k)
    if (fromAttr.length) return fromAttr.join('\n')
    const m = meta(k) ?? meta(`_${k}`)
    if (m != null && String(m).trim()) return String(m)
  }
  return ''
}

function mapWooCommerceProduct(wc: any): Product {
  const meta = (key: string) => wc.meta_data?.find((m: any) => m.key === key)?.value

  const sizeOpts = attrOptions(wc, 'conditionnement', 'size', 'taille', 'format', 'poids', 'packaging')
  const metaSizes = meta('sizes')
    ? String(meta('sizes')).split('|').map((s: string) => s.trim())
    : []
  const sizes =
    sizeOpts.length > 0
      ? sizeOpts
      : metaSizes.length > 0
        ? metaSizes
        : [meta('format') || (wc.weight ? `${wc.weight} ${wc.weight_unit || 'kg'}` : 'Standard')].filter(Boolean)

  let composition: { label: string; value: string }[] = []
  const compMeta = meta('composition')
  if (compMeta) {
    try {
      composition = typeof compMeta === 'string' ? JSON.parse(compMeta) : compMeta
    } catch {
      composition = [{ label: 'Composition', value: htmlToText(String(compMeta)) }]
    }
  }
  if (!composition.length) {
    const compText = attrOrMeta(wc, meta, 'composition', 'ingredients', 'constituants')
    if (compText) {
      composition = compText.split(/\n+/).filter(Boolean).map((line: string) => {
        const parts = line.split(/[:|–—-]/)
        if (parts.length >= 2) {
          return { label: parts[0].trim(), value: parts.slice(1).join(':').trim() }
        }
        return { label: '', value: line.trim() }
      })
    }
  }

  const posologie =
    attrOrMeta(wc, meta, 'posologie', 'conseils', 'utilisation', 'mode-emploi', 'dosage') || ''

  const benefitsRaw = meta('benefits')
  const benefits = benefitsRaw
    ? String(benefitsRaw).split('|').map((s: string) => s.trim()).filter(Boolean)
    : []

  const shortHtml = wc.short_description || ''
  const longHtml = wc.description || ''

  return {
    id: String(wc.id),
    slug: wc.slug,
    sku: wc.sku || `CV-${wc.id}`,
    name: htmlToText(wc.name) || wc.name,
    category: mapCategory(wc.categories?.[0]?.slug),
    categoryLabel: wc.categories?.[0]?.name || undefined,
    tagline: htmlToText(shortHtml),
    price: Number(wc.price) || 0,
    compareAtPrice:
      wc.regular_price && String(wc.regular_price) !== String(wc.price)
        ? Number(wc.regular_price)
        : undefined,
    rating: Number(wc.average_rating) || 0,
    reviewCount: wc.rating_count || 0,
    format: sizes[0] || '—',
    sizes,
    description: htmlToText(longHtml) || htmlToText(shortHtml),
    descriptionHtml: longHtml || shortHtml,
    benefits,
    composition,
    posologie: htmlToText(posologie) || posologie,
    image: wc.images?.[0]?.src || '',
    images: (wc.images || []).map((img: any) => img.src).filter(Boolean),
  }
}

export async function getProducts(): Promise<Product[]> {
  if (!isConfigured) return PRODUCTS

  const res = await fetch(`${WC_URL}/wp-json/wc/v3/products?per_page=100&status=publish`, {
    headers: { ...authHeader() },
  })
  if (!res.ok) {
    console.warn('WooCommerce API indisponible, utilisation des données de démo.')
    return PRODUCTS
  }
  const data = await res.json()
  return data.map(mapWooCommerceProduct)
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getProducts()
  return products.find((p) => p.slug === slug)
}

export const wooCommerceConfigured = isConfigured

// —— Comptes clients ——————————————————————————————————————

export type CustomerAccountType = 'particulier' | 'professionnel'

export interface RegisterCustomerPayload {
  email: string
  password: string
  firstName: string
  lastName: string
  accountType: CustomerAccountType
  company?: string
  vat?: string
  newsletter?: boolean
}

export interface CustomerSession {
  id: number | string
  email: string
  firstName: string
  lastName: string
  accountType: CustomerAccountType
  /** Présent si JWT branché */
  token?: string
  /** true = stocké localement (mode démo) */
  demo: boolean
}

export class ApiError extends Error {
  status?: number
  code?: string
  constructor(message: string, status?: number, code?: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
  }
}

const DEMO_ACCOUNTS_KEY = 'crin-vert-demo-accounts'
const SESSION_KEY = 'crin-vert-session'

interface DemoAccount {
  id: string
  email: string
  password: string
  firstName: string
  lastName: string
  accountType: CustomerAccountType
  company?: string
  vat?: string
  newsletter?: boolean
  createdAt: string
}

function readDemoAccounts(): DemoAccount[] {
  try {
    const raw = localStorage.getItem(DEMO_ACCOUNTS_KEY)
    return raw ? (JSON.parse(raw) as DemoAccount[]) : []
  } catch {
    return []
  }
}

function writeDemoAccounts(list: DemoAccount[]) {
  localStorage.setItem(DEMO_ACCOUNTS_KEY, JSON.stringify(list))
}

function sessionFromDemo(acc: DemoAccount): CustomerSession {
  return {
    id: acc.id,
    email: acc.email,
    firstName: acc.firstName,
    lastName: acc.lastName,
    accountType: acc.accountType,
    demo: true,
  }
}

/** Crée un client WooCommerce (ou en local si API non configurée). */
export async function registerCustomer(
  payload: RegisterCustomerPayload,
): Promise<CustomerSession> {
  if (!isConfigured) {
    // —— Mode démo : localStorage ——————————————————————
    const accounts = readDemoAccounts()
    const email = payload.email.trim().toLowerCase()
    if (accounts.some((a) => a.email === email)) {
      throw new ApiError('Un compte existe déjà avec cette adresse e-mail.', 400, 'email_exists')
    }
    const account: DemoAccount = {
      id: `demo-${Date.now()}`,
      email,
      password: payload.password,
      firstName: payload.firstName.trim(),
      lastName: payload.lastName.trim(),
      accountType: payload.accountType,
      company: payload.company,
      vat: payload.vat,
      newsletter: payload.newsletter,
      createdAt: new Date().toISOString(),
    }
    accounts.push(account)
    writeDemoAccounts(accounts)
    const session = sessionFromDemo(account)
    persistSession(session)
    return session
  }

  // —— WooCommerce REST ————————————————————————————————
  const body: Record<string, unknown> = {
    email: payload.email.trim(),
    first_name: payload.firstName.trim(),
    last_name: payload.lastName.trim(),
    username: payload.email.trim(),
    password: payload.password,
    meta_data: [
      { key: 'account_type', value: payload.accountType },
      { key: 'newsletter', value: payload.newsletter ? '1' : '0' },
    ],
  }

  if (payload.accountType === 'professionnel') {
    body.billing = {
      company: payload.company?.trim() || '',
      email: payload.email.trim(),
      first_name: payload.firstName.trim(),
      last_name: payload.lastName.trim(),
    }
    ;(body.meta_data as { key: string; value: string }[]).push(
      { key: 'vat_number', value: payload.vat?.trim() || '' },
      { key: 'billing_vat', value: payload.vat?.trim() || '' },
    )
  }

  const res = await fetch(`${WC_URL}/wp-json/wc/v3/customers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeader(),
    },
    body: JSON.stringify(body),
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    const msg =
      data?.message ||
      (data?.code === 'registration-error-email-exists'
        ? 'Un compte existe déjà avec cette adresse e-mail.'
        : 'Impossible de créer le compte. Réessayez plus tard.')
    throw new ApiError(msg, res.status, data?.code)
  }

  const session: CustomerSession = {
    id: data.id,
    email: data.email,
    firstName: data.first_name || payload.firstName,
    lastName: data.last_name || payload.lastName,
    accountType: payload.accountType,
    demo: false,
  }
  persistSession(session)
  return session
}

/** Connexion : JWT si configuré, sinon comptes démo localStorage. */
export async function loginCustomer(
  email: string,
  password: string,
): Promise<CustomerSession> {
  const normalized = email.trim().toLowerCase()

  // JWT (plugin WordPress)
  if (JWT_ENDPOINT && isConfigured) {
    const res = await fetch(JWT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: email.trim(), password }),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      throw new ApiError(
        data?.message || 'Identifiants incorrects.',
        res.status,
        data?.code,
      )
    }
    const session: CustomerSession = {
      id: data.user_id ?? data.data?.user?.id ?? email,
      email: data.user_email || email,
      firstName: data.user_display_name?.split(' ')[0] || '',
      lastName: data.user_display_name?.split(' ').slice(1).join(' ') || '',
      accountType: 'particulier',
      token: data.token,
      demo: false,
    }
    persistSession(session)
    return session
  }

  // Mode démo
  if (!isConfigured) {
    const accounts = readDemoAccounts()
    const acc = accounts.find((a) => a.email === normalized && a.password === password)
    if (!acc) {
      throw new ApiError('E-mail ou mot de passe incorrect.', 401, 'invalid_credentials')
    }
    const session = sessionFromDemo(acc)
    persistSession(session)
    return session
  }

  // WC configuré mais pas de JWT : on ne peut pas authentifier côté client de façon sûre
  throw new ApiError(
    'Connexion API non configurée. Ajoutez le plugin JWT Authentication et VITE_WC_JWT_ENDPOINT, ou testez en mode démo (sans clés WC).',
    501,
    'auth_not_configured',
  )
}

export function persistSession(session: CustomerSession) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function loadSession(): CustomerSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    return raw ? (JSON.parse(raw) as CustomerSession) : null
  } catch {
    return null
  }
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY)
}
