export const useMediaStream = (
  constrains: MediaStreamConstraints
): Promise<MediaStream> => {
  return navigator.mediaDevices.getUserMedia(constrains)
}
