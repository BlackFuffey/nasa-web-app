import '@/style/App.css';
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Box } from '@react-three/drei';
import '@/components/3D/instances/Orbit'
import Orbit from './components/3D/instances/Orbit';
import Service from './service/service.js';

function App() {
    const [planetData, setPlanetData] = useState(null);
    useEffect(() => await Service.preLoad())

  return (
    <Canvas className="h-[100vh]">
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      {/* Orbit Controls */}
      <OrbitControls />

      {/* Example 3D Objects */}
      <Orbit focus={[0,0,0]} semiMajorAxis=Service.
    </Canvas>
  );
}

export default App;

