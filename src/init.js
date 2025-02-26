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
  const canvas = document.querySelector('#c')
  const renderer = new THREE.WebGLRenderer({ antialias: true, canvas })
  renderer.shadowMap.enabled = true
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  return renderer
}
