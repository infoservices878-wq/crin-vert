import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { Product } from '../types'

interface CartItem {
  product: Product
  qty: number
  /** Conditionnement choisi (ex. "Seau 3 kg") */
  size: string
  /** Prix unitaire ajusté selon le conditionnement */
  pricePerUnit: number
}

interface CartContextValue {
  items: CartItem[]
  isOpen: boolean
  count: number
  total: number
  addItem: (product: Product, size?: string, pricePerUnit?: number) => void
  removeItem: (productId: string, size: string) => void
  updateQty: (productId: string, size: string, qty: number) => void
  clear: () => void
  setOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextValue | null>(null)


export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const addItem = (product: Product, size?: string, pricePerUnit?: number) => {
    const chosen = size || product.sizes[0] || product.format
    const price = pricePerUnit ?? product.price
    
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && i.size === chosen,
      )
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.size === chosen
            ? { ...i, qty: i.qty + 1 }
            : i,
        )
      }
      return [...prev, { product, qty: 1, size: chosen, pricePerUnit: price }]
    })
    // Ne pas ouvrir le tiroir : l'ajout se fait en silence
  }

  const removeItem = (productId: string, size: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.product.id === productId && i.size === size)),
    )
  }

  const updateQty = (productId: string, size: string, qty: number) => {
    if (qty <= 0) {
      removeItem(productId, size)
      return
    }
    setItems((prev) =>
      prev.map((i) =>
        i.product.id === productId && i.size === size ? { ...i, qty } : i,
      ),
    )
  }

  const clear = () => setItems([])

  const count = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items])
  const total = useMemo(
    () => items.reduce((sum, i) => sum + i.qty * i.pricePerUnit, 0),
    [items],
  )

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        count,
        total,
        addItem,
        removeItem,
        updateQty,
        clear,
        setOpen: setIsOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart doit être utilisé à l'intérieur de <CartProvider>")
  return ctx
}

// Export for type usage elsewhere
export type { CartItem }
