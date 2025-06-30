import {defineField, defineType} from 'sanity'

// Schemat dla elementów body w AI Guide
const aiGuideBodyItem = defineType({
  name: 'aiGuideBodyItem',
  title: 'AI Guide Body Item',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Font Awesome class (e.g., fa-solid fa-brain)',
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
  ],
})

// Schemat dla kursu w AI Guide
const aiGuideCourse = defineType({
  name: 'aiGuideCourse',
  title: 'AI Guide Course',
  type: 'object',
  fields: [
    defineField({
      name: 'part',
      title: 'Part',
      type: 'string',
    }),
    defineField({
      name: 'subject',
      title: 'Subject',
      type: 'string',
    }),
    defineField({
      name: 'desc',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Font Awesome class or icon name',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{type: 'aiGuideBodyItem'}],
    }),
  ],
})

// Główny schemat dokumentu AI Guide
export default defineType({
  name: 'aiGuide',
  title: 'AI Guide',
  type: 'document',
  icon: () => '📚',
  fields: [
    defineField({
      name: 'name',
      title: 'Guide Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
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
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Font Awesome class or icon name (e.g., Brain)',
    }),
    defineField({
      name: 'courses',
      title: 'Courses',
      type: 'array',
      of: [{type: 'aiGuideCourse'}],
    }),
  ],
})

// Eksportujemy wszystkie schematy
export {aiGuideBodyItem, aiGuideCourse} 