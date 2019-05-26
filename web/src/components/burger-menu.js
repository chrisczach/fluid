import React, { useState } from 'react'
import { elastic as Menu } from 'react-burger-menu'
import { Link } from 'gatsby'
import styles from './burger-menu.module.css'
import ReactSVG from 'react-svg'
import { buildImageObj } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'

export default function burgerMenu ({ siteTitle, logo }) {
  const [open, setOpen] = useState(false)
  const closeMenu = () => setOpen(false)
  const handleChange = ({ isOpen }) => setOpen(isOpen)
  return (
    <Menu right pageWrapId={'page-wrap'} isOpen={open} onStateChange={handleChange}>
      <Link id='about' className='menu-item' to='/about' onClick={closeMenu}>
        about
      </Link>
      <Link id='projects' className='menu-item' to='/projects' onClick={closeMenu}>
        equipment
      </Link>
      {/* <Link id="blog" className="menu-item" to="/blog" onClick={closeMenu}>
        Blog
      </Link> */}
      <Link id='contact' className='menu-item' to='/contact' onClick={closeMenu}>
        contact
      </Link>
      <div className={styles.branding}>
        <ReactSVG
          svgClassName={styles.svgStyle}
          className={styles.svgWrapper}
          src={logo && imageUrlFor(buildImageObj(logo)).url()}
        />
      </div>
    </Menu>
  )
}
