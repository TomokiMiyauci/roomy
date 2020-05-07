import { displayName, photoURL } from '@mock/'

import FormUserProfile from '@/components/organisms/FormUserProfile.vue'
export default {
  title: `organisms|FormUserProfile`,
  parameters: {
    info: {
      summary: `organisms of FormUserProfile is great component.`
    }
  }
}

const template = `<form-user-profile :login="false" :photoURL="photoURL" :displayName="displayName" />`

export const Default = () => ({
  components: { FormUserProfile },
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
