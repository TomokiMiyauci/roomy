import QrcodeReader from '@/components/molecules/QrcodeReader.vue'

export default {
  title: `molecules|QrcodeReader`,
  parameters: {
    info: {
      summary: `molecules of QrcodeReader is great component.`
    }
  }
}

const template = `<qrcode-reader />`

export const Default = () => ({
  components: { QrcodeReader },
  template
})
