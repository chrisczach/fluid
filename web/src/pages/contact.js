import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import useResizeAware from 'react-resize-aware'
import 'mapbox-gl/dist/mapbox-gl.css'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import BlockContent from '../components/block-content'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import styles from './contact.module.css'
import { responsiveTitle1 } from '../components/typography.module.css'
import CoverImage from '../components/cover-image'
import SectionBackground from '../components/section-background'

export const query = graphql`
  query ContactPageQuery {
    page: sanityPage(_id: { regex: "/(drafts.|)contact/" }) {
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

  const page = data.page

  if (!page) {
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
  const [contactTextResizeListener, contactTextSizes] = useResizeAware()
  const [resizeListener, sizes] = useResizeAware()
  const [viewport, setViewport] = useState(location)
  const windowSize = useWindowSize()
  const showColumns = windowSize.width < 900
  console.log(showColumns)
  return (
    <>
      <SEO title={page.title} />
      <Container>
        <SectionBackground className={styles.sectionBackground}>
          <h1 style={{ position: 'relative' }} className={responsiveTitle1}>
            {page.title}
          </h1>
          <div
            style={{ flexDirection: showColumns ? 'column' : 'row' }}
            className={styles.contactWrapper}
          >
            <div className={styles.contactText}>
              {contactResizeListener}
              <BlockContent blocks={page._rawBody || []} />
            </div>
            <div className={styles.mapWrapper}>
              {resizeListener}
              <ReactMapGL
                {...viewport}
                mapStyle="mapbox://styles/mapbox/dark-v10"
                onViewportChange={setViewport}
                width={showColumns ? contactSizes.width : sizes.width}
                height={showColumns ? contactSizes.width : sizes.height}
                mapboxApiAccessToken={process.env.GATSBY_MAPBOX_TOKEN}
              >
                <Popup closeButton={false} {...location} closeOnClick={false} anchor="bottom">
                  <div className={styles.marker}>Fluid Pictures Shop</div>
                </Popup>
              </ReactMapGL>
            </div>
          </div>
        </SectionBackground>
        {page.mainImage && <CoverImage fixed asset={page.mainImage} coverSize={1} />}
      </Container>
    </>
  )
}
ContactPage.defaultProps = {
  data: {
    page: {
      title: 'No title'
    }
  }
}

// Hook
function useWindowSize() {
  const isClient = typeof window === 'object'

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    }
  }

  const [windowSize, setWindowSize] = useState(getSize)

  useEffect(() => {
    if (!isClient) {
      return false
    }

    function handleResize() {
      setWindowSize(getSize())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty array ensures that effect is only run on mount and unmount

  return windowSize
}

export default ContactPage
