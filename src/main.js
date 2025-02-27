/* eslint-disable import/no-unresolved */

import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Stats from 'three/addons/libs/stats.module.js'

import { createFloor, createVideoObjects } from './createObjects'
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
  }

  const video = await generateVideoElement()
  video.onloadeddata = () => {
    const objs = createVideoObjects(uniforms, video, scene)
    scene.add(objs)
    video.play()
  }

  const renderer = initRenderer()
  const guiManager = new GUIManager(uniforms, video, scene, renderer, camera)
  guiManager.init()

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
