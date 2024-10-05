import '@/style/App.css';
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Box } from '@react-three/drei';

function App() {
  return (
    <Canvas className="h-[100vh]">
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      {/* Orbit Controls */}
      <OrbitControls />

      {/* Example 3D Objects */}
      <Box position={[-1.2, 0, 0]}>
        <meshStandardMaterial attach="material" color="orange" />
      </Box>
      <Sphere position={[1.2, 0, 0]}>
        <meshStandardMaterial attach="material" color="skyblue" />
      </Sphere>
    </Canvas>
  );
}

export default App;

