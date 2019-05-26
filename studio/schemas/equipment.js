export default {
  name: 'equipment',
  title: 'Equipment Item',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Some frontend will require a slug to be set to be able to show the project',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'blockText'
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'mainImage'
    },
    {
      name: 'categories',
      title: 'Equipment Categories',
      type: 'reference',
      to: { type: 'category' }
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent'
    }
  ],
  preview: {
    select: {
      title: 'title',
      image: 'mainImage'
    },
    prepare ({ title = 'No title', image }) {
      return {
        title,
        media: image
      }
    }
  }
}
