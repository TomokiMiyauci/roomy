import ButtonFileDownload from '@/components/molecules/ButtonFileDownload.vue'

export default {
  title: `molecules|ButtonFileDownload`,
  parameters: {
    info: {
      summary: `molecules of ButtonFileDownload is great component.`
    }
  }
}

const template = `<button-file-download />`

export const Default = () => ({
  components: { ButtonFileDownload },
  template
})
