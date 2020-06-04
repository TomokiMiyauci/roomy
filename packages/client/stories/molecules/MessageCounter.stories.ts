import MessageCounter from '@/components/molecules/MessageCounter.vue'

export default {
  title: `molecules|MessageCounter`,
  parameters: {
    info: {
      summary: `molecules of MessageCounter is great component.`
    }
  }
}

const template = `<message-counter />`

export const Default = () => ({
  components: { MessageCounter },
  template
})
