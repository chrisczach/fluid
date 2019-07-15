import { graphql } from 'gatsby'
import React from 'react'
import BlockContent from '../components/block-content'
import Container from '../components/container'
import CoverImage from '../components/cover-image'
import EquipmentCategories from '../components/equipment-categories'
import GraphQLErrorList from '../components/graphql-error-list'
import RequestInfoButton from '../components/request-info-button'
import SEO from '../components/seo'
import { brandedTitle1 } from '../components/typography.module.css'
import { filterOutDocsWithoutSlugs, mapEdgesToNodes } from '../lib/helpers'
import styles from './equipment.module.css'

export const query = graphql`
  query EquipmentCategoryPageQuery {
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
    equipment: sanityPage(_id: { regex: "/(drafts.|)equipment/" }) {
      id
      _id
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
    category: allSanityCategory(sort: { fields: [sort], order: ASC }) {
      edges {
        node {
          id
          title
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
      }
    }

    equipmentItems: allSanityEquipment {
      edges {
        node {
          slug {
            current
          }
          categories {
            id
          }
        }
      }
    }
  }
`

const EquipmentPage = props => {
  const { data, errors } = props
  if (errors) {
    return <GraphQLErrorList errors={errors} />
  }
  const equipment = data && data.equipment
  const site = data && data.site
  const equipmentItems = data && data.equipmentItems

  const getCategoryItemCount = ({ edges }) => {
    const counts = {}
    edges.forEach(({ node: { slug: { current }, categories: { id } } }) => {
      if (counts[id] && counts[id].length > 0) {
        counts[id].push(current)
      } else {
        counts[id] = [current]
      }
    })
    return counts
  }

  const categoryNodes =
    data && data.category && mapEdgesToNodes(data.category).filter(filterOutDocsWithoutSlugs)
  return (
    <>
      <SEO title="equipment" />
      <Container>
        <div className={styles.blockText}>
          <BlockContent blocks={equipment._rawBody || []} />
        </div>
        {/* <h1 className={brandedTitle1}>{equipment.title}</h1> */}
        {categoryNodes && categoryNodes.length > 0 && (
          <EquipmentCategories
            slug={`equipment/`}
            nodes={categoryNodes}
            categoryCounts={getCategoryItemCount(equipmentItems)}
          />
        )}
        <RequestInfoButton />
      </Container>
      {site.background && (
        <CoverImage fixed asset={site.background} coverSize={1} className={styles.coverImage} />
      )}
    </>
  )
}

export default EquipmentPage
