import { boolean, number, text } from '@storybook/addon-knobs'

import AvatarWrapper from '@/components/molecules/AvatarWrapper.vue'
import { displayName, photoURL } from '~mock/'
export default {
  title: `molecules|AvatarWrapper`,
  parameters: {
    info: {
      summary: `molecules of AvatarWrapper is great component.`
    }
  }
}

const template = `<avatar-wrapper v-bind="$props" />`

export const Default = () => ({
  components: { AvatarWrapper },
  template,
  props: {
    login: {
      default: boolean('login', false)
    },

    size: {
      default: number('size', 48)
    },

    displayName: {
      default: text('displayName', displayName)
    },

    photoURL: {
      default: text('photoURL', photoURL)
    }
  }
})
