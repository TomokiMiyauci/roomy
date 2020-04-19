import { boolean, object } from '@storybook/addon-knobs'

import SkeletonLoaderMessageSet from '@/components/molecules/SkeletonLoaderMessageSet.vue'

export default {
  title: `molecules|SkeletonLoaderMessageSet`,
  parameters: {
    info: {
      summary: `molecules of SkeletonLoaderMessageSet is great component.`
    }
  }
}

const message = {
  kind: 'TEXT',
  text: 'hello',
  createdAt: {
    seconds: 1000000000
  },
  isAnonymous: true
}

const template = `<skeleton-loader-message-set :message="message" :isOwn="isOwn" />`

export const Default = () => ({
  components: { SkeletonLoaderMessageSet },
  template,
  props: {
    message: {
      default: object('message', message)
    },

    isOwn: {
      default: boolean('isOwn', false)
    }
  }
})
