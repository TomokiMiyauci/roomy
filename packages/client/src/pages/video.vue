<template>
  <div>
    <v-btn @click="onClick" color="success">text</v-btn>
    <video ref="video" width="300px" autoplay>
      <track default kind="captions" />
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
