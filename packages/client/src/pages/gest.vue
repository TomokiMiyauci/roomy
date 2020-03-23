<template>
  <v-container>
    <video
      id="local_video"
      autoplay
      style="width:400px;border:1px solid black"
    />
    <video
      id="global_video"
      autoplay
      style="width:500px;border:1px solid black"
    />
    <v-btn color="success" @click="init">init</v-btn>
  </v-container>
</template>

<script lang="ts">
import { createComponent, reactive } from '@vue/composition-api'
// import { rtc } from '@/store'
import { firestore } from '@/plugins/firebase'
import { useFirestore } from '@/core/useFirestore'

type State = {
  mediaStream: MediaStream | undefined
  peerConnection: RTCPeerConnection | undefined
}

export default createComponent({
  setup() {
    const state = reactive<State>({
      mediaStream: undefined,
      peerConnection: undefined
    })

    const init = async () => {
      const offerSDP = store.value!.offerSDP
      if (!offerSDP) return
      state.mediaStream = await createMediaStream()
      setLocalVideo(state.mediaStream)

      const peer = createPeerConnection()

      console.log('Adding local stream...')
      state.mediaStream.getTracks().forEach((track) => {
        peer.addTrack(track, state.mediaStream!)
      })
      state.peerConnection = peer

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
          console.log(peer.localDescription)

          if (!peer.localDescription) return

          sendAnswerSdp(peer.localDescription.sdp)
        }
      }

      const sessionDesc = createSessionDesc('offer', offerSDP)
      await state.peerConnection.setRemoteDescription(sessionDesc)

      const session = await state.peerConnection.createAnswer()
      await state.peerConnection.setLocalDescription(session)
    }

    const createMediaStream = (): Promise<MediaStream> => {
      return navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      })
    }

    const playVideo = (el: HTMLVideoElement, stream: MediaStream) => {
      el.srcObject = stream
      el.play()
      el.volume = 0
    }

    const setLocalVideo = (mediaStream: MediaStream) => {
      const el = document.getElementById('local_video') as HTMLVideoElement
      playVideo(el, mediaStream)
    }

    const store = useFirestore(firestore.collection('peer').doc('1'))

    // watch(async () => {
    //   state.mediaStream = await navigator.mediaDevices.getUserMedia({
    //     video: true
    //   })
    //   const el = document.getElementById('gest') as HTMLVideoElement
    //   if (el) {
    //     el.srcObject = state.mediaStream
    //     createOfferSDP(store.value!.offerSDP)
    //   }
    // })

    // watch(store, (now, prev) => {
    //   if (!prev && !!now && 'offerSDP' in now) {
    //     createOfferSDP(now.offerSDP)
    //   }
    // })

    const createSessionDesc = (
      type: RTCSessionDescriptionInit['type'],
      sdp: string
    ): RTCSessionDescription => {
      return new RTCSessionDescription({
        type,
        sdp
      })
    }

    const createPeerConnection = (): RTCPeerConnection => {
      const configuration = { iceServers: [] }
      const peerConnection = new RTCPeerConnection(configuration)

      return peerConnection
    }

    const sendAnswerSdp = async (answerSDP: string) => {
      console.log('---sending sdp ---')
      await firestore
        .collection('peer')
        .doc('1')
        .update({
          answerSDP
        })
    }

    return { init }
  }
})
</script>
