import * as THREE from 'three'

import { createPoints } from './pointObjectHelpers'
import {
  colorspaceFragementShader,
  colorspaceVertexShader,
  shadowFragmentShader,
  shadowVertexShader,
  colorspaceMacros,
} from './shaders'

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

export const createFloor = () => {
  const geometry = new THREE.PlaneGeometry(10, 10)
  const material = new THREE.MeshLambertMaterial({ color: 0xffffff })
  const floor = new THREE.Mesh(geometry, material)
  floor.position.y = -0.01
  floor.rotation.x = -Math.PI / 2
  floor.receiveShadow = false
  return floor
}

const createVideoPlane = (video) => {
  const texture = new THREE.VideoTexture(video)

  texture.minFilter = THREE.NearestFilter
  texture.magFilter = THREE.NearestFilter
  texture.generateMipmaps = false
  texture.format = THREE.RGBAFormat

  // building objects
  const objsHeight = 1

  // build video plane
  const videoPlaneWidth = 2
  const videoPlaneHeight = (videoPlaneWidth * video.videoHeight) / video.videoWidth
  const videoPlane = createTexturePlane(texture, videoPlaneWidth, videoPlaneHeight)
  videoPlane.translateY(objsHeight)
  videoPlane.name = 'videoPlane'
  return videoPlane
}

const createColorspaceObjects = (colorspaceObjectsParameters) => {
  const { uniforms, selectedColorSpace, step, video } = colorspaceObjectsParameters
  const texture = new THREE.VideoTexture(video)

  texture.minFilter = THREE.NearestFilter
  texture.magFilter = THREE.NearestFilter
  texture.generateMipmaps = false
  texture.format = THREE.RGBAFormat

  // building objects
  const height = video.videoHeight
  const width = video.videoWidth
  const objsHeight = 1

  const colorspaceObjects = new THREE.Group()

  uniforms.tex.value = texture

  console.log('eselected macro:', selectedColorSpace, colorspaceMacros[selectedColorSpace])
  const pointObject = createPoints(
    uniforms,
    colorspaceMacros[selectedColorSpace],
    step,
    height,
    width,
    colorspaceVertexShader,
    colorspaceFragementShader,
  )
  pointObject.translateY(objsHeight)
  colorspaceObjects.add(pointObject)

  const pointShadowObject = createPoints(
    uniforms,
    colorspaceMacros[selectedColorSpace],
    step,
    height,
    width,
    shadowVertexShader,
    shadowFragmentShader,
  )

  colorspaceObjects.add(pointShadowObject)
  colorspaceObjects.name = 'colorspaceObjects'

  return colorspaceObjects
}

export const updateObjects = (scene, colorspaceObjectsParameters) => {
  const videoPlaneObject = createVideoPlane(colorspaceObjectsParameters.video)
  const previousVideoPlaneObject = scene.getObjectByName(videoPlaneObject.name)
  if (previousVideoPlaneObject) scene.remove(previousVideoPlaneObject)
  scene.add(videoPlaneObject)

  const colorspaceObjects = createColorspaceObjects(colorspaceObjectsParameters)
  const previousColorspaceObjects = scene.getObjectByName(colorspaceObjects.name)
  if (previousColorspaceObjects) scene.remove(previousColorspaceObjects)
  scene.add(colorspaceObjects)
}
