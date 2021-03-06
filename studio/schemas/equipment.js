export default {
  name: 'equipment',
  title: 'Equipment Item',
  type: 'document',
  fields: [
    {
      name: 'categories',
      title: 'Equipment Category',
      type: 'reference',
      to: { type: 'category' },
      validation: Rule => Rule.required()
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'sort',
      title: 'Sort Order',
      description: 'Add sort order here',
      type: 'number',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Some frontend will require a slug to be set to be able to show the project',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'mainImage',
      validation: Rule => Rule.required()
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      validation: Rule => Rule.required()
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
  },
  orderings: [
    {
      title: 'Website Equipment Order',
      name: 'sortAsc',
      by: [{ field: 'categories.title', direction: 'asc' }, { field: 'sort', direction: 'asc' }]
    }
  ]
}
