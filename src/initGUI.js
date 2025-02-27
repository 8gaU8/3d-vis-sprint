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

  const mesh = new HTMLMesh(gui.domElement)
  mesh.position.x = 1.5
  mesh.position.y = 1.5
  mesh.position.z = 0.5
  mesh.rotation.y = -Math.PI / 2 + Math.PI / 3
  mesh.scale.setScalar(2)
  group.add(mesh)

  scene.add(group)
}

const initNormalGUI = (uniforms, video) => {
  const colorSpaceOnChange = (value) => {
    console.log('change to color space', value)
    const csNameMap = {
      RGB: 0,
      XYZ: 1,
      XYy: 2,
      LAB: 3,
    }
    uniforms.type.value = csNameMap[value]
  }
  const colorSpaceObject = {
    RGB: () => colorSpaceOnChange('RGB'),
    XYZ: () => colorSpaceOnChange('XYZ'),
    XYy: () => colorSpaceOnChange('XYy'),
    LAB: () => colorSpaceOnChange('LAB'),
  }

  const gui = new GUI({ width: 300 })

  const colorSpaceGUI = gui.addFolder('Color Space')
  colorSpaceGUI.add(colorSpaceObject, 'RGB')
  colorSpaceGUI.add(colorSpaceObject, 'XYZ')
  colorSpaceGUI.add(colorSpaceObject, 'XYy')
  colorSpaceGUI.add(colorSpaceObject, 'LAB')

  const pausePlayObj = {
    pausePlay: () => {
      if (!video.paused) video.pause()
      else video.play()
    },
    add10sec: () => {
      video.currentTime += 10
    },
    sub10sec: () => {
      video.currentTime -= 10
    },
  }

  const videoGUI = gui.addFolder('Video')
  videoGUI.add(pausePlayObj, 'pausePlay')
  videoGUI.add(pausePlayObj, 'add10sec')
  videoGUI.add(pausePlayObj, 'sub10sec')
  return gui
}

export class GUIManager {
  constructor(uniforms, video, scene, renderer, camera) {
    this.uniforms = uniforms
    this.video = video
    this.scene = scene
    this.renderer = renderer
    this.camera = camera
  }

  init() {
    this.gui = initNormalGUI(this.uniforms, this.video, this.scene, this.renderer, this.camera)
    this.addEventListeners()
  }

  addEventListeners() {
    this.renderer.xr.addEventListener('sessionstart', () => {
      this.enableXR()
    })
    this.renderer.xr.addEventListener('sessionend', () => {
      this.disableXR()
    })
  }

  enableXR() {
    if (this.gui) this.gui.destroy()
    console.log('enableXR')
    this.gui = initXrGUI(this.uniforms, this.video, this.scene, this.renderer, this.camera)
  }

  disableXR() {
    if (this.gui) this.gui.destroy()
    console.log('disableXR')
    this.gui = initNormalGUI(this.uniforms, this.video)
  }
}
