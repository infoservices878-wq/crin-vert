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

const Home = lazy(() => import('./pages/Home').then(({ Home }) => ({ default: Home })))
const Catalogue = lazy(() => import('./pages/Catalogue').then(({ Catalogue }) => ({ default: Catalogue })))
const ProductDetail = lazy(() => import('./pages/ProductDetail').then(({ ProductDetail }) => ({ default: ProductDetail })))
const Contact = lazy(() => import('./pages/Contact').then(({ Contact }) => ({ default: Contact })))
const Cart = lazy(() => import('./pages/Cart').then(({ Cart }) => ({ default: Cart })))
const LegalPage = lazy(() => import('./pages/LegalPage').then(({ LegalPage }) => ({ default: LegalPage })))
const Checkout = lazy(() => import('./pages/Checkout').then(({ Checkout }) => ({ default: Checkout })))
const Login = lazy(() => import('./pages/Login').then(({ Login }) => ({ default: Login })))
const Register = lazy(() => import('./pages/Register').then(({ Register }) => ({ default: Register })))
const NotFound = lazy(() => import('./pages/NotFound').then(({ NotFound }) => ({ default: NotFound })))
const About = lazy(() => import('./pages/About').then(({ About }) => ({ default: About })))
const Wishlist = lazy(() => import('./pages/Wishlist').then(({ Wishlist }) => ({ default: Wishlist })))
const Account = lazy(() => import('./pages/Account').then(({ Account }) => ({ default: Account })))
const OrderConfirmation = lazy(() => import('./pages/OrderConfirmation').then(({ OrderConfirmation }) => ({ default: OrderConfirmation })))
const HorseAssessment = lazy(() => import('./pages/HorseAssessment').then(({ HorseAssessment }) => ({ default: HorseAssessment })))
const OrderTracking = lazy(() => import('./pages/OrderTracking').then(({ OrderTracking }) => ({ default: OrderTracking })))
const Guides = lazy(() => import('./pages/Guides').then(({ Guides }) => ({ default: Guides })))
const Faq = lazy(() => import('./pages/Faq').then(({ Faq }) => ({ default: Faq })))
const Delivery = lazy(() => import('./pages/Delivery').then(({ Delivery }) => ({ default: Delivery })))
const ResetPassword = lazy(() => import('./pages/ResetPassword').then(({ ResetPassword }) => ({ default: ResetPassword })))
const VerifyEmail = lazy(() => import('./pages/VerifyEmail').then(({ VerifyEmail }) => ({ default: VerifyEmail })))

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
          <Suspense fallback={<div className="mx-auto flex min-h-[40vh] max-w-6xl items-center justify-center px-4 text-sm text-ink-600">Chargement…</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/catalogue/:categoryId" element={<Catalogue />} />
            <Route path="/produit/:slug" element={<ProductDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/bilan-equin" element={<HorseAssessment />} />
            <Route path="/suivi-commande" element={<OrderTracking />} />
            <Route path="/conseils" element={<Guides />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/livraison" element={<Delivery />} />
            <Route path="/reinitialisation" element={<ResetPassword />} />
            <Route path="/verification-email" element={<VerifyEmail />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/entreprise" element={<About />} />
            <Route path="/panier" element={<Cart />} />
            <Route path="/commande" element={<Checkout />} />
            <Route path="/connexion" element={<Login />} />
            <Route path="/inscription" element={<Register />} />
            <Route path="/favoris" element={<Wishlist />} />
            <Route path="/compte" element={<Account />} />
            <Route path="/commande-confirmee" element={<OrderConfirmation />} />
            <Route path="/mentions-legales" element={<LegalPage slug="mentions-legales" />} />
            <Route path="/cgv" element={<LegalPage slug="cgv" />} />
            <Route path="/conditions-generales-de-vente" element={<LegalPage slug="cgv" />} />
            <Route
              path="/retours-remboursement"
              element={<LegalPage slug="retours-remboursement" />}
            />
            <Route path="/paiement" element={<LegalPage slug="paiement" />} />
            <Route path="/politique-de-confidentialite" element={<LegalPage slug="politique-de-confidentialite" />} />
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
