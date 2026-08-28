import { MessageCircle } from 'lucide-react'

// Bouton de contact flottant générique (à remplacer par un vrai widget
// de chat — WhatsApp Business, Crisp, etc. — au moment du déploiement).
export function FloatingContactButton() {
  return (
    <a
      href="mailto:service.clients@nutrition-equine.example"
      className="focus-ring fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-leather-600 text-oat-50 shadow-xl transition-transform hover:scale-105"
      aria-label="Contacter le service client"
    >
      <MessageCircle className="h-6 w-6" strokeWidth={2} />
    </a>
  )
}
