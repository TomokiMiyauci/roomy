import { text } from '@storybook/addon-knobs'

import ButtonAudio from '@/components/molecules/ButtonAudio.vue'

export default {
  title: `molecules|ButtonAudio`,
  parameters: {
    info: {
      summary: `molecules of ButtonAudio is great component.`
    }
  }
}

const mockAudio =
  'https://firebasestorage.googleapis.com/v0/b/roomy-devlop.appspot.com/o/test%2Ftest%2F4131?alt=media&token=905beea7-7e21-42fc-90dd-b47ec8f4f9e7'

const template = `<button-audio :src="src" />`

export const Default = () => ({
  components: { ButtonAudio },
  template,
  props: {
    src: {
      default: text('src', mockAudio)
    }
  }
})
