import { Link } from 'gatsby'
import React from 'react'
import styles from './header.module.css'

const Header = () => {
  let pathName

  try {
    pathName = location.pathname.split('/')[1]
  } catch (err) {
    null
  }
  return (
    <div className={styles.wrapper}>
      <Link
        className={styles.link + ' ' + (pathName === 'about' ? styles.activeLink : '')}
        id="about"
        to="/about"
      >
        about
      </Link>
      <Link
        className={styles.link + ' ' + (pathName === 'equipment' ? styles.activeLink : '')}
        id="equipment"
        to="/equipment"
      >
        equipment
      </Link>
      {/* <Link id="blog" className="menu-item" to="/blog">
        Blog
      </Link> */}
      <Link
        className={styles.link + ' ' + (pathName === 'contact' ? styles.activeLink : '')}
        id="contact"
        to="/contact"
      >
        contact
      </Link>
    </div>
  )
}

export default Header
