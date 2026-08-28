import { useState, type ImgHTMLAttributes } from 'react'
import {
  optimizedImageProps,
  lqipUrl,
  type ImageSize,
  type OptimizedImgOptions,
} from '../lib/images'

type Context = ImageSize | 'compact' | 'gallery'

type Props = {
  src: string
  alt: string
  context?: Context
  className?: string
  /** Affiche un flou LQIP pendant le chargement */
  blurPlaceholder?: boolean
} & OptimizedImgOptions &
  Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt' | 'loading' | 'srcSet' | 'sizes'>

/**
 * Image optimisée :
 * - lazy par défaut (sauf priority)
 * - srcSet + sizes
 * - decoding async
 * - fetchPriority high | low
 * - option blur LQIP jusqu’au onLoad
 */
export function OptimizedImage({
  src,
  alt,
  context = 'card',
  priority = false,
  aspectRatio,
  blurPlaceholder = true,
  className = '',
  onLoad,
  style,
  ...rest
}: Props) {
  const [loaded, setLoaded] = useState(false)
  const imgProps = optimizedImageProps(src, context, alt, { priority, aspectRatio })
  const lqip = blurPlaceholder && !priority ? lqipUrl(src) : undefined

  return (
    <img
      {...rest}
      {...imgProps}
      alt={alt}
      className={`${className} ${blurPlaceholder && !loaded ? 'scale-105 blur-sm' : 'blur-0 scale-100'} transition-[filter,transform] duration-500`}
      style={{
        ...style,
        ...(lqip && !loaded
          ? {
              backgroundImage: `url(${lqip})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : undefined),
      }}
      onLoad={(e) => {
        setLoaded(true)
        onLoad?.(e)
      }}
    />
  )
}
