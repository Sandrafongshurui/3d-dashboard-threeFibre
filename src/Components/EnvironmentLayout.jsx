import {
  Canvas,
  useThree,
  useLoader,
  useFrame,
  extend,
} from '@react-three/fiber'
import * as THREE from 'three'
import { Buoy } from './Buoy-draco'
import {
  OrbitControls,
  PerspectiveCamera,
  Html,
  Sky,
  MeshReflectorMaterial,
  Box,
  Plane,
  ContactShadows,
} from '@react-three/drei'
import React, { Suspense, useState, useRef, useMemo } from 'react'
import { Models } from './Models'
import Dashboard from './Dashboard'
import { Water } from 'three-stdlib'
extend({ Water })

//users camera to control
const CameraController = () => {
  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} />
      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />
    </>
  )
}

const Ocean = () => {
  const ref = useRef()
  const gl = useThree((state) => state.gl)
  const waterNormals = useLoader(THREE.TextureLoader, '/waternormals.jpeg')
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping
  const geom = useMemo(() => new THREE.PlaneGeometry(10000, 10000), [])
  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      // waterNormals,
      sunDirection: new THREE.Vector3(),
      // sunColor: 0xffffff,
      // waterColor: 0x001e0f,
      distortionScale: 0,
      fog: false,
      // format: gl.encoding,
    }),
    [waterNormals],
  )
  // useFrame((state, delta) => (ref.current.material.uniforms.time.value += 0.01))
  return (
    <water
      ref={ref}
      args={[geom, config]}
      rotation-x={-Math.PI / 2}
      receiveShadow
    />
  )
}

const EnvironmentLayout = () => {
  //   <mesh
  //   position={[0, 0, 0]}
  //   rotation={[-Math.PI / 2, 0, 0]}
  //   scale={[10000, 10000, 10000]}
  //   castShadow
  //   receiveShadow
  // >
  //   {/*
  // The thing that gives the mesh its shape
  // In this case the shape is a flat plane
  // */}
  //   <planeGeometry />
  //   {/*
  // The material gives a mesh its texture or look.
  // In this case, it is just a uniform green
  // */}
  //   <MeshReflectorMaterial
  //     envMapIntensity={0}
  //     // normalMap={normal}
  //     normalScale={[0.15, 0.15]}
  //     // roughnessMap={roughness}
  //     dithering={true}
  //     color={[0.015, 0.015, 0.015]}
  //     // color="cyan"
  //     roughness={0.7}
  //     blur={[1000, 400]} // Blur ground reflections (width, heigt), 0 skips blur
  //     mixBlur={30} // How much blur mixes with surface roughness (default = 1)
  //     mixStrength={80} // Strength of the reflections
  //     mixContrast={1} // Contrast of the reflections
  //     resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
  //     mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
  //     depthScale={0.01} // Scale the depth factor (0 = no depth, default = 0)
  //     minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
  //     maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
  //     depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
  //     debug={0}
  //     reflectorOffset={0.2} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
  //   />
  // </mesh>
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
      <Canvas shadows>
        <CameraController />
        <ambientLight intensity={0.1} />
        <pointLight
          castShadow
          intensity={0.2}
          args={[0xff0000, 1, 100]}
          position={[1, 1, 1]}
        />

        <spotLight
          castShadow
          intensity={1}
          args={['blue', 1, 100]}
          position={[-1, 1, 1]}
        />
        <Html
          className={'bg-blue-700/70 w-60 h-20 absolute top-0 text-white'}
          position={[-4, 10, -1]}
        >
          <p>Object data</p>
        </Html>
        {/* <Suspense fallback={null}> */}

        <Box castShadow receiveShadow position={[0, 0.5, 0]}>
          <meshStandardMaterial attach="material" color="white" />
        </Box>
        {/* <Plane
              receiveShadow
              rotation={[-Math.PI / 2, 0, 0]}
              position={[0, -1, 0]}
              args={[1000, 1000]}
            >
              <meshStandardMaterial attach="material" color="white" />
            </Plane> */}
        {/* <Box castShadow receiveShadow position={[-5, 0.5, 0]}>
              <meshStandardMaterial attach="material" color="white" />
            </Box> */}
        <Buoy
          scale={[5, 5, 5]}
          position={[-5, 5, 0]}
          // data={handleSelectedData}
          // clickMesh={handleClickMeshA}
        />
        {/* {models && (
          <Models
            selectedContent={handleSelectedContent}
            clickMesh={handleClickMesh}
          />
        )} */}

        {/* <ContactShadows position={[0, -0.8, 0]} /> */}
        {/* </Suspense> */}
        {/* <Ocean /> */}
        <Sky scale={10000} sunPosition={[500, 150, 1000]} turbidity={0.1} />
      </Canvas>

      {openDashboard && <Dashboard content={content} />}
      <button onClick={handleOnClick}>Close</button>
    </React.Fragment>
  )
}

export default EnvironmentLayout
