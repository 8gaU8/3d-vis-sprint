import videoUrl from './images/video.mp4'

export const generateVideoElement = () => {
  const video = document.createElement('video')
  console.log(videoUrl)
  video.src = videoUrl
  video.load()
  video.muted = true
  video.loop = true
  return video
}
