import TheRooms from '@/components/organisms/TheRooms.vue'

export default {
  title: `organisms|TheRooms`,
  parameters: {
    info: {
      summary: `organisms of TheRooms is great component.`
    }
  }
}

const template = `<the-rooms />`

export const Default = () => ({
  components: { TheRooms },
  template
})
