<template>
  <div>
    <video ref="video" autoplay><track default kind="captions" /></video>
    <video ref="videoLocal" autoplay><track default kind="captions" /></video>

    <v-btn
      @click="onCreateVideo"
      v-if="login"
      color="primary"
      dark
      absolute
      fab
      small
      style="bottom:160px"
      right
      ><v-icon>{{ mdiPhoneRing }}</v-icon></v-btn
    >
    <nuxt-link to="./stream/1">Stream</nuxt-link>
  </div>
</template>
<script lang="ts">
import { mdiPhoneRing } from '@mdi/js'
import { defineComponent, ref } from '@vue/composition-api'

import { useMediaStream } from '@/core/useMediaStream'
import { createStream } from '@/repositories/p/stream'
import { user } from '@/store'
export default defineComponent({
  setup() {
    const video = ref<HTMLVideoElement>()
    const videoLocal = ref<HTMLVideoElement>()

    const onCreateVideo = async () => {
      const mediaStream = await useMediaStream({
        video: true,
        audio: false
      })

      video.value!.srcObject = mediaStream
      video.value!.play()

      const Peer = (await import('skyway-js')).default

      const peer = new Peer({
        key: process.env.SKYWAY_KEY!,
        debug: 3
      })

      peer.on('open', async () => {
        console.log(peer.id)
        const result = await createStream(peer.id)
        console.log(result)
      })

      peer.on('call', (conn) => {
        console.log(conn, 22222222222222222)
        conn.answer(mediaStream)

        videoLocal.value!.srcObject = conn.localStream
        videoLocal.value!.play()
      })
    }
    const to = ref('')

    return { login: user.login, to, onCreateVideo, mdiPhoneRing, video }
  }
})
</script>
