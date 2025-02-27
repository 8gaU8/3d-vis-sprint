/* eslint-disable import/no-unresolved */

import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Stats from 'three/addons/libs/stats.module.js'
import { HTMLMesh, InteractiveGroup } from 'three/examples/jsm/Addons.js'

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

  // TEST--------
  const stats = new Stats()
  container.appendChild(stats.dom)
  // TEST--------
  const group = new InteractiveGroup()
  group.listenToPointerEvents(renderer, camera)
  const controller1 = renderer.xr.getController(0)
  const controller2 = renderer.xr.getController(1)
  group.listenToXRControllerEvents(controller1)
  group.listenToXRControllerEvents(controller2)

  const mesh = new HTMLMesh(stats.dom)
  mesh.position.x = 1.0
  mesh.position.y = 1.3
  mesh.position.z = 0.3
  mesh.rotation.y = -Math.PI / 2 + Math.PI / 3
  mesh.scale.setScalar(2)
  // mesh.material.needsUpdate = true
  console.log(mesh.material.map)
  scene.add(mesh)
  // TEST--------

  window.addEventListener('resize', onWindowResizeFactory(camera, renderer), false)
  drawHelper(scene)

  const render = () => {
    renderer.render(scene, camera)
    controls.update()
    stats.update()
    mesh.material.map.dom = stats.dom
    mesh.material.needsUpdate = true
  }
  renderer.setAnimationLoop(render)
}

main()
