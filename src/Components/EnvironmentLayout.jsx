import {
  Canvas,
  useThree,
  useLoader,
  useFrame,
  extend,
} from "@react-three/fiber";
import * as THREE from "three";
import {
  OrbitControls,
  PerspectiveCamera,
  Html,
  Sky,
  MeshReflectorMaterial,
  Box,
  Plane,
  ContactShadows,
} from "@react-three/drei";
import React, { Suspense, useState, useRef, useMemo } from "react";
import { Models } from "./Models";
import Dashboard from "./Dashboard";
import { Water } from "three-stdlib";
extend({ Water });

//users camera to control
const CameraController = () => {
  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} />
      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />
    </>
  );
};

const Ocean = () => {
  const ref = useRef();
  const gl = useThree((state) => state.gl);
  const waterNormals = useLoader(THREE.TextureLoader, "/waternormals.jpeg");
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
  const geom = useMemo(() => new THREE.PlaneGeometry(10000, 10000), []);
  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      // waterColor: 0x001e0f,
      distortionScale: 0,
      fog: false,
      format: gl.encoding,
    }),
    [waterNormals]
  );
  useFrame((state, delta) => (ref.current.material.uniforms.time.value += 0.01))
  return (
    <water
      ref={ref}
      args={[geom, config]}
      rotation-x={-Math.PI / 2}
      receiveShadow
      // castShadow
    />
  );
};

const EnvironmentLayout = () => {
  const [openDashboard, setOpenDashboard] = useState(false);
  const [content, setContent] = useState([]);
  const [models, setModels] = useState(true);
  const handleSelectedContent = (value) => {
    console.log(Object.entries(value));
    setContent([...Object.entries(value)]);
  };
  const handleClickMesh = (value) => {
    console.log(value);
    setOpenDashboard(value);
  };
  const handleOnClick = () => {
    setModels(!models);
  };

  return (
    <React.Fragment>
      <Canvas shadows>
        <CameraController />
        <ambientLight intensity={0.1} />
        <directionalLight
          castShadow
          intensity={0.8}
          args={["white", 1, 100]}
          position={[0.5, 0.2, 1]}
          // shadow-mapSize={[1024, 1024]}
          // penumbra={2}
        >
        <orthographicCamera attach="shadow-camera" args={[-10, 10, 10, -10]} />
        </directionalLight>

        {/* <spotLight
          castShadow
          intensity={1}
          args={["blue", 1, 100]}
          position={[-1, 1, 1]}
          penumbra={2}
        /> */}
        <Html
          className={"bg-blue-700/70 w-60 h-20 absolute top-0 text-white"}
          position={[-4, 10, -1]}
        >
          <p>Object data</p>
        </Html>
        <Suspense fallback={null}>
          {/* <Plane
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0, 0]}
            args={[1000, 1000]}
          >
            <meshStandardMaterial attach="material" color="white" />
          </Plane> */}
          {models && (
          <Models
            selectedContent={handleSelectedContent}
            clickMesh={handleClickMesh}
          />
        )}

          <ContactShadows position={[0, -0.8, 0]} />
        </Suspense>
        <Ocean />
        <Sky scale={10000} sunPosition={[500, 150, 1000]} turbidity={0.1} />
      </Canvas>

      {openDashboard && <Dashboard content={content} />}
      <button onClick={handleOnClick}>Close</button>
    </React.Fragment>
  );
};

export default EnvironmentLayout;
