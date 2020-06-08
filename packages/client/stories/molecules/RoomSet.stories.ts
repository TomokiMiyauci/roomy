import { object } from '@storybook/addon-knobs'

import RoomSet from '@/components/molecules/RoomSet.vue'
import { publicRoom } from '~mock/index'
export default {
  title: `molecules|RoomSet`,
  parameters: {
    info: {
      summary: `molecules of RoomSet is great component.`
    }
  }
}

const template = `<room-set :room="roomSet" />`

export const Default = () => ({
  components: { RoomSet },
  template,
  props: {
    roomSet: {
      default: object('roomSet', publicRoom)
    }
  }
})
