/* eslint-disable import/no-unresolved */

import * as THREE from 'three'
import Stats from 'three/addons/libs/stats.module.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { initCamera, initRenderer } from './init'

import { initPointObject } from './genPoints'

import { drawHelper } from './utils'

import { GUI } from 'lil-gui'

const initGUI = (uniforms) => {
  const gui = new GUI()
  const csNameMap = {
    RGB: 0,
    XYZ: 1,
    XYy: 2,
    LAB: 3,
  }

  gui
    .add({ 'Color Space': 'RGB' }, 'Color Space', ['RGB', 'XYZ', 'XYy', 'LAB'])
    .onChange((value) => {
      uniforms.type.value = csNameMap[value]
    })
}

const main = async () => {
  OrbitControls
  const container = document.getElementById('container')
  const camera = initCamera(THREE.PerspectiveCamera)

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x000000)

  const uniforms = {
    type: { value: 0 },
  }

  const points = await initPointObject(uniforms)
  console.log('hello', points)
  scene.add(points)

  const renderer = initRenderer()

  container.appendChild(renderer.domElement)

  const controls = new OrbitControls(camera, renderer.domElement)

  const stats = new Stats()
  container.appendChild(stats.dom)

  window.addEventListener('resize', onWindowResizeFactory(camera, renderer))

  drawHelper(scene)
  initGUI(uniforms, points)

  const render = () => {
    requestAnimationFrame(render)
    controls.update()
    renderer.render(scene, camera)
    stats.update()
  }
  render()
}

const onWindowResizeFactory = (camera, renderer) => () => {
  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  return onWindowResize
}

main()
