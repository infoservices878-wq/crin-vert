import { PRODUCTS } from '../data/products'
import { FAQ_ITEMS } from '../data/faq'
import { CATEGORY_LABELS } from '../types'

// Assistant automatique basé sur une recherche par mots-clés dans le
// contenu réel du site (FAQ, fiches produits, politiques). Aucune IA
// externe n'est appelée : les réponses sont déterministes et
// entièrement traçables jusqu'au contenu du site.

interface KnowledgeEntry {
  keywords: string[]
  answer: string
}

const STOPWORDS = new Set([
  'les', 'des', 'une', 'un', 'le', 'la', 'de', 'du', 'et', 'est', 'pour',
  'que', 'qui', 'mon', 'ma', 'mes', 'vos', 'votre', 'nos', 'notre', 'avec',
  'sur', 'dans', 'vous', 'quel', 'quels', 'quelle', 'quelles', 'comment',
  'combien', 'ce', 'cette', 'ces', 'il', 'elle', 'je', 'a', 'au', 'aux',
])

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
}

function tokenize(text: string): string[] {
  return normalize(text)
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOPWORDS.has(w))
}

const GENERAL_KNOWLEDGE: KnowledgeEntry[] = [
  {
    keywords: tokenize('livraison délai frais port expédition offerte gratuite combien temps'),
    answer:
      "La livraison est offerte dès 79 € d'achat en France métropolitaine. Comptez 2 à 4 jours ouvrés en France, 3 à 5 jours pour la Belgique et le Luxembourg, et 5 à 8 jours pour la Suisse. Détails complets sur la page Livraison.",
  },
  {
    keywords: tokenize('retour remboursement rétractation renvoyer échanger annuler'),
    answer:
      "Vous disposez de 14 jours après réception pour changer d'avis. Les produits alimentaires déjà ouverts ne peuvent toutefois pas être repris, pour des raisons d'hygiène. Contactez notre service client pour lancer un retour — plus de détails sur la page Retour et remboursement.",
  },
  {
    keywords: tokenize('paiement carte visa mastercard paypal payer plusieurs fois facilite securise'),
    answer:
      "Nous acceptons la carte bancaire, PayPal, et le paiement en plusieurs fois sans frais dès 100 € d'achat. Le paiement est sécurisé et aucune donnée bancaire n'est stockée sur nos serveurs.",
  },
  {
    keywords: tokenize('contact contacter joindre telephone email mail question service client'),
    answer:
      'Vous pouvez nous écrire à contact@nutritionequine.com, utiliser le formulaire de la page Contact, ou nous joindre par WhatsApp depuis le menu.',
  },
  {
    keywords: tokenize('mentions legales entreprise siret societe'),
    answer:
      "Toutes les informations légales (éditeur, hébergement, RGPD) sont disponibles sur la page Mentions légales, accessible depuis le pied de page.",
  },
]

function buildProductKnowledge(): KnowledgeEntry[] {
  const entries: KnowledgeEntry[] = []

  for (const p of PRODUCTS) {
    const base = tokenize(`${p.name} ${CATEGORY_LABELS[p.category]} ${p.tagline}`)

    entries.push({
      keywords: base,
      answer: `${p.name} — ${p.tagline}. ${p.description}`,
    })

    entries.push({
      keywords: [...base, ...tokenize('dose dosage posologie donner quantite combien administrer')],
      answer: `Dosage de ${p.name} : ${p.posologie}`,
    })

    entries.push({
      keywords: [...base, ...tokenize('composition ingredients contient formule')],
      answer: `Composition de ${p.name} : ${p.composition.map((c) => `${c.label} (${c.value})`).join(', ')}.`,
    })

    entries.push({
      keywords: [...base, ...tokenize('prix cout tarif combien coute')],
      answer: `${p.name} est proposé à partir de ${p.price.toFixed(2)} €.`,
    })
  }

  return entries
}

function buildFaqKnowledge(): KnowledgeEntry[] {
  return FAQ_ITEMS.map((item) => ({
    keywords: tokenize(item.question),
    answer: item.answers.join(' '),
  }))
}

let knowledgeBase: KnowledgeEntry[] | null = null

function getKnowledgeBase(): KnowledgeEntry[] {
  if (!knowledgeBase) {
    knowledgeBase = [...buildFaqKnowledge(), ...GENERAL_KNOWLEDGE, ...buildProductKnowledge()]
  }
  return knowledgeBase
}

export interface AssistantReply {
  answer: string
  matched: boolean
}

const FALLBACK_ANSWER =
  "Je n'ai pas trouvé de réponse précise à cette question dans nos fiches produits ou notre FAQ. N'hésitez pas à nous écrire via la page Contact, notre équipe vous répondra rapidement."

export function answerQuestion(question: string): AssistantReply {
  const qTokens = tokenize(question)
  if (qTokens.length === 0) {
    return {
      answer:
        'Posez-moi une question sur un produit (dosage, composition…), la livraison, les retours ou le paiement.',
      matched: false,
    }
  }

  const qSet = new Set(qTokens)
  let best: KnowledgeEntry | null = null
  let bestScore = 0

  for (const entry of getKnowledgeBase()) {
    let score = 0
    for (const kw of entry.keywords) {
      if (qSet.has(kw)) score += 1
    }
    if (score > bestScore) {
      bestScore = score
      best = entry
    }
  }

  if (best && bestScore >= 1) {
    return { answer: best.answer, matched: true }
  }

  return { answer: FALLBACK_ANSWER, matched: false }
}

export const ASSISTANT_STARTERS = [
  'Quels sont les délais de livraison ?',
  "Comment doser CMV Entretien ?",
  'Comment retourner un produit ?',
  'Quels moyens de paiement acceptez-vous ?',
]
