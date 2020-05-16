<template>
  <v-sheet class="text-center" height="200px">
    <v-btn @click="$emit('close')" class="mt-6" color="error"
      ><v-icon left>{{ mdiClose }}</v-icon
      >close</v-btn
    >
    <div>
      <template v-if="!isRecording">
        <v-btn @click="start" class="mt-3" fab>
          <template #loader>
            <mdi-microphone-settings />
          </template>
          <v-icon>{{ mdiMicrophone }}</v-icon>
        </v-btn>
      </template>

      <template v-else>
        <v-btn @click="stop" class="mt-3" fab>
          <template #loader>
            <mdi-microphone-settings />
          </template>
          <v-icon>{{ mdiPause }}</v-icon>
        </v-btn>
      </template>
    </div>
    <div v-show="!!blob">
      <v-btn @click="play" class="mt-3" icon>
        <template #loader>
          <mdi-microphone-settings />
        </template>
        <mdi-play />
      </v-btn>
      <v-btn @click="post" icon absolute right bottom
        ><v-icon>{{ mdiSend }}</v-icon></v-btn
      >
    </div>
  </v-sheet>
</template>

<script lang="ts">
import { mdiClose, mdiMicrophone, mdiPause, mdiSend } from '@mdi/js'
import { defineComponent } from '@vue/composition-api'

import MdiMicrophoneSettings from '@/components/atoms/MdiMicrophoneSettings.vue'
import MdiPlay from '@/components/atoms/MdiPlay.vue'
import useMediaRecorder from '@/core/useMediaRecorder'
import { storage } from '@/plugins/firebase'
import { createMessage } from '@/repositories/publicRoom'

export default defineComponent({
  components: {
    MdiPlay,
    MdiMicrophoneSettings
  },

  setup(_, { emit }) {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((mediaStream) => {
      setMediaStream(mediaStream)
    })

    const {
      isRecording,
      blob,
      start,
      stop,
      setMediaStream
    } = useMediaRecorder()

    const play = async () => {
      const audia = document.createElement('audio')

      audia.src = URL.createObjectURL(blob.value!)
      await audia.play()
    }

    const post = async () => {
      if (!blob.value) return
      const firstPath = 'test'
      const filePath = firstPath + '/' + blob.value.size
      const storageRef = storage.ref('test')
      const fileSnapshot = await storageRef.child(filePath).put(blob.value)

      const audioURL = await fileSnapshot.ref.getDownloadURL()

      await createMessage({
        kind: 'AUDIO',
        audioURL,
        size: fileSnapshot.totalBytes
      })

      emit('close')

      console.log(fileSnapshot)
    }
    return {
      mdiMicrophone,
      mdiClose,
      mdiSend,
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
