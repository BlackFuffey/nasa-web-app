import React, { useEffect, useState } from "react";
import * as THREE from "three";
import { Line } from "@react-three/drei";
import OrbitPhysics from '@/physics/OrbitPhysics'

export default function Orbit({
    focus = [0, 0, 0],
    semiMajorAxis = 10, // "a" - Semi-major axis
    eccentricity = 0.5, // Elliptical eccentricityocus, 
    inclination,
    meanLongitude,
    ascendingNodeLongitude,
    color='black',
    meanAnonmalyAtEpoch,
    period,
    children, // Children (planets) to be placed on the orbit
}) {
    useEffect(() => console.log({focus, semiMajorAxis, eccentricity, inclination, meanLongitude, ascendingNodeLongitude, meanAnonmalyAtEpoch, period}), [])
    const child = React.Children.only(children);
    const orbPoints = OrbitPhysics.getOrbitEllipse(
        focus, 
        semiMajorAxis, 
        eccentricity,
        inclination,
        meanLongitude,
        ascendingNodeLongitude,
    );

    const [position, setPosition] = useState([orbPoints[0].x, orbPoints[0].y, orbPoints[0].z]);

    useEffect(() => {
        let lastUpdate = 0;
        // Function to update position
        const interval = setInterval(() => {
            lastUpdate += 0.001157407;
            setPosition(OrbitPhysics.getMotion(
                semiMajorAxis,
                eccentricity,
                inclination,
                ascendingNodeLongitude,
                meanLongitude,
                meanAnonmalyAtEpoch,
                period,
                lastUpdate
            ));
        }, 1000);  // Update every 100 milliseconds (0.1 seconds)

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);

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
                React.cloneElement(child, { position: position})
            }
            {              console.log(position)  }

        </group>
    );
}
