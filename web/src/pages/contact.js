import { graphql } from 'gatsby'
import 'mapbox-gl/dist/mapbox-gl.css'
import React, { useEffect, useState } from 'react'
import Loadable from 'react-loadable'
import useResizeAware from 'react-resize-aware'
import BlockContent from '../components/block-content'
import Container from '../components/container'
import CoverImage from '../components/cover-image'
import GraphQLErrorList from '../components/graphql-error-list'
import { MapLoading } from '../components/Map'
import SectionBackground from '../components/section-background'
import SEO from '../components/seo'
import { responsiveTitle1 } from '../components/typography.module.css'
import imdb from '../images/imdb.png'
import instagram from '../images/instagram.png'
import { useWindowSize } from '../lib/helpers'
import styles from './contact.module.css'

const LazyMap = Loadable({
  loader: () => import('../components/Map'),
  loading: MapLoading
})

export const query = graphql`
  query ContactPageQuery {
    contact: sanityPage(_id: { regex: "/(drafts.|)contact/" }) {
      title
      _rawBody
      mainImage {
        crop {
          _key
          _type
          top
          bottom
          left
          right
        }
        hotspot {
          _key
          _type
          x
          y
          height
          width
        }
        asset {
          _id
          metadata {
            lqip
          }
        }
        alt
      }
    }
  }
`
const ContactPage = props => {
  const { data, errors } = props

  if (errors) {
    return <GraphQLErrorList errors={errors} />
  }

  const contact = data.contact

  return (
    <>
      <SEO title={props.data.contact.title} />
      <Container>
        <div className={styles.spacer} />
        <ContactPageInner {...props} />
      </Container>
      {contact.mainImage && (
        <CoverImage
          fixed
          asset={props.data.contact.mainImage}
          coverSize={1}
          className={styles.coverImage}
        />
      )}
    </>
  )
}

export const ContactPageInner = props => {
  const { data, errors } = props

  if (errors) {
    return <GraphQLErrorList errors={errors} />
  }

  const contact = data.contact

  if (!contact) {
    throw new Error(
      'Missing "Contact" page data. Open the studio at http://localhost:3333 and add "Contact" page data and restart the development server.'
    )
  }
  const location = {
    latitude: 34.23448,
    longitude: -118.59653,
    zoom: 13
  }
  const [contactResizeListener, contactSizes] = useResizeAware()
  const [resizeListener, sizes] = useResizeAware()
  const [viewport, setViewport] = useState(location)
  const windowSize = useWindowSize()
  let [showColumns, setColumns] = useState(false)

  useEffect(() => {
    setColumns(windowSize.width < 1200)
    window.addEventListener('resize', event => setColumns(event.target.innerWidth < 1200))

    return () => {
      window.removeEventListener('resize', event => setColumns(event.target.innerWidth < 1200))
    }
  })

  const width = showColumns ? contactSizes.width : sizes.width
  const height = showColumns ? contactSizes.width : sizes.height

  return (
    <SectionBackground className={styles.sectionBackground}>
      <h1 style={{ position: 'relative' }} className={responsiveTitle1}>
        {contact.title}
      </h1>
      <div
        style={{ flexDirection: showColumns ? 'column' : 'row' }}
        className={styles.contactWrapper}
      >
        <div className={styles.contactText}>
          {contactResizeListener}
          <div className={styles.social}>
            Social:{' '}
            <a
              className={styles.socialLink}
              target="_blank"
              href="https://www.imdb.com/name/nm0247750/"
            >
              <img src={imdb} className={styles.socialLogo} />
            </a>{' '}
            <a
              className={styles.socialLink}
              target="_blank"
              href="https://www.instagram.com/fluidpicturesinc/"
            >
              <img src={instagram} className={styles.socialLogo} />
            </a>
          </div>
          <BlockContent blocks={contact._rawBody || []} />
        </div>
        <div className={styles.mapWrapper}>
          {resizeListener}
          <LazyMap
            viewport={viewport}
            setViewport={setViewport}
            width={width}
            height={height}
            location={location}
          />
        </div>
      </div>
    </SectionBackground>
  )
}

export default ContactPage
