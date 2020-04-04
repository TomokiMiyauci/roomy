<template>
  <div ref="div"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@vue/composition-api'
import QRCode from 'qrcode'

type Props = {
  text: string
}

export default defineComponent({
  props: {
    text: {
      type: String,
      required: true
    }
  },
  setup(props: Props) {
    const div = ref<HTMLDivElement>()

    onMounted(async () => {
      if (!div.value) return
      div.value.innerHTML = await generateQR(props.text)
    })

    const generateQR = (text: string) => {
      return QRCode.toString(text, {
        type: 'svg'
      })
    }

    return { div }
  }
})
</script>
