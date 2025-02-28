/* eslint-disable import/no-unresolved */
import colorspaceFragementShader from './shaders/colorspace.frag?raw'
import colorspaceVertexShader from './shaders/colorspace.vert?raw'
import shadowFragmentShader from './shaders/shadow.frag?raw'
import shadowVertexShader from './shaders/shadow.vert?raw'

const colorspaceMacros = {
  RGB: { 'COLOR_SPACE(x)': 'x' },
  XYZ: { 'COLOR_SPACE(x)': 'rgb2XYZ(x)' },
  xyY: { 'COLOR_SPACE(x)': 'XYZ2xyY(rgb2XYZ(x))' },
  Lab: { 'COLOR_SPACE(x)': 'XYZ2Lab(rgb2XYZ(x)) / 10.' },
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
