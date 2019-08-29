import { graphql, Link } from 'gatsby'
import React, { useState, useRef } from 'react'
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
  }
`

export const EquipmentItemTemplate = props => {
  const { data, errors } = props
  const equipment = data && data.equipment
  // const background = data && data.site && data.site.background
  const [sliderListener, { height: heightAware }] = useResizeAware()
  let height = 800
  let multiple = 5
  try {
    height = heightAware
    multiple = window.innerWidth < window.innerHeight ? 2 : 5
  } catch (err) {}

  const { index, next, prev, currentItem, length, galleryArray, setIndex } = slideShowHandler([
    equipment.mainImage,
    ...(equipment.gallery && equipment.gallery.slides ? equipment.gallery.slides : [])
  ])
  const moreThanOne = length !== 1
  const sliderRef = useRef()
  const scrollTileToView = index =>
    sliderRef.current.childNodes[index + 1].scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    })
  return (
    <>
      {errors && <SEO title="GraphQL Error" />}
      {equipment && (
        <SEO
          description={equipment.excerpt}
          title={`${equipment.title} Rentals - ${equipment.categories.title} Rentals - Equipment Rentals`}
        />
      )}

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
      <div
        className={styles.galleryWrapper}
        style={{
          width: moreThanOne
            ? '100%'
            : `${Math.floor(5 * height * currentItem.asset.metadata.dimensions.aspectRatio)}px`
        }}
      >
        <div className={styles.mainWrapper} style={{ height: `${multiple * height}px` }}>
          {moreThanOne && index > 0 && (
            <button
              style={{
                width: `calc(50% - ${Math.floor(
                  (multiple / 2) * height * currentItem.asset.metadata.dimensions.aspectRatio
                )}px`
              }}
              className={styles.prevButton}
              onClick={() => {
                scrollTileToView(index - 1)
                prev()
              }}
            >
              {'<'}
            </button>
          )}

          <div className={styles.currentImage} style={{ height: `${multiple * height}px` }}>
            <div
              style={{
                width: `${Math.floor(
                  multiple * height * currentItem.asset.metadata.dimensions.aspectRatio
                )}px`,
                height: `${multiple * height}px`,
                // overflow: 'hidden',
                position: 'relative',
                flexShrink: 0
              }}
            >
              <Image
                asset={currentItem}
                aspectFixed
                args={{
                  maxWidth: Math.floor(
                    multiple * height * currentItem.asset.metadata.dimensions.aspectRatio
                  ),
                  maxHeight: multiple * height
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
              onClick={() => {
                scrollTileToView(index + 1)
                next()
              }}
            >
              {'>'}
            </button>
          )}
        </div>

        <div
          className={styles.sliderWrapper}
          style={{
            opacity: moreThanOne ? 1 : 0,
            position: moreThanOne ? 'relative' : 'absolute',
            bottom: 0
          }}
        >
          <div className={styles.slider} ref={sliderRef}>
            {sliderListener}

            {galleryArray.map((currentItem, i) => {
              currentItem.alt = currentItem.asset.alt || `${equipment.title} image ${i}`
              console.log(currentItem.asset.alt)
              return (
                <div
                  id={i}
                  onClick={({ target }) => {
                    setIndex(i)
                    target.scrollIntoView({
                      behavior: 'smooth',
                      block: 'nearest',
                      inline: 'center'
                    })
                  }}
                  className={index === i ? styles.activeTile : styles.tile}
                  style={{
                    width: `${Math.floor(
                      height * currentItem.asset.metadata.dimensions.aspectRatio * 0.8
                    )}px`
                  }}
                >
                  <Image
                    asset={currentItem}
                    aspectFixed
                    args={{
                      maxWidth: Math.floor(
                        height * currentItem.asset.metadata.dimensions.aspectRatio
                      ),
                      maxHeight: height
                    }}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <Container>
        {/* <div style={{ height: imageSizes.width * heightPercentage + 35, position: 'relative' }}>
          {imageResizeListener}
        </div> */}

        <Link to={`equipment/${equipment.categories.slug.current}/`} className={styles.backLink}>
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
        <CoverImage
          fixed
          asset={equipment.categories.mainImage}
          coverSize={1}
          className={styles.coverImage}
        />
      )}
    </>
  )
}

export default EquipmentItemTemplate
