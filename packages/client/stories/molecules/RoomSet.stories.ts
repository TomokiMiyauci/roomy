import { object } from '@storybook/addon-knobs'

import RoomSet from '@/components/molecules/RoomSet.vue'
export default {
  title: `molecules|RoomSet`,
  parameters: {
    info: {
      summary: `molecules of RoomSet is great component.`
    }
  }
}

const roomSet = {
  name: 'Brunch this weekend?',
  recent: {
    message:
      "Ali Connors I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
  }
}

const template = `<room-set :room="roomSet" />`

export const Default = () => ({
  components: { RoomSet },
  template,
  props: {
    roomSet: {
      default: object('roomSet', roomSet)
    }
  }
})
