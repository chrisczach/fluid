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

const Layout = ({ children, companyInfo, siteSettings, location }) => {
  let logo
  let title = ''
  let pathname = ''

  try {
    pathname = location.pathname
  } catch (err) {
    console.log('prevent build error')
  }

  try {
    title = siteSettings.title
  } catch (err) {
    console.log('prevent build error')
  }
  try {
    logo = siteSettings.logo
  } catch (err) {
    console.log('prevent build error')
  }
  console.log(logo)
  return (
    <GlobalStyles siteSettings={siteSettings}>
      <BurgerMenu siteTitle={title} logo={logo} />
      <div id='page-wrap'>
        <Header logo={logo} />

        <Transition location={{ pathname }}>
          <>
            <div className={styles.content}>{children}</div>
          </>
        </Transition>

        <footer className={styles.footer}>
          <div className={styles.footerWrapper}>
            <div className={styles.companyInfo}>
              {companyInfo && (
                <div>
                  {/* <br />
                  {companyInfo.address1}
                  <br />
                  {companyInfo.address2 && (
                    <span>
                      {companyInfo.address2}
                      <br />
                    </span>
                  )}
                  {companyInfo.zipCode} {companyInfo.city}
                  {companyInfo.country && <span>, {companyInfo.country}</span>} */}

                  {/* <ReactSVG
                    className={styles.svgWrapper}
                    src={logo && imageUrlFor(buildImageObj(logo)).url()}
                  /> */}
                  <div className={styles.footerWrapper}>{title.toLowerCase()}</div>
                </div>
              )}
            </div>

            <div className={styles.siteInfo}>
              © {new Date().getFullYear()}, Built with <a href='https://www.sanity.io'>Sanity</a>{' '}
              &amp;
              {` `}
              <a href='https://www.gatsbyjs.org'>Gatsby</a>
            </div>
          </div>
        </footer>
      </div>
    </GlobalStyles>
  )
}

export default Layout
