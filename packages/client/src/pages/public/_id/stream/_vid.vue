<template>
  <div>
    <video ref="video" autoplay><track default kind="captions" /></video>
    <video ref="videoLocal" autoplay><track default kind="captions" /></video>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from '@vue/composition-api'

import { useMediaStream } from '@/core/useMediaStream'
import { getStream } from '@/repositories/p/stream'

export default defineComponent({
  setup() {
    const video = ref<HTMLVideoElement>()
    const videoLocal = ref<HTMLVideoElement>()

    onBeforeMount(async () => {
      const mediaStream = await useMediaStream({
        video: true,
        audio: false
      })

      video.value!.srcObject = mediaStream
      video.value!.play()
      const result = await getStream()
      const data = result.data()
      console.log(data!.peerId)
      const Peer = (await import('skyway-js')).default

      const peer = new Peer({
        key: process.env.SKYWAY_KEY!,
        debug: 3
      })

      peer.on('open', () => {
        const mediaConnection = peer.call(data!.peerId, mediaStream)
        videoLocal.value!.srcObject = mediaConnection.localStream
        videoLocal.value!.play()
        console.log(mediaConnection.localStream)
      })
    })

    return { video, videoLocal }
  }
})
</script>
