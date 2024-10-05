import '@/style/App.css';
import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, Box } from '@react-three/drei';
import '@/components/3D/instances/Orbit'
//import Orbit from './components/3D/instances/Orbit';
import CelesObj from './components/3D/instances/CelesObj';
import PlanetConsts from './data/PlanetConsts';

function App() {
    
    const sunRadius = 0.004649183820514384;

    return (
        <Canvas className="h-[100vh]">
            {/* Lighting */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />

            {/* Orbit Controls */}
            <OrbitControls />

            <CelesObj radius={sunRadius} />

            {/* Example 3D Objects */}
            {/* Object.entries(PlanetConsts.orbit).map(([key, value]) => (<Orbit focus={[0,0,0]} 
                semiMajorAxis={value.semiMajorAxis}
                eccentricity={value.eccentricity}
            >
                <CelesObj radius={value.radius}/>
            </Orbit>) )*/
            }
        </Canvas>
    );
}

export default App;

