import React from 'react'
import { Link } from 'gatsby'
import styles from './button.module.css'
export default function Button ({ children, className, to, ...props }) {
  return (
    <Link to={to} className={`${styles.root} ${className}`} {...props}>
      {children}
    </Link>
  )
}
