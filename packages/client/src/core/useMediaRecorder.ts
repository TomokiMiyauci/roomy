import { reactive, toRefs, onBeforeMount, watch } from '@vue/composition-api'

type State = {
  isRecording: boolean
  blob: Blob | undefined
  mediaStream: MediaStream | undefined
  mediaRecorder: MediaRecorder | undefined
}

const useMediaRecorder = () => {
  const state = reactive<State>({
    isRecording: false,
    blob: undefined,
    mediaStream: undefined,
    mediaRecorder: undefined
  })

  onBeforeMount(async () => {
    console.log(1)

    state.mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true
    })
  })

  watch(
    () => state.mediaStream,
    (now) => {
      if (!now) return
      state.mediaRecorder = new MediaRecorder(state.mediaStream!)

      state.mediaRecorder!.onstart = () => {
        state.isRecording = true
      }

      state.mediaRecorder!.onstop = () => {
        state.isRecording = false
      }

      state.mediaRecorder!.ondataavailable = (blobEvent) => {
        state.blob = blobEvent.data
      }
    }
  )

  const start = () => {
    state.mediaRecorder!.start()
  }

  const stop = () => {
    state.mediaRecorder!.stop()
  }

  return { ...toRefs(state), start, stop }
}

export default useMediaRecorder
