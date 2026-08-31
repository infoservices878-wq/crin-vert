import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Plus, Minus, Check, Heart } from 'lucide-react'
import { Stars } from '../components/Stars'
import type { Product } from '../types'
import { CATEGORY_LABELS } from '../types'
import { getProductBySlug } from '../lib/woocommerce'
import { ProductGallery } from '../components/ProductGallery'
import { Breadcrumb } from '../components/Breadcrumb'
import { StickyMobileCta } from '../components/StickyMobileCta'
import { CompositionLabel } from '../components/CompositionLabel'
import { NutritionAnalysisPanel } from '../components/NutritionAnalysisPanel'
import { Accordion } from '../components/Accordion'
import { AiVetBanner } from '../components/AiVetBanner'
import { SizeSelector } from '../components/SizeSelector'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { useWishlist } from '../context/WishlistContext'
import { ProductDetailSkeleton } from '../components/Skeleton'
import { EmptyState } from '../components/EmptyState'
import { ShippingReturnsBlock } from '../components/ShippingReturnsBlock'
import { MadeInFranceBadge } from '../components/MadeInFranceBadge'
import { ProductReviews } from '../components/ProductReviews'
import { usePageMeta } from '../hooks/usePageMeta'

/**
 * Extrait le nombre de sacs de la chaîne de taille.
 * Ex: "6 sacs de 20 kg" → 6
 * Ex: "1 palette – 50 sacs de 20 kg" → 50
 */
function extractSizeMultiplier(sizeString: string): number {
  // Si c'est une palette, extraire le nombre de sacs après "sacs"
  if (sizeString.includes('palette')) {
    const match = sizeString.match(/(\d+)\s*sacs/)
    if (match) {
      return parseInt(match[1], 10)
    }
  }
  
  // Sinon, extraire le premier nombre
  const match = sizeString.match(/^(\d+)/)
  return match ? parseInt(match[1], 10) : 1
}

/**
 * Calcule le prix ajusté en fonction de la taille sélectionnée.
 * Compare la taille sélectionnée avec la taille de base du format.
 * Applique une réduction de 35% pour les palettes.
 */
function calculateAdjustedPrice(
  basePrice: number,
  format: string,
  selectedSize: string
): number {
  const baseMultiplier = extractSizeMultiplier(format)
  const selectedMultiplier = extractSizeMultiplier(selectedSize)
  let price = (basePrice * selectedMultiplier) / baseMultiplier
  
  // Appliquer la réduction de 35% si c'est une palette
  if (selectedSize.includes('palette')) {
    price = price * 0.65 // -35% = ×0.65
  }
  
  return price
}

export function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [product, setProduct] = useState<Product | null | undefined>(undefined)
  const { addItem } = useCart()
  const { toast } = useToast()
  const { isWishlisted, toggle: toggleWish } = useWishlist()
  const [added, setAdded] = useState(false)
  const [size, setSize] = useState<string>('')
  const [qty, setQty] = useState(1)

  usePageMeta(
    product?.name,
    product
      ? `${product.name} — ${product.tagline}. ${(product.description || "").slice(0, 120)}…`
      : undefined,
  )

  useEffect(() => {
    let active = true
    if (!slug) return
    getProductBySlug(slug).then((p) => {
      if (active) {
        setProduct(p ?? null)
        setSize(p?.sizes[0] ?? '')
        setQty(1)
      }
    })
    return () => {
      active = false
    }
  }, [slug])

  if (product === undefined) {
    return <ProductDetailSkeleton />
  }

  if (product === null) {
    return (
      <EmptyState
        icon="package"
        title="Produit introuvable"
        description="Ce produit n’existe pas ou n’est plus disponible."
        actionLabel="Retour au catalogue"
        actionTo="/catalogue"
      />
    )
  }

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      addItem(product, size)
    }
    setAdded(true)
    toast(
      qty > 1
        ? `${qty} × ${product.name} ajoutés au panier`
        : `${product.name} ajouté au panier`,
      'success',
    )
    setTimeout(() => setAdded(false), 1600)
  }

  return (
    <>
      {/* pb-24 : place pour la barre sticky mobile */}
      <div className="mx-auto max-w-6xl px-4 py-10 pb-28 sm:px-6 md:pb-10">
        <Breadcrumb
          items={[
            { label: 'Accueil', to: '/' },
            { label: CATEGORY_LABELS[product.category], to: `/catalogue?categorie=${product.category}` },
            { label: product.name },
          ]}
        />
        <div className="mt-4 grid gap-10 md:grid-cols-2">
          {/* Galerie */}
          <div className="relative">
            <ProductGallery product={product} priority />
            <button
              type="button"
              onClick={() => {
                const was = isWishlisted(product.id)
                toggleWish(product)
                toast(was ? 'Retiré des favoris' : 'Ajouté aux favoris', 'info')
              }}
              className="focus-ring absolute left-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-oat-50/95 shadow-md md:left-auto md:right-3"
              aria-label={
                isWishlisted(product.id) ? 'Retirer des favoris' : 'Ajouter aux favoris'
              }
            >
              <Heart
                className={`h-5 w-5 ${
                  isWishlisted(product.id)
                    ? 'fill-leather-600 text-leather-600'
                    : 'text-hunter-800'
                }`}
                strokeWidth={1.75}
              />
            </button>
          </div>

          {/* Infos produit */}
          <div>
            <p className="font-mono text-xs text-ink-600">Réf. {product.sku}</p>
            <h1 className="mt-1 font-display text-3xl font-bold text-hunter-900">
              {product.name}
            </h1>
            <p className="mt-1 text-ink-600">{product.tagline}</p>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-ink-600">
              <Stars value={product.rating} size="md" />
              <span className="font-mono font-semibold text-hunter-900">
                {product.rating.toFixed(1)}
              </span>
              <span>/ 5 — {product.reviewCount} avis</span>
            </div>

            <div className="mt-4 flex items-baseline gap-2 font-mono">
              <span className="text-2xl font-semibold text-hunter-900">
                {calculateAdjustedPrice(product.price, product.format, size).toFixed(2)} €
              </span>
              {product.compareAtPrice && (
                <span className="text-base text-ink-600 line-through">
                  {calculateAdjustedPrice(product.compareAtPrice, product.format, size).toFixed(2)} €
                </span>
              )}
            </div>

            <div className="mt-5 space-y-3">
              <SizeSelector sizes={product.sizes} selected={size} onSelect={setSize} />

              <Accordion
                items={[
                  {
                    id: 'plus',
                    title: 'En savoir plus',
                    content: (
                      <div>
                        <p className="whitespace-pre-line text-sm leading-relaxed text-ink-900">
                          {product.description}
                        </p>
                        {product.benefits.length > 0 && (
                          <ul className="mt-3 space-y-1.5">
                            {product.benefits.map((b) => (
                              <li key={b} className="flex items-center gap-2 text-sm text-ink-900">
                                <Check className="h-4 w-4 shrink-0 text-hunter-800" strokeWidth={2.5} />
                                {b}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ),
                  },
                  {
                    id: 'usage',
                    title: "Conseils d'utilisation",
                    content: (
                      <p className="whitespace-pre-line text-sm leading-relaxed text-ink-900">
                        {product.posologie || 'Non renseigné.'}
                      </p>
                    ),
                  },
                  {
                    id: 'composition',
                    title: product.nutritionAnalysis
                      ? 'Analyse nutritionnelle'
                      : 'Composition',
                    content: product.nutritionAnalysis ? (
                      <NutritionAnalysisPanel
                        analysis={product.nutritionAnalysis}
                        posologie={product.posologie}
                      />
                    ) : product.composition.length > 0 ? (
                      <CompositionLabel items={product.composition} posologie={product.posologie} />
                    ) : (
                      <p className="text-sm text-ink-600">Non renseigné.</p>
                    ),
                  },
                ]}
              />
            </div>

            <div className="mt-5">
              <AiVetBanner product={product} />
            </div>

            <div className="mt-5 space-y-5">
              {/* Quantité + CTA desktop */}
              <div className="flex flex-wrap items-stretch gap-3">
                <div className="flex items-center border border-hunter-800/20 bg-oat-50">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="focus-ring px-3 py-3 text-hunter-900 hover:bg-oat-200"
                    aria-label="Diminuer la quantité"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="min-w-[2.5rem] text-center font-mono text-base font-semibold text-hunter-900">
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty((q) => q + 1)}
                    className="focus-ring px-3 py-3 text-hunter-900 hover:bg-oat-200"
                    aria-label="Augmenter la quantité"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAdd}
                  className="focus-ring btn-primary hidden min-w-[12rem] flex-1 md:inline-flex"
                >
                  {added ? (
                    <>
                      <Check className="h-4 w-4" strokeWidth={2.5} /> Ajouté au panier
                    </>
                  ) : (
                    <>Ajouter au panier</>
                  )}
                </button>
              </div>

              <p className="flex items-center gap-1.5 text-sm text-leather-600">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-leather-600" />
                Disponible
              </p>

              <div className="mt-4">
                <MadeInFranceBadge />
              </div>

              <ShippingReturnsBlock price={calculateAdjustedPrice(product.price, product.format, size)} />
            </div>
          </div>
        </div>

        

        <ProductReviews product={product} />
      </div>

      <StickyMobileCta />
    </>
  )
}
