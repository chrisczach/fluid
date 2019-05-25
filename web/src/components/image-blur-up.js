import React from 'react'
import ProgressiveImage from 'react-progressive-image'
import styles from './image-blur-up.module.css'
import { imageUrlFor } from '../lib/image-url'
import { buildImageObj } from '../lib/helpers'

export default function ImageBlurUp({
  asset,
  alt = '',
  className = '',
  width = 1200,
  height = Math.floor((9 / 16) * 1200),
  fit = 'crop'
}) {
  const src = imageUrlFor(buildImageObj(asset))
    .width(1200)
    .height(Math.floor((9 / 16) * 1200))
    .fit('crop')
    .url()
  const placeholder = imageUrlFor(buildImageObj(asset))
    .width(60)
    .height(Math.floor((9 / 16) * 60))
    .fit('crop')
    .url()
  return (
    <ProgressiveImage src={src} placeholder={placeholder || src}>
      {(imageSrc, loading) => (
        <>
          <img
            className={`${className} ${styles.base} ${
              loading ? styles.beforeLoad : styles.afterLoaded
            }`}
            src={imageSrc}
            alt={asset.alt || alt}
          />
          <noscript>
            <img
              className={`${className} ${styles.base}  ${styles.afterLoaded}`}
              src={src}
              alt={asset.alt || alt}
            />
          </noscript>
        </>
      )}
    </ProgressiveImage>
  )
}
