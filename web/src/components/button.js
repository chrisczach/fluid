import React from 'react'
import { Link } from 'gatsby'
import styles from './button.module.css'
export default function Button({ children, className, to, ...props }) {
  return (
    <>
      <Link
        to={to}
        className={styles.c_button + ' ' + styles.c_button__gooey + ' ' + className}
        {...props}
      >
        {children}
        <div className={styles.c_button__blobs}>
          <div />
          <div />
          <div />
        </div>
      </Link>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        style={{ display: 'block', height: 0, width: 0 }}
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
    </>
  )
}
