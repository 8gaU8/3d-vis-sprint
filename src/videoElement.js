export const generateVideoElement = async () => {
  const video = document.createElement('video')

  video.src = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  video.crossOrigin = 'anonymous'
  console.log(video.src)
  video.load()
  video.muted = true
  video.loop = true
  return video
}
