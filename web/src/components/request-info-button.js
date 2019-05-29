import React from 'react'
import Button from './button'
import styles from './request-info-button.module.css'
export default function RequestInfoButton() {
  return (
    <div className={styles.requestInfoWrap}>
      <Button to="contact" className={styles.linkText}>
        Request Information
      </Button>
    </div>
  )
}
