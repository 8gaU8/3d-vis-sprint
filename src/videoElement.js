export const generateVideoElement = () => {
  const video = document.createElement('video')
  const videoUrl =
    'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_normal.mp4'
  console.log(videoUrl)
  video.src = videoUrl
  video.crossOrigin = 'anonymous'
  video.load()
  video.muted = true
  video.loop = true
  return video
}
