import * as THREE from 'three'
import imgUrl from './images/grenouille.jpg'
// eslint-disable-next-line import/no-unresolved
import fragmentShader from './shaders/fragment.frag?raw'
// eslint-disable-next-line import/no-unresolved
import vertexShader from './shaders/vertex.vert?raw'

const loadTexture = (url) => {
  return new Promise((resolve, reject) => {
    const loader = new THREE.TextureLoader()
    loader.load(url, resolve, undefined, reject)
  })
}

const genGeometry = (texture) => {
  const geometry = new THREE.BufferGeometry()
  let positions = []
  let counter = 0
  const step = 10
  for (let i = 0; i < texture.image.height; i += step)
    for (let j = 0; j < texture.image.width; j += step) {
      // positions
      const x = i / texture.image.height
      const y = j / texture.image.width
      const z = 0

      positions.push(x, y, z)
      counter += 1
    }
  console.log(counter)
  console.log(texture.image.height, texture.image.width)

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geometry.computeBoundingSphere()
  return geometry
}

const genShaderMaterial = (uniforms) => {
  const material = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: uniforms,
    transparent: true,
    alphaHash: 0.5,
    // depthTest: false
  })
  return material
}

export const initPointObject = async (uniforms) => {
  const texture = await loadTexture(imgUrl)
  console.log(texture)
  uniforms.tex = { value: texture }

  const material = genShaderMaterial(uniforms)
  const geometry = genGeometry(texture)
  const points = new THREE.Points(geometry, material)
  return points
}
