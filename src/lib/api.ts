/**
 * Public storefront API client.
 *
 * This browser application must only ever use public endpoints. WooCommerce
 * consumer keys, payment-provider secrets and SMTP credentials belong on the
 * server at boutique.nutrition-equine.com, never in a VITE_ variable.
 */
const API_URL = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '')

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
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init.headers },
  })
  const body = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new StorefrontApiError(body.message || 'Une erreur est survenue. Réessayez dans quelques instants.', response.status)
  }
  return body as T
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
  items: { productId: string; sku: string; variation: string; quantity: number }[]
  successUrl: string
  cancelUrl: string
}

export function createCheckout(payload: CheckoutPayload) {
  return request<{ checkoutUrl: string }>('/v1/checkout', { method: 'POST', body: JSON.stringify(payload) })
}

export function lookupOrder(orderNumber: string, email: string) {
  return request<{ orderNumber: string; status: string; trackingUrl?: string; shippedAt?: string }>(
    '/v1/orders/lookup',
    { method: 'POST', body: JSON.stringify({ orderNumber, email }) },
  )
}
