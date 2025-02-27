import imageUrl from './images/video.webm'

const getWebcamStream = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true })
  const video = document.getElementById('webcam')
  video.srcObject = stream
  return video
}

const getVideoStream = () => {
  const video = document.createElement('video')
  video.src = imageUrl
  video.load()
  video.muted = true
  video.loop = true
  return video
}

export const generateVideoElement = async () => {
  const curUrl = new URL(window.location.href)
  const isWebcamEnabled = curUrl.searchParams.size !== 0

  if (isWebcamEnabled) return await getWebcamStream()
  else return getVideoStream()
}
