import React from 'react'
import { graphql } from 'gatsby'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from '../lib/helpers'

import { responsiveTitle1 } from '../components/typography.module.css'
import EquipmentCategories from '../components/equipment-categories'

export const query = graphql`
  query EquipmentCategoryPageQuery {
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

  const categoryNodes =
    data && data.category && mapEdgesToNodes(data.category).filter(filterOutDocsWithoutSlugs)
  return (
    <>
      <SEO title='equipment' />
      <Container>
        <h1 className={responsiveTitle1}>equipment</h1>
        {categoryNodes && categoryNodes.length > 0 && <EquipmentCategories nodes={categoryNodes} />}
      </Container>
    </>
  )
}

export default EquipmentPage
