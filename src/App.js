import { Html } from '@react-three/drei'
import './App.css'
import React, { Suspense, useState, useRef, useMemo } from 'react'
import EnvironmentLayout from './Components/EnvironmentLayout'
import EnterWorld from './Components/EnterWorld'
import { Parallax } from 'react-scroll-parallax'

import { ParallaxProvider } from 'react-scroll-parallax'
import { useParallax } from 'react-scroll-parallax'

const App = () => {
  const scroll = useRef(0)
  const overlay = useRef()

  return (
    <>
      <div className="App">
        <EnvironmentLayout />
      </div>
      <EnterWorld scroll={scroll} />
    </>
  )
}

export default App
