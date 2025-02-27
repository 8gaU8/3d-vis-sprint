import * as THREE from 'three'

import { createPoints } from './createPoints'
import { fragmentShader, fragmentShadowShader, vertexShader, vertexShadowShader } from './shaders'

export const createVideoPlane = (texture, videoPlaneWidth, videoPlaneHeight) => {
  // build video plane
  const videoPlaneGeometry = new THREE.PlaneGeometry(videoPlaneWidth, videoPlaneHeight)
  const videoMaterial = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide })
  const videoPlane = new THREE.Mesh(videoPlaneGeometry, videoMaterial)
  videoPlane.position.z = -0.5
  videoPlane.position.y = videoPlaneHeight / 2
  videoPlane.receiveShadow = false
  videoPlane.castShadow = false
  return videoPlane
}

export const createColorSpacePoint = (uniforms, height, width) => {
  return createPoints(uniforms, height, width, vertexShader, fragmentShader)
}

export const createShadowColorSpacePoint = (uniforms, height, width) => {
  return createPoints(uniforms, height, width, vertexShadowShader, fragmentShadowShader, {
    transparent: false,
  })
}
