<template>
  <v-container class="fill-height">
    <v-row class="fill-height">
      <v-col>
        <!-- <video
          id="local_video"
          autoplay
          style="width:100%;height:100%;border: 1px solid black;"
        ></video> -->
      </v-col>
      <v-col>
        <!-- <video
          id="global_video"
          autoplay
          style="width:100%;height:100%;border:1px solid black;"
        ></video> -->
      </v-col>
    </v-row>
    <v-btn @click="init" color="success">INIT</v-btn>
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
import { createP2P } from '@/repositories/p2p'
import { playVideo } from '@/utils/dom'

type State = {
  peerConnetcion: RTCPeerConnection | undefined
  localStream: MediaStream | undefined
}
export default defineComponent({
  setup() {
    const state = reactive<State>({
      peerConnetcion: undefined,
      localStream: undefined
    })

    const store = useFirestore(firestore.collection('p2p').doc('1'))

    const setLocalVideo = (mediaStream: MediaStream) => {
      const el = document.getElementById('local_video') as HTMLVideoElement
      playVideo(el, mediaStream)
    }

    const con = async () => {
      const answerSDP = store.value!.answerSDP
      if (!answerSDP) return

      const sessionDesc = createSessionDesc('answer', answerSDP)
      await state.peerConnetcion!.setRemoteDescription(sessionDesc)
    }

    const init = async () => {
      const mediaStream = await useMediaStream({
        video: true,
        audio: false
      })
      state.localStream = mediaStream

      setLocalVideo(state.localStream)

      const peer = createPeerConnection()

      console.log('Adding local stream...')
      state.localStream.getTracks().forEach((track) => {
        peer.addTrack(track, state.localStream!)
      })
      state.peerConnetcion = peer

      state.peerConnetcion.ontrack = (e) => {
        console.log('-- peer.ontrack()')
        const el = document.getElementById('global_video') as HTMLVideoElement
        playVideo(el, e.streams[0])
      }

      state.peerConnetcion.onicecandidate = (e) => {
        if (e.candidate) {
          console.log(e.candidate)
        } else {
          console.log('empty ice event')
          console.log(peer.localDescription)

          if (!peer.localDescription) return

          createP2P(peer.localDescription.sdp)
        }
      }

      const sessionDesc = await state.peerConnetcion.createOffer()

      await state.peerConnetcion.setLocalDescription(sessionDesc)
    }

    const stop = watch(store, (now, prev) => {
      if (
        !!now &&
        'answerSDP' in now &&
        prev &&
        now.updatedAt > prev.updatedAt
      ) {
        con()
        console.log(1)
      }
    })

    onUnmounted(() => {
      stop()
    })

    return { init }
  }
})
</script>
