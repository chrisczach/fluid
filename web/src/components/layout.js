import React from 'react'
import ReactSVG from 'react-svg'
import Header from './header'
import BurgerMenu from './burger-menu'
import '../styles/layout.css'
import styles from './layout.module.css'
import GlobalStyles from './global-styles'
import { buildImageObj } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'
import Transition from './page-transition'
import { Link } from 'gatsby'
import HeaderLogo from './header-logo'
import imdb from '../images/imdb.png'
import instagram from '../images/instagram.png'

const Layout = ({ children, companyInfo, siteSettings, location }) => {
  let logo
  let title = ''
  let pathname = ''

  try {
    pathname = location.pathname
  } catch (err) {
    null
  }

  try {
    title = siteSettings.title
  } catch (err) {
    null
  }
  try {
    logo = siteSettings.logo
  } catch (err) {
    null
  }

  return (
    <GlobalStyles siteSettings={siteSettings}>
      <BurgerMenu siteTitle={title} logo={logo} />
      <div id="page-wrap">
        <Header logo={logo} />
        <HeaderLogo logo={logo} />
        <Transition location={{ pathname }}>
          <>
            <div className={styles.content}>{children}</div>
          </>
        </Transition>

        <footer className={styles.footer}>
          <div className={styles.footerWrapper}>
            <Link className={styles.footerTitle} to="/">
              {title.toLowerCase()}
            </Link>
            <div className={styles.siteInfo}>
              <div className={styles.social}>
                <a
                  className={styles.socialLink}
                  target="_blank"
                  alt="Dave Eastwood IMDb Profile"
                  href="https://www.imdb.com/name/nm0247750/"
                  rel="noreferrer"
                >
                  <img src={imdb} className={styles.socialLogo} alt="IMDb Logo" />
                </a>{' '}
                <a
                  className={styles.socialLink}
                  target="_blank"
                  alt="Fluid Pictures Inc Instagram"
                  href="https://www.instagram.com/fluidpicturesinc/"
                  rel="noreferrer"
                >
                  <img src={instagram} className={styles.socialLogo} alt="instagram logo" />
                </a>
              </div>
              {/* © {new Date().getFullYear()} */}
            </div>
          </div>
        </footer>
      </div>
    </GlobalStyles>
  )
}

export default Layout
