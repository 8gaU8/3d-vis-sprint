import * as THREE from 'three'

export const drawHelper = (scene) => {
  scene.add(new THREE.AxesHelper(1000))
}
