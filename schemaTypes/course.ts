import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'course',
  title: 'Course',
  type: 'document',
  icon: () => '🎓',
  fields: [
    defineField({
      name: 'sort',
      title: 'Sort',
      type: 'number',
      validation: Rule => Rule.integer(),
    }),
    defineField({
      name: 'subject',
      title: 'Subject',
      type: 'string',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
    }),
    defineField({
      name: 'part',
      title: 'Part',
      type: 'reference',
      to: {type: 'part'},
    }),
    defineField({
      name: 'ocena',
      title: 'Ocena',
      type: 'boolean',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'lesson',
      title: 'Lessons',
      type: 'array',
      of: [{type: 'lesson'}],
    }),
  ],
}) 