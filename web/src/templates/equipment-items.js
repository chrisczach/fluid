import { graphql, Link } from 'gatsby'
import React from 'react'
import useResizeAware from 'react-resize-aware'
import Container from '../components/container'
import CoverImage from '../components/cover-image'
import EquipmentBlockContent from '../components/equipment-block-content'
import Gallery from '../components/gallery'
import GraphQLErrorList from '../components/graphql-error-list'
import Image from '../components/image'
import RequestInfoButton from '../components/request-info-button'
import SEO from '../components/seo'
import styles from './equipment-items.module.css'

export const query = graphql`
  query EquipmentItemTemplateQuery($id: String!) {
    equipment: sanityEquipment(id: { eq: $id }) {
      id
      title
      categories {
        title
        slug {
          current
        }
      }
      gallery {
        slides {
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
        }
      }
      _rawBody
      slug {
        current
      }
      excerpt
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

    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      background {
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

export const EquipmentItemTemplate = props => {
  const { data, errors } = props
  const equipment = data && data.equipment
  const background = data && data.site && data.site.background
  const [imageResizeListener, imageSizes] = useResizeAware()

  let heightPercentage

  try {
    heightPercentage = screen.orientation.type && 0.5
  } catch (err) {
    heightPercentage = 0.75
  }

  let isMobile
  try {
    isMobile = screen.orientation.type && false
  } catch (err) {
    isMobile = true
  }

  return (
    <>
      {errors && <SEO title="GraphQL Error" />}
      {equipment && <SEO title={equipment.title || 'Untitled'} />}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
      <div className={styles.headerImageWrap}>
        <Image
          className={styles.headerImage}
          asset={equipment.mainImage}
          fixed
          args={{
            width: imageSizes.width * 1,
            height: imageSizes.height - 35
          }}
        />
      </div>
      <Container>
        <div style={{ height: imageSizes.width * heightPercentage + 35, position: 'relative' }}>
          {imageResizeListener}
        </div>
        <Link to={`equipment/${equipment.categories.slug.current}`} className={styles.backLink}>
          &larr; back to {equipment.categories.title.toLowerCase()} category
        </Link>
        <h1 className={styles.titleText}>{equipment.title.toLowerCase()}</h1>
        {/* <p className={paragraph}>{equipment.excerpt}</p> */}
        <div className={styles.blockText}>
          <EquipmentBlockContent blocks={equipment._rawBody || []} />
        </div>
        <RequestInfoButton />
        <Gallery gallery={equipment.gallery} />
      </Container>
      {equipment.mainImage && (
        <CoverImage fixed asset={background} coverSize={1} className={styles.coverImage} />
      )}
    </>
  )
}

export default EquipmentItemTemplate
