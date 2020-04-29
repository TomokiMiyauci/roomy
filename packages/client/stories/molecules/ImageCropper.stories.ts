import ImageCropper from '@/components/molecules/ImageCropper.vue'
export default {
  title: `molecules|ImageCropper`,
  parameters: {
    info: {
      summary: `molecules of ImageCropper is great component.`
    }
  }
}

const template = `<ImageCropper />`

export const Default = () => ({
  components: { ImageCropper },
  template
})
