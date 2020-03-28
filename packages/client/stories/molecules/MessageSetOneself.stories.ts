import { boolean, object } from '@storybook/addon-knobs'

import MessageSetOneself from '@/components/molecules/MessageSetOneself.vue'

export default {
  title: `molecules|MessageSetOneself`,
  parameters: {
    info: {
      summary: `molecules of MessageSetOneself is great component.`
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

const template = `<message-set-oneself :message="message" :isOwn="isOwn" />`

export const Default = () => ({
  components: { MessageSetOneself },
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
