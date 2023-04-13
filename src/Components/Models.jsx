/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 Buoy-draco.glb
*/

import React, { useState, useEffect } from 'react'
import { Buoy } from './Buoy-draco'
import { RescueBoat } from './Rescue-boat-draco'
import {
  Selection,
  EffectComposer,
  Outline,
  Bloom,
} from '@react-three/postprocessing'
import * as THREE from 'three'
import annotations from '../annotations.json'
import AnnotationNumberLabel from './AnnotationNumberLabel'

export const Models = (props) => {
  // const [htmlContent, setHtmlContent] = useState([])
  const handleSelectedData = (value) => {
    // setHtmlContent([...Object.entries(value)])
    props.selectedContent(value)
  }
  const handleClickMeshA = (value) => {
    props.clickMesh(value)
  }

  const selectedAnnotation = (idx) => {
    // setTo(annotations[idx].camPos)
    // setTarget(annotations[idx].position)
    props.selected(idx)
    // setLerping(true)
  }

  return (
    <React.Fragment>
      <AnnotationNumberLabel
        annotation={annotations[0]}
        idx={0}
        selected={selectedAnnotation}
        annotationData={handleSelectedData}
        apiUrl={`${process.env.REACT_APP_API}/data/bus/`}
      />
      <Buoy
        scale={[5, 5, 5]}
        position={[0, 0, -15]}
        // data={handleSelectedData}
        // clickMesh={handleClickMeshA}
      />
      <AnnotationNumberLabel
        annotation={annotations[1]}
        idx={1}
        selected={selectedAnnotation}
        annotationData={handleSelectedData}
        apiUrl={`${process.env.REACT_APP_API}/data/taxi/`}
      />
      <RescueBoat
        scale={[50, 50, 50]}
        position={[5, 0.3, 0]}
        // data={handleSelectedData}
        // clickMesh={handleClickMeshA}
      />
        <AnnotationNumberLabel
        annotation={annotations[2]}
        idx={2}
        selected={selectedAnnotation}
        annotationData={handleSelectedData}
        apiUrl={`${process.env.REACT_APP_API}/data/platform-crowd/`}
      />
    </React.Fragment>
  )
}
