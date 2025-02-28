import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'

import { colorspaceNames } from './shaders'

export const initGUI = (colorspaceObjParameters, onColorspaceObjParamChange) => {
  const { uniforms, video } = colorspaceObjParameters

  const gui = new GUI({ width: 300 })

  // colorspace GUI
  const colorSpaceGUI = gui.addFolder('Color Space')

  const onColorspaceChange = (value) => {
    colorspaceObjParameters.selectedColorSpace = value
    onColorspaceObjParamChange(colorspaceObjParameters)
  }

  const genColorSpaceButton = (name) => {
    const colorSpaceObject = {
      [name]: () => onColorspaceChange(name),
    }
    colorSpaceGUI.add(colorSpaceObject, name)
  }
  colorspaceNames.forEach((name) => genColorSpaceButton(name))

  // material GUI
  const materialGUI = gui.addFolder('Material')
  materialGUI.add(uniforms.alpha, 'value', 0, 1).name('Alpha')
  materialGUI.add(uniforms.pointSize, 'value', 2, 10).name('Point Size')
  materialGUI.add(colorspaceObjParameters, 'step', 1, 10, 1).onFinishChange(() => {
    onColorspaceObjParamChange(colorspaceObjParameters)
  })

  // video controls
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
  constructor(gui, scene, xrControllerManager) {
    this.gui = gui
    this.scene = scene
    this.xrControllerManager = xrControllerManager

    this.xrGUI = this.xrControllerManager.getXrGUI(this.gui)
  }

  enableXR() {
    console.log('enableXR')

    const prev = this.scene.getObjectByName(this.xrGUI.name)
    if (!prev) this.scene.add(this.xrGUI)
  }

  disableXR() {
    console.log('disableXR')
    const prev = this.scene.getObjectByName(this.xrGUI.name)
    if (prev) this.scene.remove(prev)
  }
}
