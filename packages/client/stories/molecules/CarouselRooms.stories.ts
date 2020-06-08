import CarouselRooms from '@/components/organisms/CarouselRooms.vue'
import { publicRooms } from '~mock/publicRoom'
export default {
  title: `molecules|CarouselRooms`,
  parameters: {
    info: {
      summary: `molecules of CarouselRooms is great component.`
    }
  }
}

const template = `<carousel-rooms :rooms="rooms" />`

export const Default = () => ({
  components: { CarouselRooms },
  template,
  props: {
    rooms: {
      default: () => publicRooms
    }
  }
})
