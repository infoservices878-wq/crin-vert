import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { StepperHeader } from '../components/checkout/StepperHeader'
import { OrderSummarySidebar } from '../components/checkout/OrderSummarySidebar'
import { StepInfo } from '../components/checkout/StepInfo'
import { StepAddress } from '../components/checkout/StepAddress'
import { StepDelivery } from '../components/checkout/StepDelivery'
import { StepPayment } from '../components/checkout/StepPayment'
import { createCheckout } from '../lib/api'
import { countryCode } from '../data/countries'

const FREE_SHIPPING_THRESHOLD = 79

export interface CheckoutData {
  firstName: string
  lastName: string
  email: string
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
  dataConsent: false,
  newsletter: false,
  acceptTerms: false,
  address: { line1: '', line2: '', postalCode: '', city: '', country: 'France', phone: '' },
}

export function Checkout() {
  const { items, total, clear } = useCart()
  const [step, setStep] = useState(1)
  const [data, setData] = useState<CheckoutData>(initialData)
  const [carrier, setCarrier] = useState('')
  const [shippingCost, setShippingCost] = useState<number | null>(null)
  const [paymentError, setPaymentError] = useState('')

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
                error={paymentError}
                onConfirm={async () => {
                  setPaymentError('')
                  try {
                    const checkout = await createCheckout({
                      customer: { firstName: data.firstName, lastName: data.lastName, email: data.email, newsletter: data.newsletter },
                      shippingAddress: { ...data.address, country: countryCode(data.address.country) },
                      shippingMethod: carrier,
                      items: items.map((item) => ({ productId: item.product.id, name: item.product.name, variation: item.size, price: item.pricePerUnit, quantity: item.qty })),
                    })
                    clear()
                    window.location.assign(checkout.checkoutUrl)
                  } catch (reason) {
                    setPaymentError(reason instanceof Error ? reason.message : 'Le paiement n’a pas pu être initialisé.')
                  }
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
