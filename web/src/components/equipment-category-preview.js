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
    <div key={id}>
      {title}
      {excerpt}
      <Button to={current}>View {title}</Button>
      {mainImage && mainImage.asset && (
        <Image
          asset={mainImage}
          args={{ maxWidth: 2400, maxHeight: Math.floor((9 / 16) * 2400) }}
        />
      )}
    </div>
  )
}
