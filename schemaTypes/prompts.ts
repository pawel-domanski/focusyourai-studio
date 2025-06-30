import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'prompts',
  title: 'Prompts',
  type: 'document',
  icon: () => '💡',
  fields: [
    defineField({
      name: 'name',
      title: 'Prompt Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'content_date',
      title: 'Content Date',
      type: 'date',
    }),
    defineField({
      name: 'code_content',
      title: 'Code Content',
      type: 'string',
    }),
    defineField({
      name: 'paragraph_content',
      title: 'Paragraph Content',
      type: 'text',
    }),
  ],
}) 