/* eslint-disable import/no-unresolved */
import colorspaceFragementShader from './shaders/colorspace.frag?raw'
import colorspaceVertexShader from './shaders/colorspace.vert?raw'
import shadowFragmentShader from './shaders/shadow.frag?raw'
import shadowVertexShader from './shaders/shadow.vert?raw'

const colorspaceMacros = {
  RGB: { COLOR_SPACE: 'color.rgb' },
  XYZ: { COLOR_SPACE: 'rgb2XYZ(color.rgb)' },
  xyY: { COLOR_SPACE: 'XYZ2xyY(rgb2XYZ(color.rgb))' },
  Lab: { COLOR_SPACE: 'XYZ2Lab(rgb2XYZ(color.rgb)) / 10.' },
}

const colorspaceNames = Object.keys(colorspaceMacros)

export {
  colorspaceFragementShader,
  colorspaceMacros,
  colorspaceNames,
  colorspaceVertexShader,
  shadowFragmentShader,
  shadowVertexShader,
}
