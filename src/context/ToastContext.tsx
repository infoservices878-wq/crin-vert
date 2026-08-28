/**
 * Système de notifications toast (succès / erreur / info).
 * Animations : Framer Motion (entrée spring, sortie fade+slide).
 * Accessibilité : aria-live, role="status", prefers-reduced-motion.
 */
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check, X, AlertCircle, Info } from 'lucide-react'

/** Types visuels d’un toast */
export type ToastType = 'success' | 'error' | 'info'

/** Données d’une notification affichée */
export interface Toast {
  id: string
  type: ToastType
  message: string
}

interface ToastContextValue {
  /** Liste des toasts actuellement montés */
  toasts: Toast[]
  /** Affiche un toast (disparaît automatiquement après DISPLAY_MS) */
  toast: (message: string, type?: ToastType) => void
  /** Ferme un toast manuellement (déclenche l’animation de sortie via AnimatePresence) */
  dismiss: (id: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

/** Durée d’affichage avant auto-fermeture (ms) */
const DISPLAY_MS = 4000

/**
 * Variantes d’animation normales :
 * - initial → hors écran à droite, légèrement réduit
 * - animate → spring vers la position finale
 * - exit → glisse hors écran + fade
 */
const toastVariants = {
  initial: { opacity: 0, x: 28, y: 8, scale: 0.96 },
  animate: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 420, damping: 28, mass: 0.8 },
  },
  exit: {
    opacity: 0,
    x: 32,
    scale: 0.96,
    transition: { duration: 0.18, ease: [0.4, 0, 1, 1] as const },
  },
}

/** Variantes simplifiées si l’utilisateur préfère moins de mouvement */
const reducedVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
}

/**
 * Carte visuelle d’un toast individuel.
 * Gère l’icône selon le type, le bouton fermer et la barre de progression.
 */
function ToastItem({
  item,
  onDismiss,
  reduced,
}: {
  item: Toast
  onDismiss: (id: string) => void
  reduced: boolean
}) {
  // Styles de bordure / texte selon le type
  const tone =
    item.type === 'success'
      ? 'border-hunter-800/15 bg-oat-50 text-hunter-900'
      : item.type === 'error'
        ? 'border-flag-red/30 bg-oat-50 text-flag-red'
        : 'border-hunter-800/15 bg-oat-50 text-ink-900'

  return (
    <motion.div
      layout // Réorganise la pile quand un toast est retiré
      variants={reduced ? reducedVariants : toastVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`pointer-events-auto relative flex items-start gap-3 overflow-hidden rounded-sm border px-4 py-3 shadow-lg ${tone}`}
      role="status"
    >
      {/* Icône contextuelle */}
      {item.type === 'success' && (
        <Check className="mt-0.5 h-4 w-4 shrink-0 text-leather-600" strokeWidth={2.5} />
      )}
      {item.type === 'error' && (
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2} />
      )}
      {item.type === 'info' && (
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-ink-600" strokeWidth={2} />
      )}

      <p className="flex-1 text-sm font-medium leading-snug">{item.message}</p>

      <button
        type="button"
        onClick={() => onDismiss(item.id)}
        className="focus-ring -mr-1 rounded p-0.5 text-ink-600 hover:text-hunter-900"
        aria-label="Fermer"
      >
        <X className="h-4 w-4" />
      </button>

      {/*
        Barre de durée restante (scaleX de 1 → 0).
        Masquée en mode reduced-motion.
      */}
      {!reduced && (
        <motion.span
          className={`absolute bottom-0 left-0 h-0.5 ${
            item.type === 'error' ? 'bg-flag-red/50' : 'bg-leather-600/40'
          }`}
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: DISPLAY_MS / 1000, ease: 'linear' }}
          style={{ originX: 0, width: '100%' }}
        />
      )}
    </motion.div>
  )
}

/**
 * Provider global : à placer près de la racine (ex. dans App.tsx).
 * Expose `useToast()` aux enfants.
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  /** Timers d’auto-fermeture par id de toast */
  const timers = useRef<Map<string, number>>(new Map())
  /** true si l’OS demande moins d’animations */
  const reduced = useReducedMotion() ?? false

  /** Retire le toast de l’état (AnimatePresence joue alors l’exit) */
  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
    const t = timers.current.get(id)
    if (t) {
      window.clearTimeout(t)
      timers.current.delete(id)
    }
  }, [])

  /**
   * Ajoute un toast et programme sa disparition.
   * @param message Texte affiché
   * @param type 'success' (défaut) | 'error' | 'info'
   */
  const toast = useCallback(
    (message: string, type: ToastType = 'success') => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
      setToasts((prev) => [...prev, { id, type, message }])

      // Auto-dismiss après DISPLAY_MS
      const auto = window.setTimeout(() => dismiss(id), DISPLAY_MS)
      timers.current.set(id, auto)
    },
    [dismiss],
  )

  const value = useMemo(() => ({ toasts, toast, dismiss }), [toasts, toast, dismiss])

  return (
    <ToastContext.Provider value={value}>
      {children}

      {/* Conteneur fixe, coin bas-droit — n’intercepte pas les clics hors toasts */}
      <div
        className="pointer-events-none fixed bottom-4 right-4 z-[100] flex w-[min(100%-2rem,22rem)] flex-col gap-2"
        aria-live="polite"
      >
        {/*
          mode="popLayout" : les toasts restants se repositionnent
          en douceur quand l’un d’eux part.
        */}
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => (
            <ToastItem key={t.id} item={t} onDismiss={dismiss} reduced={reduced} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

/**
 * Hook d’accès au système de toasts.
 * @example
 * const { toast } = useToast()
 * toast('Produit ajouté au panier', 'success')
 */
export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
