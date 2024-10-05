import '@/style/App.css';
import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Box } from '@react-three/drei';
import '@/components/3D/instances/Orbit'
import Orbit from './components/3D/instances/Orbit';
import Services from './service/service.js';
import Earth from './components/3D/instances/Earth';

function App() {
    const planetConstRef = useRef(Services.getPlanetConst().orbit);

  return (
    <Canvas className="h-[100vh]">
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      {/* Orbit Controls */}
      <OrbitControls />

      {/* Example 3D Objects */}
      { Object.entries(planetConstRef.current).map(([key, value]) => (<Orbit focus={[0,0,0]} 
        semiMajorAxis={value.semiMajorAxis}
        eccentricity={value.eccentricity}
        >
        </Orbit>))
            }
    </Canvas>
  );
}

export default App;

