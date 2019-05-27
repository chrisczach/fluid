import React from 'react'
import styles from './equipment-categories.module.css'
import EquipmentCategoryPreview from './equipment-category-preview'
export default function EquipmentCategories ({ nodes, grid = false }) {
  return (
    <div className={grid ? styles.showGrid : styles.showColumn}>
      {nodes.map(category => (
        <EquipmentCategoryPreview {...category} grid={grid} />
      ))}
    </div>
  )
}
