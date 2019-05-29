import React from 'react'
import { graphql } from 'gatsby'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import Project from '../components/project'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import { filterOutDocsWithoutSlugs, mapEdgesToNodes } from '../lib/helpers'
import { responsiveTitle1 } from '../components/typography.module.css'
import EquipmentItems from '../components/equipment-categories'
import BlockContent from '../components/block-content'
import styles from './category.module.css'
import CoverImage from '../components/cover-image'
import RequestInfoButton from '../components/request-info-button'

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
      {category && <SEO title={category.title || 'Untitled'} />}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
      <Container>
        <h1 className={responsiveTitle1}>{category.title.toLowerCase()}</h1>
        <div className={styles.blockText}>
          <BlockContent blocks={category._rawBody || []} />
        </div>
        <EquipmentItems
          nodes={equipmentNodes}
          slug={'equipment' + '/' + category.slug.current + '/'}
        />
        <RequestInfoButton />
        {category.mainImage && (
          <CoverImage
            fixed
            asset={category.mainImage}
            coverSize={1}
            className={styles.coverImage}
          />
        )}
      </Container>
    </>
  )
}

export default ProjectTemplate
