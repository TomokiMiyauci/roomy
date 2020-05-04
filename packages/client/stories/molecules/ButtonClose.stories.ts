import ButtonClose from '@/components/molecules/ButtonClose.vue'

export default {
  title: `molecules|ButtonClose`,
  parameters: {
    info: {
      summary: `molecules of ButtonClose is great component.`
    }
  }
}

const template = `<button-close />`

export const Default = () => ({
  components: { ButtonClose },
  template
})
