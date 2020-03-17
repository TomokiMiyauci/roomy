<template>
  <v-sheet class="text-center" height="200px">
    <v-btn class="mt-6" color="error" @click="$emit('close')"
      ><v-icon left>{{ mdiClose }}</v-icon
      >close</v-btn
    >
    {{ blob }}
    <div>
      <template v-if="!isRecording">
        <v-btn class="mt-3" fab @click="start">
          <template #loader>
            <v-icon>{{ mdiMicrophoneSettings }}</v-icon>
          </template>
          <v-icon>{{ mdiMicrophone }}</v-icon>
        </v-btn>
      </template>

      <template v-else>
        <v-btn class="mt-3" fab @click="stop">
          <template #loader>
            <v-icon>{{ mdiMicrophoneSettings }}</v-icon>
          </template>
          <v-icon>{{ mdiPause }}</v-icon>
        </v-btn>
      </template>
    </div>
    <div v-show="!!blob">
      <v-btn class="mt-3" icon @click="play">
        <template #loader>
          <v-icon>{{ mdiMicrophoneSettings }}</v-icon>
        </template>
        <v-icon>{{ mdiPlay }}</v-icon>
      </v-btn>
      <v-btn icon absolute right bottom @click="post"
        ><v-icon>{{ mdiSend }}</v-icon></v-btn
      >
    </div>
  </v-sheet>
</template>

<script lang="ts">
import {
  mdiMicrophone,
  mdiMicrophoneSettings,
  mdiClose,
  mdiPlay,
  mdiSend,
  mdiPause
} from '@mdi/js'
import { createComponent } from '@vue/composition-api'
import firebase, { storage, firestore } from '@/plugins/firebase'
import useMediaRecorder from '@/core/useMediaRecorder'
export default createComponent({
  setup() {
    // const state = reactive<{ isRecording: boolean; blob: Blob | undefined }>({
    //   isRecording: false,
    //   blob: undefined
    // })

    const { isRecording, blob, start, stop } = useMediaRecorder()

    // onMounted(async () => {
    //   const { isRecording, blob } = await useMediaRecorder()

    //   return { isRecording }
    // })

    // const onRecord = async () => {
    //   if (!navigator.getUserMedia) return
    //   state.isRecording = true
    //   state.blob = undefined

    //   const stream = await navigator.mediaDevices.getUserMedia({
    //     audio: true
    //   })

    //   mediaRecorder = new MediaRecorder(stream, {
    //     mimeType: 'video/webm;codecs=vp9'
    //   })

    //   console.log(mediaRecorder)

    //   mediaRecorder.start()

    //   // mediaRecorder.ondataavailable = (e: any) => {
    //   //   console.log(12312, e)
    //   // }

    //   console.log('recorder started')

    //   //  stop.onclick = function() {
    //   //      mediaRecorder.stop();
    //   //      console.log("recorder stopped");
    //   //  }

    //   mediaRecorder.onstart = (e: any) => {
    //     console.log(111, e)
    //   }

    //   mediaRecorder.ondataavailable = (e: any) => {
    //     console.log(222, e)
    //     state.blob = e.data
    //   }

    //   mediaRecorder.onstop = () => {
    //     state.isRecording = false
    //     console.log(11222)
    //   }
    // }

    const play = async () => {
      const audia = document.createElement('audio')

      audia.src = URL.createObjectURL(blob.value!)
      await audia.play()
    }

    // const stop = () => {
    //   mediaRecorder.stop()
    // }

    const post = async () => {
      if (!blob.value) return
      const firstPath = 'test'
      const filePath = firstPath + '/' + blob.value.size
      const storageRef = storage.ref('test')
      const fileSnapshot = await storageRef.child(filePath).put(blob.value)
      firestore.collection('public').add({
        kind: 'AUDIO',
        text: 'This is audio',
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      })
      console.log(fileSnapshot)
    }
    return {
      mdiMicrophone,
      mdiMicrophoneSettings,
      mdiClose,
      mdiSend,
      mdiPlay,
      start,
      stop,
      mdiPause,
      isRecording,
      play,
      post,
      blob
    }
  }
})
</script>
