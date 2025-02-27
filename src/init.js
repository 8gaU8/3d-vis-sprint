/* eslint-disable import/no-unresolved */

import * as THREE from 'three'
import { VRButton } from 'three/addons/webxr/VRButton.js'

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
      1000,
    )
    camera.rotation.x = -Math.PI / 3.5
    camera.position.y = 10
    camera.position.z = 10
    return camera
  }
  if (cameraType === THREE.PerspectiveCamera) {
    const camera = new THREE.PerspectiveCamera(
      100,
      window.innerWidth / window.innerHeight,
      0.001,
      10000,
    )
    camera.position.y = 2
    camera.position.z = 1
    camera.rotation.y = -Math.PI
    return camera
  }

  return null
}

export const initRenderer = () => {
  // init
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.xr.enabled = true
  renderer.shadowMap.enabled = false
  document.body.appendChild(VRButton.createButton(renderer))
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  return renderer
}

export const initScene = () => {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xcccccc)
  return scene
}

export const initLights = (scene) => {
  const ambientLight = new THREE.AmbientLight(0x404040)
  ambientLight.name = 'ambientLight'
  scene.add(ambientLight)
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
  directionalLight.position.set(0, 1, 0)
  directionalLight.castShadow = true
  directionalLight.name = 'directionalLight'
  scene.add(directionalLight)
}
