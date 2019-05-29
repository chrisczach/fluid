import React, { useState } from 'react'
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
import { useWindowSize } from '../lib/helpers'

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
        {contact.mainImage && (
          <CoverImage
            fixed
            asset={props.data.contact.mainImage}
            coverSize={1}
            className={styles.coverImage}
          />
        )}
      </Container>
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
  const [contactTextResizeListener, contactTextSizes] = useResizeAware()
  const [resizeListener, sizes] = useResizeAware()
  const [viewport, setViewport] = useState(location)
  const windowSize = useWindowSize()
  const showColumns = windowSize.width < 900
  console.log(showColumns)
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
          <BlockContent blocks={contact._rawBody || []} />
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
  )
}

export default ContactPage
