import { object, boolean } from '@storybook/addon-knobs'
import MessageSet from '@/components/molecules/MessageSet.vue'

export default {
  title: `molecules|MessageSet`,
  parameters: {
    info: {
      summary: `molecules of MessageSet is great component.`
    }
  }
}

const message = {
  text: 'hello',
  createdAt: {
    seconds: 1000000000
  }
}

const template = `<message-set :message="message" :isOwn="isOwn" />`

export const Default = () => ({
  components: { MessageSet },
  template,
  props: {
    message: {
      default: object('message', message)
    },

    isOwn: {
      default: boolean('isOwn', true)
    }
  }
})
