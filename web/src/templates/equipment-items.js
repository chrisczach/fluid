import React from 'react'
import { graphql } from 'gatsby'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import Project from '../components/project'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import { filterOutDocsWithoutSlugs, mapEdgesToNodes } from '../lib/helpers'
import { responsiveTitle1, paragraph } from '../components/typography.module.css'
import EquipmentItems from '../components/equipment-categories'
import BlockContent from '../components/block-content'
import styles from './equipment-items.module.css'
import CoverImage from '../components/cover-image'
import RequestInfoButton from '../components/request-info-button'

export const query = graphql`
  query EquipmentItemTemplateQuery($id: String!) {
    equipment: sanityEquipment(id: { eq: $id }) {
      id
      title
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

const EquipmentItemTemplate = props => {
  const { data, errors } = props
  const equipment = data && data.equipment
  const background = data && data.site && data.site.background
  return (
    <>
      {errors && <SEO title="GraphQL Error" />}
      {equipment && <SEO title={equipment.title || 'Untitled'} />}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
      <Container>
        <h1 className={responsiveTitle1}>{equipment.title}</h1>
        <p className={paragraph}>{equipment.excerpt}</p>
        <div className={styles.blockText}>
          <BlockContent blocks={equipment._rawBody || []} />
        </div>

        <RequestInfoButton />
        {equipment.mainImage && (
          <CoverImage fixed asset={background} coverSize={1} className={styles.coverImage} />
        )}
      </Container>
    </>
  )
}

export default EquipmentItemTemplate
