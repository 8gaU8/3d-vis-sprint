/* eslint-disable import/no-unresolved */

import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Stats from 'three/addons/libs/stats.module.js'

import {
  createColorSpacePoint,
  createShadowColorSpacePoint,
  createVideoPlane,
} from './createObjects'
import { initCamera, initGUI, initRenderer, initScene } from './init'
import { drawHelper, onWindowResizeFactory } from './utils'
import { generateVideoElement } from './videoElement'

const main = async () => {
  const container = document.getElementById('container')

  const camera = initCamera(THREE.PerspectiveCamera)
  const scene = initScene()
  const video = generateVideoElement()

  video.onloadeddata = () => {
    const texture = new THREE.VideoTexture(video)

    texture.minFilter = THREE.NearestFilter
    texture.magFilter = THREE.NearestFilter
    texture.generateMipmaps = false
    texture.format = THREE.RGBAFormat

    // building objects
    const height = video.videoHeight
    const width = video.videoWidth

    console.log(texture)

    // build video plane
    const videoPlaneWidth = 2
    const videoPlaneHeight = (videoPlaneWidth * video.videoHeight) / video.videoWidth
    const videoPlane = createVideoPlane(texture, videoPlaneWidth, videoPlaneHeight)
    scene.add(videoPlane)

    const uniforms = {
      tex: { type: 't', value: texture },
      type: { type: 'i', value: 0 },
    }

    const pointObject = createColorSpacePoint(uniforms, height, width)
    scene.add(pointObject)

    const pointShadowObject = createShadowColorSpacePoint(uniforms, height, width)
    scene.add(pointShadowObject)

    initGUI(uniforms, video)
  }

  const renderer = initRenderer()

  container.appendChild(renderer.domElement)

  const controls = new OrbitControls(camera, renderer.domElement)

  const stats = new Stats()
  container.appendChild(stats.dom)

  window.addEventListener('resize', onWindowResizeFactory(camera, renderer), false)
  drawHelper(scene)

  const render = () => {
    requestAnimationFrame(render)
    controls.update()
    renderer.render(scene, camera)
    stats.update()
  }
  render()
}

main()
