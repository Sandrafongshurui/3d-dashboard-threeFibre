import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
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
  const handleClickMesh = (value) => {
    console.log(value)
    setOpenDashboard(value)
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
          <Models clickMesh={handleClickMesh}/>
        </Canvas>
      </Suspense>
      {openDashboard && <Dashboard content={'show content'} />}
     
    </React.Fragment>
  )
}

export default EnvironmentLayout
