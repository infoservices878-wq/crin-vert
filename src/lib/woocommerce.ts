import { apiConfigured, getCurrentAccount, getCustomerOrders, loginAccount, logoutAccount, registerAccount, StorefrontApiError, type ApiOrder } from './api'
import { PRODUCTS } from '../data/products'
import type { Product } from '../types'

export async function getProducts(): Promise<Product[]> { return PRODUCTS }
export async function getProductBySlug(slug: string): Promise<Product | undefined> { return PRODUCTS.find((product) => product.slug === slug) }

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

const SESSION_KEY = 'equinutrition-session-profile'

function rethrowApiError(error: unknown): never {
  if (error instanceof StorefrontApiError) throw new ApiError(error.message, error.status)
  throw error
}

/** Starts email verification. The customer can log in only after confirming their address. */
export async function registerCustomer(payload: RegisterCustomerPayload): Promise<void> {
  try {
    await registerAccount(payload)
  } catch (error) {
    rethrowApiError(error)
  }
}

export async function loginCustomer(email: string, password: string): Promise<CustomerSession> {
  if (!apiConfigured) throw new ApiError('La connexion est momentanément indisponible.', 503)
  try {
    const { user } = await loginAccount(email.trim(), password)
    const session: CustomerSession = user
    persistSession(session)
    return session
  } catch (error) {
    rethrowApiError(error)
  }
}

export async function refreshSession(): Promise<CustomerSession | null> {
  if (!apiConfigured) return null
  try {
    const { user } = await getCurrentAccount()
    const session: CustomerSession = user
    persistSession(session)
    return session
  } catch {
    localStorage.removeItem(SESSION_KEY)
    return null
  }
}

export function persistSession(session: CustomerSession) {
  // No credential is stored in the browser; this only avoids a visual flash on reload.
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
  void logoutAccount().catch(() => undefined)
}

export type CustomerOrder = ApiOrder

export async function getOrders(): Promise<CustomerOrder[]> {
  try {
    const { orders } = await getCustomerOrders()
    return orders
  } catch (error) {
    rethrowApiError(error)
  }
}

export const wooCommerceConfigured = apiConfigured
