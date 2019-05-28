import MdApps from 'react-icons/lib/md/apps'

export default {
  name: 'category',
  title: 'Equipment Category',
  type: 'document',
  icon: MdApps,
  fields: [
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
      validation: Rule => Rule.required(),
      description: 'Some frontend will require a slug to be set to be able to show the project',
      options: {
        source: 'title',
        maxLength: 96
      }
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
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required()
    }
  ],
  orderings: [
    {
      title: 'Website Category Order',
      name: 'sortAsc',
      by: [{ field: 'sort', direction: 'asc' }]
    }
  ]
}
