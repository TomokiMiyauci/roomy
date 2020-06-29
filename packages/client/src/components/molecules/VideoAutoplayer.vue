<template>
  <video
    ref="video"
    v-bind="$attrs"
    style="position:absolute;top:0;right:0;bottom:0;left:0;"
  >
    <track default kind="captions" />
  </video>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@vue/composition-api'
export default defineComponent({
  props: {
    stream: {
      required: true
    }
  },

  setup(props: { stream: MediaStream }) {
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
