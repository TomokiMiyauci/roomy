export const playVideo = (el: HTMLVideoElement, stream: MediaStream): void => {
  el.srcObject = stream
  el.volume = 0
  el.play()
}
