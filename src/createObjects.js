import * as THREE from 'three'

import { createPoints } from './pointObjectHelpers'
import {
  colorspaceFragementShader,
  colorspaceVertexShader,
  shadowFragmentShader,
  shadowVertexShader,
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

export const createVideoObjects = (scene, uniforms, colorspaceMacro, video) => {
  const previousVideoObjects = scene.getObjectByName('videoObjects')
  if (previousVideoObjects) scene.remove(previousVideoObjects)

  const texture = new THREE.VideoTexture(video)

  texture.minFilter = THREE.NearestFilter
  texture.magFilter = THREE.NearestFilter
  texture.generateMipmaps = false
  texture.format = THREE.RGBAFormat

  // building objects
  const height = video.videoHeight
  const width = video.videoWidth
  const objsHeight = 1

  const videoObjects = new THREE.Group()
  videoObjects.name = 'videoObjects'

  // build video plane
  const videoPlaneWidth = 2
  const videoPlaneHeight = (videoPlaneWidth * video.videoHeight) / video.videoWidth
  const videoPlane = createTexturePlane(texture, videoPlaneWidth, videoPlaneHeight)
  videoPlane.translateY(objsHeight)
  videoObjects.add(videoPlane)

  uniforms.tex.value = texture

  const pointObject = createPoints(
    uniforms,
    colorspaceMacro,
    height,
    width,
    colorspaceVertexShader,
    colorspaceFragementShader,
  )
  pointObject.translateY(objsHeight)
  videoObjects.add(pointObject)

  const pointShadowObject = createPoints(
    uniforms,
    colorspaceMacro,
    height,
    width,
    shadowVertexShader,
    shadowFragmentShader,
    {
      transparent: false,
    },
  )

  videoObjects.add(pointShadowObject)
  return videoObjects
}

export const objectsUpdaterFactory = (scene, colorspaceMacro, uniforms, video) => () => {
  const objs = createVideoObjects(scene, colorspaceMacro, uniforms, video)
  scene.add(objs)
}
