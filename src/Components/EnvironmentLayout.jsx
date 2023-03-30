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
  Sphere,
  useEnvironment,
  Environment,
  CubeCamera,
} from "@react-three/drei";
import React, { Suspense, useState, useRef, useMemo } from "react";
import { Models } from "./Models";
import Dashboard from "./Dashboard";
import { Water } from "three-stdlib";
import Ground from "./Ground";
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
  const geom = useMemo(() => new THREE.PlaneGeometry(10, 10), []);
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
    [waterNormals]
  );
  useFrame(
    (state, delta) => (ref.current.material.uniforms.time.value += 0.01)
  );
  return (
    <water
      ref={ref}
      position={[0, -10, 0]}
      args={[geom, config]}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
      // castShadow
    />
  );
};

const EnvironmentLayout = () => {
  // const envMap = useEnvironment({ path: "/cubemap" });
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
        <Html
          className={"bg-blue-700/70 w-60 h-20 absolute top-0 text-white"}
          position={[-4, 10, -1]}
        >
          <p>Object data</p>
        </Html>
        <Suspense fallback={null}>
          {/*  */}
          {/* <Environment map={envMap} background /> */}
          {/* it sets 6 cams in eth centre of the scsne and takes 6 pics and combine into one texture in eth callback */}
          <CubeCamera frames={2} >
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
            <Models
              selectedContent={handleSelectedContent}
              clickMesh={handleClickMesh}
            />
          )}
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

      {openDashboard && <Dashboard position={["bottomleft"]} content={content} />}
      {openDashboard && <Dashboard position={["topleft"]} content={content} />}
      <button onClick={handleOnClick}>Close</button>
    </React.Fragment>
  );
};

export default EnvironmentLayout;
