import { useLoader } from '@react-three/fiber'
import React, { useEffect } from 'react'
import * as THREE from 'three'
import { MeshReflectorMaterial, Plane } from '@react-three/drei'

const Ground = () => {
  const [roughness, normal] = useLoader(THREE.TextureLoader, [
    '/textures/terrain-roughness.jpg',
    '/textures/terrain-normal.jpg',
  ])
  useEffect(() => {
    ;[normal, roughness].forEach((texture) => {
      texture.wrapS = THREE.RepeatWrapping
      texture.wrapT = THREE.RepeatWrapping
      texture.repeat.set(50, 50)
    })

    normal.encoding = THREE.LinearEncoding
  }, [normal, roughness])
  return (
    <Plane
      receiveShadow
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.5, 0]}
      args={[500, 500, 100, 100]}
    >
     
      <MeshReflectorMaterial
        // wireframe
        envMapIntensity={1}
        normalMap={normal}
        normalScale={[0.2, 0.2]}
        roughnessMap={roughness}
        dithering={true}
        color={[0.015, 0.015, 0.015]}
        roughness={1}
        blur={[1000, 400]} // Blur ground reflections (width, heigt), 0 skips blur
        mixBlur={30} // How much blur mixes with surface roughness (default = 1)
        mixStrength={80} // Strength of the reflections
        mixContrast={1} // Contrast of the reflections
        resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
        mirror={1} // Mirror environment, 0 = texture colors, 1 = pick up env colors
        depthScale={0.01} // Scale the depth factor (0 = no depth, default = 0)
        minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
        maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
        depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
        debug={0}
        reflectorOffset={0.2} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
      />
    </Plane>
  )
}

export default Ground
