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
    } else {
      console.log("not lerping");
    }
  });
};

const Ocean = () => {
  const ref = useRef();
  const gl = useThree((state) => state.gl);
  const waterNormals = useLoader(THREE.TextureLoader, "/waternormals.jpeg");
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
  const geom = useMemo(() => new THREE.PlaneGeometry(1000, 1000), []);
  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      // waterColor: 0x001e0f,
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
      position={[0, 0, 0]}
      args={[geom, config]}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
      // castShadow
    />
  );
};
// const Annotations = ({ selected, content, gotoAnnotation }) => {
//   return (
//     <>
//       {/* <Html   className='bg-blue-700/70 text-white rounded-lg p-5 text-s'><p>test</p></Html> */}

//       {annotations.map((annotation, i) => {
//         return (
//           <>
//             <Html
//               // className='bg-blue-700/70 text-white rounded-lg p-5 text-s'
//               position={[
//                 annotation.position.x,
//                 annotation.position.y,
//                 annotation.position.z,
//               ]}
//               // position={[1, 5, 0]}
//               // transform
//               // sprite
//             >
//               <svg
//                 height="34"
//                 width="34"
//                 transform="translate(-16 -16)"
//                 style={{ cursor: 'pointer' }}
//               >
//                 <circle
//                   cx="17"
//                   cy="17"
//                   r="16"
//                   stroke="white"
//                   strokeWidth="2"
//                   fill="rgba(0,0,0,.66)"
//                   onClick={() => gotoAnnotation(i)}
//                 />
//                 <text
//                   x="12"
//                   y="22"
//                   fill="white"
//                   fontSize={17}
//                   fontFamily="monospace"
//                   style={{ pointerEvents: 'none' }}
//                 >
//                   {i + 1}
//                 </text>
//               </svg>
//               {selected === i && (
//                 <ul className="bg-gray-700/70 w-[200px] text-white rounded-lg p-2 text-xs">
//                   {content.map((item, idx) => (
//                     <li key={idx}>{`${item[0]} : ${item[1]}`}</li>
//                   ))}
//                 </ul>
//               )}
//             </Html>
//           </>
//         )
//       })}
//     </>
//   )
// }

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
    setContent([...Object.entries(value)]);
  };
  const handleClickMesh = (value) => {
    console.log(value);
    setOpenDashboard(value);
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
    handleClickMesh(true);
  };

  return (
    <React.Fragment>
      <Canvas
        shadows
        onPointerDown={() => setLerping(false)}
        onWheel={() => setLerping(false)}
      >
        <color args={[0, 0, 0]} attach="background" />
        {/* <CameraController ref={ref}/> */}
        <OrbitControls ref={ref} target={[0, 0.35, 0]} />
        <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />
        <ambientLight intensity={0.1} />
        {/* directional light uses ortho camer for shadows not eprps */}
        <directionalLight
          castShadow
          args={["white", 1]}
          position={[0.5, 0.2, 1]}
          // shadow-mapSize={[1024, 1024]}
          // penumbra={2}
        >
        <orthographicCamera attach="shadow-camera" args={[-10, 10, 10, -10]} />
        </directionalLight>
        <Suspense fallback={null}>
          {/*  */}
          <Environment map={envMap} background />
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
                selected={gotoAnnotation}
                clickMesh={handleClickMesh}
              />
            </>
          )}
          <Animate controls={ref} lerping={lerping} to={to} target={target} />

          <Ocean />
          {/* <Plane
            args={[1000, 1000]}
            rotation={[0, 0, 0]}
            position={[0, -0.5, -5]}
          >
            <meshStandardMaterial
              attach="material"
              roughness={0}
              metalness={1}
            />
          </Plane> */}
          {/* <Sky scale={10000} sunPosition={[500, 150, 1000]} turbidity={0.1} /> */}
        </Suspense>
      </Canvas>

      {openDashboard && <Dashboard position={["top-0"]} content={content} />}
     
      <button onClick={handleOnClick}>Close</button>
    </React.Fragment>
  );
};

export default EnvironmentLayout;
