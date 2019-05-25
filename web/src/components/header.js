import { Link } from 'gatsby'
import React from 'react'
import Icon from './icons'
import { cn } from '../lib/helpers'
import ReactSVG from 'react-svg'
import { buildImageObj } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'
import styles from './header.module.css'

const Header = ({ siteTitle, logo }) => (
  <div className={styles.wrapper}>
    <h1 className={styles.branding}>
      <Link className={styles.logoText} to="/">
        {siteTitle.toUpperCase()}{' '}
      </Link>
      <div className={styles.logo}>
        <ReactSVG
          className={styles.svgWrapper}
          src={logo && imageUrlFor(buildImageObj(logo)).url()}
        />
      </div>
    </h1>
  </div>
)

export default Header
