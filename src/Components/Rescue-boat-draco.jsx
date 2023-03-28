/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 rescue-boat-draco.glb
*/

import React, { useState } from "react";
import { useGLTF } from "@react-three/drei";

export function RescueBoat(props) {
  const { nodes, materials } = useGLTF("/rescue-boat-draco.glb");
  const [selected] = useState(false);
  const modelData = "Rescue Boat Data";
  return (
    <group
      {...props}
      dispose={null}
      onPointerDown={(e) => {
        e.stopPropagation();
        console.log("click", !selected, modelData);
        props.data(modelData);
        props.clickMesh(!selected);
      }}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rescue_BoatTOOLS.geometry}
        material={materials["Rescue_Boat:Assault_Boat_MAT"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rescue_BoatBOAT.geometry}
        material={materials["Rescue_Boat:Assault_Boat_MAT"]}
      />
    </group>
  );
}

useGLTF.preload("/rescue-boat-draco.glb");
