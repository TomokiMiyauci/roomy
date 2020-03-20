import ButtonImage from '@/components/molecules/ButtonImage.vue'

export default {
  title: `molecules|ButtonImage`,
  parameters: {
    info: {
      summary: `molecules of ButtonImage is great component.`
    }
  }
}

const template = `<button-image />`

export const Default = () => ({
  components: { ButtonImage },
  template
})
