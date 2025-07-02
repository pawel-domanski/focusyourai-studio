import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'aiTools',
  title: 'AI Tools',
  type: 'document',
  icon: () => '🛠️',
  fields: [
    defineField({
      name: 'name',
      title: 'Tool Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Tool Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
        }
      ]
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
      title: 'Description',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Font Awesome class or emoji',
    }),
    defineField({
      name: 'link',
      title: 'Website Link',
      type: 'url',
    }),
    defineField({
      name: 'price_model',
      title: 'Price Model',
      type: 'string',
      options: {
        list: [
          { title: 'Free', value: 'free' },
          { title: 'Freemium', value: 'freemium' },
          { title: 'Paid', value: 'paid' },
          { title: 'Subscription', value: 'subscription' },
          { title: 'One-time', value: 'one-time' },
          { title: 'Usage-based', value: 'usage-based' }
        ]
      }
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'Price description (e.g., "$10/month", "Free", "$99 one-time")',
    }),
    defineField({
      name: 'billing',
      title: 'Billing',
      type: 'string',
      options: {
        list: [
          { title: 'Monthly', value: 'monthly' },
          { title: 'Yearly', value: 'yearly' },
          { title: 'One-time', value: 'one-time' },
          { title: 'Usage-based', value: 'usage-based' },
          { title: 'Free', value: 'free' }
        ]
      }
    }),

    defineField({
      name: 'type',
      title: 'Tool Type',
      type: 'string',
      options: {
        list: [
          { title: 'Text Generation', value: 'text-generation' },
          { title: 'Image Generation', value: 'image-generation' },
          { title: 'Video Generation', value: 'video-generation' },
          { title: 'Audio Generation', value: 'audio-generation' },
          { title: 'Code Assistant', value: 'code-assistant' },
          { title: 'Data Analysis', value: 'data-analysis' },
          { title: 'Chatbot', value: 'chatbot' },
          { title: 'Translation', value: 'translation' },
          { title: 'SEO Tool', value: 'seo-tool' },
          { title: 'Design Tool', value: 'design-tool' },
          { title: 'Productivity', value: 'productivity' },
          { title: 'Research', value: 'research' },
          { title: 'Other', value: 'other' }
        ]
      }
    }),
  ],
}) 