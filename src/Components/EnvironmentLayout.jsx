import {
  Canvas,
  useThree,
  useLoader,
  useFrame,
  extend,
} from '@react-three/fiber'
import * as THREE from 'three'
import {
  OrbitControls,
  PerspectiveCamera,
  Html,
  Sky,
  MeshReflectorMaterial,
  Box,
  Plane,
  ContactShadows,
  Sphere,
  useEnvironment,
  Environment,
  CubeCamera,
} from '@react-three/drei'
import React, { Suspense, useState, useRef, useMemo } from 'react'
import { Models } from './Models'
import Dashboard from './Dashboard'
import { Water } from 'three-stdlib'
import annotations from '../annotations.json'
import Ground from './Ground'
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
  const geom = useMemo(() => new THREE.PlaneGeometry(10, 10), [])
  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 3.7,
      fog: true,
      format: gl.encoding,
    }),
    [waterNormals],
  )
  useFrame((state, delta) => (ref.current.material.uniforms.time.value += 0.01))
  return (
    <water
      ref={ref}
      position={[0, -10, 0]}
      args={[geom, config]}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
      // castShadow
    />
  )
}
const Annotations = ({ selected, content, gotoAnnotation }) => {
  return (
    <>
      {/* <Html   className='bg-blue-700/70 text-white rounded-lg p-5 text-s'><p>test</p></Html> */}

      {annotations.map((annotation, i) => {
        return (
          <>
            <Html
              // className='bg-blue-700/70 text-white rounded-lg p-5 text-s'
              position={[
                annotation.position.x,
                annotation.position.y,
                annotation.position.z,
              ]}
              // position={[1, 5, 0]}
              // transform
              // sprite
            >
              <svg
                height="34"
                width="34"
                transform="translate(-16 -16)"
                style={{ cursor: 'pointer' }}
              >
                <circle
                  cx="17"
                  cy="17"
                  r="16"
                  stroke="white"
                  strokeWidth="2"
                  fill="rgba(0,0,0,.66)"
                  onClick={() => gotoAnnotation(i)}
                />
                <text
                  x="12"
                  y="22"
                  fill="white"
                  fontSize={17}
                  fontFamily="monospace"
                  style={{ pointerEvents: 'none' }}
                >
                  {i + 1}
                </text>
              </svg>
              {selected === i && (
                <ul className="bg-gray-700/70 w-[200px] text-white rounded-lg p-2 text-xs">
                  {content.map((item, idx) => (
                    <li key={idx}>{`${item[0]} : ${item[1]}`}</li>
                  ))}
                </ul>
              )}
            </Html>
          </>
        )
      })}
    </>
  )
}

const EnvironmentLayout = () => {
  // const envMap = useEnvironment({ path: "/cubemap" });
  const ref = useRef()
  // const [lerping, setLerping] = useState(false)
  // const [to, setTo] = useState()
  const [target, setTarget] = useState()
  const [selected, setSelected] = useState(-1)
  const [openDashboard, setOpenDashboard] = useState(false)
  const [content, setContent] = useState([{}])
  const [models, setModels] = useState(true)
  const handleSelectedContent = (value) => {
    console.log(value)
    // setContent([...Object.entries(value)])
    setContent(prevContent=>[...prevContent,value])
    // setTheArray(oldArray => [...oldArray, newElement]);
  }
  const handleClickMesh = (value) => {
    console.log(value)
    setOpenDashboard(value)
  }
  const handleOnClick = () => {
    setModels(!models)
  }

  const gotoAnnotation = (idx) => {
    // setTo(annotations[idx].camPos)
    // setTarget(annotations[idx].position)
    setSelected(idx)
    // setLerping(true)
  }

  return (
    <React.Fragment>
      <Canvas shadows>
        <color args={[0, 0, 0]} attach="background" />
        <CameraController />
        <ambientLight intensity={0.1} />
        {/* directional light uses ortho camer for shadows not eprps */}
        {/* <directionalLight
          castShadow
          args={["white", 1]}
          position={[0.5, 0.2, 1]}
          // shadow-mapSize={[1024, 1024]}
          // penumbra={2}
        >
        <orthographicCamera attach="shadow-camera" args={[-10, 10, 10, -10]} />
        </directionalLight> */}
        {/* <pointLight
          args={["white", 2]}
          position={[50, 20, 80]}
          castShadow
          shadow-mapSize={[4026, 4026]}
        >
          <Sphere />
        </pointLight> */}
        {/* <spotLight
        color={[0, 0, 0]}
        intensity={2}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
          
        /> */}
        <spotLight
          color={[1, 0.25, 0.7]}
          intensity={1.5}
          angle={2}
          penumbra={0.5}
          position={[3, 5, 0]}
          castShadow
          shadow-bias={-0.0001}
        />
        <spotLight
          color={[0.14, 0.5, 1]}
          intensity={2}
          angle={2}
          penumbra={0.5}
          position={[-3, 5, 0]}
          castShadow
          shadow-bias={-0.0001}
        />

        <Suspense fallback={null}>
          {/*  */}
          {/* <Environment map={envMap} background /> */}
          {/* it sets 6 cams in eth centre of the scsne and takes 6 pics and combine into one texture in eth callback */}
          <CubeCamera frames={2}>
            {(texture) => (
              <>
                <Environment map={texture} />
                <Sphere position={[0, 1, 0]} args={[1, 256, 256]}>
                  <meshStandardMaterial
                    attach="material"
                    roughness={0}
                    metalness={1}
                  />
                </Sphere>
              </>
            )}
          </CubeCamera>
          {models && (
            <>
              <Models
                selectedContent={handleSelectedContent}
                clickMesh={handleClickMesh}
              />
            </>
          )}
          <Annotations
            selected={selected}
            gotoAnnotation={gotoAnnotation}
            content={content}
          />
          {/* <ContactShadows position={[0, 0, 0]} /> */}
          {/* <Sphere position={[-5, -5, 0]} args={[1, 256, 256]}>
            <meshStandardMaterial attach="material" />
          </Sphere> */}
          {/* <Box position={[-5, 3, 0]}>
            <meshStandardMaterial
              attach="material"
              roughness={0}
              metalness={1}
            />
          </Box> */}
          <Ground />
          {/* <Ocean /> */}
          {/* <Sky scale={10000} sunPosition={[500, 150, 1000]} turbidity={0.1} /> */}
        </Suspense>
      </Canvas>

      {/* {openDashboard && <Dashboard position={["bottomleft"]} content={content} />} */}
      {openDashboard && <Dashboard position={['top-0']} content={content} />}
      {/* {openDashboard && <Dashboard position={["bottom-28"]} content={content} />} */}
      {/* <Buttons clickButton={gotoAnnotation}/> */}
      <button onClick={handleOnClick}>Close</button>
    </React.Fragment>
  )
}

export default EnvironmentLayout
