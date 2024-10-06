import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

export const [ trackObj, setTrackObj ] = useState('sun');

export function CameraTracker() {
  const cameraRef = useRef();
  const objectToTrack = useRef(null);

  useFrame(({ camera, scene }) => {
    // Find the object in the scene by name
    const target = scene.getObjectByName(trackObj);

    if (target) {
      // Make the camera look at the target object
      camera.lookAt(target.position);
      
      // Optionally, update the camera position to follow the target object
      // (in this case, we keep the camera at a fixed distance on the Z axis)
      camera.position.lerp(new THREE.Vector3(target.position.x, target.position.y, target.position.z + 5), 0.05);
      camera.updateProjectionMatrix();
    }
  });

  return <perspectiveCamera ref={cameraRef} position={[0, 0, 5]} />;
}
