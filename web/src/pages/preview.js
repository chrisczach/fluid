import React, { useState } from 'react'
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

// const getUrlParameter = name => {
//   try {
//     name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
//     var regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
//     var results = regex.exec(location.search)
//     return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))
//   } catch (err) {}
// }

export default function preview () {
  return <div>preview</div>
}
