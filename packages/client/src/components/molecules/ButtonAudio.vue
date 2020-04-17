<template>
  <v-btn icon x-large outlined @click="onPlay">
    <transition name="fade">
      <v-icon v-if="pause">{{ mdiPlayPause }}</v-icon>
      <v-icon v-else-if="playing">{{ mdiPause }}</v-icon>
      <v-icon v-else>{{ mdiMicrophone }}</v-icon>
    </transition>
  </v-btn>
</template>

<script lang="ts">
import { mdiMicrophone, mdiPause, mdiPlayPause } from '@mdi/js'
import { defineComponent, reactive, toRefs } from '@vue/composition-api'

type Props = {
  src: string
}

export default defineComponent({
  props: {
    src: {
      type: String,
      required: true
    }
  },

  setup(props: Props) {
    const state = reactive({
      playing: false,
      pause: false
    })

    const audio = document.createElement('audio')
    audio.src = props.src

    const onPlay = () => {
      audio.onplay = () => {
        state.playing = true
      }

      audio.onended = () => {
        state.playing = false
      }

      if (state.playing) {
        if (state.pause) {
          state.pause = false
          audio.play()
        } else {
          audio.pause()
          state.pause = true
        }
      } else {
        audio.play()
      }
    }

    return { ...toRefs(state), mdiMicrophone, mdiPause, mdiPlayPause, onPlay }
  }
})
</script>
