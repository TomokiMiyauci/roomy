import { displayName, photoURL } from '@mock/'

import AvatarNameLarge from '@/components/molecules/AvatarNameLarge.vue'

export default {
  title: `molecules|AvatarNameLarge`,
  parameters: {
    info: {
      summary: `molecules of AvatarNameLarge is great component.`
    }
  }
}

const template = `<avatar-name-large v-bind="$props"/>`

export const Default = () => ({
  components: { AvatarNameLarge },
  template,

  props: {
    login: {
      default: true
    },

    displayName: {
      default: displayName
    },

    photoURL: {
      default: photoURL
    },

    disableEdit: {
      default: false
    }
  }
})
