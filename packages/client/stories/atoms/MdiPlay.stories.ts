import MdiPlay from '@/components/atoms/MdiPlay.vue'

export default {
  title: `atoms|icons/MdiPlay`,
  parameters: {
    info: {
      summary: `atoms of MdiPlay is mdiPlay icon component.`
    }
  }
}

const template = `<mdi-play />`

export const Default = () => ({
  components: { MdiPlay },
  template
})
