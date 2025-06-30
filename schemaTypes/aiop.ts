import {defineField, defineType} from 'sanity'

// Schemat dla elementów body (zagnieżdżone obiekty w kursach AIOP)
const aiopBodyItem = defineType({
  name: 'aiopBodyItem',
  title: 'AIOP Body Item',
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

// Schemat dla kursu AIOP
const aiopCourse = defineType({
  name: 'aiopCourse',
  title: 'AIOP Course',
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
      of: [{type: 'aiopBodyItem'}],
    }),
  ],
})

// Główny schemat dokumentu AIOP
export default defineType({
  name: 'aiop',
  title: 'AI-Driven Operating Procedures',
  type: 'document',
  icon: () => '🤖',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
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
      description: 'Font Awesome class (e.g., fa-solid fa-brain)',
    }),
    defineField({
      name: 'courses',
      title: 'Courses',
      type: 'array',
      of: [{type: 'aiopCourse'}],
    }),
  ],
})

// Eksportujemy wszystkie schematy
export {aiopBodyItem, aiopCourse} 