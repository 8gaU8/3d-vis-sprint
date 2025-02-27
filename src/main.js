/* eslint-disable import/no-unresolved */

import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Stats from 'three/addons/libs/stats.module.js'

import { createFloor, objectsUpdaterFactory } from './createObjects'
import { initCamera, initLights, initRenderer, initScene } from './init'
import { GUIManager } from './initGUI'
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
    alpha: { type: 'f', value: 0.9 },
    step: { type: 'i', value: 3 },
  }

  const renderer = initRenderer()

  const video = await generateVideoElement()
  const objectsUpdater = objectsUpdaterFactory(scene, uniforms, video)

  video.onloadeddata = () => {
    objectsUpdater()
    video.play()

    const guiManager = new GUIManager(uniforms, video, scene, renderer, camera, objectsUpdater)
    guiManager.init()
  }

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
