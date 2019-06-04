import React from 'react'
import styles from './section-background.module.css'

export default function SectionBackground({ className = null, children, ...props }) {
  return (
    <div className={styles.sectionBackground + ' ' + className} {...props}>
      {children}
    </div>
  )
}
