import { displayName, photoURL } from '@mock/'

import AvatarLarge from '@/components/molecules/AvatarLarge.vue'

export default {
  title: `molecules|AvatarLarge`,
  parameters: {
    info: {
      summary: `molecules of AvatarLarge is great component.`
    }
  }
}

const template = `<avatar-large :login="true" :photoURL="photoURL" :displayName="displayName" />`

export const Default = () => ({
  components: { AvatarLarge },
  template,
  props: {
    photoURL: {
      default: photoURL
    },

    displayName: {
      default: displayName
    }
  }
})
