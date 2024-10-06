import React, { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { Line } from "@react-three/drei";
import OrbitPhysics from '@/physics/OrbitPhysics'
import CelesObj from "./CelesObj";

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
    const orbPointsRef = useRef(OrbitPhysics.getOrbitEllipse(
        focus, 
        semiMajorAxis, 
        eccentricity,
        inclination,
        meanLongitude,
        ascendingNodeLongitude,
    ));

    const [position, setPosition] = useState([orbPointsRef.current[0].x, orbPointsRef.current[0].y, orbPointsRef.current[0].z]);

    const historyRef = useRef([]);

    const doComputeRef = useRef(true);

    const doCompute = (value) => doComputeRef.current = value;

    useEffect(() => (async () => {
        let lastUpdate = 0;
        // Function to update position
        const interval = setInterval( async () => {
            lastUpdate += 1;
            
            if (!doComputeRef.current) {
                await new Promise(resolve => setTimeout(resolve, 5000))
            };

            setPosition(() => {
                const newPos = OrbitPhysics.getMotion(
                    semiMajorAxis,
                    inclination,
                    eccentricity,
                    meanLongitude,
                    ascendingNodeLongitude,
                    period,
                    lastUpdate
                );

                setPosition(newPos)
            })
        }, 100);  // Update every 100 milliseconds (0.1 seconds)

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    })(), []);


    return (
        <group>
            {/* Draw the elliptical orbit */}
            <Line
                points={orbPointsRef.current} // The pohttps://www.flickr.com/photos/nasahubble/53443280532/ints array for the orbit
                color={color}
                transparent={true}
                opacity={0.5}
                lineWidth={1}
            />

            {/* Place each child (planet) on the orbit */}
            {
                React.cloneElement(child, { position: position, doCompute })
            }

            {/* History */}
            { historyRef.current.map(e => 
                (<CelesObj position={e} radius={0.001} color={color} />)
            )
            }

        </group>
    );
}
