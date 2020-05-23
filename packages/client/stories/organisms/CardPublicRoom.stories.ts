import CardPublicRoom from '@/components/organisms/CardPublicRoom.vue'

export default {
  title: `organisms|CardPublicRoom`,
  parameters: {
    info: {
      summary: `organisms of CardPublicRoom is great component.`
    }
  }
}

const template = `<card-public-room />`

export const Default = () => ({
  components: { CardPublicRoom },
  template
})
