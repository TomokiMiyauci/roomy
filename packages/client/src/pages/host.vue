<template>
  <div>
    <p>{{ store }}</p>
    <video
      id="local_video"
      autoplay
      style="width: 160px; height: 120px; border: 1px solid black;"
    ></video>
    <video
      id="global_video"
      autoplay
      style="width: 160px; height: 120px; border: 1px solid black;"
    ></video>
    <v-btn color="success" @click="init">INIT</v-btn>
    <v-btn color="success" @click="con">recieve</v-btn>
  </div>
</template>

<script lang="ts">
import { createComponent, reactive } from '@vue/composition-api'
import { firestore } from '@/plugins/firebase'
import { useFirestore } from '@/core/useFirestore'
type State = {
  peerConnetcion: RTCPeerConnection | undefined
  answer: string
  localStream: MediaStream | undefined
}
export default createComponent({
  setup() {
    const state = reactive<State>({
      peerConnetcion: undefined,
      answer: '',
      localStream: undefined
    })

    const store = useFirestore(firestore.collection('peer').doc('1'))
    // watch(store, (now, prev) => {
    //   if (!prev && !!now && 'answerSDP' in now) {
    //     console.log('get anwswer ===')
    //     console.log(now.answerSDP)
    //     createAnswer(now.answerSDP)
    //   }
    // })

    const startVideo = async () => {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      })

      state.localStream = mediaStream
      const videoElement = document.getElementById('local_video')

      playVideo(videoElement as HTMLVideoElement, mediaStream)
    }

    const setLocalVideo = (mediaStream: MediaStream) => {
      const el = document.getElementById('local_video') as HTMLVideoElement
      playVideo(el, mediaStream)
    }

    const createSessionDesc = (
      type: RTCSessionDescriptionInit['type'],
      sdp: string
    ): RTCSessionDescription => {
      return new RTCSessionDescription({
        type,
        sdp
      })
    }

    const con = async () => {
      const answerSDP = store.value!.answerSDP
      if (!answerSDP) return

      const sessionDesc = createSessionDesc('answer', answerSDP)
      await state.peerConnetcion!.setRemoteDescription(sessionDesc)
    }

    const createMediaStream = (): Promise<MediaStream> => {
      return navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      })
    }

    const createPeerConnection = (): RTCPeerConnection => {
      const configuration = { iceServers: [] }
      const peerConnection = new RTCPeerConnection(configuration)

      return peerConnection
    }

    const init = async () => {
      const mediaStream = await createMediaStream()
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

          sendOfferSDP(peer.localDescription)
        }
      }

      const sessionDesc = await state.peerConnetcion.createOffer()

      await state.peerConnetcion.setLocalDescription(sessionDesc)
    }

    const sendOfferSDP = async (sessionDescription: RTCSessionDescription) => {
      console.log('---sending offer sdp ---')
      await firestore
        .collection('peer')
        .doc('1')
        .set({
          offerSDP: sessionDescription.sdp
        })
    }

    const playVideo = (el: HTMLVideoElement, stream: MediaStream) => {
      el.srcObject = stream
      el.play()
      el.volume = 0
    }

    return { state, startVideo, store, init, con }
  }
})
</script>
