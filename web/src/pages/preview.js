import React, { useState } from 'react'
import { EquipmentItemTemplate } from '../templates/equipment-items'
import { StaticQuery, graphql } from 'gatsby'

// import sanityClient from '@sanity/client'
// import BlogPostTemplate, { query } from '../templates/blog-post'

// const clientForPreview = sanityClient({
//   projectId: 'z8zw1m88',
//   dataset: 'production',
//   useCdn: false,
//   withCredentials: true
// })

// export default function preview () {
//   const [previewData, setPreviewData] = useState(null)
//   previewData ||
//     clientForPreview.getDocument(getUrlParameter('document')).then(post => setPreviewData({ post }))

//   return <BlogPostTemplate data={previewData} />
// }

export default function preview() {
  const id = getUrlParameter('document')
  let weirdHackForBuildError
  try {
    weirdHackForBuildError = (
      <StaticQuery
        query={query}
        render={({ site, allSanityEquipment: { equipmentList } }) => {
          const equipment = equipmentList.find(({ _id }) => _id === id)
          return EquipmentItemTemplate({ data: { site, equipment } })
        }}
      />
    )
  } catch (e) {
    weirdHackForBuildError = <div>Something to fix build error</div>
  }
  return weirdHackForBuildError
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
    allSanityEquipment {
      equipmentList: nodes {
        _id
        title
        categories {
          title
          slug {
            current
          }
        }
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
