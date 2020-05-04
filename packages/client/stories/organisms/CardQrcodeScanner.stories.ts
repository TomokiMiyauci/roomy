import CardQrcodeScanner from '@/components/organisms/CardQrcodeScanner.vue'

export default {
  title: `organisms|CardQrcodeScanner`,
  parameters: {
    info: {
      summary: `organisms of CardQrcodeScanner is great component.`
    }
  }
}

const template = `<card-qrcode-scanner />`

export const Default = () => ({
  components: { CardQrcodeScanner },
  template
})
