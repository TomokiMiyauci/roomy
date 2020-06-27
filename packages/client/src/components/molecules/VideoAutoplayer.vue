<template>
  <video
    ref="video"
    v-bind="$attrs"
    style="position:absolute;right:0;bottom:0;"
  >
    <track default kind="captions" />
  </video>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from '@vue/composition-api'
export default defineComponent({
  props: {
    stream: {
      type: Object as PropType<MediaStream>,
      required: true
    }
  },

  setup(props) {
    const video = ref<HTMLVideoElement>()

    onMounted(() => {
      if (!video.value) return
      video.value.srcObject = props.stream
      video.value.play()
    })

    return { video }
  }
})
</script>
