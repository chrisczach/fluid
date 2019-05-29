import React from 'react'
import { graphql } from 'gatsby'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import Project from '../components/project'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import { filterOutDocsWithoutSlugs, mapEdgesToNodes } from '../lib/helpers'
import EquipmentItems from '../components/equipment-categories'

export const query = graphql`
  query CategoryTemplateQuery($id: String!) {
    category: sanityCategory(_id: { eq: $id }) {
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

    equipment: allSanityEquipment(
      filter: { categories: { _id: { eq: $id } } }
      sort: { fields: [sort], order: ASC }
    ) {
      edges {
        node {
          sort
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
      {errors && <SEO title='GraphQL Error' />}
      {category && <SEO title={category.title || 'Untitled'} />}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
      <EquipmentItems nodes={equipmentNodes} />
    </>
  )
}

export default ProjectTemplate
