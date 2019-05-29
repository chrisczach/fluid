import React, { useState } from 'react'
import { Link } from 'gatsby'
import Icon from './icons'
import { cn, buildImageObj } from '../lib/helpers'
import ReactSVG from 'react-svg'
import { imageUrlFor } from '../lib/image-url'
import styles from './header-logo.module.css'
import Sticky from 'react-sticky-el'
import { relative } from 'path'

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
