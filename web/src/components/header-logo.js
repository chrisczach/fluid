import { Link } from 'gatsby'
import React from 'react'
import ReactSVG from 'react-svg'
import { buildImageObj } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'
import styles from './header-logo.module.css'

export default function HeaderLogo({ logo }) {
  return (
    <div className={styles.logoWrap}>
      <Link to="/">
        <ReactSVG
          className={styles.svgWrapper}
          src={logo && imageUrlFor(buildImageObj(logo)).url()}
        />
      </Link>{' '}
    </div>
  )
}
