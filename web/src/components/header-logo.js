import React from 'react'
import { Link } from 'gatsby'
import Icon from './icons'
import { cn, buildImageObj } from '../lib/helpers'
import ReactSVG from 'react-svg'
import { imageUrlFor } from '../lib/image-url'
import styles from './header-logo.module.css'

export default function HeaderLogo ({ logo }) {
  return (
    <Link to='/'>
      <div className={styles.logo}>
        <ReactSVG
          className={styles.svgWrapper}
          src={logo && imageUrlFor(buildImageObj(logo)).url()}
        />
      </div>
    </Link>
  )
}
