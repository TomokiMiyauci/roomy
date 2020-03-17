import { reactive, toRefs } from '@vue/composition-api'

type State = {
  isRecording: boolean
  blob: Blob | undefined
  mediaRecorder: MediaRecorder | undefined
}

const useMediaRecorder = () => {
  const state = reactive<State>({
    isRecording: false,
    blob: undefined,
    mediaRecorder: undefined
  })

  const setMediaStream = (mediaStream: MediaStream) => {
    state.mediaRecorder = new MediaRecorder(mediaStream)

    state.mediaRecorder.onstart = () => {
      state.isRecording = true
    }

    state.mediaRecorder.onstop = () => {
      state.isRecording = false
    }

    state.mediaRecorder.ondataavailable = (blobEvent) => {
      state.blob = blobEvent.data
    }
  }

  const start = () => {
    state.mediaRecorder!.start()
  }

  const stop = () => {
    state.mediaRecorder!.stop()
  }

  return { ...toRefs(state), start, stop, setMediaStream }
}

export default useMediaRecorder
