import { boolean } from '@storybook/addon-knobs'

import SpeechBalloon from '@/components/atoms/SpeechBalloon.vue'

export default {
  title: `atoms|SpeechBalloon`,
  parameters: {
    info: {
      summary: `atoms of SpeechBalloon is great component.`
    }
  }
}

const template = `<speech-balloon :left="isLeft">This is a sample message</speech-balloon>`

export const Default = () => ({
  components: { SpeechBalloon },
  template,
  props: {
    isLeft: {
      default: boolean('left', true)
    }
  }
})
