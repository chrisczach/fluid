export default {
  type: 'object',
  name: 'slideshow',
  title: 'Slideshow',
  fields: [
    {
      type: 'array',
      name: 'slides',
      title: 'Photoes',
      of: [{ type: 'image' }],
      options: {
        layout: 'grid'
      }
    }
  ]
}
