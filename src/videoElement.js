export const generateVideoElement = async () => {
  const video = document.createElement('video')

  if (import.meta.env.VITE_LOCAL_MODE === '1') {
    const videoUrl = new URL('./images/video.mp4', import.meta.url).href
    video.src = videoUrl
  } else {
    const videoUrl =
      'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_60fps_normal.mp4'
    video.src = videoUrl
    video.crossOrigin = 'anonymous'
  }

  video.load()
  video.muted = true
  video.loop = true
  return video
}
