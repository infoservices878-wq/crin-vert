import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'
import { WishlistProvider } from './context/WishlistContext'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { CartDrawer } from './components/CartDrawer'
import { AnnouncementBar } from './components/AnnouncementBar'
import { VirtualAssistant } from './components/VirtualAssistant'
import { CookieConsent } from './components/CookieConsent'
import { ScrollToTop } from './components/ScrollToTop'

const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })))
const Catalogue = lazy(() =>
  import('./pages/Catalogue').then((m) => ({ default: m.Catalogue })),
)
const ProductDetail = lazy(() =>
  import('./pages/ProductDetail').then((m) => ({ default: m.ProductDetail })),
)
const Contact = lazy(() => import('./pages/Contact').then((m) => ({ default: m.Contact })))
const Cart = lazy(() => import('./pages/Cart').then((m) => ({ default: m.Cart })))
const LegalPage = lazy(() =>
  import('./pages/LegalPage').then((m) => ({ default: m.LegalPage })),
)
const Checkout = lazy(() =>
  import('./pages/Checkout').then((m) => ({ default: m.Checkout })),
)
const Login = lazy(() => import('./pages/Login').then((m) => ({ default: m.Login })))
const Register = lazy(() =>
  import('./pages/Register').then((m) => ({ default: m.Register })),
)
const NotFound = lazy(() =>
  import('./pages/NotFound').then((m) => ({ default: m.NotFound })),
)
const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })))
const Wishlist = lazy(() =>
  import('./pages/Wishlist').then((m) => ({ default: m.Wishlist })),
)
const Account = lazy(() => import('./pages/Account').then((m) => ({ default: m.Account })))
const OrderConfirmation = lazy(() =>
  import('./pages/OrderConfirmation').then((m) => ({ default: m.OrderConfirmation })),
)

function PageFallback() {
  return (
    <div
      className="flex min-h-[40vh] items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-hunter-800 border-t-transparent" />
      <span className="sr-only">Chargement…</span>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <WishlistProvider>
          <CartProvider>
            <div className="flex min-h-screen flex-col">
              <ScrollToTop />
              <AnnouncementBar />
              <Header />
              <main className="flex-1">
                <Suspense fallback={<PageFallback />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/catalogue" element={<Catalogue />} />
                    <Route path="/produit/:slug" element={<ProductDetail />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/a-propos" element={<About />} />
                    <Route path="/panier" element={<Cart />} />
                    <Route path="/commande" element={<Checkout />} />
                    <Route path="/connexion" element={<Login />} />
                    <Route path="/inscription" element={<Register />} />
                    <Route path="/favoris" element={<Wishlist />} />
                    <Route path="/compte" element={<Account />} />
                    <Route path="/commande-confirmee" element={<OrderConfirmation />} />
                    <Route
                      path="/mentions-legales"
                      element={<LegalPage slug="mentions-legales" />}
                    />
                    <Route path="/cgv" element={<LegalPage slug="cgv" />} />
                    <Route path="/livraison" element={<LegalPage slug="livraison" />} />
                    <Route
                      path="/retours-remboursement"
                      element={<LegalPage slug="retours-remboursement" />}
                    />
                    <Route path="/paiement" element={<LegalPage slug="paiement" />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
              <CartDrawer />
              <VirtualAssistant />
              <CookieConsent />
            </div>
          </CartProvider>
        </WishlistProvider>
      </ToastProvider>
    </AuthProvider>
  )
}
