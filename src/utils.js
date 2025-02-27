import * as THREE from 'three'

export const drawHelper = (scene) => {
  scene.add(new THREE.AxesHelper(1000))
}

export const onWindowResizeFactory = (camera, renderer) => {
  console.log('generated')
  const onWindowResize = () => {
    console.log('resize')
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  return onWindowResize
}
