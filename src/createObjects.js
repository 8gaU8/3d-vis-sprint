import * as THREE from 'three'

import { createPoints } from './pointObjectHelpers'
import { fragmentShader, fragmentShadowShader, vertexShader, vertexShadowShader } from './shaders'

const createTexturePlane = (texture, videoPlaneWidth, videoPlaneHeight) => {
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

const createColorSpacePoint = (uniforms, height, width) => {
  return createPoints(uniforms, height, width, vertexShader, fragmentShader)
}

const createShadowColorSpacePoint = (uniforms, height, width) => {
  return createPoints(uniforms, height, width, vertexShadowShader, fragmentShadowShader, {
    transparent: false,
  })
}

export const createFloor = () => {
  const geometry = new THREE.PlaneGeometry(10, 10)
  const material = new THREE.MeshLambertMaterial({ color: 0xffffff })
  const floor = new THREE.Mesh(geometry, material)
  floor.position.y = -0.01
  floor.rotation.x = -Math.PI / 2
  floor.receiveShadow = false
  return floor
}

export const createVideoObjects = (uniforms, video, scene) => {
  const texture = new THREE.VideoTexture(video)

  texture.minFilter = THREE.NearestFilter
  texture.magFilter = THREE.NearestFilter
  texture.generateMipmaps = false
  texture.format = THREE.RGBAFormat

  // building objects
  const height = video.videoHeight
  const width = video.videoWidth

  // build video plane
  const videoPlaneWidth = 2
  const videoPlaneHeight = (videoPlaneWidth * video.videoHeight) / video.videoWidth
  const videoPlane = createTexturePlane(texture, videoPlaneWidth, videoPlaneHeight)
  scene.add(videoPlane)

  uniforms.tex.value = texture

  const pointObject = createColorSpacePoint(uniforms, height, width)
  scene.add(pointObject)

  const pointShadowObject = createShadowColorSpacePoint(uniforms, height, width)
  scene.add(pointShadowObject)
}
