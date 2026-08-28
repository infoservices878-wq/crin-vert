import { useEffect } from 'react'

const DEFAULT_TITLE = 'Nutrition Équine — Compléments naturels pour chevaux'
const DEFAULT_DESC =
  'Compléments et aliments naturels pour chevaux : CMV, digestion, articulations, sabots, stress et électrolytes. Fabriqué en France.'

/**
 * Met à jour title + meta description (et OG de base) par page.
 */
export function usePageMeta(title?: string, description?: string) {
  useEffect(() => {
    const fullTitle = title ? `${title} · Nutrition Équine` : DEFAULT_TITLE
    document.title = fullTitle

    const desc = description || DEFAULT_DESC
    let meta = document.querySelector('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', desc)

    const setOg = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute('property', property)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setOg('og:title', fullTitle)
    setOg('og:description', desc)
    setOg('og:type', 'website')
    setOg('og:locale', 'fr_FR')
  }, [title, description])
}
