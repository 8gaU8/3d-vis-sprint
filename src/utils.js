import * as THREE from 'three'

export const drawHelper = (scene) => {
  scene.add(new THREE.AxesHelper(1000))
}

export const onWindowResizeFactory = (camera, renderer) => {
  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  return onWindowResize
}

export const loadTextureAsync = (url) => {
  return new Promise((resolve, reject) => {
    const loader = new THREE.TextureLoader()
    loader.load(url, resolve, undefined, reject)
  })
}
