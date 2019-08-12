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
  const [sliderListener, { height: heightAware }] = useResizeAware()
  let height = 800

  try {
    height = heightAware
  } catch (err) {}

  const { index, next, prev, currentItem, length, galleryArray, setIndex } = slideShowHandler([
    equipment.mainImage,
    ...(equipment.gallery && equipment.gallery.slides ? equipment.gallery.slides : [])
  ])

  const moreThanOne = length !== 1

  return (
    <>
      {errors && <SEO title="GraphQL Error" />}
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
      <div className={styles.galleryWrapper}>
        <div className={styles.mainWrapper} style={{ height: `${5 * height}px` }}>
          {moreThanOne && index > 0 && (
            <button
              style={{
                width: `calc(50% - ${Math.floor(
                  2.5 * height * currentItem.asset.metadata.dimensions.aspectRatio
                )}px`
              }}
              className={styles.prevButton}
              onClick={prev}
            >
              {'<'}
            </button>
          )}

          <div className={styles.currentImage} style={{ height: `${5 * height}px` }}>
            <div
              style={{
                width: `${Math.floor(
                  5 * height * currentItem.asset.metadata.dimensions.aspectRatio
                )}px`,
                height: `${5 * height}px`,
                // overflow: 'hidden',
                position: 'relative',
                flexShrink: 0
              }}
            >
              <Image
                asset={currentItem}
                args={{
                  maxWidth: Math.floor(
                    5 * height * currentItem.asset.metadata.dimensions.aspectRatio
                  ),
                  maxHeight: 5 * height
                }}
              />
            </div>
          </div>

          {moreThanOne && index < length - 1 && (
            <button
              style={{
                width: `calc(50% - ${Math.floor(
                  2.5 * height * currentItem.asset.metadata.dimensions.aspectRatio
                )}px`
              }}
              className={styles.nextButton}
              onClick={next}
            >
              {'>'}
            </button>
          )}
        </div>

        {moreThanOne && (
          <div className={styles.sliderWrapper}>
            <div className={styles.slider}>
              {sliderListener}

              {galleryArray.map((currentItem, i) => (
                <div
                  onClick={() => setIndex(i)}
                  className={index === i ? styles.activeTile : styles.tile}
                  style={{
                    width: `${Math.floor(
                      height * currentItem.asset.metadata.dimensions.aspectRatio
                    )}px`
                  }}
                >
                  <Image
                    asset={currentItem}
                    args={{
                      maxWidth: Math.floor(
                        height * currentItem.asset.metadata.dimensions.aspectRatio
                      ),
                      maxHeight: height
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
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
