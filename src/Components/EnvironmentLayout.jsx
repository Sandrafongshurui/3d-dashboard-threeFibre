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
import annotations from "../annotations.json";
import SurroundingCubes from "./SurroundingCubes";
import Ground from "./Ground";
import { Water } from "three-stdlib";
extend({ Water });

//users camera to control
const Animate = ({ controls, lerping, to, target }) => {
  useFrame(({ camera }, delta) => {
    if (lerping) {
      camera.position.lerp(to, delta * 2);
      // controls is the ref of orbitControls
      controls.current.target.lerp(target, delta * 2);
    }
  });
};

const EnvironmentLayout = () => {
  const envMap = useEnvironment({ path: "/cubemap" });
  const ref = useRef();
  const [lerping, setLerping] = useState(false);
  const [to, setTo] = useState();
  const [target, setTarget] = useState();
  const [selected, setSelected] = useState(-1);
  const [openDashboard, setOpenDashboard] = useState(false);
  const [content, setContent] = useState([]);
  const [models, setModels] = useState(true);
  const handleSelectedContent = (value) => {
    setContent([...value]);
  };
  const handleClickMesh = (value) => {
    if (!openDashboard) {
      console.log(value);
      setOpenDashboard(value);
    }
  };
  const handleOnClick = () => {
    setModels(!models);
  };

  const gotoAnnotation = (idx) => {
    setTo(annotations[idx].camPos);
    setTarget(annotations[idx].position);
    // setSelected(idx)
    setLerping(true);
    // setContent([...Object.entries(annotations[idx])]);
    handleClickMesh(true)
  };

  return (
    <React.Fragment>
      <Canvas
        shadows
        onPointerDown={() => setLerping(false)}
        onWheel={() => setLerping(false)}
      >
        <Suspense fallback={null}>
          <color args={[0x10151c]} attach="background" />
          <fog attach="fog" args={[0x10151c, 50, 120]} />
          {/* <CameraController ref={ref}/> */}
          <OrbitControls
            minDistance={5}
            maxDistance={80}
            ref={ref}
            target={[0, 0.35, 0]}
          />
          <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />
          <ambientLight intensity={0.1} />
          {/* <directionalLight
            // castShadow
            intensity={1}
            position={[-40, 20, -80]}
            shadow-mapSize={[1024, 1024]}
            // target={[0,0,0]}
          >
            <orthographicCamera
              attach="shadow-camera"
              left={-100}
              right={100}
              top={100}
              bottom={-100}
            />
              <Sphere />
          </directionalLight> */}
          <spotLight
            // color={[1, 0.25, 0.7]}
            color={[0.14, 0.5, 1]}
            intensity={3}
            angle={1}
            penumbra={0.6}
            position={[50, 40, 0]}
            castShadow
          >
            <Sphere />
          </spotLight>
          <spotLight
            color={[0.14, 0.5, 1]}
            intensity={3}
            angle={1}
            penumbra={0.6}
            position={[-50, 40, 0]}
            castShadow
            
            >
            <Sphere />
          </spotLight>
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
            <Models
              selectedContent={handleSelectedContent}
              selected={gotoAnnotation}
              clickMesh={handleClickMesh}
            />
          )}
          <SurroundingCubes scale={[4, 4, 4]} />
          <Animate controls={ref} lerping={lerping} to={to} target={target} />
          <Ground />
          <gridHelper args={[200, 100, 0x00000, 0x10151c]} />;
          <Ground />
          {/* <Sky scale={10000} sunPosition={[500, 150, 1000]} turbidity={0.1} /> */}
        </Suspense>
      </Canvas>

      {openDashboard && <Dashboard position={["top-0"]} content={content} />}

      <button onClick={handleOnClick}>Close</button>
    </React.Fragment>
  );
};

export default EnvironmentLayout;
