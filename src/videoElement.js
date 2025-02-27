import imageUrl from './images/video.webm'
export const generateVideoElement = async () => {
  const video = document.createElement('video')

  video.src = imageUrl // 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  console.log(video.src)
  video.load()
  video.muted = true
  video.loop = true
  return video
}
