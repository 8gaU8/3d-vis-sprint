import * as THREE from 'three'
import { HTMLMesh, InteractiveGroup, XRControllerModelFactory } from 'three/examples/jsm/Addons.js'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'

const initXrGUI = (uniforms, video, scene, renderer, camera) => {
  // define controllers
  const controllers = initControllers(scene, renderer)
  const gui = initNormalGUI(uniforms, video)
  initInteractiveGroup(scene, renderer, camera, controllers, gui)
  return gui
}

const initControllers = (scene, renderer) => {
  const geometry = new THREE.BufferGeometry()
  geometry.setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -5)])

  const controller1 = renderer.xr.getController(0)
  controller1.add(new THREE.Line(geometry))
  scene.add(controller1)

  const controller2 = renderer.xr.getController(1)
  controller2.add(new THREE.Line(geometry))
  scene.add(controller2)

  const controllerModelFactory = new XRControllerModelFactory()

  const controllerGrip1 = renderer.xr.getControllerGrip(0)
  controllerGrip1.add(controllerModelFactory.createControllerModel(controllerGrip1))
  scene.add(controllerGrip1)

  const controllerGrip2 = renderer.xr.getControllerGrip(1)
  controllerGrip2.add(controllerModelFactory.createControllerModel(controllerGrip2))
  scene.add(controllerGrip2)
  return { controller1, controller2 }
}

const initInteractiveGroup = (scene, renderer, camera, controllers, gui) => {
  const { controller1, controller2 } = controllers
  const group = new InteractiveGroup()
  group.listenToPointerEvents(renderer, camera)
  group.listenToXRControllerEvents(controller1)
  group.listenToXRControllerEvents(controller2)
  scene.add(group)

  const mesh = new HTMLMesh(gui.domElement)
  mesh.position.x = -0.75
  mesh.position.y = 1.5
  mesh.position.z = -0.5
  mesh.rotation.y = Math.PI / 4
  mesh.scale.setScalar(2)
  group.add(mesh)
}

const initNormalGUI = (uniforms, video) => {
  const gui = new GUI({ width: 300 })
  const colorSpaceGUI = gui.addFolder('Color Space')
  const csNameMap = {
    RGB: 0,
    XYZ: 1,
    XYy: 2,
    LAB: 3,
  }

  colorSpaceGUI
    .add({ 'Color Space': 'RGB' }, 'Color Space', ['RGB', 'XYZ', 'XYy', 'LAB'])
    .onChange((value) => {
      uniforms.type.value = csNameMap[value]
    })

  const pausePlayObj = {
    pausePlay: () => {
      if (!video.paused) {
        video.pause()
      } else {
        video.play()
      }
    },
    add10sec: () => {
      video.currentTime = video.currentTime + 10
    },
  }

  const videoGUI = gui.addFolder('Video')
  videoGUI.add(pausePlayObj, 'pausePlay')
  videoGUI.add(pausePlayObj, 'add10sec')
  return gui
}

export const initGUI = (uniforms, video, scene, renderer, camera) => {
  if (renderer.xr.enabled) {
    return initXrGUI(uniforms, video, scene, renderer, camera)
  } else {
    return initNormalGUI(uniforms, video)
  }
}

export class GUIManager {
  constructor(uniforms, video, scene, renderer, camera) {
    this.uniforms = uniforms
    this.video = video
    this.scene = scene
    this.renderer = renderer
    this.camera = camera
    this.gui = initNormalGUI(this.uniforms, this.video, this.scene, this.renderer, this.camera)
  }

  enableXR() {
    this.gui.destroy()
    console.log('enableXR')
    this.gui = initXrGUI(this.uniforms, this.video, this.scene, this.renderer, this.camera)
  }

  disableXR() {
    this.gui.destroy()
    console.log('disableXR')
    this.gui = initNormalGUI(this.uniforms, this.video)
  }
}
