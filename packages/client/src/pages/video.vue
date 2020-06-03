<template>
  <div>
    <v-btn @click="onClick" color="success">text</v-btn>
    <video ref="video" width="300px">
      <track kind="captions" />
    </video>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

import { useMediaStream } from '@/core/useMediaStream'
export default defineComponent({
  setup() {
    const video = ref<HTMLVideoElement>()

    const onClick = async () => {
      video.value!.muted = true
      video.value!.autoplay = true
      const mediaStream = await useMediaStream({
        video: true
      }).catch(() => {
        alert()
      })

      if (!mediaStream) return

      video.value!.srcObject = mediaStream
      await video.value!.play()
    }
    return { onClick, video }
  }
})
</script>
