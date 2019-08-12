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
import { slideShowHandler } from '../lib/hooks'
import { relative } from 'path'

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
              dimensions {
                aspectRatio
              }
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
            dimensions {
              aspectRatio
            }
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
  const [imageResizeListener, { height: heightAware }] = useResizeAware()
  let height
  let heightPercentage

  try {
    heightPercentage = screen.orientation.type && 0.5
    height = heightAware
  } catch (err) {
    heightPercentage = 0.75
    height = 800
  }

  let isMobile
  try {
    isMobile = screen.orientation.type && false
  } catch (err) {
    isMobile = true
  }

  const { index, next, prev, currentItem } = slideShowHandler([
    equipment.mainImage,
    ...equipment.gallery.slides
  ])
  return (
    <>
      {errors && <SEO title='GraphQL Error' />}
      {equipment && <SEO title={equipment.title || 'Untitled'} />}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
      {/* <div className={styles.headerImageWrap}>
        <Image
          className={styles.headerImage}
          asset={equipment.mainImage}
          fixed
          args={{
            width: imageSizes.width * 1,
            height: imageSizes.height - 35
          }}
        />
      </div> */}
      <div className={styles.slideshowWrapper}>
        {imageResizeListener}
        <button className={styles.prevButton} onClick={prev}>
          Prev
        </button>
        <div
          style={{
            width: `${Math.floor(height / currentItem.asset.metadata.dimensions.aspectRatio)}px`,
            height: `${height}px`,
            // overflow: 'hidden',
            position: 'relative'
          }}
        >
          <Image
            asset={currentItem}
            args={{
              maxWidth: Math.floor(height / currentItem.asset.metadata.dimensions.aspectRatio),
              maxHeight: height
            }}
          />
        </div>

        <button className={styles.nextButton} onClick={next}>
          Next
        </button>
      </div>
      <Container>
        {/* <div style={{ height: imageSizes.width * heightPercentage + 35, position: 'relative' }}>
          {imageResizeListener}
        </div> */}

        <Link to={`equipment/${equipment.categories.slug.current}`} className={styles.backLink}>
          &larr; back to {equipment.categories.title.toLowerCase()} category
        </Link>
        <h1 className={styles.titleText}>{equipment.title.toLowerCase()}</h1>
        {/* <p className={paragraph}>{equipment.excerpt}</p> */}
        <div className={styles.blockText}>
          <EquipmentBlockContent blocks={equipment._rawBody || []} />
        </div>
        <RequestInfoButton />
        {/* <Gallery gallery={equipment.gallery} /> */}
      </Container>
      {equipment.mainImage && (
        <CoverImage fixed asset={background} coverSize={1} className={styles.coverImage} />
      )}
    </>
  )
}

export default EquipmentItemTemplate
