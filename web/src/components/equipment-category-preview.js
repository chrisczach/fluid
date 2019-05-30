import React, { useEffect, useState } from 'react'
import styles from './equipment-category-preview.module.css'
import Image from '../components/image'
import Button from './button'
import useResizeAware from 'react-resize-aware'
import { detectIE } from '../lib/helpers'

export default function EquipmentCategoryPreview ({
  id,
  title,
  slug: { current },
  preslug,
  excerpt,
  mainImage,
  grid
}) {
  const [imageResizeListener, imageSizes] = useResizeAware()
  const [contentResizeListener, contentSizes] = useResizeAware()
  const [showMobile, setShowMobile] = useState()
  useEffect(() => {
    setShowMobile(window.innerWidth < 900)
    window.addEventListener('resize', () => {
      setShowMobile(window.innerWidth)
    })

    return window.removeEventListener('resize', () => {
      setShowMobile(window.innerWidth < 900)
    })
  })
  return (
    <div className={styles.wrapper} key={id}>
      <div className={styles.imageBlock}>
        {imageResizeListener}
        {mainImage && mainImage.asset && (
          <>
            <div className={grid ? styles.gridImageOverlay : styles.imageOverlay} />
            <Image
              asset={mainImage}
              fixed
              args={{
                width: imageSizes.width,
                height:
                  detectIE() || showMobile ? imageSizes.width * 0.66 : contentSizes.height * 1.5
              }}
            />
          </>
        )}
      </div>
      <div className={styles.contentBlock}>
        <div className={styles.titleText}>{title.toLowerCase()}</div>
        <div className={styles.excerpt }>{ excerpt }</div>
        {contentResizeListener}
      </div>
      <div className={styles.categoryLinkWrapper}>
        <Button to={preslug + current} className={styles.categoryLink}>
          view {title.toLowerCase()}
        </Button>
      </div>
    </div>
  )
}
