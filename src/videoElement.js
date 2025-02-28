import imageUrl from './images/video.webm'

const getWebcamStream = async () => {
  const video = document.getElementById('webcam')
  const stream = await navigator.mediaDevices.getUserMedia({ video: true })
  video.srcObject = stream
  return video
}

const getVideoStream = () => {
  const video = document.getElementById('video')
  video.src = imageUrl
  video.load()
  video.muted = true
  video.loop = true
  return video
}

export const generateVideoElement = async (useWebcam = false) => {
  if (useWebcam) return await getWebcamStream()
  else return getVideoStream()
}
