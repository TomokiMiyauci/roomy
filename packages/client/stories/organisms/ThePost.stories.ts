import ThePost from '@/components/organisms/ThePost.vue'

export default {
  title: `organisms|ThePost`,
  parameters: {
    info: {
      summary: `organisms of ThePost is great component.`
    }
  }
}

const template = `<the-post />`

export const Default = () => ({
  components: { ThePost },
  template
})
