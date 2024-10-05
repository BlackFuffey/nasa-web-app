export default function({ position = [0, 0, 0], size = 5 }){
    const color = 'yellow';

    return (
    <>
      {/* Glowing Sun */}
      <mesh ref={sunRef} position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshBasicMaterial color={color} emissive={color} emissiveIntensity={1} />
      </mesh>

      {/* Sunlight - Point light to simulate sunlight */}
      <pointLight
        position={position}
        intensity={2}        // Adjust the intensity of the light
        distance={100}       // How far the light reaches
        decay={2}            // Light decay over distance
        color={color}
      />
    </>
  );
}
