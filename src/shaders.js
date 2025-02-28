/* eslint-disable import/no-unresolved */
import colorspaceFragementShader from './shaders/colorspace.frag?raw'
import colorspaceVertexShader from './shaders/colorspace.vert?raw'
import shadowFragmentShader from './shaders/shadow.frag?raw'
import shadowVertexShader from './shaders/shadow.vert?raw'

const colorspaceMacros = {
  RGB: 'color.rgb',
  XYZ: 'rgb2XYZ(color.rgb)',
  xyY: 'rgb2xyY(color.rgb)',
  Lab: 'rgb2Lab(color.rgb)',
}

export {
  colorspaceFragementShader,
  colorspaceVertexShader,
  shadowFragmentShader,
  shadowVertexShader,
  colorspaceMacros,
}
