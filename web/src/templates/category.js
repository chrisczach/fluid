import { graphql, Link } from 'gatsby'
import React from 'react'
import BlockContent from '../components/block-content'
import Container from '../components/container'
import CoverImage from '../components/cover-image'
import EquipmentItems from '../components/equipment-categories'
import GraphQLErrorList from '../components/graphql-error-list'
import RequestInfoButton from '../components/request-info-button'
import SEO from '../components/seo'
import { brandedTitle1 } from '../components/typography.module.css'
import { filterOutDocsWithoutSlugs, mapEdgesToNodes } from '../lib/helpers'
import styles from './category.module.css'

export const query = graphql`
  query CategoryListTemplateQuery($id: String!) {
    category: sanityCategory(id: { eq: $id }) {
      id
      title
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

    equipment: allSanityEquipment(
      filter: { categories: { id: { eq: $id } } }
      sort: { fields: [sort], order: ASC }
    ) {
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

const ProjectTemplate = props => {
  const { data, errors } = props
  const category = data && data.category
  const equipment = data && data.equipment
  const equipmentNodes = equipment && mapEdgesToNodes(equipment).filter(filterOutDocsWithoutSlugs)
  return (
    <>
      {errors && <SEO title="GraphQL Error" />}
      {category && <SEO title={`${category.title} Rentals - Equipment Rentals`} />}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
      <Container>
        <div style={{ height: '2em' }} />
        <Link to="equipment" className={styles.backLink}>
          &larr; back to equipment categories
        </Link>
        <h1 className={brandedTitle1}>{category.title.toLowerCase()}</h1>
        <div className={styles.blockText}>
          <BlockContent blocks={category._rawBody || []} />
        </div>
        <EquipmentItems
          nodes={equipmentNodes}
          slug={'equipment' + '/' + category.slug.current + '/'}
        />
        <RequestInfoButton />
      </Container>
      {category.mainImage && (
        <CoverImage fixed asset={category.mainImage} coverSize={1} className={styles.coverImage} />
      )}
    </>
  )
}

export default ProjectTemplate
