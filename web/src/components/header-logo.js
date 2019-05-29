import React, { useState } from 'react'
import { Link } from 'gatsby'
import Icon from './icons'
import { cn, buildImageObj } from '../lib/helpers'
import ReactSVG from 'react-svg'
import { imageUrlFor } from '../lib/image-url'
import styles from './header-logo.module.css'
import Sticky from 'react-sticky-el'
import { relative } from 'path'

export default function HeaderLogo ({ logo }) {
  const [toggled, setToggled] = useState(true)
  return (
    <Sticky
      style={{ posistion: 'relative', zIndex: 500 }}
      scrollElement='#scroll'
      onFixedToggle={setToggled}
    >
      <Link to='/'>
        <div className={toggled ? styles.logo : styles.logoFixed}>
          <ReactSVG
            className={toggled ? styles.svgWrapper : styles.svgWrapperFixed}
            src={logo && imageUrlFor(buildImageObj(logo)).url()}
          />
        </div>
      </Link>
    </Sticky>
  )
}
