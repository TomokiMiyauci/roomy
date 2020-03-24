export const createSessionDesc = (
  type: RTCSessionDescriptionInit['type'],
  sdp: string
): RTCSessionDescription => {
  return new RTCSessionDescription({
    type,
    sdp
  })
}

export const createPeerConnection = (
  configuration: RTCConfiguration = { iceServers: [] }
): RTCPeerConnection => {
  return new RTCPeerConnection(configuration)
}
