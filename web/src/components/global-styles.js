import React, { createRef, useEffect } from 'react'
import ScrollLock from 'react-scrolllock'

import styles from './global-styles.module.css'

export default function GlobalStyles({
  children,
  siteSettings = {
    title: 'Fluid Pictures',
    primaryLight: { hex: '#f1f2f1' },
    accentLight: { hex: '#f7f5f1' },
    brandAccent: { hex: '#e1c6d2' },
    accentDark: { hex: '#b87c6e' },
    primaryDark: { hex: '#5c4841' }
  }
}) {
  let { primaryLight, accentLight, brandAccent, accentDark, primaryDark } = siteSettings

  const getHex = ({ hex }) => hex

  const globalColors = {
    '--color-main-light': getHex(primaryLight),
    '--color-accent-light': getHex(accentLight),
    '--color-brand': getHex(brandAccent),
    '--color-accent-dark': getHex(accentDark),
    '--color-main-dark': getHex(primaryDark),
    color: 'var(--color-main-light)'
  }

  const scrollDiv = createRef()
  try {
    if (window) {
      requestAnimationFrame(() => {
        scrollDiv.current.scrollIntoView({
          top: 0,
          left: 0,
          behavior: 'smooth'
        })
      })
    }
  } catch (err) {
    null
  }

  useEffect(() => {
    document.querySelector('#scroll').scrollTop = 0
  })

  return (
    <ScrollLock>
      <div
        id="scroll"
        ref={scrollDiv}
        style={{
          background:
            'linear-gradient(to bottom right, var(--color-accent-dark), var(--color-main-dark))',
          ...globalColors
        }}
        className={styles.scroll}
      >
        {/* <div className={styles.background} /> */}
        <>{children}</>
      </div>
    </ScrollLock>
  )
}
