import { object } from '@storybook/addon-knobs'

import ThePost from '@/components/organisms/ThePost.vue'
export default {
  title: `organisms|ThePost`,
  parameters: {
    info: {
      summary: `organisms of ThePost is great component.`
    }
  }
}

const rooms = [
  {
    avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
    name: 'Brunch this weekend?',
    recent: {
      message:
        "Ali Connors I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
    }
  }
]

const template = `<the-post :rooms="rooms" />`

export const Default = () => ({
  components: { ThePost },
  template,
  props: {
    rooms: {
      default: object('rooms', rooms)
    }
  }
})
