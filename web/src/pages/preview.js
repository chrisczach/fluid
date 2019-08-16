import React from 'react'
import { StaticQuery, graphql, navigate } from 'gatsby'

export default function preview() {
  let categoryID = false
  let itemSlug = false
  try {
    categoryID = getUrlParameter('category')
    itemSlug = getUrlParameter('equipment')
  } catch (e) {}

  return categoryID ? (
    <StaticQuery
      query={query}
      render={({ allSanityCategory: { edges } }) => {
        const {
          node: {
            slug: { current: categorySlug }
          }
        } = edges.find(({ node }) => node._id.endsWith(categoryID))
        return navigate(`/equipment/${categorySlug}/${itemSlug}`)
      }}
    />
  ) : (
    <div>fix for build error</div>
  )
}

const getUrlParameter = name => {
  try {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
    var results = regex.exec(location.search)
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))
  } catch (err) {}
}

const query = graphql`
  query PreviewQuery {
    allSanityCategory {
      edges {
        node {
          _id
          slug {
            current
          }
        }
      }
    }
  }
`
