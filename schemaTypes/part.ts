import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'part',
  title: 'Part',
  type: 'document',
  icon: () => '📚',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
}) 