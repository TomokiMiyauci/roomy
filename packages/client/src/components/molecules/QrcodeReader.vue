<template>
  <div
    ref="div"
    :class="{ fullscreen: fullscreen }"
    @fullscreenchange="onFullscreenChange"
  >
    <qrcode-stream @decode="onDecode" @init="onInit" v-if="!destroyed">
      <div
        v-if="!loading && !error"
        style="position:absolute;right:10px;bottom:10px"
      >
        <v-btn @click="requestFullscreen" icon
          ><v-icon>{{
            fullscreen ? mdiFullscreenExit : mdiFullscreen
          }}</v-icon></v-btn
        >
      </div>

      <v-row v-else class="fill-height" align="center" justify="center">
        <v-col cols="auto">
          <v-progress-circular
            :size="80"
            v-if="loading"
            color="primary"
            indeterminate
          ></v-progress-circular>
          <v-icon v-else size="80" color="warning">{{ mdiAlert }}</v-icon>
        </v-col>
      </v-row>
    </qrcode-stream>
  </div>
</template>

<script lang="ts">
import { mdiAlert, mdiFullscreen, mdiFullscreenExit } from '@mdi/js'
import { defineComponent, reactive, ref, toRefs } from '@vue/composition-api'
import { QrcodeStream } from 'vue-qrcode-reader'

export default defineComponent({
  components: {
    QrcodeStream
  },

  setup(_, { emit, root }) {
    const state = reactive({
      result: '',
      error: '',
      loading: false,
      destroyed: false
    })

    const onFullscreenChange = () => {
      fullscreen.value = document.fullscreen
    }

    const fullscreen = ref(false)

    const onDecode = (result: string) => {
      state.result = result
      emit('decode', result)
    }

    const onInit = async (promise: any) => {
      try {
        state.loading = true
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
      } finally {
        emit('error', state.error)
        state.loading = false
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
    }

    const reload = async () => {
      state.destroyed = true
      state.error = ''
      state.loading = false
      await root.$nextTick()
      state.destroyed = false
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
      mdiAlert,
      reload
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
