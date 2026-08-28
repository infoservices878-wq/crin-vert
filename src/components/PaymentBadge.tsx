/**
 * Logos moyens de paiement (SVG) — style pastilles colorées type e-commerce.
 */
import type { ReactElement } from 'react'

type PaymentId = 'mastercard' | 'visa' | 'paypal' | 'cb' | 'orange' | 'amex'

const PAYMENTS: {
  id: PaymentId
  label: string
  bg: string
  Logo: () => ReactElement
}[] = [
  {
    id: 'mastercard',
    label: 'Mastercard',
    bg: 'bg-white',
    Logo: () => (
      <svg viewBox="0 0 48 32" className="h-6 w-9" aria-hidden="true">
        <circle cx="18" cy="16" r="10" fill="#EB001B" />
        <circle cx="30" cy="16" r="10" fill="#F79E1B" />
        <path
          d="M24 8.2a10 10 0 0 1 0 15.6 10 10 0 0 1 0-15.6z"
          fill="#FF5F00"
        />
      </svg>
    ),
  },
  {
    id: 'visa',
    label: 'Visa',
    bg: 'bg-white',
    Logo: () => (
      <svg viewBox="0 0 48 32" className="h-5 w-10" aria-hidden="true">
        <text
          x="24"
          y="21"
          textAnchor="middle"
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight="800"
          fontStyle="italic"
          fontSize="14"
          fill="#1A1F71"
          letterSpacing="-0.5"
        >
          VISA
        </text>
      </svg>
    ),
  },
  {
    id: 'paypal',
    label: 'PayPal',
    bg: 'bg-white',
    Logo: () => (
      <svg viewBox="0 0 48 32" className="h-6 w-9" aria-hidden="true">
        <text
          x="14"
          y="21"
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight="700"
          fontSize="16"
          fill="#003087"
        >
          P
        </text>
        <text
          x="24"
          y="21"
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight="700"
          fontSize="16"
          fill="#009CDE"
        >
          P
        </text>
      </svg>
    ),
  },
  {
    id: 'cb',
    label: 'Carte Bancaire',
    bg: 'bg-[#1a1a1a]',
    Logo: () => (
      <svg viewBox="0 0 48 32" className="h-5 w-9" aria-hidden="true">
        {/* CB monogram stylisé */}
        <rect x="6" y="8" width="16" height="16" rx="2" fill="#fff" />
        <rect x="26" y="8" width="16" height="16" rx="2" fill="#fff" />
        <text
          x="14"
          y="20"
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontWeight="800"
          fontSize="11"
          fill="#1a1a1a"
        >
          C
        </text>
        <text
          x="34"
          y="20"
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontWeight="800"
          fontSize="11"
          fill="#1a1a1a"
        >
          B
        </text>
      </svg>
    ),
  },
  {
    id: 'orange',
    label: 'Orange Bank / OPay',
    bg: 'bg-[#5B2EFF]',
    Logo: () => (
      <svg viewBox="0 0 56 32" className="h-5 w-12" aria-hidden="true">
        <circle cx="12" cy="16" r="7" fill="none" stroke="#fff" strokeWidth="2.2" />
        <text
          x="24"
          y="21"
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight="700"
          fontSize="13"
          fill="#fff"
        >
          Pay
        </text>
      </svg>
    ),
  },
  {
    id: 'amex',
    label: 'American Express',
    bg: 'bg-[#006FCF]',
    Logo: () => (
      <svg viewBox="0 0 56 32" className="h-5 w-12" aria-hidden="true">
        <text
          x="28"
          y="20"
          textAnchor="middle"
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight="800"
          fontSize="11"
          fill="#fff"
          letterSpacing="0.5"
        >
          AMEX
        </text>
      </svg>
    ),
  },
]

/** Une pastille paiement */
export function PaymentBadge({
  id,
  className = '',
}: {
  id?: PaymentId
  label?: string
  className?: string
}) {
  const item = PAYMENTS.find((p) => p.id === id) ?? PAYMENTS[0]
  return (
    <span
      className={`inline-flex h-9 min-w-[3.25rem] items-center justify-center rounded-sm px-1.5 shadow-sm ${item.bg} ${className}`}
      title={item.label}
      role="img"
      aria-label={item.label}
    >
      <item.Logo />
    </span>
  )
}

/** Rangée complète des moyens de paiement (pied de page) */
export function PaymentMethodsRow({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`} aria-label="Moyens de paiement acceptés">
      {PAYMENTS.map((p) => (
        <PaymentBadge key={p.id} id={p.id} />
      ))}
    </div>
  )
}
