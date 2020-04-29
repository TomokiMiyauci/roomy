import FileDropper from '@/components/molecules/FileDropper.vue'
export default {
  title: `molecules|FileDropper`,
  parameters: {
    info: {
      summary: `molecules of FileDropper is great component.`
    }
  }
}
const template = `<file-dropper />`

export const Default = () => ({
  components: { FileDropper },
  template
})
