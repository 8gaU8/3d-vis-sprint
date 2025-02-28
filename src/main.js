/* eslint-disable import/no-unresolved */

import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Stats from 'three/addons/libs/stats.module.js'

import { createFloor, updateObjects } from './createObjects'
import { initCamera, initLights, initRenderer, initScene } from './init'
import { GUIManager, initGUI } from './initGUI'
import { ColorspaceParameters } from './parameters'
import { drawHelper, onWindowResizeFactory } from './utils'
import { generateVideoElement } from './videoElement'
import { XRControllerManager } from './xr'

const main = async () => {
  // initial setup
  // --------------------------
  const container = document.getElementById('container')
  const camera = initCamera(THREE.PerspectiveCamera)
  const scene = initScene()
  initLights(scene)
  const floor = createFloor()
  scene.add(floor)
  const renderer = initRenderer()
  container.appendChild(renderer.domElement)
  // resize event
  window.addEventListener('resize', onWindowResizeFactory(camera, renderer), false)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enable = true

  const stats = new Stats()
  container.appendChild(stats.dom)

  // setup video
  // --------------------------
  const video = await generateVideoElement()

  // define parameters of colorspace objects
  // --------------------------
  const uniforms = {
    tex: { type: 't', value: null },
    pointSize: { type: 'f', value: 10.0 },
    type: { type: 'i', value: 0 },
    alpha: { type: 'f', value: 0.9 },
  }
  const colorspaceParameters = new ColorspaceParameters(uniforms, video)

  // setup XR andGUI
  // --------------------------
  const onChange = () => {
    updateObjects(scene, colorspaceParameters)
  }

  const gui = initGUI(colorspaceParameters, onChange)
  const xrControllerManager = new XRControllerManager(renderer, camera)
  const guiManager = new GUIManager(gui, scene, xrControllerManager)
  // XR events
  renderer.xr.addEventListener('sessionstart', () => {
    guiManager.enableXR()
  })

  renderer.xr.addEventListener('sessionend', () => {
    guiManager.disableXR()
  })

  // start video
  // --------------------------
  video.onloadeddata = () => {
    updateObjects(scene, colorspaceParameters)

    video.play()
  }

  drawHelper(scene)

  const render = () => {
    renderer.render(scene, camera)
    controls.update()
    stats.update()
  }
  renderer.setAnimationLoop(render)
}

main()
