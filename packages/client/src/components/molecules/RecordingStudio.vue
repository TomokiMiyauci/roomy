<template>
  <v-sheet class="text-center" height="200px">
    <v-btn class="mt-6" color="error" @click="$emit('close')"
      ><v-icon left>{{ mdiClose }}</v-icon
      >close</v-btn
    >
    <div>
      <template v-if="!isRecording">
        <v-btn class="mt-3" fab @click="start">
          <template #loader>
            <mdi-microphone-settings />
          </template>
          <v-icon>{{ mdiMicrophone }}</v-icon>
        </v-btn>
      </template>

      <template v-else>
        <v-btn class="mt-3" fab @click="stop">
          <template #loader>
            <mdi-microphone-settings />
          </template>
          <v-icon>{{ mdiPause }}</v-icon>
        </v-btn>
      </template>
    </div>
    <div v-show="!!blob">
      <v-btn class="mt-3" icon @click="play">
        <template #loader>
          <mdi-microphone-settings />
        </template>
        <mdi-play />
      </v-btn>
      <v-btn icon absolute right bottom @click="post"
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
import { createMessage } from '@/repositories/message'
import { updateRecent } from '@/repositories/room'

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
      updateRecent('post audio')
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
