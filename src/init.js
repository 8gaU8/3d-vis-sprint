import {GUI} from 'lil-gui'
import * as THREE from 'three'

export const initCamera = (cameraType) => {
  if (cameraType === THREE.OrthographicCamera) {
    const frustumSize = 40
    const aspect = window.innerWidth / window.innerHeight
    const camera = new THREE.OrthographicCamera(
      (frustumSize * aspect) / -2,
      (frustumSize * aspect) / 2,
      frustumSize / 2,
      frustumSize / -2,
      0.1,
      10000,
    )
    camera.rotation.x = -Math.PI / 3.5
    camera.position.y = 10
    camera.position.z = 10
    return camera
  }
  if (cameraType === THREE.PerspectiveCamera) {
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 50)
    camera.position.z = 5
    return camera
  }

  throw new Error('Unknown camera type')
}

export const initRenderer = () => {
  // init
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.shadowMap.enabled = true
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  return renderer
}

export const initGUI = (uniforms, video) => {
  const gui = new GUI()
  const colorSpaceGUI = gui.addFolder('Color Space')
  const csNameMap = {
    RGB: 0,
    XYZ: 1,
    XYy: 2,
    LAB: 3,
  }

  colorSpaceGUI
    .add({ 'Color Space': 'RGB' }, 'Color Space', ['RGB', 'XYZ', 'XYy', 'LAB'])
    .onChange((value) => {
      uniforms.type.value = csNameMap[value]
    })

  const pausePlayObj = {
    pausePlay: () => {
      if (!video.paused) {
        video.pause()
      } else {
        video.play()
      }
    },
    add10sec: () => {
      video.currentTime = video.currentTime + 10
    },
  }

  const videoGUI = gui.addFolder('Video')
  videoGUI.add(pausePlayObj, 'pausePlay')
  videoGUI.add(pausePlayObj, 'add10sec')
}


export const initScene = () => {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xcccccc)
  return scene
}