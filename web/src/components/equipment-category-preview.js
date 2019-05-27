import React from 'react'
import styles from './equipment-category-preview.module.css'
import Image from '../components/image'
import Button from './button'

export default function EquipmentCategoryPreview ({
  id,
  title,
  slug: { current },
  excerpt,
  mainImage
}) {
  return (
    <div className={styles.wrapper} key={id}>
      <div className={styles.imageBlock}>
        {mainImage && mainImage.asset && (
          <>
            <div className={styles.imageOverlay}>{title.toLowerCase()}</div>
            <Image
              asset={mainImage}
              args={{ maxWidth: 2400, maxHeight: Math.floor((9 / 16) * 2400) }}
            />
          </>
        )}
      </div>
      <div className={styles.contentBlock}>
        {excerpt}

        <Button to={current} className={styles.categoryLink}>
          view {title.toLowerCase()}
        </Button>
      </div>
    </div>
  )
}
