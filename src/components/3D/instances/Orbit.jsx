import React, { useMemo } from "react";
import * as THREE from "three";
import { Line } from "@react-three/drei";
import OrbitPhysics from '@/physics/Orbit'

export default function Orbit({
    focus = [0, 0, 0],
    semiMajorAxis = 10, // "a" - Semi-major axis
    eccentricity = 0.5, // Elliptical eccentricity
    children, // Children (planets) to be placed on the orbit
}) {
    const numPlanets = React.Children.count(children);
    const orbPoints = OrbitPhysics.getOrbitEllipse(focus, semiMajorAxis, eccentricity);

    return (
        <group>
            {/* Draw the elliptical orbit */}
            <Line
                points={orbPoints.map(p => new THREE.Vector3(...p))} // The points array for the orbit
                color={'blue'}
                transparent={true}
                opacity={0.5}
                lineWidth={1}
            />

            {/* Place each child (planet) on the orbit */}
            {React.Children.map(children, (child, index) => {
                const angle = (index / numPlanets) * Math.PI * 2; // Distribute planets evenly
                const x =
                    semiMajorAxis * offsetFactor * Math.cos(angle) - focusDistance;
                const y = 0;
                const z = semiMinorAxis * offsetFactor * Math.sin(angle);

                return (
                    <group position={[x, y, z]}>
                        {React.cloneElement(child, { position: [0, 0, 0] })}
                    </group>
                );
            })}
        </group>
    );
}
