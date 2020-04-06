import RecordingStudio from '@/components/molecules/RecordingStudio.vue'

export default {
  title: `molecules|RecordingStudio`,
  parameters: {
    info: {
      summary: `molecules of RecordingStudio is great component.`
    }
  }
}

const template = `<recording-studio />`

export const Default = () => ({
  components: { RecordingStudio },
  template
})
