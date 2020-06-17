<template>
  <v-container>
    <video id="local_video" autoplay style="width:400px;border:1px solid black">
      <track default kind="captions" srclang="en" />
    </video>

    <video
      id="global_video"
      autoplay
      style="width:500px;border:1px solid black"
    >
      <track default kind="captions" srclang="en" />
    </video>
  </v-container>
</template>

<script lang="ts">
import {
  defineComponent,
  onUnmounted,
  reactive,
  watch
} from '@vue/composition-api'

import { useFirestore } from '@/core/useFirestore'
import { useMediaStream } from '@/core/useMediaStream'
import { createPeerConnection, createSessionDesc } from '@/core/useRTC'
import { firestore } from '@/plugins/firebase'
import { updateP2P } from '@/repositories/p2p'
import { playVideo } from '@/utils/dom'

type State = {
  mediaStream: MediaStream | undefined
  peerConnection: RTCPeerConnection | undefined
}

export default defineComponent({
  setup() {
    const state = reactive<State>({
      mediaStream: undefined,
      peerConnection: undefined
    })

    const init = async () => {
      const offerSDP = store.value!.offerSDP
      if (!offerSDP) return
      state.mediaStream = await useMediaStream({
        video: true,
        audio: false
      })
      setLocalVideo(state.mediaStream)

      state.peerConnection = createPeerConnection()
      if (!state.peerConnection) return

      console.log('Adding local stream...')
      state.mediaStream.getTracks().forEach((track) => {
        state.peerConnection!.addTrack(track, state.mediaStream!)
      })

      state.peerConnection.ontrack = (e) => {
        console.log('-- peer.ontrack()')
        const el = document.getElementById('global_video') as HTMLVideoElement
        playVideo(el, e.streams[0])
      }

      state.peerConnection.onicecandidate = (e) => {
        if (e.candidate) {
          console.log(e.candidate)
        } else {
          console.log('empty ice event')

          if (!state.peerConnection || !state.peerConnection.localDescription)
            return

          updateP2P('1', state.peerConnection.localDescription.sdp)
        }
      }

      const sessionDesc = createSessionDesc('offer', offerSDP)
      await state.peerConnection.setRemoteDescription(sessionDesc)

      const session = await state.peerConnection.createAnswer()
      await state.peerConnection.setLocalDescription(session)
    }

    const setLocalVideo = (mediaStream: MediaStream) => {
      const el = document.getElementById('local_video') as HTMLVideoElement
      playVideo(el, mediaStream)
    }

    const { dataRef: store } = useFirestore(
      firestore.collection('p2p').doc('1')
    )

    const stop = watch(store, (now, prev) => {
      if (!!now && 'offerSDP' in now && !prev) {
        alert()
        init()
        console.log(now, prev)
      }
    })

    onUnmounted(() => {
      stop()
    })
  }
})
</script>
