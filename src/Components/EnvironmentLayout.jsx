import { Canvas } from '@react-three/fiber'
import {
  OrbitControls,
  PerspectiveCamera,
  Html,
  Plane,
  MeshReflectorMaterial,
} from '@react-three/drei'
import React, { Suspense, useState } from 'react'
import { Models } from './Models'
import Dashboard from './Dashboard'
// import { Raycaster } from 'three'
// import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

//users camera to control
const CameraController = () => {
  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} />
      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />
    </>
  )
}

const EnvironmentLayout = () => {
  const [openDashboard, setOpenDashboard] = useState(false)
  const [content, setContent] = useState([])
  const [models, setModels] = useState(true)
  const handleSelectedContent = (value) => {
    console.log(Object.entries(value))
    setContent([...Object.entries(value)])
  }
  const handleClickMesh = (value) => {
    console.log(value)
    setOpenDashboard(value)
  }
  const handleOnClick = () => {
    setModels(!models)
  }

  return (
    <React.Fragment>
      <Suspense fallback={null}>
        <Canvas>
          <CameraController />
          <ambientLight intensity={1} />
          <spotLight
            intensity={0.5}
            angle={0.1}
            penumbra={1}
            position={[10, 15, 10]}
            castShadow
          />
          <Html
            className={
              'bg-blue-700/70 w-60 h-60 z-20 absolute top-0 text-white'
            }
            center
            position={[-1, 1, -1]}
          >
            <p>Object data</p>
          </Html>
          <mesh
            position={[0, 0, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[20, 20, 20]}
            castShadow
            receiveShadow
          >
            {/*
        The thing that gives the mesh its shape
        In this case the shape is a flat plane
      */}
            <planeGeometry />
            {/*
        The material gives a mesh its texture or look.
        In this case, it is just a uniform green
      */}
            <MeshReflectorMaterial
              envMapIntensity={0}
              // normalMap={normal}
              normalScale={[0.15, 0.15]}
              // roughnessMap={roughness}
              dithering={true}
              color={[0.015, 0.015, 0.015]}
              // color="cyan"
              roughness={0.7}
              blur={[1000, 400]} // Blur ground reflections (width, heigt), 0 skips blur
              mixBlur={30} // How much blur mixes with surface roughness (default = 1)
              mixStrength={80} // Strength of the reflections
              mixContrast={1} // Contrast of the reflections
              resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
              mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
              depthScale={0.01} // Scale the depth factor (0 = no depth, default = 0)
              minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
              maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
              depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
              debug={0}
              reflectorOffset={0.2} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
            />
          </mesh>
          {models && (
            <Models
              selectedContent={handleSelectedContent}
              clickMesh={handleClickMesh}
            />
          )}
        </Canvas>
      </Suspense>
      {openDashboard && <Dashboard content={content} />}
      <button onClick={handleOnClick}>Close</button>
    </React.Fragment>
  )
}

export default EnvironmentLayout
