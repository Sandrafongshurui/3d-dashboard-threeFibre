import { Html } from '@react-three/drei';
import './App.css';

import EnvironmentLayout from './Components/EnvironmentLayout';

const App = () => {

  return (
    <div className="App">
      <EnvironmentLayout/>
      <div className='text-[35px] absolute top-[50%] left-[43%] text-white'>
        <p>Hello World</p>
      </div>
      
    </div>
  );
}

export default App;
