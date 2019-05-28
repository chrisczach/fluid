import React from 'react'
import { graphql } from 'gatsby'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from '../lib/helpers'

import { responsiveTitle1 } from '../components/typography.module.css'
import EquipmentCategories from '../components/equipment-categories'
import BlockContent from '../components/block-content'
import styles from './equipment.module.css'
import CoverImage from '../components/cover-image'

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
  }
`

const EquipmentPage = props => {
  const { data, errors } = props
  if (errors) {
    return <GraphQLErrorList errors={errors} />
  }
  const equipment = data && data.equipment
  const site = data && data.site
  const categoryNodes =
    data && data.category && mapEdgesToNodes(data.category).filter(filterOutDocsWithoutSlugs)
  return (
    <>
      <SEO title="equipment" />
      <Container>
        <div className={styles.blockText}>
          <BlockContent blocks={equipment._rawBody || []} />
        </div>
        <h1 className={responsiveTitle1}>{equipment.title}</h1>
        {categoryNodes && categoryNodes.length > 0 && <EquipmentCategories nodes={categoryNodes} />}
        {site.background && (
          <CoverImage fixed asset={site.background} coverSize={1} className={styles.coverImage} />
        )}
      </Container>
    </>
  )
}

export default EquipmentPage