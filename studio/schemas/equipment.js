export default {
  name: 'equipment',
  title: 'Equipment Item',
  type: 'document',
  fields: [
    {
      name: 'categories',
      title: 'Equipment Category',
      type: 'reference',
      to: { type: 'category' }
    },
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
      type: 'text'
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'mainImage'
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent'
    },
    {
      name: 'gallery',
      title: 'Photo Gallery',
      type: 'slideshow'
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
