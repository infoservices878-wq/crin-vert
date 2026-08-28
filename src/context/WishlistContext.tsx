import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Product } from '../types'
import { PRODUCTS } from '../data/products'

const STORAGE_KEY = 'crin-vert-wishlist'

interface WishlistContextValue {
  ids: string[]
  count: number
  isWishlisted: (productId: string) => boolean
  toggle: (product: Product) => void
  remove: (productId: string) => void
  products: Product[]
  clear: () => void
}

const WishlistContext = createContext<WishlistContextValue | null>(null)

function loadIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as string[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>(() =>
    typeof window !== 'undefined' ? loadIds() : [],
  )

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
  }, [ids])

  const isWishlisted = useCallback((productId: string) => ids.includes(productId), [ids])

  const toggle = useCallback((product: Product) => {
    setIds((prev) =>
      prev.includes(product.id) ? prev.filter((id) => id !== product.id) : [...prev, product.id],
    )
  }, [])

  const remove = useCallback((productId: string) => {
    setIds((prev) => prev.filter((id) => id !== productId))
  }, [])

  const clear = useCallback(() => setIds([]), [])

  const products = useMemo(
    () => ids.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean) as Product[],
    [ids],
  )

  const value = useMemo(
    () => ({
      ids,
      count: ids.length,
      isWishlisted,
      toggle,
      remove,
      products,
      clear,
    }),
    [ids, isWishlisted, toggle, remove, products, clear],
  )

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}
