import TheAppBar from '~/components/organisms/TheAppBar.vue'

export default {
  title: `organisms|TheAppBar`,
  parameters: {
    info: {
      summary: `organisms of TheAppBar is great component.`
    }
  }
}

const template = `<the-app-bar />`

export const Default = () => ({
  components: { TheAppBar },
  template
})
