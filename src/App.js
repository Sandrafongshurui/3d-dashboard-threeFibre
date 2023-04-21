import { Html } from '@react-three/drei'
import './App.css'

import EnvironmentLayout from './Components/EnvironmentLayout'
import EnterWorld from './Components/EnterWorld'

const App = () => {
  return (
    <div className="App">
      <EnvironmentLayout />
      <EnterWorld />
    </div>
  )
}

export default App
