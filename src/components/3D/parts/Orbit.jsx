import React, { useMemo } from "react";
import * as THREE from "three";
import { Line } from "@react-three/drei";
import OrbitPhysics from '@/physics/Orbit'

export default function Orbit({
    focus = [0, 0, 0],
    semiMajorAxis = 10, // "a" - Semi-major axis
    eccentricity = 0.5, // Elliptical eccentricityocus, 
    inclination,
    meanLongitude,
    ascendingNodeLongitude,
    color='black',
    children, // Children (planets) to be placed on the orbit
}) {
    console.log({semiMajorAxis, eccentricity, inclination, meanLongitude, ascendingNodeLongitude})
    const child = React.Children.only(children);
    const orbPoints = OrbitPhysics.getOrbitEllipse(
        focus, 
        semiMajorAxis, 
        eccentricity,
        inclination,
        meanLongitude,
        ascendingNodeLongitude
    );

    return (
        <group>
            {/* Draw the elliptical orbit */}
            <Line
                points={orbPoints} // The points array for the orbit
                color={color}
                transparent={true}
                opacity={0.5}
                lineWidth={1}
            />

            {/* Place each child (planet) on the orbit */}
            {
                React.cloneElement(child, { position: [orbPoints[0].x, orbPoints[0].y, orbPoints[0].z] })
            }
            {                console.log({color, orb: orbPoints[0]})}

        </group>
    );
}
