import React from 'react'
import styles from './equipment-categories.module.css'
import EquipmentCategoryPreview from './equipment-category-preview'
export default function EquipmentCategories ({ nodes }) {
  return <div className={styles.categoryWrapper}>{nodes.map(EquipmentCategoryPreview)}</div>
}
