import { ShoppingCart } from 'lucide-react'
import type { Protocol } from '../types'
import { ProductIllustration } from './ProductIllustration'
import { PRODUCTS } from '../data/products'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { calculateAdjustedPrice } from '../lib/pricing'

export function ProtocolCard({ protocol }: { protocol: Protocol }) {
  const { addItem } = useCart()
  const { toast } = useToast()
  const protocolProducts = [...new Set(protocol.categories)]
    .map((category) => PRODUCTS.find((product) => product.category === category))
    .filter((product): product is NonNullable<typeof product> => Boolean(product))
  const protocolImageProducts = protocol.categories
    .map((category, index) => PRODUCTS.find(
      (product) => product.category === category && (
        index === 0 || !protocol.categories.slice(0, index).includes(product.category)
      ),
    ))
    .filter((product): product is NonNullable<typeof product> => Boolean(product))
  const imageProducts = [
    ...protocolImageProducts,
    ...PRODUCTS.filter(
      (product) => protocol.categories.includes(product.category) && !protocolImageProducts.includes(product),
    ),
  ].slice(0, 3)

    const handleAdd = () => {
    try {
      if (!protocol?.categories?.length) {
        toast('Protocole incomplet : aucune catégorie associée.', 'error')
        return
      }

      const products = protocolProducts

      if (products.length === 0) {
        toast(
          'Aucun produit disponible pour ce protocole. Réessayez plus tard.',
          'error',
        )
        return
      }

      products.forEach((p) => {
        const defaultSize = p.sizes[0] || p.format
        const adjustedPrice = calculateAdjustedPrice(p.price, p.format, defaultSize)
        addItem(p, defaultSize, adjustedPrice)
      })

      toast(
        products.length === 1
          ? `${products[0].name} ajouté au panier`
          : `${products.length} produits du protocole ajoutés au panier`,
        'success',
      )
    } catch (err) {
      console.error('[ProtocolCard] handleAdd', err)
      toast(
        "Impossible d'ajouter le protocole au panier. Veuillez réessayer.",
        'error',
      )
    }
  }
  return (
    <div className="flex flex-col rounded-lg border border-hunter-800/10 bg-oat-50 p-5">
      <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-hunter-900 px-3 py-1 font-display text-xs font-semibold text-oat-50">
        {protocol.duration}
      </span>

      <div className="flex gap-2">
        {imageProducts.map((product) => (
          <div key={product.id} className="w-1/3">
            <ProductIllustration product={product} compact />
          </div>
        ))}
      </div>

      <h3 className="mt-4 font-display text-lg font-bold text-hunter-900">{protocol.name}</h3>
      <p className="mt-1 text-sm text-ink-600">{protocol.description}</p>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-baseline gap-2 font-mono">
          <span className="text-sm text-ink-600 line-through">
            {protocol.compareAtPrice.toFixed(2)} €
          </span>
          <span className="text-xl font-semibold text-hunter-900">
            {protocol.price.toFixed(2)} €
          </span>
        </div>
        <button 
        className="focus-ring flex items-center gap-2 bg-leather-600 px-4 py-2 font-display text-sm font-semibold text-oat-50 transition-colors hover:bg-leather-500"
        onClick={handleAdd}
        >
          <ShoppingCart className="h-4 w-4" strokeWidth={2.25} />
          Ajouter
        </button>
      </div>
    </div>
  )
}
