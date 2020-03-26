import { number, text } from '@storybook/addon-knobs'

import ChipDate from '@/components/atoms/ChipDate.vue'

export default {
  title: `atoms|ChipDate`,
  parameters: {
    info: {
      summary: `atoms of ChipDate is great component.`
    }
  }
}

const template = `<chip-date :unixtime="unixtime" :format="format" />`

export const Default = () => ({
  components: { ChipDate },
  template,
  props: {
    unixtime: {
      default: number('unixtime', 158024062400)
    },

    format: {
      default: text('format', '')
    }
  }
})
