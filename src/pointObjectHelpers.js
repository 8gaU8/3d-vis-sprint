import * as THREE from 'three'

const createGeometry = (height, width) => {
  const geometry = new THREE.BufferGeometry()
  const positions = []
  const step = 4

  for (let i = 0; i < height; i += step)
    for (let j = 0; j < width; j += step) {
      // positions
      const x = i / height
      const y = j / width
      const z = 0

      positions.push(x, y, z)
    }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.computeBoundingSphere()
  return geometry
}

const createMaterial = (uniforms, vertexShader, fragmentShader, additionalOptions) => {
  const basicOptions = {
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: uniforms,
    transparent: true,
    alphaHash: 0.5,
  }
  const material = new THREE.ShaderMaterial({ ...basicOptions, ...additionalOptions })
  return material
}

export const createPoints = (
  uniforms,
  height,
  width,
  vertexShader,
  fragmentShader,
  additionalOptions = {},
) => {
  const material = createMaterial(uniforms, vertexShader, fragmentShader, additionalOptions)

  const geometry = createGeometry(height, width)
  const points = new THREE.Points(geometry, material)
  return points
}
