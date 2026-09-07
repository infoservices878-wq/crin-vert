import { API_URL as DEFAULT_API_URL } from '../config/site'

/**
 * Public storefront API client.
 *
 * This browser application must only ever use public endpoints. WooCommerce
 * consumer keys, payment-provider secrets and SMTP credentials belong on the
 * server at boutique.equinutrition.fr, never in a VITE_ variable.
 */
const API_URL = ((import.meta.env.VITE_API_URL as string | undefined) || DEFAULT_API_URL).replace(/\/$/, '')
const REQUEST_TIMEOUT_MS = 20_000

export const apiConfigured = Boolean(API_URL)

export class StorefrontApiError extends Error {
  status?: number
  constructor(message: string, status?: number) {
    super(message)
    this.status = status
  }
}

async function request<T>(path: string, init: RequestInit): Promise<T> {
  if (!API_URL) {
    throw new StorefrontApiError('La boutique est en cours de configuration. Merci de réessayer bientôt.')
  }
  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
  let response: Response

  try {
    response = await fetch(`${API_URL}${path}`, {
      ...init,
      credentials: 'include',
      headers: { ...(init.body ? { 'Content-Type': 'application/json' } : {}), ...init.headers },
      signal: controller.signal,
    })
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new StorefrontApiError('Le serveur met trop de temps à répondre. Vérifiez votre connexion puis réessayez.')
    }
    throw new StorefrontApiError('La boutique est momentanément inaccessible. Réessayez dans quelques instants.')
  } finally {
    window.clearTimeout(timeout)
  }
  const body = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new StorefrontApiError(body.message || 'Une erreur est survenue. Réessayez dans quelques instants.', response.status)
  }
  return body as T
}

export interface ApiCustomer {
  id: number
  email: string
  firstName: string
  lastName: string
  accountType: 'particulier' | 'professionnel'
  address?: ApiAddress
}

export interface ApiAddress {
  line1: string
  line2: string
  postalCode: string
  city: string
  country: string
  phone: string
}

export interface ApiOrder {
  id: number
  reference: string
  status: string
  total: string
  date: string
}

export interface RegisterAccountPayload {
  email: string
  password: string
  firstName: string
  lastName: string
  accountType: 'particulier' | 'professionnel'
  company?: string
  vat?: string
  newsletter?: boolean
}

export function registerAccount(payload: RegisterAccountPayload) {
  return request<{ success: true; verification_required: true; message: string }>('/v1/auth/register', {
    method: 'POST', body: JSON.stringify(payload),
  })
}

export function loginAccount(email: string, password: string) {
  return request<{ success: true; user: ApiCustomer }>('/v1/auth/login', {
    method: 'POST', body: JSON.stringify({ email, password }),
  })
}

export function logoutAccount() {
  return request<{ success: true }>('/v1/auth/logout', { method: 'POST' })
}

export function getCurrentAccount() {
  return request<{ success: true; user: ApiCustomer }>('/v1/auth/me', { method: 'GET' })
}

export function getCustomerOrders() {
  return request<{ orders: ApiOrder[] }>('/v1/auth/orders', { method: 'GET' })
}

export function verifyEmail(key: string, email: string) {
  return request<{ success: true; message: string }>('/v1/auth/verify-email', {
    method: 'POST', body: JSON.stringify({ key, email }),
  })
}

export function resetPassword(key: string, login: string, password: string) {
  return request<{ success: true }>('/v1/auth/reset-password', {
    method: 'POST', body: JSON.stringify({ key, login, password }),
  })
}

export function sendContactMessage(payload: { name: string; email: string; phone?: string; subject: string; message: string }) {
  return request<{ id: string }>('/v1/contact', { method: 'POST', body: JSON.stringify(payload) })
}

export function sendHorseAssessment(payload: Record<string, unknown>) {
  return request<{ id: string }>('/v1/assessments', { method: 'POST', body: JSON.stringify(payload) })
}

export interface CheckoutPayload {
  customer: { firstName: string; lastName: string; email: string; newsletter: boolean }
  shippingAddress: { line1: string; line2: string; postalCode: string; city: string; country: string; phone: string }
  shippingMethod: string
  items: { productId: string; name: string; variation: string; price: number; quantity: number }[]
}

export function createCheckout(payload: CheckoutPayload) {
  return request<{ checkoutUrl: string; orderId: number; reference: string; customerEmailSent: boolean }>('/v1/checkout', {
    method: 'POST', body: JSON.stringify(payload),
  })
}

export interface OrderConfirmation {
  reference: string
  status: string
  items: { name: string; quantity: number; total: number }[]
  subtotal: number
  shipping: number
  total: number
  currency: string
  customerEmailSent: boolean
}

export function getOrderConfirmation(token: string) {
  return request<OrderConfirmation>(`/v1/orders/confirmation?token=${encodeURIComponent(token)}`, { method: 'GET' })
}

export function lookupOrder(orderNumber: string, email: string) {
  return request<{ orderNumber: string; status: string; trackingUrl?: string; shippedAt?: string }>(
    '/v1/orders/lookup',
    { method: 'POST', body: JSON.stringify({ orderNumber, email }) },
  )
}
