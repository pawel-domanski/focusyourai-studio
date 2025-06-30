import {defineField, defineType} from 'sanity'

// Schemat dla elementów dnia w Challenge
const challengeDayItem = defineType({
  name: 'challengeDayItem',
  title: 'Challenge Day Item',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
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

// Główny schemat dokumentu Challenge
export default defineType({
  name: 'challenges',
  title: 'Challenges',
  type: 'document',
  icon: () => '🏆',
  fields: [
    defineField({
      name: 'challenge_id',
      title: 'Challenge ID',
      type: 'number',
      validation: Rule => Rule.required().integer().positive(),
    }),
    defineField({
      name: 'title',
      title: 'Challenge Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'time_duration',
      title: 'Time Duration',
      type: 'string',
      description: 'e.g., "28 Days", "14 Days", "3 Days"',
    }),
    defineField({
      name: 'image',
      title: 'Challenge Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty Level',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' },
          { title: 'Expert', value: 'expert' }
        ]
      }
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'AI Basics', value: 'ai-basics' },
          { title: 'Machine Learning', value: 'machine-learning' },
          { title: 'Side Gigs', value: 'side-gigs' },
          { title: 'Productivity', value: 'productivity' },
          { title: 'Business', value: 'business' },
          { title: 'Technical Skills', value: 'technical-skills' },
          { title: 'Creative', value: 'creative' },
          { title: 'Other', value: 'other' }
        ]
      }
    }),
    defineField({
      name: 'is_active',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'days',
      title: 'Challenge Days',
      type: 'array',
      of: [{type: 'challengeDayItem'}],
      description: 'Daily activities and content for this challenge',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'time_duration',
      media: 'image'
    }
  }
})

// Eksportujemy schemat dla elementów dnia
export {challengeDayItem} 