import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'

import { initControllers, initInteractiveGroup } from './xr'

const initNormalGUI = (uniforms, video, updateObjects) => {
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

  const materialGUI = gui.addFolder('Material')
  materialGUI.add(uniforms.alpha, 'value', 0, 1).name('Alpha')
  materialGUI
    .add(uniforms.step, 'value', 1, 10, 1)
    .name('Step')
    .onFinishChange(() => {
      console.log('step change')
      updateObjects()
    })

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
  constructor(uniforms, video, scene, updateObjects, xrControllerManager) {
    this.uniforms = uniforms
    this.video = video
    this.scene = scene
    this.updateObjects = updateObjects
    this.xrControllerManager = xrControllerManager
  }

  init() {
    this.gui = initNormalGUI(this.uniforms, this.video, this.updateObjects)
    this.xrGUI = this.xrControllerManager.getXrGUI(this.gui)
    console.log(this.scene)
    this.updateObjects()
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
    console.log('enableXR')

    const prev = this.scene.getObjectByName(this.xrGUI.name)
    if (!prev) this.scene.add(this.xrGUI)

    // if (this.gui) this.gui.destroy()
    // // const guiMesh = this.xrControllerManager.getXrGUI(this.gui)

    // const gui = initNormalGUI(this.uniforms, this.video, this.updateObjects)
    // const {xRcontollerGroup, controllers, controllerGrips} = initControllers(this.renderer)
    // this.scene.add(xRcontollerGroup)

    // initInteractiveGroup(this.scene, this.renderer, this.camera, controllers, gui)
    // this.gui = gui
  }

  disableXR() {
    console.log('disableXR')
    const prev = this.scene.getObjectByName(this.xrGUI.name)
    if (prev) this.scene.remove(prev)
    // if (this.gui) this.gui.destroy()
    // this.gui = initNormalGUI(this.uniforms, this.video, this.updateObjects)
  }
}
