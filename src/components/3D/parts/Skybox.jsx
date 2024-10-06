import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { CubeTextureLoader } from 'three';
import * as THREE from 'three';

export default function Skybox() {
  const { scene } = useThree();

  useEffect(() => {
    const loader = new CubeTextureLoader();
    const texture = loader.load([
      '/assets/skybox/right.png', // Right
      '/assets/skybox/left.png', // Left
      '/assets/skybox/top.png', // Top
      '/assets/skybox/bottom.png', // Bottom
      '/assets/skybox/front.png', // Front
      '/assets/skybox/back.png', // Back
    ]);
    scene.background = texture;  // Set the scene's background to the cubemap
  }, [scene]);

  return null;  // The skybox does not need to render any JSX
}
