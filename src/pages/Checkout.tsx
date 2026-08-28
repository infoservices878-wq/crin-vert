import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { StepperHeader } from '../components/checkout/StepperHeader'
import { OrderSummarySidebar } from '../components/checkout/OrderSummarySidebar'
import { StepInfo } from '../components/checkout/StepInfo'
import { StepAddress } from '../components/checkout/StepAddress'
import { StepDelivery } from '../components/checkout/StepDelivery'
import { StepPayment } from '../components/checkout/StepPayment'

const FREE_SHIPPING_THRESHOLD = 79

export interface CheckoutData {
  firstName: string
  lastName: string
  email: string
  password: string
  dataConsent: boolean
  newsletter: boolean
  acceptTerms: boolean
  address: {
    line1: string
    line2: string
    postalCode: string
    city: string
    country: string
    phone: string
  }
}

const initialData: CheckoutData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  dataConsent: false,
  newsletter: false,
  acceptTerms: false,
  address: { line1: '', line2: '', postalCode: '', city: '', country: 'France', phone: '' },
}

export function Checkout() {
  const { items, total, clear } = useCart()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [data, setData] = useState<CheckoutData>(initialData)
  const [carrier, setCarrier] = useState('')
  const [shippingCost, setShippingCost] = useState<number | null>(null)

  const freeShippingUnlocked = total >= FREE_SHIPPING_THRESHOLD

  if (items.length === 0) {
    return <Navigate to="/panier" replace />
  }

  const update = (patch: Partial<CheckoutData>) => setData((d) => ({ ...d, ...patch }))

  return (
    <div>
      <StepperHeader current={step} />

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 md:grid-cols-[1fr_320px]">
          <div>
            {step === 1 && <StepInfo data={data} onUpdate={update} onNext={() => setStep(2)} />}
            {step === 2 && (
              <StepAddress
                data={data}
                onUpdate={update}
                onNext={() => setStep(3)}
                onBack={() => setStep(1)}
              />
            )}
            {step === 3 && (
              <StepDelivery
                freeShippingUnlocked={freeShippingUnlocked}
                selected={carrier}
                onSelect={(id, price) => {
                  setCarrier(id)
                  setShippingCost(price)
                }}
                onNext={() => setStep(4)}
                onBack={() => setStep(2)}
              />
            )}
            {step === 4 && (
              <StepPayment
                total={total + (shippingCost ?? 0)}
                onBack={() => setStep(3)}
                onConfirm={() => {
                  const orderId = `CV-${Date.now().toString().slice(-6)}`
                  const itemCount = items.reduce((n, i) => n + i.qty, 0)
                  const orderTotal = total + (shippingCost ?? 0)
                  const email = data.email
                  clear()
                  navigate('/commande-confirmee', {
                    state: { orderId, email, total: orderTotal, itemCount },
                    replace: true,
                  })
                }}
              />
            )}

            <p className="mt-6 text-center text-xs text-ink-600">
              <Link to="/panier" className="focus-ring underline hover:text-hunter-900">
                Retour au panier
              </Link>
            </p>
          </div>

          <OrderSummarySidebar subtotal={total} shipping={shippingCost} />
        </div>
      </div>
    </div>
  )
}
