import '@/style/App.css';
import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Box } from '@react-three/drei';
import '@/components/3D/instances/Orbit'
import Orbit from './components/3D/instances/Orbit';
import Services from './service/service.js';
import Earth from './components/3D/instances/Earth';

function App() {
    const earthConstRef = useRef(Services.getPlanetConst().earth);

  return (
    <Canvas className="h-[100vh]">
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      {/* Orbit Controls */}
      <OrbitControls />

      {/* Example 3D Objects */}
      <Orbit focus={[0,0,0]} 
        semiMajorAxis={earthConstRef.current.semiMajorAxis}
        eccentricity={earthConstRef.current.eccentricity}
        >
            <Earth position={[1,1,1]} />
        </Orbit>
    </Canvas>
  );
}

export default App;

