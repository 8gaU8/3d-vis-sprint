export const generateVideoElement = async () => {
  const video = document.createElement('video')

  if (import.meta.env.MODE === 'httpslocal') {
    const videoUrl = new URL('./images/video.mp4', import.meta.url).href
    video.src = videoUrl
  } else {
    const videoUrl = 'https://github.com/8gaU8/3d-vis-sprint/releases/download/video/video.mp4'
    video.src = videoUrl
    video.crossOrigin = 'anonymous'
  }
  console.log(video.src)
  video.load()
  video.muted = true
  video.loop = true
  return video
}
