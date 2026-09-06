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
import { Home } from './pages/Home'
import { Catalogue } from './pages/Catalogue'
import { ProductDetail } from './pages/ProductDetail'
import { Contact } from './pages/Contact'
import { Cart } from './pages/Cart'
import { LegalPage } from './pages/LegalPage'
import { Checkout } from './pages/Checkout'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { NotFound } from './pages/NotFound'
import { About } from './pages/About'
import { Wishlist } from './pages/Wishlist'
import { Account } from './pages/Account'
import { OrderConfirmation } from './pages/OrderConfirmation'
import { HorseAssessment } from './pages/HorseAssessment'
import { OrderTracking } from './pages/OrderTracking'
import { Guides } from './pages/Guides'
import { Faq } from './pages/Faq'
import { Delivery } from './pages/Delivery'
import { ResetPassword } from './pages/ResetPassword'
import { VerifyEmail } from './pages/VerifyEmail'

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
