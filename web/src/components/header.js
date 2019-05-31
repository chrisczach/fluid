import { Link } from 'gatsby'
import React from 'react'
import Icon from './icons'
import { cn, buildImageObj } from '../lib/helpers'
import ReactSVG from 'react-svg'

import { imageUrlFor } from '../lib/image-url'
import styles from './header.module.css'

const Header = () => (
  <div className={styles.wrapper}>
    <Link className={styles.link} id='about' to='/about'>
      about
    </Link>
    <Link className={styles.link} id='equipment' to='/equipment'>
      equipment
    </Link>
    {/* <Link id="blog" className="menu-item" to="/blog">
        Blog
      </Link> */}
    <Link className={styles.link} id='contact' to='/contact'>
      contact
    </Link>
  </div>
)

export default Header
