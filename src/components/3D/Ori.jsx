import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Orbit from './parts/Orbit';
import CelesObj from './parts/CelesObj';
import PlanetConsts from '@/data/PlanetConsts';
import AsteroidConsts from '@/data/AsteroidConsts';
import CometConsts from '@/data/CometConsts';

export default function() {
    const sunRadius = 0.004649183820514384;

    return (
        <Canvas className="h-[100vh]">
            {/* Lighting */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />

            {/* Orbit Controls */}
            <OrbitControls />
            
            {/* Sun */}
            <CelesObj radius={sunRadius} color='yellow'/>

            {/* Planets */}
            {Object.entries(PlanetConsts.orbit).map(([key, value]) => (
                <Orbit focus={[0,0,0]} 
                    key={`orbit-planet-${key}`}
                    semiMajorAxis={value.semiMajorAxis}
                    eccentricity={value.eccentricity}
                    inclination={value.inclination}
                    meanLongitude={value.meanLongitude}
                    ascendingNodeLongitude={value.ascendingNodeLongitude}
                    color="blue"
                >
                    <CelesObj name={`planet-${key}`} radius={value.radius} color='blue'/>
            </Orbit>) 
            )}

            {/* Comets */}
            {Object.entries(CometConsts).map(([key, value]) => (
                <Orbit focus={[0,0,0]} 
                    key={`orbit-comet-${key}`}
                    semiMajorAxis={value.semiMajorAxis}
                    eccentricity={value.eccentricity}
                    inclination={value.inclination}
                    meanLongitude={value.meanLongitude}
                    ascendingNodeLongitude={value.ascendingNodeLongitude}
                    color="green"
                >
                    <CelesObj name={`comet-${key}`} radius={value.radius} color='green'/>
            </Orbit>) 
            )}

            {/* Astroids */}
            {Object.entries(AsteroidConsts.orbit).map(([key, value]) => (
                <Orbit focus={[0,0,0]} 
                    key={`orbit-astroid-${key}`}
                    semiMajorAxis={value.semiMajorAxis}
                    eccentricity={value.eccentricity}
                    inclination={value.inclination}
                    meanLongitude={value.perihelionLongitude}
                    ascendingNodeLongitude={value.ascendingNodeLongitude}
                    color="red"
                >
                    <CelesObj name={`planet-${key}`} radius={value.radius} color='red'/>
            </Orbit>) 
            )}
        </Canvas>
    );
}
