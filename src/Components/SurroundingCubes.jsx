import { useMemo, React, useState, useEffect } from "react";
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

// RANDOM Function
const mathRandom = (num) => {
  const numValue = -Math.random() * num + Math.random() * num;
  return numValue;
};

const SurroundingCubes = (props) => {
  const segments = 2;
  const [boxes, setBoxes] = useState(null)
 
  

  useEffect(() => {
    const geo = []
    for (var i = 1; i < 150; i++) {
      console.log("loop")
      // console.log(geo)
      const scaleY = 0.1 + Math.abs(mathRandom(20));
      geo.push(
        <Box
          {...props}
          args={[1, 1, 1, segments, segments, segments]}
          scale-y={scaleY}
          position-x={Math.round(mathRandom(12)) * 6}
          position-z={Math.round(mathRandom(12)) * 6}
          position-y={scaleY / 2}
          key={i}
        >
          <meshStandardMaterial
            color={0x10151c}
            // side={THREE.DoubleSide}
            roughness={0.3}
            metalness={0.5}
            wireframe
            transparent
          />
          <Box
            castShadow
            receiveShadow
            args={[1, 1, 1, segments, segments, segments]}
          >
            <meshStandardMaterial
              color={"black"}
              // side={THREE.DoubleSide}
              roughness={0.5}
              metalness={0.5}
              opacity={0.5}
              // wireframe
              // transparent
            />
          </Box>
        </Box>
      );
    }console.log("done")
    setBoxes(geo)
  },[]);

  return <>
  {boxes && boxes}</>;
};

export default SurroundingCubes;

// var segments = 2
// for (var i = 1; i < 100; i++) {
//   var geometry = new THREE.CubeGeometry(1, 0, 0, segments, segments, segments)
//   var material = new THREE.MeshStandardMaterial({
//     color: setTintColor(),
//     wireframe: false,
//     //opacity:0.9,
//     //transparent:true,
//     //roughness: 0.3,
//     //metalness: 1,
//     shading: THREE.SmoothShading,
//     //shading:THREE.FlatShading,
//     side: THREE.DoubleSide,
//   })
//   var wmaterial = new THREE.MeshLambertMaterial({
//     color: 0xffffff,
//     wireframe: true,
//     transparent: true,
//     opacity: 0.03,
//     side: THREE.DoubleSide /*,
//       shading:THREE.FlatShading*/,
//   })

//   var cube = new THREE.Mesh(geometry, material)
//   var wire = new THREE.Mesh(geometry, wmaterial)
//   var floor = new THREE.Mesh(geometry, material)
//   var wfloor = new THREE.Mesh(geometry, wmaterial)

//   cube.add(wfloor)
//   cube.castShadow = true
//   cube.receiveShadow = true
//   cube.rotationValue = 0.1 + Math.abs(mathRandom(8))

//   //floor.scale.x = floor.scale.z = 1+mathRandom(0.33);
//   floor.scale.y = 0.05 //+mathRandom(0.5);
//   cube.scale.y = 0.1 + Math.abs(mathRandom(8))
//   //TweenMax.to(cube.scale, 1, {y:cube.rotationValue, repeat:-1, yoyo:true, delay:i*0.005, ease:Power1.easeInOut});
//   /*cube.setScale = 0.1+Math.abs(mathRandom());

//     TweenMax.to(cube.scale, 4, {y:cube.setScale, ease:Elastic.easeInOut, delay:0.2*i, yoyo:true, repeat:-1});
//     TweenMax.to(cube.position, 4, {y:cube.setScale / 2, ease:Elastic.easeInOut, delay:0.2*i, yoyo:true, repeat:-1});*/

//   var cubeWidth = 0.9
//   cube.scale.x = cube.scale.z = cubeWidth + mathRandom(1 - cubeWidth)
//   //cube.position.y = cube.scale.y / 2;
//   cube.position.x = Math.round(mathRandom())
//   cube.position.z = Math.round(mathRandom())

//   floor.position.set(cube.position.x, 0 /*floor.scale.y / 2*/, cube.position.z)

//   // town.add(floor);
//   town.add(cube)
// }
