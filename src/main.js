/* eslint-disable import/no-unresolved */

import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Stats from 'three/addons/libs/stats.module.js'

import { createFloor, createVideoObjects } from './createObjects'
import { initCamera, initGUI, initLights, initRenderer, initScene } from './init'
import { drawHelper, onWindowResizeFactory } from './utils'
import { generateVideoElement } from './videoElement'

const main = async () => {
  const container = document.getElementById('container')

  const camera = initCamera(THREE.PerspectiveCamera)
  const scene = initScene()
  initLights(scene)
  const floor = createFloor()
  scene.add(floor)

  const uniforms = {
    tex: { type: 't', value: null },
    type: { type: 'i', value: 0 },
  }

  const video = await generateVideoElement()
  video.onloadeddata = () => {
    createVideoObjects(uniforms, video, scene)
    video.play()
  }
  initGUI(uniforms, video)

  const renderer = initRenderer()

  container.appendChild(renderer.domElement)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enable = true

  const stats = new Stats()
  container.appendChild(stats.dom)

  window.addEventListener('resize', onWindowResizeFactory(camera, renderer), false)
  drawHelper(scene)

  const render = () => {
    renderer.render(scene, camera)
    controls.update()
    stats.update()
  }
  renderer.setAnimationLoop(render)
}

main()
