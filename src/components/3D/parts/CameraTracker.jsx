import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

export let setTrackObj;
export let trackingObj;

export function CameraTracker() {
    const cameraRef = useRef();
    const trackObjRef = useRef(null);

    const setTrackObjInner = (value) => trackObjRef.current = value

    useEffect(() => window.setTrack = setTrackObjInner, [])

    useEffect(() => setTrackObj = setTrackObjInner, []);
    useEffect(() => trackingObj = trackObjRef.current, []);

    useFrame(({ camera, scene }) => {
        // Find the object in the scene by name
        const target = scene.getObjectByName(trackObjRef.current);

        console.log({scene: scene.children, track: trackObjRef.current, target, camera: cameraRef.current})
        if (target && cameraRef.current) {
            // Make the camera look at the target object
            camera.lookAt(target.position);

            // Optionally, update the camera position to follow the target object
            // (in this case, we keep the camera at a fixed distance on the Z axis)
            camera.position.lerp(new THREE.Vector3(target.position.x, target.position.y, target.position.z + 5), 0.1);
            camera.zoom = THREE.MathUtils.lerp(camera.zoom, 5, 0.1)
            camera.updateProjectionMatrix();
        }
    });

    return <perspectiveCamera ref={cameraRef} position={[0, 0, 0]} />;
}

