import { Link } from 'gatsby'
import React from 'react'
import Icon from './icons'
import { cn, buildImageObj } from '../lib/helpers'
import ReactSVG from 'react-svg'

import { imageUrlFor } from '../lib/image-url'
import styles from './header.module.css'

const Header = ({ logo }) => (
  <div className={styles.wrapper}>
    <h1 className={styles.branding}>
      <Link className={styles.logoText} to='/'>
        <div className={styles.logo}>
          <ReactSVG
            className={styles.svgWrapper}
            src={logo && imageUrlFor(buildImageObj(logo)).url()}
          />
        </div>
      </Link>
    </h1>
  </div>
)

export default Header
