import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Line } from '@react-three/drei';

export default function Orbit({
  semiMajorAxis = 10,    // "a" - Semi-major axis
  semiMinorAxis = 5,     // "b" - Semi-minor axis
  eccentricity = 0.5,    // Elliptical eccentricity
  focusDistance = 3,     // Distance from center to focus (c = a * e)
  segments = 64,         // Number of segments to approximate the ellipse
  color = 'blue',        // Color of the orbit line
  opacity = 0.5,         // Semi-transparency
  offsetFactor = 0.8,    // Factor to determine how far inside the orbit the planets should be
  children,              // Children (planets) to be placed on the orbit
}) {
  // Memoize the points so that they're only recalculated when necessary
  const points = useMemo(() => {
    const pointsArray = [];
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const x = semiMajorAxis * Math.cos(angle); // x = a * cos(theta)
      const y = 0; // Ellipse is in the xy-plane
      const z = semiMinorAxis * Math.sin(angle); // z = b * sin(theta)
      pointsArray.push(new THREE.Vector3(x, y, z));
    }
    return pointsArray;
  }, [semiMajorAxis, semiMinorAxis, segments]);

  const numPlanets = React.Children.count(children);

  return (
    <group>
      {/* Draw the elliptical orbit */}
      <Line
        points={points}                  // The points array for the orbit
        color={color}
        transparent={true}
        opacity={opacity}
        lineWidth={1}
      />

      {/* Place each child (planet) on the orbit */}
      {React.Children.map(children, (child, index) => {
        const angle = (index / numPlanets) * Math.PI * 2; // Distribute planets evenly
        const x = (semiMajorAxis * offsetFactor) * Math.cos(angle) - focusDistance;
        const y = 0;
        const z = (semiMinorAxis * offsetFactor) * Math.sin(angle);

        return (
          <group position={[x, y, z]}>
            {React.cloneElement(child, { position: [0, 0, 0] })}
          </group>
        );
      })}
    </group>
  );
}
