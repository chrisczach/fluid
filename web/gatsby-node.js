const { format } = require('date-fns')

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// async function createBlogPostPages (graphql, actions, reporter) {
//   const { createPage, createPageDependency } = actions
//   const result = await graphql(`
//     {
//       allSanityPost(filter: { slug: { current: { ne: null } } }) {
//         edges {
//           node {
//             id
//             publishedAt
//             slug {
//               current
//             }
//           }
//         }
//       }
//     }
//   `)

//   if (result.errors) throw result.errors

//   const postEdges = (result.data.allSanityPost || {}).edges || []

//   postEdges.forEach((edge, index) => {
//     const { id, slug = {}, publishedAt } = edge.node
//     const dateSegment = format(publishedAt, 'YYYY/MM')
//     const path = `/blog/${dateSegment}/${slug.current}/`

//     reporter.info(`Creating blog post page: ${path}`)

//     createPage({
//       path,
//       component: require.resolve('./src/templates/blog-post.js'),
//       context: { id }
//     })

//     createPageDependency({ path, nodeId: id })
//   })
// }

async function createCategoryPages(graphql, actions, reporter) {
  const { createPage, createPageDependency } = actions
  const result = await graphql(`
    {
      allSanityCategory(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            id
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const categoryEdges = (result.data.allSanityCategory || {}).edges || []

  categoryEdges.forEach(edge => {
    const id = edge.node.id
    const slug = edge.node.slug.current
    const path = `/equipment/${slug}/`

    reporter.info(`Creating equipment category page: ${path}`)

    createPage({
      path,
      component: require.resolve('./src/templates/category.js'),
      context: { id: id }
    })

    createPageDependency({ path, nodeId: id })
  })
}

async function createEquipmentItemPages(graphql, actions, reporter) {
  const { createPage, createPageDependency } = actions
  const result = await graphql(`
    {
      allSanityEquipment(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            id
            categories {
              slug {
                _key
                _type
                categorySlug: current
              }
            }
            slug {
              itemSlug: current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const equipmentItemEdges = (result.data.allSanityEquipment || {}).edges || []

  equipmentItemEdges.forEach(edge => {
    const id = edge.node.id
    const { categorySlug } = edge.node.categories.slug
    const { itemSlug } = edge.node.slug
    const path = `/equipment/${categorySlug}/${itemSlug}/`

    reporter.info(`Creating equipment item page: ${path}`)

    createPage({
      path,
      component: require.resolve('./src/templates/equipment-items.js'),
      context: { id: id }
    })

    createPageDependency({ path, nodeId: id })
  })
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  // await createBlogPostPages(graphql, actions, reporter)
  await createCategoryPages(graphql, actions, reporter)
  await createEquipmentItemPages(graphql, actions, reporter)
}
