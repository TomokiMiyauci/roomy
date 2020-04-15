import { text } from '@storybook/addon-knobs'

import ButtonCopy2Clipboard from '@/components/molecules/ButtonCopy2Clipboard.vue'
export default {
  title: `molecules|ButtonCopy2Clipboard`,
  parameters: {
    info: {
      summary: `molecules of ButtonCopy2Clipboard is great component.`
    }
  }
}

const template = `<button-copy-2-clipboard :src="src" />`

export const Default = () => ({
  components: { ButtonCopy2Clipboard },
  template,
  props: {
    src: {
      default: text('src', 'text')
    }
  }
})
