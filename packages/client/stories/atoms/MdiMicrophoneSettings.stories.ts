import MdiMicrophoneSettings from '@/components/atoms/MdiMicrophoneSettings.vue'

export default {
  title: `atoms|icons/MdiMicrophoneSettings`,
  parameters: {
    info: {
      summary: `This is mdiMicrophoneSettings icon component.`
    }
  }
}

const template = `<mdi-microphone-settings />`

export const Default = () => ({
  components: { MdiMicrophoneSettings },
  template
})
