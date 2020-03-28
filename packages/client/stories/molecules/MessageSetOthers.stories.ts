import { boolean, object } from '@storybook/addon-knobs'

import MessageSetOthers from '@/components/molecules/MessageSetOthers.vue'

export default {
  title: `molecules|MessageSetOthers`,
  parameters: {
    info: {
      summary: `molecules of MessageSetOthers is great component.`
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

const template = `<message-set-others :message="message" :isOwn="isOwn" />`

export const Default = () => ({
  components: { MessageSetOthers },
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
