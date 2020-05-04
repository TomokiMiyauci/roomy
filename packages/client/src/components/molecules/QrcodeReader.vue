<template>
  <div
    ref="div"
    :class="{ fullscreen: fullscreen }"
    @fullscreenchange="onFullscreenChange"
  >
    <p class="error">{{ error }}</p>
    <qrcode-stream @decode="onDecode" @init="onInit">
      <div style="position:absolute;right:10px;bottom:10px">
        <v-btn @click="requestFullscreen" icon
          ><v-icon>{{ mdiCameraRetake }}</v-icon></v-btn
        >
        <v-btn @click="requestFullscreen" icon
          ><v-icon>{{
            fullscreen ? mdiFullscreenExit : mdiFullscreen
          }}</v-icon></v-btn
        >
      </div>
    </qrcode-stream>
  </div>
</template>

<script lang="ts">
import { mdiCameraRetake, mdiFullscreen, mdiFullscreenExit } from '@mdi/js'
import { defineComponent, reactive, ref, toRefs } from '@vue/composition-api'
import { QrcodeStream } from 'vue-qrcode-reader'
export default defineComponent({
  components: {
    QrcodeStream
  },

  setup() {
    const state = reactive({
      result: '',
      error: ''
    })

    const onFullscreenChange = () => {
      fullscreen.value = document.fullscreen
    }

    const fullscreen = ref(false)

    const onDecode = (result: string) => {
      state.result = result
    }

    const onInit = async (promise: any) => {
      try {
        await promise
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          state.error = 'ERROR: you need to grant camera access permisson'
        } else if (error.name === 'NotFoundError') {
          state.error = 'ERROR: no camera on this device'
        } else if (error.name === 'NotSupportedError') {
          state.error = 'ERROR: secure context required (HTTPS, localhost)'
        } else if (error.name === 'NotReadableError') {
          state.error = 'ERROR: is the camera already in use?'
        } else if (error.name === 'OverconstrainedError') {
          state.error = 'ERROR: installed cameras are not suitable'
        } else if (error.name === 'StreamApiNotSupportedError') {
          state.error = 'ERROR: Stream API is not supported in this browser'
        }
      }
    }

    const div = ref<HTMLDivElement>()

    const requestFullscreen = () => {
      const elem = div.value!

      if (document.fullscreen) {
        document.exitFullscreen()
      } else {
        elem.requestFullscreen()
      }

      // if (elem.requestFullscreen) {
      //   elem.requestFullscreen();
      // } else if (elem.mozRequestFullScreen) { /* Firefox */
      //   elem.mozRequestFullScreen();
      // } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      //   elem.webkitRequestFullscreen();
      // } else if (elem.msRequestFullscreen) { /* IE/Edge */
      //   elem.msRequestFullscreen();
      // }
    }

    return {
      div,
      onDecode,
      onInit,
      ...toRefs(state),
      fullscreen,
      onFullscreenChange,
      requestFullscreen,
      mdiFullscreen,
      mdiFullscreenExit,
      mdiCameraRetake
    }
  }
})
</script>

<style scoped>
.fullscreen {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
}
</style>
