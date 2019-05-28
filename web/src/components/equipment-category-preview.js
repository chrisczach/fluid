import React from 'react'
import styles from './equipment-category-preview.module.css'
import Image from '../components/image'
import Button from './button'
import useResizeAware from 'react-resize-aware'

export default function EquipmentCategoryPreview ({
  id,
  title,
  slug: { current },
  excerpt,
  mainImage,
  grid
}) {
  const [imageResizeListener, imageSizes] = useResizeAware()
  const [contentResizeListener, contentSizes] = useResizeAware()

  return (
    <div className={styles.wrapper} key={id}>
      <div className={styles.imageBlock}>
        {imageResizeListener}
        {mainImage && mainImage.asset && (
          <>
            <div className={grid ? styles.gridImageOverlay : styles.imageOverlay}>
              <div className={styles.titleText}>{title.toLowerCase()}</div>
            </div>
            <Image
              asset={mainImage}
              fixed
              args={{ width: imageSizes.width, height: contentSizes.height * 1.5 }}
            />
          </>
        )}
      </div>
      <div className={styles.contentBlock}>
        {excerpt}
        {contentResizeListener}
      </div>
      <Button to={current} className={styles.categoryLink}>
        view {title.toLowerCase()}
      </Button>
    </div>
  )
}
