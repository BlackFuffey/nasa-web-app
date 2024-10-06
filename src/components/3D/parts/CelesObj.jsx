import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function OptimizedObject({position=[0,0,0], precision=64, radius=1, color='white', doCompute, name}) {
    const meshRef = useRef();
    const { camera } = useThree();

    if (!doCompute) doCompute = () => {};

    const distanceThreshold = 14;

    useFrame(() => {
        const object = meshRef.current;
        if (object) {
            // Calculate the distance between the object and the camera
            const distance = camera.position.distanceTo(object.position);

            // Perform optimization: only update or render when within a certain distance
            if (distance < distanceThreshold) {
                // Perform any updates or calculations when the object is within range
                // For example, animate the object
                object.rotation.y += 0.01;

                // Frustum culling - check if the object is in view
                const frustum = new THREE.Frustum();
                const cameraViewProjectionMatrix = new THREE.Matrix4();

                camera.updateMatrixWorld(); // Ensure the camera's world matrix is up to date
                cameraViewProjectionMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
                frustum.setFromProjectionMatrix(cameraViewProjectionMatrix);

                if (frustum.intersectsObject(object)) {
                    // Object is within the view frustum and within distance
                    object.visible = true;
                    doCompute(true);
                } else {
                    // Object is outside the view frustum
                    object.visible = false;
                    doCompute(false);
                }
            } else {
                // Object is too far away, avoid rendering
                object.visible = false;
                doCompute(false);
            }
        }
    });

    return (
        <mesh ref={meshRef} position={position} name={name}>
            <sphereGeometry args={[0.1, precision, precision]} />
            <meshStandardMaterial color={color} />
        </mesh>
    )
}
